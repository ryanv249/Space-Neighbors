import{
  background, notebook,
  PC_png_blk, PC_png_wte, PC_png_cyn, PC_xml,
  GBD_png_blk, GBD_png_wte, GBD_png_cyn, GBD_xml,
  system, mercury_lg, venus_lg, earth_lg, mars_lg, jupiter_lg, saturn_lg, uranus_lg, neptune_lg,
  mercury_sm, venus_sm, earth_sm, mars_sm, jupiter_sm, saturn_sm, uranus_sm, neptune_sm
} from '../assets';


export default class Preloader extends Phaser.Scene {
    constructor() {
      super({ key: 'Preloader' });
    }
  
    preload() {
      this.load.image('background', background);
      this.load.image('notebook', notebook);

      this.load.image('system', system);
      this.load.image('mercury_lg', mercury_lg);
      this.load.image('venus_lg', venus_lg);
      this.load.image('earth_lg', earth_lg);
      this.load.image('mars_lg', mars_lg);
      this.load.image('jupiter_lg', jupiter_lg);
      this.load.image('saturn_lg', saturn_lg);
      this.load.image('uranus_lg', uranus_lg);
      this.load.image('neptune_lg', neptune_lg);

      this.load.image('mercury_sm', mercury_sm);
      this.load.image('venus_sm', venus_sm);
      this.load.image('earth_sm', earth_sm);
      this.load.image('mars_sm', mars_sm);
      this.load.image('jupiter_sm', jupiter_sm);
      this.load.image('saturn_sm', saturn_sm);
      this.load.image('uranus_sm', uranus_sm);
      this.load.image('neptune_sm', neptune_sm);

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