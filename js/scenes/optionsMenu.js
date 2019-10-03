/**
 * options menu
 */
class optionsMenu extends backgroundScene {
    constructor() {
        super({ key: 'optionsMenu' });
    }

    /**
     * callback function to create a scene
     */
    create() {
        super.create();
 
        new button(this, 512, 500, 'buttonBg', 'buttonBgHover', 'Back', function () {
            this.scene.start('mainMenuScene');
        }.bind(this));

        this.soundBut = new button(this, 512, 300, 'buttonBg', 'buttonBgHover', "Sound on", function () {
            game.sound.mute = !game.sound.mute;
            this.soundBut.text.text = game.sound.mute ? "Sound on" : "Sound off";
            this.soundBut.alignText();
        }.bind(this))

        this.difficultyBut = new button(this, 512, 400, 'buttonBg', 'buttonBgHover', gameSettings.difficulty, function () {
            if (gameSettings.difficulty == 'Easy') {
                gameSettings.difficulty = 'Normal';
            }
            else if (gameSettings.difficulty == 'Normal') {
                gameSettings.difficulty = 'Hard';
            }
            else if (gameSettings.difficulty == 'Hard') {
                gameSettings.difficulty = 'Hardcore';
            }
            else if (gameSettings.difficulty == 'Hardcore') {
                gameSettings.difficulty = 'Easy';
            }

            this.difficultyBut.text.text = gameSettings.difficulty;
            this.difficultyBut.alignText();
        }.bind(this));
    }
}