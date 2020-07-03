import { Model } from './model';
import { View } from './view';

export function startGame(document: Document) {
    const selectDifficulty: any = document.getElementById("SelectDifficulty");
    const difficulty = selectDifficulty.options[selectDifficulty.selectedIndex].text;

    const gameModel = function() {
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