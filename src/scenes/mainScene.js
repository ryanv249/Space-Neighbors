import {PhaserText, PhaserLogo} from "../components/index"

export default class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
    }
  
    create() {
      new PhaserText(this);
      new PhaserLogo(this);
    }
}