//! Generates keys for tiles on the game board.
//! The generator should produce each key an even number of times.
let keyGen = function() {
    interface GetKey {
        (heightIndex: number, widthIndex: number): number;
    }

    interface KeyGenerator {
        nextKey: GetKey;
    }

    //! A deterministic generator that assigns each pair of keys to adjacent tiles.
    class SideBySideGenerator implements KeyGenerator {
        nextKey: GetKey;

        constructor(height: number, width: number) {
            this.nextKey = function(heightIndex, widthIndex) {
                const tileNumber = heightIndex * height + widthIndex;
                return Math.floor(tileNumber / 2);
            }
        };
    }

    //! A generator that assigns keys by choosing them with a uniform distribution.
    class UniformRandomGenerator implements KeyGenerator {
        nextKey: GetKey;
        private remainingKeys: number[];

        constructor(height: number, width: number) {
            const numberOfTiles = height * width;
            if (numberOfTiles % 2 !== 0) throw new RangeError(`${height} * ${width} is not divisible by 2`);

            const keyRange = range(0, numberOfTiles / 2 - 1);
            this.remainingKeys = keyRange.concat(keyRange);

            this.nextKey = function(heightIndex, widthIndex): number {
                //! Randomly choose an integer in the range [`0`, `size`) with a uniform distribution.
                function randomIndex(size) {
                    return Math.floor(Math.random() * size);
                }

                return remove<number>(this.remainingKeys, randomIndex(this.remainingKeys.length));
            };
        }
    }

    return {
        UniformRandomGenerator: UniformRandomGenerator
    };
}();

let model = function() {
    class GameState {
        firstTry: boolean;
        firstTile: Tile | null;
        secondTile: Tile | null;
        success: boolean | null;
        tilesToFlip: Tile[];
        tilesRemaining: number;
        isMatch: () => boolean;
        update: (Tile) => void;

        constructor(numberOfTiles: number) {
            this.firstTry = true;
            this.firstTile = null;
            this.secondTile = null;
            this.success = null; //!< Whether the last attempt resulted in a match
            this.tilesToFlip = [];
            this.tilesRemaining = numberOfTiles;

            this.isMatch = function() {
                return this.firstTile.key === this.secondTile.key && this.firstTile !== null;
            };

            this.update = function(tile) {
                if (tile.revealed) {
                    return;
                } else {
                    tile.flip();

                    if (this.firstTry) {
                        if (this.success === false) {
                            let x;
                            while (x = this.tilesToFlip.pop()) {
                                x.flip();
                            }
                        }

                        this.firstTile = tile;
                        this.firstTry = false;
                    } else {
                        this.secondTile = tile;

                        if (this.isMatch()) {
                            this.success = true;
                            this.tilesRemaining -= 2;
                        } else {
                            this.success = false;
                            this.tilesToFlip.push(this.firstTile);
                            this.tilesToFlip.push(this.secondTile);
                        }

                        this.firstTry = true;
                    }
                }
            };
        }
    }

    class Tile {
        key?: number;
        revealed: boolean;
        flip: () => void;
        notify: () => void;

        constructor(key: number | undefined, gameState: GameState) {
            this.key = key;
            this.revealed = false;

            this.flip = function() {
                this.revealed = !this.revealed;
            };

            this.notify = function() {
                gameState.update(this);
            };
        }
    }

    class Game {
        width: number;
        height: number;
        gameState: GameState;
        board: Tile[][];

        constructor(width: number, height: number) {
            function createRow(width, gameState) {
                return generate<Tile>(() => new Tile(undefined, gameState), width);
            }

            function createBoard(width, height, gameState) {
                let board = generate<Tile[]>(createRow.bind(null, width, gameState), height);

                let keys = new keyGen.UniformRandomGenerator(height, width);
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        board[i][j].key = keys.nextKey(i, j);
                    }
                }

                return board;
            }

            this.width = width;
            this.height = height;
            this.gameState = new GameState(width * height);
            this.board = createBoard(this.width, this.height, this.gameState);
        }
    }

    return {
        Game: Game,
        Tile: Tile,
        GameState: GameState
    };
}();