import {TitleText, Background, TextButton} from "../components";

export default class MainMenu extends Phaser.Scene {
    constructor() {
      super({ key: 'MainMenu' });
    }

    preload(){
      // get screen bounds
      this.width = this.cameras.main.width;
      this.height = this.cameras.main.height;
    }
  
    create() {
      new Background(this);
      new TitleText(this, 150, 'StarCards', 128);

      // create menu buttons
      const b1 = new TextButton(this, 0, 0, -1, -1, 0x8D4DE2, 80, 'title_font_b', 'Learn', 
      () => this.scene.start('TestLevel'),
      () => b1.background.setFillStyle(0x409BE5),
      () => b1.background.setFillStyle(0x8D4DE2));

      const b2 = new TextButton(this, 0, 0, -1, -1, 0x8D4DE2, 80, 'title_font_b', 'Arcade', 
      () => console.log('clicked2'),
      () => b2.background.setFillStyle(0x409BE5),
      () => b2.background.setFillStyle(0x8D4DE2));


      // arrange buttons on screen
      let menu = this.add.rectangle(400, 300, 200, this.cameras.main.height, 0x00, 0);
      Phaser.Display.Align.In.Center(b1.background, menu);
      b1.Align(0, b1.offsetY*0.5);
      Phaser.Display.Align.To.BottomCenter(b2.background, b1.background, 0, 40);
      b2.Align(0, b1.offsetY*0.7);

    }
}