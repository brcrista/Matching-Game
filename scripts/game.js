function GameState() {
    this.firstTry = true;
    this.lastTile = null;

    this.update = function(tile) {
        // if the tile is face up
        if (tile.revealed) {
            return;
        } else {
            tile.flip();

            if (this.firstTry) {
                this.lastTile = tile;
                this.firstTry = false;
            } else {
                if (tile.key !== this.lastTile.key) {
                    tile.flip();
                    this.lastTile.flip();
                }

                this.firstTry = true;
                this.lastTile = null;
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

    function createRow(width, gameState) {
        var row = [];
        for (let i = 0; i < width; i++) {
            row[i] = new Tile(null, gameState);
        }

        return row;
    }

    function createBoard(width, height, gameState) {
        var board = [];
        for (let i = 0; i < height; i++) {
            board[i] = createRow(width, gameState);
        }

        let tileNumber = 0;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                board[i][j].key = Math.floor(tileNumber / 2);
                tileNumber++;
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