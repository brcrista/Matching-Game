/// <reference path="model.ts" />

namespace View {
    function createTile(tileModel: Model.Tile, gameModel: Model.Game) {
        function keyColor(key: number): string | undefined {
            switch (key) {
                case 0: return "rgb(0, 180, 60)";
                case 1: return "red";
                case 2: return "blue";
                case 3: return "orange";
                case 4: return "rgb(185, 0, 215)";
                case 5: return "rgb(252, 173, 205)";
                case 6: return "rgb(120, 222, 255)";
                case 7: return "rgb(230, 250, 0)";
                case 8: return "rgb(0, 0, 0)";
                case 9: return "rgb(255, 255, 255)";
                default: return undefined;
            }
        };

        let tile: any = document.createElement("div");
        tile.classList.add("tile");
        tile.concealedColor = tile.style.backgroundColor;
        tile.model = tileModel;

        tile.update = function() {
            tile.style.backgroundColor = function() {
                if (tile.model.revealed) {
                    return keyColor(tile.model.key);
                } else {
                    return tile.concealedColor;
                }
            }();
        };

        tile.onclick = function() {
            tile.model.notify();
            updateView(gameModel);
        };

        return tile;
    }

    let victoryMessageShown = false;

    function updateView(model: Model.Game) {
        let tileCounter = document.getElementById("TileCounter") as HTMLElement;
        tileCounter.innerHTML = `Number of tiles left: ${model.gameState.tilesRemaining}`;

        let board = document.getElementById("Board") as HTMLElement;
        let rows = board.children;
        for (let i = 0; i < rows.length; i++) {
            let tiles = rows[i].children;
            for (let j = 0; j < tiles.length; j++) {
                let tile: any = tiles[j];
                tile.update();
            }
        }

        if (model.gameState.tilesRemaining === 0 && !victoryMessageShown) {
            setTimeout(() => alert("You win!"), 0);
            victoryMessageShown = true;
        }
    }

    function createRow(i: number, width: number, model: Model.Game) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < width; j++) {
            row.appendChild(createTile(model.board[i][j], model));
        }

        return row;
    }

    function createBoard(width: number, height: number, model: Model.Game) {
        let board = document.createElement("div");
        board.classList.add("board");

        for (let i = 0; i < height; i++) {
            board.appendChild(createRow(i, width, model));
        }

        return board;
    }

    function createTileCounter(model: Model.Game) {
        let tileCounter = document.createElement("div");
        tileCounter.classList.add("tile-counter");
        tileCounter.innerHTML = `Number of tiles left: ${model.gameState.tilesRemaining}`;

        return tileCounter;
    }

    export function createGameView(model: Model.Game) {
        let gameView = document.createElement("div");

        let tileCounter = createTileCounter(model);
        tileCounter.id = "TileCounter";
        gameView.appendChild(tileCounter);

        let board = createBoard(model.width, model.height, model);
        board.id = "Board";
        gameView.appendChild(board);

        return gameView;
    }
}