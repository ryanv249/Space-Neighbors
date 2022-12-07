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
        new TitleText(this, 230,  'Level 0: The Void', 70);
    }

    update(){

    }
}