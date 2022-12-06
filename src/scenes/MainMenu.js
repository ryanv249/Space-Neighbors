import {TitleText, Background, Button} from "../components";

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
      const b = new Button(this, 0, 0, 0xff5500, 90, 'main_font_b', 'button1', 
      () => console.log('clicked'),
      () => console.log('over'),
      () => console.log('off'));

      // arrange buttons on screen
      let menu = this.add.rectangle(400, 300, 200, this.height, 0x00, 0);
      Phaser.Display.Align.In.Center(b.background, menu);
      b.Align();

    }

    update(){

    }
}