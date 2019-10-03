const SCORES_COUNT = 10;

/**
 * Top scores menu
 */
class topScoresMenu extends backgroundScene {
    constructor() {
        super({ key: 'topScoresMenu' });
    }

    create() {
        super.create();

        var boundFunction = (function (json) {
            this.showScores(json);
        }).bind(this);

        this.getScores((json) => this.showScores(json));

        new button(this, 512, 500, 'buttonBg', 'buttonBgHover', 'Back', function () {
            this.scene.start('mainMenuScene');
        }.bind(this));
    }

    getScores(callback) {
        fetch('top_scores/' + SCORES_COUNT).then(function (response) {
            return response.json();
        }).then(function (json) {
            callback(json);
        });
    }

    showScores(json) {
        let xTextStart = 50;
        json.forEach(scoreJson => {
            let str = scoreJson.name + ': ' + scoreJson.score;
            this.text = this.add.text(450, xTextStart, str,
                {
                    fontFamily: 'gameFont',
                    fontSize: 20,
                    color: '#ffff66',
                });
            xTextStart += 40;
        });
    }
}
