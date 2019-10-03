/**
 * Main menu scene
 */
class mainMenuScene extends backgroundScene {
  constructor() {
    super({ key: 'mainMenuScene' });
  }

  create() {
    super.create();

    new button(this, 512, 200, 'buttonBg', 'buttonBgHover', '1 Player', function () {
      this.scene.start('singlePlayerScene');
    }.bind(this));

    new button(this, 512, 300, 'buttonBg', 'buttonBgHover', '2 Players', function () {
      this.scene.start('twoPlayersScene');
    }.bind(this));

    new button(this, 512, 400, 'buttonBg', 'buttonBgHover', 'Options', function () {
      this.scene.start('optionsMenu');
    }.bind(this));

    new button(this, 512, 500, 'buttonBg', 'buttonBgHover', 'Top Scores', function () {
      this.scene.start('topScoresMenu');
    }.bind(this));

    if (this.sys.game.device.fullscreen.available) {
      new button(this, 754, 200, 'fullscreenBut', 'fullscreenButHover', null, function () {
        this.scene.systems.scale.toggleFullscreen();
      }.bind(this));
    }
  }
}
