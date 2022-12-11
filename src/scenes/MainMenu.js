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
      new TitleText(this, 250, 'Space Neighbors', 128);

      // decorate screen
      this.add.image(100, 400, 'mercury_lg').setScale(0.3);
      this.add.image(400, 400, 'venus_lg').setScale(0.3);
      this.add.image(750, 400, 'earth_lg').setScale(0.32);
      this.add.image(1100, 400, 'mars_lg').setScale(0.3);
      this.add.image(150, 600, 'jupiter_lg').setScale(0.3);
      this.add.image(450, 600, 'saturn_lg').setScale(0.2);
      this.add.image(700, 600, 'uranus_lg').setScale(0.3);
      this.add.image(1050, 600, 'neptune_lg').setScale(0.35);

      // create menu buttons
      const b1 = new TextButton(this, 0, 0, -1, -1, -1, 0x8D4DE2, 1, 80, 'GBD_b', 'Learn');
      b1.enable(
        () => this.scene.start('EarthLevel'),
        () => b1.background.setFillStyle(0x409BE5),
        () => b1.background.setFillStyle(0x8D4DE2)
        );

      const b2 = new TextButton(this, 0, 0, -1, -1, -1, 0x8D4DE2, 1, 80, 'GBD_b', 'Quiz');
      b2.enable( 
        () => this.scene.start('Level1'),
        () => b2.background.setFillStyle(0x409BE5),
        () => b2.background.setFillStyle(0x8D4DE2)
        );


      // arrange buttons on screen
      let menu = this.add.rectangle(0, this.height/2 - 200, this.width, 200, 0x00, 0).setOrigin(0);
      Phaser.Display.Align.In.LeftCenter(b1.background, menu, -200,0);
      b1.align(0, b1.offsetY*0.5);
      Phaser.Display.Align.In.RightCenter(b2.background, menu, -250,0);
      b2.align(0, b1.offsetY*0.7);

    }
}