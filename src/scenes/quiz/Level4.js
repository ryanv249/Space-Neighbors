import { Background, DropQuestion, InfoScreen, LevelComplete, makeCard, Notebook, PickOneQuestion, TextButton, TitleText } from "../../components";

export default class Level4 extends Phaser.Scene{
    constructor(){
        super({key: 'Level4'});
    }

    preload(){
        // get screen bounds 
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        // checkResults() methods handle score changes automatically and need to store a reference they can access
        this.score = this.registry.get('score');

        // 0 when all questions answered correctly -> display LevelComplete
        this.questionsRemaining = 0;
    }

    create(){
        // create actual background and level title text 
        new Background(this);
        new TitleText(this, 280, 'Level 4', 100);

        // these questions will be displayed once the InfoScreen is hidden.
        let p1 = new PickOneQuestion(this, 250, 350, 300, 0, 1, 26, 21, 
            'Why is Mercury so hot but also so cold?', 
            [
            'Because night lasts for 88 days', 
            'Because it is very small so heat disapates very quickly', 
            'Because it doesn\'t have an atmosphere to trap heat',
            'Because it has an angle of rotation of 0 degrees'
            ], 
            'Because it doesn\'t have an atmosphere to trap heat'
            );
        p1.enable();
        this.questionsRemaining++;

        let p2 = new PickOneQuestion(this, 600, 350, 300, 0, 1, 26, 23, 
            'Why does Mars have taller mountains than Earth?',
            [            
            'Because it is more dense', 
            'Because its crust is thicker', 
            'Because they got pushed out by asteroid impacts',
            ], 
            'Because its crust is thicker'
            );
        p2.enable();
        this.questionsRemaining++;

        let p3 = new PickOneQuestion(this, 950, 350, 300, 0, 1, 26, 23, 
            'Why is Venus orange?', 
            [
            'Because it has a super dense atmosphere', 
            'Because its atmosphere is full of clouds', 
            'Because it is so hot that it is glowing',
            'Because of the chemicals in the atmosphere'
            ], 
            'Because its atmosphere is full of clouds'
            );
        p3.enable();
        this.questionsRemaining++;

        // create starcards for drop questions 
        let c1 = makeCard(this, 163, 560, 'Mercury');
        c1.enable(true, () => {});
        let c2 = makeCard(this, 288, 560, 'Venus');
        c2.enable(true, () => {});
        let c3 = makeCard(this, 413, 560, 'Earth');
        c3.enable(true, () => {});
        let c4 = makeCard(this, 538, 560, 'Mars');
        c4.enable(true, () => {});

        let c5 = makeCard(this, 662, 560, 'Jupiter');
        c5.enable(true, () => {});
        let c6 = makeCard(this, 787, 560, 'Saturn');
        c6.enable(true, () => {});
        let c7 = makeCard(this, 912, 560, 'Uranus');
        c7.enable(true, () => {});
        let c8 = makeCard(this, 1033, 560, 'Neptune');
        c8.enable(true, () => {});
        

        let checker = new TextButton(this, 600, 660, -1, 400, 80, 0x00, 1, 40, 'GBD_w', 'CHECK ANSWERS');
        checker.align();
        checker.enable(
            () => {
                if(p1.checkResults()) this.questionsRemaining--;
                if(p2.checkResults()) this.questionsRemaining--;
                if(p3.checkResults()) this.questionsRemaining--;
            },
            () => checker.text.setFont('GBD_c'),
            () => checker.text.setFont('GBD_w')
            );

        // display notebook (displayed with questions )
        let notes = new Notebook(this, [this.width, this.height], ['Earth', 'Saturn', 'Neptune', 'Uranus', 'Mars', 'Venus', 'Mercury', 'Jupiter']);
        notes.enable();

    }

    update(){
        if(this.questionsRemaining === 0){
            // game over. display level complete screen 
            new LevelComplete(this, 'Level5');
            // only get in here once
            this.questionsRemaining--;
        }
    }

}