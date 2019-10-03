/**
 * base gameplay scene between single player and two players scene
 */
class gameplayBaseScene extends backgroundScene {
    constructor(sceneParams) {
      super(sceneParams);
    }
  
    create() {
        super.create();

        this.initializeGameplay();
        this.initializeUi();
        this.gameInProgress = true;
    }

    createPlayer(playerNameTextBox) {
        let player =
        {
            lives: gameSettings.playerLivesCount,
            score: 0,
            name: document.getElementsByName(playerNameTextBox)[0].value
        }

        if (player.name == '') {
            player.name = 'Unnamed';
        }

        return player;
    }

    /**
     * creates a particle effect following pointer, returns created effect
     */
    createPointerMoveEffect()
    {
        let effect = this.add.particles('glow').createEmitter({
            x: 400,
            y: 300,
            speed: { min: 0, max: 0 },
            angle: { min: 0, max: 180 },
            scale: { start: 1, end: 0, ease: 'Quart.easeOut' },
            alpha: { start: 1, end: 0, ease: 'Quart.easeOut' },
            blendMode: 'SCREEN',
            _frequency: 60,
            lifespan: 3000,
            active: true
        });

        effect.reserve(64);
        effect.stop();

        return effect;
    }

    /**
     * Initializes gameplay 
     */
    initializeGameplay() {
        this.spawnFruitTimer = this.time.addEvent({
            delay: gameConfig.difficultyParams[gameSettings.difficulty].fruitGenerationPeriod,
            loop: true,
            callbackScope: this,
            callback: this.onSpawnFruitTimer
        });

        this.spawnBombTimer = this.time.addEvent({
            delay: gameConfig.difficultyParams[gameSettings.difficulty].bombGenerationPeriod,
            loop: true,
            callbackScope: this,
            callback: this.onSpawnBombTimer
        });

        this.input.on('pointermove', this.onPointerMove, this);
        this.input.on('pointerup', this.onPointerUp, this);
        this.input.on('pointerdown', this.onPointerDown, this);

        this.paused = false;
    }

    /**
     * Initializes user interface
     */
    initializeUi() {
        this.pauseButton = new button(this, 950, 50, 'pauseButton', 'pauseButtonHover', null, function () {
            this.pause();
        }.bind(this));

        this.pauseButton.depth = 1;

        this.resumeButton = new button(this, 512, 200, 'buttonBg', 'buttonBgHover', 'Resume', function () {
            this.resume();
        }.bind(this));

        this.resumeButton.visible = false;

        this.restartButton = new button(this, 512, 300, 'buttonBg', 'buttonBgHover', 'Restart', function () {
            this.scene.restart();
        }.bind(this));

        this.restartButton.visible = false;

        this.exitButton = new button(this, 512, 400, 'buttonBg', 'buttonBgHover', 'Exit', function () {
            this.exit();
        }.bind(this));

        this.exitButton.visible = false;
    }

    /**
     * sends player score to database
     * @param {Player structure} player 
     */
    sendScore(player) {
        var payload = {
            name: player.name,
            score: player.score
        };

        fetch('add_score', {
            method: 'post',
            body: JSON.stringify(payload),
            headers: { 'Content-type': 'application/json' }
        })
    }

    /**
     * Callback function when user ups pointer
     * @param {Scene.pointer} pointer 
     */
    onPointerUp(pointer) {
        pointer.effect.stop();
    }

   /**
     * Callback function when user presses mouse or starts touch
     * @param {Scene.pointer} pointer 
     */
    onPointerDown(pointer) {
        pointer.effect.start();
    }

     /**
     * Callback function when user moves pointer
     * @param {Scene.pointer} pointer 
     */
    onPointerMove(pointer) {
        if (pointer.isDown && pointer.effect != null) {
            pointer.effect.setPosition(pointer.x, pointer.y);
        }
    }

    /**
     * virtual function, called each fruit timer tick
     */
    onSpawnFruitTimer() {
    }

     /**
     * virtual function, called each bomb timer tick
     */
    onSpawnBombTimer() {
    }

    /**
     * game over
     */
    gameOver() {
        this.physics.pause();
        this.paused = true;
        this.pauseButton.visible = false;
        this.exitButton.visible = true;
        this.restartButton.visible = true;
        this.gameInProgress = false;
    }

    /**
     * resumes game
     */
    resume() {
        this.physics.resume();
        this.paused = false;
        this.pauseButton.visible = true;
        this.exitButton.visible = false;
        this.restartButton.visible = false;
        this.resumeButton.visible = false;
        this.spawnFruitTimer.paused = false;
        this.spawnBombTimer.paused = false;
    }

    /** pauses game */
    pause() {
        this.physics.pause();
        this.paused = true;
        this.pauseButton.visible = false;
        this.exitButton.visible = true;
        this.restartButton.visible = true;
        this.resumeButton.visible = true;
        this.spawnFruitTimer.paused = true;
        this.spawnBombTimer.paused = true;
    }
    
    /** virtual method called on scene exit. Loads main menu scene */
    exit() {
        this.scene.start('mainMenuScene');
    }
  }
  