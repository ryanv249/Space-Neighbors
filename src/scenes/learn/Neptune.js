import { Background, DropQuestion, InfoScreen, LevelComplete, Notebook, PickOneQuestion, TextButton, TitleText, makeCard } from "../../components";

export default class NeptuneLevel extends Phaser.Scene{
    constructor(){
        super({key: 'NeptuneLevel'});
    }

    // this is learning level 8. 
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
        new TitleText(this, 280, 'Neptune', 100);

        // these questions will be displayed once the InfoScreen is hidden.
        let p1 = new PickOneQuestion(this, 250, 350, 300, 0, 1, 26, 19, 
            'Why is Neptune blue?', 
            [
            'There are so many diamonds in the atmosphere', 
            'The atmosphere has a lot of methane in it', 
            'It only receives 3% of the sunlight that Jupiter receives',
            ], 
            'The atmosphere has a lot of methane in it'
            );
        p1.enable();
        this.questionsRemaining++;

        let p2 = new PickOneQuestion(this, 600, 350, 300, 0, 0, 26, 19, 
            'Which planet has the fastest winds?', 
            [
            'Neptune', 
            'Uranus', 
            'Jupiter',
            'Saturn'
            ], 
            'Neptune'
            );
        p2.enable();
        this.questionsRemaining++;

        let p3 = new PickOneQuestion(this, 950, 350, 300, 0, 1, 26, 30, 
            'When did we get our first good look at Neptune?', 
            [
            '1300', 
            '1960', 
            '1865',
            '1989'
            ], 
            '1989'
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
        let notes = new Notebook(this, [this.width, this.height], ['Earth', 'Mars', 'Venus', 'Mercury', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']);
        notes.enable();

        // display planet info 
        new InfoScreen(this, 'Neptune');
    }

    update(){
        if(this.questionsRemaining === 0){
            // game over. display level complete screen 
            new LevelComplete(this, 'MainMenu', 'LESSON OVER', 'MAIN MENU');
            // only get in here once
            this.questionsRemaining--;
        }
    }

}