/**
 * Constant parameters for phaser
 */
const phaserConfig = {
    type: Phaser.AUTO,
    
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1024,
        height: 600
    },
    backgroundColor: '#FF0000',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 700 }
        }
    },
    scene: [loadingScene,
        mainMenuScene,
        optionsMenu,
        topScoresMenu,
        singlePlayerScene,
        twoPlayersScene]
}

/**
 * constant configuration of the game
 */
const gameConfig =
{
    /**
     * Diffficulty parameters of a game
     */
    difficultyParams:
    {
        Easy:
        {
            minFruits: 1,
            maxFruits: 1,
            fruitGenerationPeriod: 700,
            bombGenerationPeriod: 3337,
            scale: 1
        },
        Normal:
        {
            minFruits: 1,
            maxFruits: 1,
            fruitGenerationPeriod: 600,
            bombGenerationPeriod: 3133,
            scale: 0.85
        },
        Hard:
        {
            minFruits: 1,
            maxFruits: 2,
            fruitGenerationPeriod: 580,
            bombGenerationPeriod: 2833,
            scale: 0.72
        },
        Hardcore:
        {
            minFruits: 1,
            maxFruits: 2,
            fruitGenerationPeriod: 550,
            bombGenerationPeriod: 2571,
            scale: 0.65
        }
    },

    fruits: ['apple', 'pear', 'watermelon', 'peach', 'coconut', 'orange']
}

/**
 * Setting of a game, may be changed during the game
 */
var gameSettings = {
    difficulty: 'Normal',
    playerLivesCount: 3,
}

/**
 * Suffix to look up for the cutted fruit images
 */
const FRUIT_CUT_SUFFIX = '_cut';