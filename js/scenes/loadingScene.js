/**
 * Loading scene. 
 * Loads all game resources and start main menu scene
 */
class loadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'loadingScene' });
    }

    /**
     * Loads all required game resources
     */
    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('glow', 'assets/images/glow.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.image('pauseButton', 'assets/images/pause_button.png');
        this.load.image('pauseButtonHover', 'assets/images/pause_button_hover.png');
        this.load.image('buttonBg', 'assets/images/button_bg.png');
        this.load.image('buttonBgHover', 'assets/images/button_bg_hover.png');

        this.load.image('fullscreenBut', 'assets/images/fullscreen_but.png');
        this.load.image('fullscreenButHover', 'assets/images/fullscreen_but_hover.png');

        this.load.image('border', 'assets/images/border.png');

        gameConfig.fruits.forEach(fruit => {
            this.load.image(fruit, 'assets/images/fruits/' + fruit + '.png');
            this.load.image(fruit + FRUIT_CUT_SUFFIX, 'assets/images/fruits/' + fruit + FRUIT_CUT_SUFFIX + '.png');
        });

        this.load.audio('music', 'assets/audio/music.ogg');
        this.load.audio('sliceSound', 'assets/audio/slice.ogg');
        this.load.audio('explosionSound', 'assets/audio/explosion.ogg');
        this.load.audio('fruitLostSound', 'assets/audio/fruitLost.ogg');
        this.load.audio('buttonClickSound', 'assets/audio/buttonClick.ogg');
    }

    /** create scene callback */
    create() {
        this.scene.start('mainMenuScene');

        this.input.addPointer(1);

        game.sound.context.resume();
        let music = this.sound.add('music',
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            });

        music.play();
    }
}