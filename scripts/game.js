function initializeBoard(board, height, width) {
    for (let i = 0; i < height; i++) {
        var row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < height; j++) {
            var tile = document.createElement("tile");
            tile.classList.add("tile");

            row.appendChild(tile);
        }

        board.appendChild(row);
    }
}