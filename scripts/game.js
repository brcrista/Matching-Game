function Model(width, height) {
    function flip(tile) {
        // if the tile is face up
        //     do nothing
        // else (tile is face up)
        //     if this is the first tile
        //         flip it
        //         remember what its key is
        //         move on to the second tile
        //     else (this is the second tile)
        //         flip it
        //         check if its key matches the first's
        //         if the key matches
        //             both tiles stay face up
        //         else
        //             both tiles are flipped back over

        // TODO
        tile.revealed = !tile.revealed;
    }

    function Tile(key) {
        this.key = key;
        this.revealed = false;
        this.notify = () => flip(this);
    }

    function createRow(width) {
        var row = [];
        for (let i = 0; i < width; i++) {
            var key = i; // TODO
            row[i] = new Tile(key);
        }

        return row;
    }

    function createBoard(width, height) {
        var board = [];
        for (let i = 0; i < height; i++) {
            board[i] = createRow(width);
        }

        return board;
    }

    this.board = createBoard(width, height);
    this.width = width;
    this.height = height;
};

function createView(model) {
    function onClickTile(tileView, tileModel) {
        return () => {
            tileModel.notify();

            if (tileModel.revealed) {
                tileView.classList.add("revealed");
            } else {
                tileView.classList.remove("revealed");
            }
        };
    }

    function createTile(i, j) {
        var tile = document.createElement("tile");
        tile.classList.add("tile");
        tile.onclick = onClickTile(tile, model.board[i][j]);

        return tile;
    }

    function createRow(i, width) {
        var row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < width; j++) {
            row.appendChild(createTile(i, j));
        }

        return row;
    }

    function createBoard(width, height) {
        var board = document.createElement("div");
        board.classList.add("board");

        for (let i = 0; i < height; i++) {
            board.appendChild(createRow(i, width));
        }

        return board;
    }

    return createBoard(model.width, model.height);
};