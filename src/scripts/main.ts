function startGame(document: Document) {
    let selectDifficulty: any = document.getElementById("SelectDifficulty");
    let difficulty = selectDifficulty.options[selectDifficulty.selectedIndex].text;

    let gameModel = function() {
        switch (difficulty) {
            case "Easy": return new model.Game(4, 3);
            default:
            case "Medium": return new model.Game(4, 4);
            case "Hard": return new model.Game(5, 4);
        }
    }();

    document.body.removeChild(document.getElementById("DifficultyDialog"));
    document.body.appendChild(view.createGameView(gameModel));
}