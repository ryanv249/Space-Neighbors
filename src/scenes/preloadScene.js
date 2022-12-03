import {logo} from '../assets/index';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
      super({ key: 'PreloadScene' });
    }
  
    preload() {
      this.load.image('phaser-logo', logo);
    }
  
    create() {
      this.scene.start('MainScene');
    }
}