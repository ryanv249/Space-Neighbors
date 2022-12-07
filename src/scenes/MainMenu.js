import {TitleText, Background, TextButton} from "../components";

export default class MainMenu extends Phaser.Scene {
    constructor() {
      super({ key: 'MainMenu' });
    }

    preload(){
      // get bounds
      this.width = this.cameras.main.width;
      this.height = this.cameras.main.height;
    }
  
    create() {
      new Background(this);
      new TitleText(this);

      // create menu buttons
      const b1 = new TextButton(this, 0, 0, -1, -1, 0xff5500, 40, 'main_font_b', 'afiafsasfasfs\niausdhiuahias', 
      () => console.log('clicked1'),
      () => b1.background.setFillStyle(0xff9900),
      () => b1.background.setFillStyle(0xff5500));

      const b2 = new TextButton(this, 0, 0, -1, -1, 0xff5500, 90, 'main_font_b', 'button2', 
      () => console.log('clicked2'),
      () => b2.background.setFillStyle(0xff9900),
      () => b2.background.setFillStyle(0xff5500));


      // arrange buttons on screen
      let menu = this.add.rectangle(400, 300, 200, this.height, 0x00, 0);
      Phaser.Display.Align.In.Center(b1.background, menu);
      b1.Align(0,b2.offsetY*0.5);
      Phaser.Display.Align.To.BottomCenter(b2.background, b1.background, 0, 40);
      b2.Align();

    }

    update(){

    }
}