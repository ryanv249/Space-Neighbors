export default class Background extends Phaser.GameObjects.Image {
    constructor(scene) {
      super(
        scene,
        scene.cameras.main.width / 2,
        scene.cameras.main.height / 2 - 100,
        'background'
      );

      scene.add.existing(this);
    }
  }