import { Background, DropQuestion, InfoScreen, LevelComplete, Notebook, PickOneQuestion, TextButton, TitleText } from "../../components";

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
        let p1 = new PickOneQuestion(this, 350, 350, 300, 240, 1, 30, 19, 
            'Why does Earth not have many craters?', 
            [
            'Because Plate Tectonics gets rid of them very fast', 
            'Because Earth never gets hit by anything', 
            'Because the Water Cycle washes them away', 
            'Because of both Plate Tectonics and the Water Cycle'
            ], 
            'Because of both Plate Tectonics and the Water Cycle'
            );
        p1.enable();
        this.questionsRemaining++;

        let p2 = new PickOneQuestion(this, 850, 350, 300, 20, 1, 29, 30, 
            'Earth is the only planet with liquid water', 
            [
            'True', 
            'False', 
            ], 
            'False'
            );
        p2.enable();
        this.questionsRemaining++;

        let checker = new TextButton(this, 600, 660, -1, 400, 80, 0x00, 1, 40, 'GBD_w', 'CHECK ANSWERS');
        checker.align();
        checker.enable(
            () => {
                if(p1.checkResults()) this.questionsRemaining--;
                if(p2.checkResults()) this.questionsRemaining--;
                // if(p3.checkResults()) this.questionsRemaining--;
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