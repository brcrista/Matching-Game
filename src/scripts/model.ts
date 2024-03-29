import * as iterable from 'js-helpers/iterable';
import * as random from 'js-helpers/random';

export namespace Model {
    export class GameState {
        firstTry: boolean;
        firstTile: Tile | null;
        secondTile: Tile | null;
        success: boolean | null;
        tilesToFlip: Tile[];
        tilesRemaining: number;
        isMatch: () => boolean;
        update: (tile: Tile) => void;

        constructor(numberOfTiles: number) {
            this.firstTry = true;
            this.firstTile = null;
            this.secondTile = null;
            this.success = null; //!< Whether the last attempt resulted in a match
            this.tilesToFlip = [];
            this.tilesRemaining = numberOfTiles;

            this.isMatch = function() {
                return this.firstTile!.key === this.secondTile!.key && this.firstTile !== null;
            };

            this.update = function(tile: Tile) {
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
                            this.tilesToFlip.push(this.firstTile!);
                            this.tilesToFlip.push(this.secondTile);
                        }

                        this.firstTry = true;
                    }
                }
            };
        }
    }

    export class Tile {
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

    export class Game {
        width: number;
        height: number;
        gameState: GameState;
        board: Tile[][];

        constructor(width: number, height: number) {
            function createRow(width: number, gameState: GameState): Tile[] {
                return Array.from(
                    iterable.sequence(width, () => new Tile(undefined, gameState))
                );
            }

            function createBoard(width: number, height: number, gameState: GameState): Tile[][] {
                const board = Array.from(
                    iterable.sequence(height, () => createRow(width, gameState))
                );

                const keys = iterable.map(
                    (n: number) => Math.floor(n / 2),
                    iterable.range(0, width * height)
                );

                // TODO use `repeat` / `zip` to avoid manual iteration
                // and remove the type assertion.
                const keyIterator = random.shuffle(keys)[Symbol.iterator]();
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        // Assert: `keyIterator` will produce `width * height` values,
                        // so it will not return `void`.
                        board[i][j].key = <number>keyIterator.next().value;
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
}