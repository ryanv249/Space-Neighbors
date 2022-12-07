import { 
    TextButton, Background, TitleText, TextBox
 } from "../../components";

export default class TestLevel extends Phaser.Scene{
    constructor(){
        super({key: 'TestLevel'});
    }

    preload(){
        // get screen bounds
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(){
        new Background(this);
        new TitleText(this, 280,  'Level 0: The Void', 70);

        
        
        // all images scaled to about the same size w/ these factors
        let g = this.add.image(400,300,'system');
        this.add.image(100,100, 'earth_lg').setScale(0.35);
        this.add.image(200,300, 'jupiter_lg').setScale(0.5);
        this.add.image(300,500, 'mars_lg').setScale(0.5);
        // this.add.image(400,300, 'mercury_lg').setScale(0.32);
        // this.add.image(400,300, 'neptune_lg').setScale(0.25);
        // this.add.image(400,300, 'uranus_lg').setScale(0.2);
        // this.add.image(400,300, 'venus_lg').setScale(0.5);

        let TB1 = new TextBox(this, 500, 300, 600, 'main_font_w', 23, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sollicitudin massa vel eleifend. Cras porttitor dolor mauris, nec bibendum nunc congue eleifend. Pellentesque molestie tempus mauris, elementum scelerisque urna. Aenean ipsum ante, faucibus at massa a, euismod ultricies erat. Etiam eu semper mauris. Proin tempus mollis nisl, sed convallis sem. Aenean et dictum sapien. Proin posuere lacus et magna porta lobortis. Nulla pellentesque viverra dictum. Sed ullamcorper quam sit amet feugiat placerat.');

        g.setInteractive();
        g.on('pointerover', () => {
            TB1.box.setVisible(false);
            TB1.text.setVisible(false);
        }, this);

        g.on('pointerout', () => {
            TB1.box.setVisible(true);
            TB1.text.setVisible(true);
        }, this);
        /*
        level ideas:
            begin with picture of planet, 


        */

    }

    update(){

    }
}