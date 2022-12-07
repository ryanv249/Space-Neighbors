import { venus_lg } from "../../assets";
import { 
    TextButton, Background, TitleText, TextBox, StarCard
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

        
        let b = new StarCard(this, 600, 600, 'earth_sm', 'Earth');
        new StarCard(this, 300, 400, 'jupiter_sm', 'Jupiter');
        new StarCard(this, 500, 600, 'mars_sm', 'Mars');
        new StarCard(this, 400, 500, 'venus_sm', 'Venus');
        new StarCard(this, 200, 300, 'uranus_sm', 'Uranus');
        new StarCard(this, 400, 300, 'saturn_sm', 'Saturn');
        new StarCard(this, 600, 100, 'mercury_sm', 'Mercury');
        new StarCard(this, 600, 200, 'neptune_sm', 'Neptune');

        // all images scaled to about the same size w/ these factors
        // let g = this.add.image(400,300, 'system');
        // this.add.image(100,100, 'earth_lg').setScale(0.35);
        // this.add.image(200,300, 'jupiter_lg').setScale(0.5);
        // this.add.image(300,500, 'mars_lg').setScale(0.5);
        // this.add.image(400,300, 'mercury_lg').setScale(0.32);
        // this.add.image(400,300, 'neptune_lg').setScale(0.25);
        // var u = this.add.image(0,0, 'uranus_lg').setScale(0.2).setOrigin(0.5);
        // var v = this.add.image(0,0, 'venus_lg').setScale(0.5).setOrigin(0.5);

        // var cont = this.add.container(400,300, [u,v]);
        // cont.setSize(v.displayWidth, v.displayHeight);
        // cont.setInteractive();
        // this.input.setDraggable(cont);
        

        let TB1 = new TextBox(this, 500, 400, 600, 'main_font_w', 23, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sollicitudin massa vel eleifend. Cras porttitor dolor mauris, nec bibendum nunc congue eleifend. Pellentesque molestie tempus mauris, elementum scelerisque urna. Aenean ipsum ante, faucibus at massa a, euismod ultricies erat. Etiam eu semper mauris. Proin tempus mollis nisl, sed convallis sem. Aenean et dictum sapien. Proin posuere lacus et magna porta lobortis. Nulla pellentesque viverra dictum. Sed ullamcorper quam sit amet feugiat placerat.');
        TB1.container.setInteractive();
        console.log(TB1);
        this.input.setDraggable(TB1.container);

        b.enableInteration(true);
        // b.container.setInteractive();
        // this.input.setDraggable(b.container);
        // var cont = this.add.container(0,0, [TB1.box, TB1.text]);
        // cont.setSize(TB1.box.width, TB1.box.height);
        // Phaser.Display.Align.In.Center(TB1.box, cont);
        // cont.setInteractive();

        // cont.on('pointerover', () => {
        //     console.log('on');
        // }, this);

        // cont.on('pointerout', () => {
        //     console.log('off');
        // }, this);


        // g.setInteractive();
        // g.on('pointerover', () => {
        //     TB1.box.setVisible(false);
        //     TB1.text.setVisible(false);
        // }, this);

        

        this.input.on('dragstart', function (pointer, gameObject, dragX, dragY){


        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY){
            gameObject.setX(dragX);
            gameObject.setY(dragY);
        }, this);

        this.input.on('dragend', function (pointer, gameObject, dragX, dragY){


        }, this);

        // g.on('pointerout', () => {
        //     TB1.box.setVisible(true);
        //     TB1.text.setVisible(true);
        // }, this);
        
        /*
        level ideas:
            begin with picture of planet, 


        */

    }

    update(){

    }
}