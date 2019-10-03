/**
 * base object class between fruit and bomb
 */
class baseObj extends Phaser.Physics.Arcade.Sprite {
    /**
     * Class constructor
     * @param {Phaser.Scene} scene 
     * @param {Player structure} player 
     * @param {int} x 
     * @param {int} y 
     * @param {string} texture 
     */
    constructor(scene, player, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(false);
        this.setInteractive();

        // This is known Phaser 3 bug
        https://github.com/photonstorm/phaser/blob/2690561eee47ad048d25e0fa291d78f875228c3f/src/input/InputPlugin.js#L595
        // we have to use pointermove on mobile device since pointerover does not support multitouch
        this.on('pointerover', function (pointer) {
            this.onObjectOver(pointer);
        }.bind(this));
        this.on('pointermove', function (pointer) {
            this.onObjectOver(pointer);
        }.bind(this));

        this.player = player;
        this.scaleX = gameConfig.difficultyParams[gameSettings.difficulty].scale;
        this.scaleY = gameConfig.difficultyParams[gameSettings.difficulty].scale;

        // Store wheither object is sliced or not to react on
        // multiple touches and events on a single object
        this.isSliced = false;
    }

    /**
     * callback function when user move pointer over the object
     * @param {Phaser.pointer} pointer 
     */
    onObjectOver(pointer) {
        if (!this.isSliced &&
             pointer.isDown && 
             !this.scene.paused&&
             this.player.lives > 0) {
            this.slice();
            this.isSliced = true;
        }
    }

    /**
     * virtual function, called when player slices object
     */
    slice() {
        // redefine method in derived classes
    }
}