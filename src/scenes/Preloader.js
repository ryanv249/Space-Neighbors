import {logo} from '../assets';

export default class Preloader extends Phaser.Scene {
    constructor() {
      super({ key: 'Preloader' });
    }
  
    preload() {
      this.load.image('phaser-logo', logo);
    }
  
    create() {
      this.scene.start('MainScene');
    }
}