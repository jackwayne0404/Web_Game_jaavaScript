/**
 * base class for all scenes which have a background
 */
class backgroundScene extends Phaser.Scene {
    constructor(sceneParams) {
      super(sceneParams);
    }
  
    /**
     * callback on scene creation. Creates a background
     */
    create() {
        let background = this.add.image(0, 0, 'background');
        background.displayOriginX = 0;
        background.displayOriginY = 0;
        background.displayWidth = this.sys.canvas.width;
        background.displayHeight = this.sys.canvas.height;
    }
  }
  