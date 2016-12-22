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

    function updateView() {
        var tileCounter = document.getElementById("TileCounter");
        tileCounter.innerHTML = `Number of tiles left: ${model.gameState.tilesRemaining}`;

        var board = document.getElementById("Board");
        var rows = board.children;
        for (let i = 0; i < rows.length; i++) {
            var tiles = rows[i].children;
            for (let j = 0; j < tiles.length; j++) {
                var tile = tiles[j];
                tile.style.backgroundColor = tileViewColor(tile.model);
            }
        }
    }

    function onClickTile(tileView, tileModel) {
        return () => {
            tileModel.notify();
            updateView();
        };
    }

    function createTile(i, j) {
        var tileModel = model.board[i][j];

        var tile = document.createElement("tile");
        tile.classList.add("tile");
        tile.style.backgroundColor = tileConcealedColor;
        tile.onclick = onClickTile(tile, tileModel);
        tile.model = tileModel;

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

    function createTileCounter(model) {
        var tileCounter = document.createElement("div");
        tileCounter.innerHTML = `Number of tiles left: ${model.gameState.tilesRemaining}`;

        return tileCounter;
    }

    var gameView = document.createElement("div");

    var tileCounter = createTileCounter(model);
    tileCounter.id = "TileCounter";
    gameView.appendChild(tileCounter);

    var board = createBoard(model.width, model.height);
    board.id = "Board";
    gameView.appendChild(board);

    return gameView;
};