/**
 * Single player scene
 */
class singlePlayerScene extends gameplayBaseScene {
    constructor() {
        super({ key: 'singlePlayerScene' });
    }

    create() {
        super.create();
        this.input.pointer1.effect = this.createPointerMoveEffect();
        this.input.mousePointer.effect = this.input.pointer1.effect;
    }

    initializeGameplay() {
       super.initializeGameplay();

        this.playerOne = this.createPlayer('player1Name');
        this.playerOneSpawner = new spawner(spawnerConfigDefault);
        this.input.activePointers = 1;
    }

    initializeUi() {
        super.initializeUi();

        this.playerOneLivesText = this.add.text(100, 50, 'lives: ' + this.playerOne.lives.toString(), {
            fontFamily: 'gameFont',
            fontSize: 36,
            color: '#FFD700',
            fontStyle: 'bold'
        });

        this.playerOneScoreText = this.add.text(400, 50, 'Score: ' + this.playerOne.score.toString(), {
            fontFamily: 'gameFont',
            fontSize: 36,
            color: '#FFD700',
            fontStyle: 'bold'
        });
    }

    onSpawnFruitTimer() {
        let config = gameConfig.difficultyParams[gameSettings.difficulty];
        let count = Phaser.Math.RND.integerInRange(config.minFruits, config.maxFruits);
        for (let i = 0; i < count; ++i) {
            this.playerOneSpawner.spawnFruit(this, this.playerOne);
        }
    }

    onSpawnBombTimer() {
        this.playerOneSpawner.spawnBomb(this, this.playerOne);
    }

    gameOver() {
        this.sendScore(this.playerOne);
        super.gameOver();
    }

    playerLost() {
        if ( this.playerOne.lives <= 0 )
        {
            this.gameOver();
        }
    }

    exit() {
        if (this.gameInProgress)
        {
            this.sendScore(this.playerOne);
        }
        super.exit();
    }

    updateTexts() {
        this.playerOneLivesText.text = 'Lives: ' + this.playerOne.lives.toString();
        this.playerOneScoreText.text = 'Score: ' + this.playerOne.score.toString();
    }
}
