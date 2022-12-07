export default class TitleText extends Phaser.GameObjects.BitmapText {
    constructor(scene, offset, label, size) {
      super(
        scene,
        scene.cameras.main.width / 2,
        scene.cameras.main.height / 2 - offset,
        'title_font_c',
        label,
        size
      );
      scene.add.existing(this);
      this.setOrigin(0.5);
    }
  }