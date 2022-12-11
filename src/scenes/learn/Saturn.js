import { Background, DropQuestion, InfoScreen, LevelComplete, Notebook, PickOneQuestion, TextButton, TitleText, makeCard } from "../../components";

export default class SaturnLevel extends Phaser.Scene{
    constructor(){
        super({key: 'SaturnLevel'});
    }
 
    // this is learning level 6. 
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
        new TitleText(this, 280, 'Saturn', 100);

        // these questions will be displayed once the InfoScreen is hidden.
        let p1 = new PickOneQuestion(this, 250, 350, 300, 0, 1, 28, 20, 
            'Why is Saturn the most oblate planet?', 
            [
            'Because the gravity of its rings stretches it out', 
            'Because it has 12-hour days', 
            'Because it is spinning very fast',
            'Because it receives less energy from the Sun'
            ], 
            'Because it is spinning very fast'
            );
        p1.enable();
        this.questionsRemaining++;

        let p2 = new PickOneQuestion(this, 600, 350, 300, 0, 1, 26, 30, 
            'Saturn is the only planet with rings in the system.', 
            [
            'False', 
            'True'
            ], 
            'False'
            );
        p2.enable();
        this.questionsRemaining++;

        let p3 = new PickOneQuestion(this, 950, 350, 300, 1, 1, 30, 20, 
            'What is Titan?', 
            [
            'The largest moon in the system', 
            'A moon of Saturn', 
            'The name for Saturn\'s rings',
            'Another name for Saturn'
            ], 
            'A moon of Saturn'
            );
        p3.enable();
        this.questionsRemaining++;

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
        let notes = new Notebook(this, [this.width, this.height], ['Earth', 'Mars', 'Venus', 'Mercury', 'Jupiter', 'Saturn']);
        notes.enable();

        // display planet info 
        new InfoScreen(this, 'Saturn');
    }

    update(){
        if(this.questionsRemaining === 0){
            // game over. display level complete screen 
            new LevelComplete(this, 'UranusLevel', 'PLANET COMPLETE', 'NEXT PLANET');
            // only get in here once
            this.questionsRemaining--;
        }
    }

}