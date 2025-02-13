export default class PhaserText extends Phaser.GameObjects.Text {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene) {
      super(
        scene,
        scene.cameras.main.width / 2,
        scene.cameras.main.height / 2 + 100,
        'First Phaser Game',
        { color: '#FFFFFF', fontSize: 52 }
      );
      scene.add.existing(this);
      this.setOrigin(0.5);
    }
  }