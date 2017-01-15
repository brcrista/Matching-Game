'use strict';

var view = function() {
    function createTile(tileModel, gameModel) {
        var tileConcealedColor = "rgb(59, 65, 70)";

        var keyColor = {
            0: "rgb(0, 180, 60)",
            1: "red",
            2: "blue",
            3: "orange",
            4: "rgb(185, 0, 215)",
            5: "rgb(252, 173, 205)",
            6: "rgb(120, 222, 255)",
            7: "rgb(230, 250, 0)"
        };

        var tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.backgroundColor = tileConcealedColor;
        tile.model = tileModel;

        tile.update = function() {
            tile.style.backgroundColor = function() {
                if (tile.model.revealed) {
                    return keyColor[tile.model.key];
                } else {
                    return tileConcealedColor;
                }
            }();
        };

        tile.onclick = function() {
            tile.model.notify();
            updateView(gameModel);
        };

        return tile;
    }

    function updateView(model) {
        var tileCounter = document.getElementById("TileCounter");
        tileCounter.innerHTML = `Number of tiles left: ${model.gameState.tilesRemaining}`;

        var board = document.getElementById("Board");
        var rows = board.children;
        for (let i = 0; i < rows.length; i++) {
            var tiles = rows[i].children;
            for (let j = 0; j < tiles.length; j++) {
                var tile = tiles[j];
                tile.update();
            }
        }

        if (model.gameState.tilesRemaining === 0) {
            alert("You win!");
        }
    }

    function createRow(i, width, model) {
        var row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < width; j++) {
            row.appendChild(createTile(model.board[i][j], model));
        }

        return row;
    }

    function createBoard(width, height, model) {
        var board = document.createElement("div");
        board.classList.add("board");

        for (let i = 0; i < height; i++) {
            board.appendChild(createRow(i, width, model));
        }

        return board;
    }

    function createTileCounter(model) {
        var tileCounter = document.createElement("div");
        tileCounter.innerHTML = `Number of tiles left: ${model.gameState.tilesRemaining}`;

        return tileCounter;
    }

    function createGameView(model) {
        var gameView = document.createElement("div");

        var tileCounter = createTileCounter(model);
        tileCounter.id = "TileCounter";
        gameView.appendChild(tileCounter);

        var board = createBoard(model.width, model.height, model);
        board.id = "Board";
        gameView.appendChild(board);

        return gameView;
    }

    return {
        createGameView: createGameView
    };
}();