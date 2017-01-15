'use strict';

let view = function() {
    function createTile(tileModel, gameModel) {
        const tileConcealedColor = "rgb(59, 65, 70)";

        const keyColor = {
            0: "rgb(0, 180, 60)",
            1: "red",
            2: "blue",
            3: "orange",
            4: "rgb(185, 0, 215)",
            5: "rgb(252, 173, 205)",
            6: "rgb(120, 222, 255)",
            7: "rgb(230, 250, 0)"
        };

        let tile = document.createElement("div");
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
        let tileCounter = document.getElementById("TileCounter");
        tileCounter.innerHTML = `Number of tiles left: ${model.gameState.tilesRemaining}`;

        let board = document.getElementById("Board");
        let rows = board.children;
        for (let i = 0; i < rows.length; i++) {
            let tiles = rows[i].children;
            for (let j = 0; j < tiles.length; j++) {
                let tile = tiles[j];
                tile.update();
            }
        }

        if (model.gameState.tilesRemaining === 0) {
            alert("You win!");
        }
    }

    function createRow(i, width, model) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < width; j++) {
            row.appendChild(createTile(model.board[i][j], model));
        }

        return row;
    }

    function createBoard(width, height, model) {
        let board = document.createElement("div");
        board.classList.add("board");

        for (let i = 0; i < height; i++) {
            board.appendChild(createRow(i, width, model));
        }

        return board;
    }

    function createTileCounter(model) {
        let tileCounter = document.createElement("div");
        tileCounter.innerHTML = `Number of tiles left: ${model.gameState.tilesRemaining}`;

        return tileCounter;
    }

    function createGameView(model) {
        let gameView = document.createElement("div");

        let tileCounter = createTileCounter(model);
        tileCounter.id = "TileCounter";
        gameView.appendChild(tileCounter);

        let board = createBoard(model.width, model.height, model);
        board.id = "Board";
        gameView.appendChild(board);

        return gameView;
    }

    return {
        createGameView: createGameView
    };
}();