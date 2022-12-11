import { Background, DropQuestion, InfoScreen, LevelComplete, Notebook, PickOneQuestion, TextButton, TitleText, makeCard } from "../../components";

export default class UranusLevel extends Phaser.Scene{
    constructor(){
        super({key: 'UranusLevel'});
    }

    // this is learning level 7. 
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
        new TitleText(this, 280, 'Uranus', 100);

        // these questions will be displayed once the InfoScreen is hidden.
        let p1 = new PickOneQuestion(this, 250, 350, 300, 24, 1, 30, 25, 
            'What is Uranus\'s angle of rotation?', 
            [
            '23.5 degrees', 
            '28 degrees', 
            '98 degrees', 
            '0 degrees'
            ], 
            '98 degrees'
            );
        p1.enable();
        this.questionsRemaining++;

        let p2 = new PickOneQuestion(this, 600, 350, 300, 20, 1, 29, 30, 
            'Is there a big difference between summer and winter on Uranus?', 
            [
            'No', 
            'Yes', 
            ], 
            'No'
            );
        p2.enable();
        this.questionsRemaining++;

        let p3 = new PickOneQuestion(this, 950, 350, 300, 1, 1, 32, 25, 
            'Why are Uranus\'s rings dark?', 
            [
            'They are made of dark chemicals', 
            'Uranus doesn\'t have rings',
            'Uranus is very far from the Sun'
            ], 
            'Uranus is very far from the Sun'
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
        let notes = new Notebook(this, [this.width, this.height], ['Earth', 'Mars', 'Venus', 'Mercury', 'Jupiter', 'Saturn', 'Uranus']);
        notes.enable();

        // display planet info 
        new InfoScreen(this, 'Uranus');
    }

    update(){
        if(this.questionsRemaining === 0){
            // game over. display level complete screen 
            new LevelComplete(this, 'NeptuneLevel', 'PLANET COMPLETE', 'NEXT PLANET');
            // only get in here once
            this.questionsRemaining--;
        }
    }

}