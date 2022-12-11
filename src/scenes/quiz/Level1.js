import { Background, DropQuestion, InfoScreen, LevelComplete, makeCard, Notebook, PickOneQuestion, TextButton, TitleText } from "../../components";

export default class Level1 extends Phaser.Scene{
    constructor(){
        super({key: 'Level1'});
    }

    preload(){
        // get screen bounds 
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        // checkResults() methods handle score changes automatically and need to store a reference they can access
        this.score = 0;

        // 0 when all questions answered correctly -> display LevelComplete
        this.questionsRemaining = 0;
    }

    create(){
        // put up scoreboard (will stay up until end of quiz)
        this.scene.launch('ScoreDisplay', [90, 70]).bringToTop('ScoreDisplay');

        // create actual background and level title text 
        new Background(this);
        new TitleText(this, 280, 'Level 1', 100);

        // these questions will be displayed once the InfoScreen is hidden.
        let p1 = new DropQuestion(this, 200, 350, 4,
            'What are the Jovian Planets?', 22, 
            ['Jupiter', 'Uranus', 'Neptune', 'Saturn']
            );
        p1.enable('p1');
        this.questionsRemaining++;

        let p2 = new DropQuestion(this, 575, 350, 4,
            'What are the Terrestrial Planets?', 22, 
            ['Earth', 'Venus', 'Mars', 'Mercury']
            );
        p2.enable('p2');
        this.questionsRemaining++;

        let p3 = new PickOneQuestion(this, 975, 350, 300, 0, 1, 26, 30, 
            'Jupiter is around X times larger than Mercury.', 
            [
            'X = 11', 
            'X = 25', 
            'X = 33',
            'X = 10'
            ], 
            'X = 33'
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
            new LevelComplete(this, 'Level2');
            // only get in here once
            this.questionsRemaining--;
        }
    }

}