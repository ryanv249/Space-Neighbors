export default class TitleText extends Phaser.GameObjects.BitmapText {
    constructor(scene) {
      super(
        scene,
        scene.cameras.main.width / 2,
        scene.cameras.main.height / 2 - 150,
        'title_font_c',
        'Star Cards',
        128
      );
      scene.add.existing(this);
      this.setOrigin(0.5);
    }
  }