var model = function() {
    function Tile(key) {
        this.key = key;
        this.revealed = false;
    }

    function initializeRow(width) {
        var row = [];
        for (let i = 0; i < width; i++) {
            var key = i;
            row[i] = new Tile(key);
        }
    }

    function initializeBoard(width, height) {
        var board = [];
        for (let i = 0; i < height; i++) {
            board[i] = initializeRow(width);
        }

        return board;
    }
}();

var view = function() {
    function revealTile() {
        this.classList.add("face-up");
        this.onclick = hideTile;
    }

    //! Invariant: `this` element contains `face-up` in its `classList`.
    function hideTile() {
        this.classList.remove("face-up");
        this.onclick = revealTile;
    }

    function createTile() {
        var tile = document.createElement("tile");
        tile.classList.add("tile");
        tile.onclick = revealTile;

        return tile;
    }

    function createRow(width) {
        var row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < width; j++) {
            row.appendChild(createTile());
        }

        return row;
    }

    function createBoard(board, width, height) {
        for (let i = 0; i < height; i++) {
            board.appendChild(createRow(width));
        }
    }

    return {
        createBoard: createBoard
    };
}();