/**
 * scene for 2 players
 */
class twoPlayersScene extends gameplayBaseScene {
    constructor() {
        super({ key: 'twoPlayersScene' });
    }

    create() {
        super.create();

        this.input.activePointers = 2;

        this.input.pointer1.effect = this.createPointerMoveEffect();
        this.input.pointer2.effect = this.createPointerMoveEffect();
        this.input.mousePointer.effect = this.input.pointer1.effect;
    }

    initializeGameplay() {
        super.initializeGameplay();
        this.playerOne = this.createPlayer('player1Name');
        this.playerTwo = this.createPlayer('player2Name');

        this.playerOneSpawner = new spawner(spawnerLeftDefaultConfig);
        this.playerTwoSpawner = new spawner(spawnerRightDefaultConfig);
    }

    initializeUi() {
        super.initializeUi();

        let border = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'border');
        border.displayWidth = 8;
        border.displayHeight = this.sys.canvas.height;

        this.playerOneLivesText = this.add.text(100, 50, 'lives: ' + this.playerOne.lives.toString(), {
            fontFamily: 'gameFont',
            fontSize: 24,
            color: '#FFD700',
            fontStyle: 'bold'
        });

        this.playerOneScoreText = this.add.text(100, 100, 'Score: ' + this.playerOne.score.toString(), {
            fontFamily: 'gameFont',
            fontSize: 24,
            color: '#FFD700',
            fontStyle: 'bold'
        });

        this.playerTwoLivesText = this.add.text(724, 50, 'lives: ' + this.playerTwo.lives.toString(), {
            fontFamily: 'gameFont',
            fontSize: 24,
            color: '#FFD700',
            fontStyle: 'bold'
        });

        this.playerTwoScoreText = this.add.text(724, 100, 'Score: ' + this.playerTwo.score.toString(), {
            fontFamily: 'gameFont',
            fontSize: 24,
            color: '#FFD700',
            fontStyle: 'bold'
        });
    }

    onSpawnFruitTimer() {
        let config = gameConfig.difficultyParams[gameSettings.difficulty];
        let count = Phaser.Math.RND.integerInRange(config.minFruits, config.maxFruits);
        for (let i = 0; i < count; ++i) {
            if (this.playerOne.lives > 0) {
                this.playerOneSpawner.spawnFruit(this, this.playerOne);
            }
            if (this.playerTwo.lives > 0) {
                this.playerTwoSpawner.spawnFruit(this, this.playerTwo);
            }
        }
    }

    onSpawnBombTimer() {
        if (this.playerOne.lives > 0) {
            this.playerOneSpawner.spawnBomb(this, this.playerOne);
        }
        if (this.playerTwo.lives > 0) {
            this.playerTwoSpawner.spawnBomb(this, this.playerTwo);
        }
    }

    gameOver() {
        this.sendScore(this.playerOne);
        this.sendScore(this.playerTwo);

        super.gameOver();
    }

    exit() {
        if (this.gameInProgress) {
            this.sendScore(this.playerOne);
            this.sendScore(this.playerTwo);
        }
        super.exit();
    }

    playerLost() {
        // We can't determine now which pointer should be removed, so keep both of them
        /*if (this.input.activePointers > 1) {
            this.input.activePointers = 1;
        } */
        if ((this.playerOne.lives <= 0) && (this.playerTwo.lives <= 0)) {
            this.gameOver();
        }
    }

    updateTexts() {
        this.playerOneLivesText.text = 'Lives: ' + this.playerOne.lives.toString();
        this.playerOneScoreText.text = 'Score: ' + this.playerOne.score.toString();
        this.playerTwoLivesText.text = 'Lives: ' + this.playerTwo.lives.toString();
        this.playerTwoScoreText.text = 'Score: ' + this.playerTwo.score.toString();
    }
}
