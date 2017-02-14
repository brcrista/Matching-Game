/// <reference path="model.ts" />
/// <reference path="view.ts" />

function startGame(document: Document) {
    let selectDifficulty: any = document.getElementById("SelectDifficulty");
    let difficulty = selectDifficulty.options[selectDifficulty.selectedIndex].text;

    let gameModel = function() {
        switch (difficulty) {
            case "Easy": return new Model.Game(4, 3);
            default:
            case "Medium": return new Model.Game(4, 4);
            case "Hard": return new Model.Game(5, 4);
        }
    }();

    document.body.removeChild(document.getElementById("DifficultyDialog") as HTMLElement);
    document.body.appendChild(View.createGameView(gameModel));
}