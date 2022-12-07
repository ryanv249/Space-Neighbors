import { 
    TextButton, Background, TitleText
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

        this.add.image(400,300,'system');
        this.add.image(100,100, 'earth_lg').setScale(0.35);
        this.add.image(200,300, 'jupiter_lg').setScale(0.5);
        this.add.image(300,500, 'mars_lg').setScale(0.5);
        // this.add.image(400,300, 'mercury_lg').setScale(0.32);
        // this.add.image(400,300, 'neptune_lg').setScale(0.25);
        // this.add.image(400,300, 'uranus_lg').setScale(0.2);
        // this.add.image(400,300, 'venus_lg').setScale(0.5);

        /*
        level ideas:
            begin with picture of planet, 


        */

    }

    update(){

    }
}