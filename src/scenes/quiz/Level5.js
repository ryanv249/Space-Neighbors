import { Background, DropQuestion, InfoScreen, LevelComplete, makeCard, Notebook, PickOneQuestion, TextButton, TitleText } from "../../components";

export default class Level5 extends Phaser.Scene{
    constructor(){
        super({key: 'Level5'});
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
        new TitleText(this, 280, 'Level 5', 100);

        // these questions will be displayed once the InfoScreen is hidden.
        let p1 = new DropQuestion(this, 405, 350, 1,
            'Which planet has the largest moon relative to its size?', 22, 
            ['Earth']
            );
        p1.enable('p1');
        this.questionsRemaining++;

        let p2 = new DropQuestion(this, 805, 350, 2,
            'What are the largest and smallest planets?', 23,
            ['Jupiter', 'Mercury']
            );
        p2.enable('p2');
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
            new LevelComplete(this, 'MainMenu', 'QUIZ COMPLETE', 'MAIN MENU');
            // only get in here once
            this.questionsRemaining--;
        }
    }

}