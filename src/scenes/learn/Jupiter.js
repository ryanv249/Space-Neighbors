import { Background, DropQuestion, InfoScreen, LevelComplete, Notebook, PickOneQuestion, TextButton, TitleText, makeCard } from "../../components";

export default class JupiterLevel extends Phaser.Scene{
    constructor(){
        super({key: 'JupiterLevel'});
    }

    // this is learning level 5. 
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
        new TitleText(this, 280, 'Jupiter', 100);

        // these questions will be displayed once the InfoScreen is hidden.
        let p1 = new PickOneQuestion(this, 250, 350, 300, 0, 1, 26, 18, 
            'Why are the 4 gas giants known as Jovian planets?', 
            [
            'Because Jupiter is the most special gas giant', 
            'Because Jove is the most special gas giant', 
            'Because Jovian is another word for gas giant',
            'Because they were discovered by someone named Jove'
            ], 
            'Because Jupiter is the most special gas giant'
            );
        p1.enable();
        this.questionsRemaining++;

        let p2 = new PickOneQuestion(this, 600, 350, 300, 0, 1, 26, 19, 
            'What is the Great Red Spot?', 
            [
            'A 300 year old hurricane', 
            'A giant hole in Jupiter', 
            'A part of Jupiter\'s special liquid metallic hydrogen layer'
            ], 
            'A 300 year old hurricane'
            );
        p2.enable();
        this.questionsRemaining++;

        let p3 = new PickOneQuestion(this, 950, 350, 300, 1, 0, 28, 19, 
            'Which one of these planets is the hottest?', 
            [
            'Mercury', 
            'Jupiter', 
            'Mars'
            ], 
            'Mercury'
            );
        p3.enable();
        this.questionsRemaining++;

        // create starcards for drop questions 
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
        let notes = new Notebook(this, [this.width, this.height], ['Earth', 'Mars', 'Venus', 'Mercury', 'Jupiter']);
        notes.enable();

        // display planet info 
        new InfoScreen(this, 'Jupiter');
    }

    update(){
        if(this.questionsRemaining === 0){
            // game over. display level complete screen 
            new LevelComplete(this, 'SaturnLevel', 'PLANET COMPLETE', 'NEXT PLANET');
            // only get in here once
            this.questionsRemaining--;
        }
    }

}