import { Background, DropQuestion, InfoScreen, LevelComplete, makeCard, Notebook, PickOneQuestion, TextButton, TitleText } from "../../components";

export default class MercuryLevel extends Phaser.Scene{
    constructor(){
        super({key: 'MercuryLevel'});
    }

    // this is learning level 4. 
    preload(){
        // get screen bounds 
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        // checkResults() methods handle score changes automatically and need to store a reference they can access
        // score is not used for learning levels though. this is just so everything works properly (deadline!)
        this.score = 0;

        // 0 when all questions answered correctly -> display LevelComplete
        this.questionsRemaining = 0;
    }

    create(){
        // not using score, so no need to create scoreboard 

        // create actual background and level title text 
        new Background(this);
        new TitleText(this, 280, 'Mercury', 100);

        // these questions will be displayed once the InfoScreen is hidden.
        let p1 = new PickOneQuestion(this, 225, 350, 300, 0, 1, 26, 19, 
            'What is the Caloris Basin?', 
            [
            'The asteroid which struck Mercury', 
            'A special spot on Mercury where there is never sunlight', 
            'The hole left by the asteroid which hit Mercury',
            'The cracks and wrinkles caused by the asteroid impact'
            ], 
            'The hole left by the asteroid which hit Mercury'
            );
        p1.enable();
        this.questionsRemaining++;

        let p2 = new DropQuestion(this, 575, 350, 2,
            'What are the two smallest planets?', 22, 
            ['Mars', 'Mercury']
            );
        p2.enable('p2');
        this.questionsRemaining++;

        let p3 = new DropQuestion(this, 950, 350, 2,
            'What are the two sister planets?', 23,
            ['Earth', 'Venus']
            );
        p3.enable('p3');
        this.questionsRemaining++;

        // create starcards for drop questions 
        let c1 = makeCard(this, 413, 560, 'Mercury');
        c1.enable(true, () => {});
        let c2 = makeCard(this, 538, 560, 'Venus');
        c2.enable(true, () => {});
        let c3 = makeCard(this, 662, 560, 'Earth');
        c3.enable(true, () => {});
        let c4 = makeCard(this, 787, 560, 'Mars');
        c4.enable(true, () => {});

        // let c1 = makeCard(this, 163, 560, 'Mercury');
        // c1.enable(true, () => {});
        // let c2 = makeCard(this, 288, 560, 'Venus');
        // c2.enable(true, () => {});
        // let c3 = makeCard(this, 413, 560, 'Earth');
        // c3.enable(true, () => {});
        // let c4 = makeCard(this, 538, 560, 'Mars');
        // c4.enable(true, () => {});

        // let c5 = makeCard(this, 662, 560, 'Jupiter');
        // c5.enable(true, () => {});
        // let c6 = makeCard(this, 787, 560, 'Saturn');
        // c6.enable(true, () => {});
        // let c7 = makeCard(this, 912, 560, 'Uranus');
        // c7.enable(true, () => {});
        // let c8 = makeCard(this, 1033, 560, 'Neptune');
        // c8.enable(true, () => {});
        

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
        let notes = new Notebook(this, [this.width, this.height], ['Earth', 'Mars', 'Venus', 'Mercury']);
        notes.enable();

        // display planet info 
        new InfoScreen(this, 'Mercury');
    }

    update(){
        if(this.questionsRemaining === 0){
            // game over. display level complete screen 
            new LevelComplete(this, 'JupiterLevel', 'PLANET COMPLETE', 'NEXT PLANET');
            // only get in here once
            this.questionsRemaining--;
        }
    }

}