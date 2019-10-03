class bombObj extends baseObj {
    constructor(scene, player, x, y, texture) {
        super(scene, player, x, y, texture);

        this.explosionSound = this.scene.sound.add('explosionSound',
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            });
    }

    slice() {
        --this.player.lives;
        this.scene.updateTexts();
        this.visible = false;

        if (this.player.lives <= 0) {
            this.scene.playerLost();
        }

        this.explosionSound.play();
        // don't destroy object here to prevent internal phaser state from exception
    }

    preUpdate() {
        if (!this.visible) {
            this.destroy();
        }
        else if (this.y > 700) {
            if (this.player.lives > 0) {
                ++this.player.score;
                this.scene.updateTexts();
                this.destroy();
            }
        }
    }
}