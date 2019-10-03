/**
 * Fruit class
 */
class fruitObj extends baseObj {
    constructor(scene, player, x, y, texture) {
        super(scene, player, x, y, texture);

        this.sliceSound = this.scene.sound.add('sliceSound',
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            });

        this.fruitLostSound = this.scene.sound.add('fruitLostSound',
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
        let speed = Phaser.Math.RND.integerInRange(100, 150);
        let angleSpeed = Phaser.Math.RND.integerInRange(60, 360);
        let xDist = 20;
        let initialAngleDiff = 20;

        for (let i = 0; i < 2; ++i) {
            let slicedPart = new Phaser.Physics.Arcade.Sprite(this.scene,
                this.x + xDist,
                this.y,
                this.texture.key + FRUIT_CUT_SUFFIX);

            slicedPart.scaleX = this.scaleX;
            slicedPart.scaleY = this.scaleY;

            this.scene.add.existing(slicedPart);
            this.scene.physics.add.existing(slicedPart);
            this.setCollideWorldBounds(false);

            slicedPart.setVelocity(speed, 0);
            slicedPart.setAngularVelocity(angleSpeed);

            slicedPart.angle = this.angle + initialAngleDiff;

            speed = -speed;
            angleSpeed = -angleSpeed;
            xDist = -xDist;
            initialAngleDiff = -initialAngleDiff;
        }

        this.player.score += 1;
        this.scene.updateTexts();
        this.visible = false;
        this.sliceSound.play();

        // don't destroy object here to prevent internal phaser state from exception
    }

    preUpdate() {
        if (!this.visible) {
            this.destroy();
        }
        else if (this.y > 700) {
            if (this.player.lives > 0) {
                --this.player.lives;

                this.scene.updateTexts();
                this.fruitLostSound.play();
                if (this.player.lives <= 0) {
                    this.scene.playerLost();
                }
            }
            this.destroy();
        }
    }
}