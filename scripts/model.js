//! Produce an array of `n` items from a `generator` function.
//! The `generator` function will be passed the index of each element being generated.
function generate(generator, n) {
    var result = [];
    for (let i = 0; i < n; i++) {
        result.push(generator(i));
    }
    return result;
}

function GameState() {
    this.firstTry = true;
    this.firstTile = null;
    this.secondTile = null;
    this.success = null; //!< Whether the last attempt resulted in a match
    this.tilesToFlip = [];

    this.isMatch = function() {
        return this.firstTile.key === this.secondTile.key && this.firstTile !== null;
    };

    this.update = function(tile) {
        if (tile.revealed) {
            return;
        } else {
            tile.flip();

            if (this.firstTry) {
                if (this.success == false) {
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

function Model(width, height) {
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
    this.gameState = new GameState();
    this.board = createBoard(this.width, this.height, this.gameState);
};

function createView(model) {
    var tileConcealedColor = "rgb(59, 65, 70)";

    var keyColor = {
        0: "green",
        1: "red",
        2: "blue",
        3: "orange",
        4: "violet",
        5: "pink",
        6: "cyan",
        7: "yellow"
    };

    function tileViewColor(tileModel) {
        if (tileModel.revealed) {
            return keyColor[tileModel.key];
        } else {
            return tileConcealedColor;
        }
    }

    function updateView(viewRoot) {
        var rows = viewRoot.children;
        for (let i = 0; i < rows.length; i++) {
            var tiles = rows[i].children;
            for (let j = 0; j < tiles.length; j++) {
                var tile = tiles[j];
                tile.style.backgroundColor = tileViewColor(tile.model);
            }
        }
    }

    function onClickTile(viewRoot, tileView, tileModel) {
        return () => {
            tileModel.notify();
            updateView(viewRoot);
        };
    }

    function createTile(viewRoot, i, j) {
        var tileModel = model.board[i][j];

        var tile = document.createElement("tile");
        tile.classList.add("tile");
        tile.style.backgroundColor = tileConcealedColor;
        tile.onclick = onClickTile(viewRoot, tile, tileModel);
        tile.model = tileModel;

        return tile;
    }

    function createRow(viewRoot, i, width) {
        var row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < width; j++) {
            row.appendChild(createTile(viewRoot, i, j));
        }

        return row;
    }

    function createBoard(width, height) {
        var board = document.createElement("div");
        board.classList.add("board");

        for (let i = 0; i < height; i++) {
            board.appendChild(createRow(board, i, width));
        }

        return board;
    }

    return createBoard(model.width, model.height);
};