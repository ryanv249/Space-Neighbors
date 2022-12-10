import { 
    TextButton, Background, TitleText, TextBox, StarCard, DropQuestion, PickOneQuestion, PlanetDescription, Notebook, makeDescription
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
        // this.scene.launch('ScoreDisplay', [90, 70]).bringToTop('ScoreDisplay');
        new Background(this);
        new TitleText(this, 280,  'Level 0: The Void', 70);

        const q1 = new DropQuestion(this, 300, 300, 3, 'hello there. this is a real question. answer well!', ['Earth', 'Saturn', 'Venus']);
        q1.enable('q1');

        // const q2 = new DropQuestion(this, 700, 300, 4, 'hey hey hey hey question 2!!!!', ['Uranus', 'Mars', 'Mercury', 'Neptune']);
        // q2.enable('q2');

        // const q3 = new DropQuestion(this, 900, 300, 1, 'hwoifehowfeiuewheuihiewkf !!!!', ['Jupiter']);
        // q3.enable('q3');



        // q1.zone.on('pointerover', () => {
        //     console.log('on');
        // }, this);

        // q1.zone.on('pointerout', () => {
        //     console.log('off');
        // }, this);

        let er = new StarCard(this, 900, 600, 'earth_sm', 'Earth');
        let jp =new StarCard(this, 800, 600, 'jupiter_sm', 'Jupiter');
        let mr =new StarCard(this, 700, 600, 'mars_sm', 'Mars');
        let vn =new StarCard(this, 600, 600, 'venus_sm', 'Venus');
        let ur =new StarCard(this, 500, 600, 'uranus_sm', 'Uranus');
        let sn =new StarCard(this, 400, 600, 'saturn_sm', 'Saturn');
        let my =new StarCard(this, 300, 600, 'mercury_sm', 'Mercury');
        let np =new StarCard(this, 200, 600, 'neptune_sm', 'Neptune');

        // this is also the order of levels
        // this.add.image(1050, 70, 'notebook').setScale(0.5);
        // this.add.image(150,100, 'earth_lg').setScale(0.5);
        // this.add.image(150,350, 'mars_lg').setScale(0.5);
        // this.add.image(210,600, 'venus_lg').setScale(0.5);
        // this.add.image(470,600, 'mercury_lg').setScale(0.5);
        // this.add.image(650,600, 'jupiter_lg').setScale(0.5);
        // this.add.image(1050,600, 'saturn_lg').setScale(0.2);
        // this.add.image(1050,350, 'uranus_lg').setScale(0.5);
        // this.add.image(1050,120, 'neptune_lg').setScale(0.5);

        // this.add.rectangle(0, 0, this.width, this.height, 0x111111, 0.9).setOrigin(0).setInteractive();

        // this.add.image(600,70, 'cancel').setScale(0.6);

        // notebook entries
        // let pd0 = new PlanetDescription(this, 
        //     [150, 100], 'earth_lg', 0.5,
        //     [300, 40], 'Earth', 
        //     [300, 95], 'Life',
        //     [600, 160], 'This is the description for Earth. Blah Blah Blah. ifhfhwhwfoeh wefbuiewfhhofwe qwifhwoihwof!!!!');
        // pd0.display();
        // pd0.defineInteractive();

        // let pd1 = new PlanetDescription(this, 
        //     [150, 350], 'mars_lg', 0.5,
        //     [300, 40], 'Mars', 
        //     [300, 95], 'Old Water',
        //     [600, 160], 'This is the description for Mars. GUIVE ME YO BARDS oijegjoierjoieroij woitcher sing me a song :)');
        // pd1.display();
        // pd1.defineInteractive();

        // let pd2 = new PlanetDescription(this, 
        //     [210, 600], 'venus_lg', 0.5,
        //     [300, 40], 'Venus', 
        //     [300, 95], 'Hottest',
        //     [600, 160], 'This is the description for Venus. SHE IS OUR HOT SISTER. WOAH MOMAMAMAMAM ibusfeuife');
        // pd2.display();
        // pd2.defineInteractive();

        // let pd3 = new PlanetDescription(this, 
        //     [470, 600], 'mercury_lg', 0.5,
        //     [300, 40], 'Mercury', 
        //     [300, 95], 'Sun\'s Favorite',
        //     [600, 160], 'This is the description for Mercury. THE EXV IN MY BKJKNK bro get me outta here no cap bussin in my bus ');
        // pd3.display();
        // pd3.defineInteractive();

        // let pd4 = new PlanetDescription(this, 
        //     [730, 600], 'jupiter_lg', 0.5,
        //     [300, 40], 'Jupiter',
        //     [300, 95], 'Size',
        //     [600, 160], 'This is the description for Jupiter. Cells! At! Wprl! aADUHFIUH ,am i want some bread man yeikes jinkz scoobs');
        // pd4.display();
        // pd4.defineInteractive();
        
        // let pd5 = new PlanetDescription(this, 
        //     [1050, 620], 'saturn_lg', 0.2,
        //     [300, 40], 'Saturn', 
        //     [300, 95], 'Rings',
        //     [600, 160], 'This is the description for Saturn. ARUIWQURFIUWEGHIOWEGH AIUIWUA NADSHASBDSA S JAFSJASB !');
        // pd5.display();
        // pd5.defineInteractive();

        // let pd6 = new PlanetDescription(this, 
        //     [1050, 400], 'uranus_lg', 0.5,
        //     [300, 40], 'Uranus',
        //     [300, 95], 'IDKYET',
        //     [600, 160], 'This is the description for Uranus. aahasiudas je saod ams bruhhh wow he asiafk ofji[ewoeji[wfoij');
        // pd6.display();
        // pd6.defineInteractive();

        // let pd7 = new PlanetDescription(this, 
        //     [1050, 120], 'neptune_lg', 0.5,
        //     [300, 40], 'Neptune',
        //     [300, 95], 'BIGBLUE',
        //     [600, 160], 'This is the description for Neptune. BADL! BALD! BALD 10IERFWEOI efjoiewjf ruh burh b[sa');
        // pd7.display();
        // pd7.defineInteractive();


  


        let TB1 = new TextBox(this, 500, 400, 600, 'PC_w', 19, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sollicitudin massa vel eleifend. Cras porttitor dolor mauris, nec bibendum nunc congue eleifend. Pellentesque molestie tempus mauris, elementum scelerisque urna. Aenean ipsum ante, faucibus at massa a, euismod ultricies erat. Etiam eu semper mauris. Proin tempus mollis nisl, sed convallis sem. Aenean et dictum sapien. Proin posuere lacus et magna porta lobortis. Nulla pellentesque viverra dictum. Sed ullamcorper quam sit amet feugiat placerat.');
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

        // scuffed backbutton verified that registry doing its thing 
        // let back = new TextButton(this, 900, 400, -1, -1, -1, 0x00, 1, 40, 'PC_w', 'BACK');
        // back.enable(() => {this.scene.start('MainMenu')}, () => {}, () => {});




        let P1 = new PickOneQuestion(this, 600, 300, 300, 21, 1, 22, 22,
             'Who is my mommy! I want to know! Really badlu!', 
             ['Earth', 'Venus', 'Mars or your mother. I dont know nor do i care', 'Jupiter'],
              'Earth');

        P1.enable();

        let P2 = new PickOneQuestion(this, 300, 300, 300, 21, 0, 22, 22,
            'BRUH who let you in here!123213 This is ridiculous',
             ['Earth', 'Venus', 'Mars', 'Jupiter'],
              'Earth');
        P2.enable();

        // let mark = makeDescription(this, 'Earth', [100,200], [300,300], [400,400], [0,0]);
        // mark.defineInteractive();
        // mark.display();




        TB1.container.on('pointerdown', () =>{
            console.log(q1.checkResults());
            // q2.checkResults();
            // pd1.hide();
        //     q3.checkResults();
            console.log(P1.checkResults());
            console.log(P2.checkResults());
            // this.score++;
            // this.registry.set('score', this.score);
            
        }, this);

        TB1.container.on('wheel', function(pointer, deltaX, deltaY, deltaZ){
            TB1.container.setY(TB1.container.y + deltaY *0.3);
            // pd1.display();
        }, this);

        let nb = new Notebook(this, [this.width, this.height],
             ['Earth', 'Saturn', 'Neptune', 'Uranus', 'Mars', 'Venus', 'Mercury', 'Jupiter']);
        nb.enable();


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