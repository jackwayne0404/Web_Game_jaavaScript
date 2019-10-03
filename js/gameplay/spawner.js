/**
 * default config for single player gameplay
 */
const spawnerConfigDefault =
{
    /**
     * X coordinate range of fruit/bomb spawn
     */
    rangeX:
    {
        start: 150,
        end: 824
    },

    /**
     * Velocity by X coordinate of fruit/bomb
     */
    xVelocity:
    {
        start: -120,
        end: 120
    },

    /**
     * Velocity by Y coordinate of fruit/bomb
     */
    yVelocity:
    {
        start: -920,
        end: -780
    },

    /**
     * Start Y coordinate of fruit or bomb
     */
    yStart: 700
}

/**
 * Left player default spawner configuration
 */
const spawnerLeftDefaultConfig =
{
    rangeX:
    {
        start: 150,
        end: 400
    },

    xVelocity:
    {
        start: -50,
        end: 50
    },

    yVelocity:
    {
        start: -920,
        end: -780
    },

    yStart: 700
}

/**
 * Right player default spawner configuration
 */
const spawnerRightDefaultConfig =
{
    rangeX:
    {
        start: 574,
        end: 824
    },

    xVelocity:
    {
        start: -50,
        end: 50
    },

    yVelocity:
    {
        start: -920,
        end: -780
    },

    yStart: 700
}

/**
 * spawner class, spawns fruits and bombs in gameplay scene
 */
class spawner {
    constructor(config) {
        this.config = config;
    }

    /**
     * spawns fruit
     * @param {Phaser.scene} scene 
     * @param {Player structure} player 
     */
    spawnFruit(scene, player) {
        name = gameConfig.fruits[Phaser.Math.RND.integerInRange(0, gameConfig.fruits.length - 1)];

        let xPosition = Phaser.Math.RND.integerInRange(this.config.rangeX.start, this.config.rangeX.end);
        let fruit = new fruitObj(scene, player, xPosition, this.config.yStart, name);
        
        this.setupPhysics(fruit);
        return fruit;
    }

    /**
     * spawns bomb
     * @param {Phaser.scene} scene 
     * @param {Player structure} player 
     */
    spawnBomb(scene, player) {
        let xPosition = Phaser.Math.RND.integerInRange(this.config.rangeX.start, this.config.rangeX.end);
        let bomb = new bombObj(scene, player, xPosition, this.config.yStart, 'bomb');

        this.setupPhysics(bomb);
        return bomb;
    }

    /**
     * fills physics parameters for current physics object(bomb/fruit)
     * @param {baseObj} physObj 
     */
    setupPhysics(physObj) {
        let xVelocity = Phaser.Math.RND.integerInRange(this.config.xVelocity.start, this.config.xVelocity.end);
        let yVelocity = Phaser.Math.RND.integerInRange(this.config.yVelocity.start, this.config.yVelocity.end);

        physObj.setVelocity(xVelocity, yVelocity);
        physObj.setAngularVelocity(Phaser.Math.RND.integerInRange(0, 360));
    }
}