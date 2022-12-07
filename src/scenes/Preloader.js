import{
  background, notebook,
  PC_png_blk, PC_png_wte, PC_png_cyn, PC_xml,
  GBD_png_blk, GBD_png_wte, GBD_png_cyn, GBD_xml,
  system, sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune,
} from '../assets';


export default class Preloader extends Phaser.Scene {
    constructor() {
      super({ key: 'Preloader' });
    }
  
    preload() {
      this.load.image('background', background);
      this.load.image('notebook', notebook);
      this.load.image('system', system);
      this.load.image('sun', sun);
      this.load.image('mercury', mercury);
      this.load.image('venus', venus);
      this.load.image('earth', earth);
      this.load.image('mars', mars);
      this.load.image('jupiter', jupiter);
      this.load.image('saturn', saturn);
      this.load.image('urnaus', uranus);
      this.load.image('neptune', neptune);

      this.load.bitmapFont('main_font_b', PC_png_blk, PC_xml);
      this.load.bitmapFont('main_font_w', PC_png_wte, PC_xml);
      this.load.bitmapFont('main_font_c', PC_png_cyn, PC_xml);

      this.load.bitmapFont('title_font_b', GBD_png_blk, GBD_xml);
      this.load.bitmapFont('title_font_w', GBD_png_wte, GBD_xml);
      this.load.bitmapFont('title_font_c', GBD_png_cyn, GBD_xml);
    }
  
    create() {
      this.scene.start('MainMenu');
    }
}