'use strict';

var model = function() {
    function GameState(numberOfTiles) {
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
                        var x;
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

    function Tile(key, gameState) {
        this.key = key;
        this.revealed = false;

        this.flip = function() {
            this.revealed = !this.revealed;
        };

        this.notify = function() {
            gameState.update(this);
        };
    }

    function Game(width, height) {
        //! Generates keys for tiles on the game board.
        //! The generator should produce each key an even number of times.
        function KeyGenerator() {
            this.key = function(heightIndex, widthIndex) {
                var tileNumber = heightIndex * height + widthIndex;
                return Math.floor(tileNumber / 2);
            }
        }

        function createRow(width, gameState) {
            return generate(() => new Tile(null, gameState), width);
        }

        function createBoard(width, height, gameState) {
            var board = generate(createRow.bind(null, width, gameState), height);

            var keys = new KeyGenerator();
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    board[i][j].key = keys.key(i, j);
                }
            }

            return board;
        }

        this.width = width;
        this.height = height;
        this.gameState = new GameState(width * height);
        this.board = createBoard(this.width, this.height, this.gameState);
    }

    return {
        Game: Game,
        Tile: Tile,
        GameState: GameState
    };
}();