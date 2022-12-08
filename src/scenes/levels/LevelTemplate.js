import { 
    TextButton, Background, TitleText, TextBox, StarCard, DropQuestion, PickOneQuestion, PlanetDescription, Notebook
 } from "../../components";

export default class TestLevel extends Phaser.Scene{
    constructor(){
        super({key: 'TestLevel'});
    }

    preload(){
        // get screen bounds
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        // get current score 
        this.score = this.registry.get('score');
    }

    create(){
        this.scene.launch('ScoreDisplay', [100, 100]).bringToTop('ScoreDisplay');
        new Background(this);
        new TitleText(this, 280,  'Level 0: The Void', 70);

        const q1 = new DropQuestion(this, 300, 300, 3, 'hello there. this is a real question. answer well!', ['Earth', 'Saturn', 'Venus']);
        q1.enable('q1');

        const q2 = new DropQuestion(this, 700, 300, 4, 'hey hey hey hey question 2!!!!', ['Uranus', 'Mars', 'Mercury', 'Neptune']);
        q2.enable('q2');

        // const q3 = new DropQuestion(this, 900, 300, 1, 'hwoifehowfeiuewheuihiewkf !!!!', ['Jupiter']);
        // q3.enable('q3');



        // q1.zone.on('pointerover', () => {
        //     console.log('on');
        // }, this);

        // q1.zone.on('pointerout', () => {
        //     console.log('off');
        // }, this);

        let er = new StarCard(this, 600, 600, 'earth_sm', 'Earth');
        let jp =new StarCard(this, 800, 600, 'jupiter_sm', 'Jupiter');
        let mr =new StarCard(this, 700, 600, 'mars_sm', 'Mars');
        let vn =new StarCard(this, 600, 600, 'venus_sm', 'Venus');
        let ur =new StarCard(this, 500, 600, 'uranus_sm', 'Uranus');
        let sn =new StarCard(this, 400, 600, 'saturn_sm', 'Saturn');
        let my =new StarCard(this, 300, 600, 'mercury_sm', 'Mercury');
        let np =new StarCard(this, 200, 600, 'neptune_sm', 'Neptune');

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
        

        let TB1 = new TextBox(this, 500, 400, 600, 'main_font_w', 19, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sollicitudin massa vel eleifend. Cras porttitor dolor mauris, nec bibendum nunc congue eleifend. Pellentesque molestie tempus mauris, elementum scelerisque urna. Aenean ipsum ante, faucibus at massa a, euismod ultricies erat. Etiam eu semper mauris. Proin tempus mollis nisl, sed convallis sem. Aenean et dictum sapien. Proin posuere lacus et magna porta lobortis. Nulla pellentesque viverra dictum. Sed ullamcorper quam sit amet feugiat placerat.');
        TB1.container.setInteractive();
        console.log(TB1);
        // this.input.setDraggable(TB1.container);

        er.enable(true, () => {});
        jp.enable(true, () => {});
        mr.enable(true, () => {});
        vn.enable(true, () => {});
        ur.enable(true, () => {});
        sn.enable(true, () => {});
        my.enable(true, () => {});
        np.enable(true, () => {});

        TB1.container.on('wheel', function(pointer, deltaX, deltaY, deltaZ){
            TB1.container.setY(TB1.container.y + deltaY *0.3);
        }, this);



        // let P1 = new PickOneQuestion(this, 600, 300, 300, 21, 1, 22, 22,
        //      'Who is my mommy! I want to know! Really badlu!', 
        //      ['Earth', 'Venus', 'Mars or your mother. I dont know nor do i care', 'Jupiter'],
        //       'Earth');

        // P1.enable();

        // let P2 = new PickOneQuestion(this, 300, 300, 300, 21, 0, 22, 22,
        //     'BRUH who let you in here!123213 This is ridiculous',
        //      ['Earth', 'Venus', 'Mars', 'Jupiter'],
        //       'Earth');
        // P2.enable();

        TB1.container.on('pointerdown', () =>{
            q1.checkResults();
            q2.checkResults();
        //     q3.checkResults();
            // P1.checkResults();
            // P2.checkResults();
            // this.score++;
            // this.registry.set('score', this.score);
            
        }, this);

        // this.add.image(200,200,'earth_lg');
        let pd1 = new PlanetDescription(this, [300, 200], [400, 500], 'earth_lg', 'This is the description for earth. Blah Blah Blah. ifhfhwhwfoeh wefbuiewfhhofwe qwifhwoihwof!!!!');

        pd1.display();
        pd1.defineInteractive();

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