import { Model } from './model';

export namespace View {
    class RgbColor {
        constructor(public red: number, public green: number, public blue: number) {
            for (let colorValue of [red, green, blue]) {
                if (!RgbColor.inRange(colorValue)) {
                    throw new RangeError(`Invalid RGB color value: ${colorValue}`);
                }
            }
        }

        public toString(): string {
            return `rgb(${this.red}, ${this.green}, ${this.blue})`;
        }

        private static inRange(colorValue: number): boolean {
            return 0 <= colorValue && colorValue <= 255;
        }
    }

    function createTile(tileModel: Model.Tile, gameModel: Model.Game) {
        function keyColor(key: number): RgbColor {
            switch (key) {
                case 0: return new RgbColor(0, 180, 6);;
                case 1: return new RgbColor(255, 0, 0);
                case 2: return new RgbColor(0, 0, 255);
                case 3: return new RgbColor(255, 165, 0);
                case 4: return new RgbColor(185, 0, 215);
                case 5: return new RgbColor(252, 173, 205);
                case 6: return new RgbColor(120, 222, 255);
                case 7: return new RgbColor(230, 250, 0);
                case 8: return new RgbColor(0, 0, 0);
                case 9: return new RgbColor(255, 255, 255);
                default: throw new RangeError(`Invalid tile color key: ${key}`);
            }
        };

        let tile: any = document.createElement("div");
        tile.classList.add("tile");
        tile.concealedColor = tile.style.backgroundColor;
        tile.model = tileModel;

        tile.update = function() {
            tile.style.backgroundColor = function() {
                if (tile.model.revealed) {
                    return keyColor(tile.model.key).toString();
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
        const tileCounter = document.getElementById("TileCounter") as HTMLElement;
        tileCounter.innerHTML = `Number of tiles left: ${model.gameState.tilesRemaining}`;

        const board = document.getElementById("Board") as HTMLElement;
        const rows = board.children;
        for (let i = 0; i < rows.length; i++) {
            const tiles = rows[i].children;
            for (let j = 0; j < tiles.length; j++) {
                const tile: any = tiles[j];
                tile.update();
            }
        }

        if (model.gameState.tilesRemaining === 0 && !victoryMessageShown) {
            setTimeout(() => alert("You win!"), 0);
            victoryMessageShown = true;
        }
    }

    function createRow(i: number, width: number, model: Model.Game) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < width; j++) {
            row.appendChild(createTile(model.board[i][j], model));
        }

        return row;
    }

    function createBoard(width: number, height: number, model: Model.Game) {
        const board = document.createElement("div");
        board.classList.add("board");

        for (let i = 0; i < height; i++) {
            board.appendChild(createRow(i, width, model));
        }

        return board;
    }

    function createTileCounter(model: Model.Game) {
        const tileCounter = document.createElement("div");
        tileCounter.classList.add("tile-counter");
        tileCounter.innerHTML = `Number of tiles left: ${model.gameState.tilesRemaining}`;

        return tileCounter;
    }

    export function createGameView(model: Model.Game) {
        const gameView = document.createElement("div");

        const tileCounter = createTileCounter(model);
        tileCounter.id = "TileCounter";
        gameView.appendChild(tileCounter);

        const board = createBoard(model.width, model.height, model);
        board.id = "Board";
        gameView.appendChild(board);

        return gameView;
    }
}