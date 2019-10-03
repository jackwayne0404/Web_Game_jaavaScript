/**
 * class for UI button
 */
class button extends Phaser.GameObjects.Container {
  /**
   * 
   * @param {Phaser.Scene} scene 
   * @param {int} x 
   * @param {int} y 
   * @param {string} textureNormal - normal texture
   * @param {string} textureHover - texture when button pressing or mouse hover over button
   * @param {string} text  
   * @param {function} funcOnPress callback function on button press 
   */
  constructor(scene, x, y, textureNormal, textureHover, text, funcOnPress) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.textureNormal = textureNormal;
    this.textureHover = textureHover;

    this.depth = 1;
    this.button = this.scene.add.sprite(0, 0, textureNormal).setInteractive();
    this.button.depth = 2;
    this.add(this.button);

    this.clickSound = this.scene.sound.add('buttonClickSound',
      {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      });

    if (text != null) {
      this.text = this.scene.add.text(0, 0, text,
        {
          fontFamily: 'gameFont',
          fontSize: 24,
          color: '#ff6600',
        });

      this.add(this.text);
      this.text.depth = 3;
      this.alignText();
    }
  
    this.onPress = funcOnPress;

    this.button.on('pointerdown', function () {
      this.onPress();
      this.clickSound.play();
    }.bind(this));

    this.button.on('pointerover', function () {
      this.button.setTexture(this.textureHover);
    }.bind(this));

    this.button.on('pointerout', function () {
      this.button.setTexture(this.textureNormal);
    }.bind(this));

    this.scene.add.existing(this);
  }

  alignText()
  {
    Phaser.Display.Align.In.Center(this.text, this.button);
  }
}