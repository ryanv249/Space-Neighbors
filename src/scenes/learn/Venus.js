import { Background, DropQuestion, InfoScreen, LevelComplete, Notebook, PickOneQuestion, TextButton, TitleText } from "../../components";

export default class VenusLevel extends Phaser.Scene{
    constructor(){
        super({key: 'VenusLevel'});
    }

    // this is learning level 3. 
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
        new TitleText(this, 280, 'Venus', 100);

        // these questions will be displayed once the InfoScreen is hidden.
        let p1 = new PickOneQuestion(this, 250, 350, 300, 0, 1, 30, 21, 
            'Why does Venus not have Plate Tectonics?', 
            [
            'Because Plate Tectonics will only ever be possible on Earth', 
            'Because Venus\'s crust is too thick', 
            'Because Venus is too dry',
            'Because Venus is too hot'
            ], 
            'Because Venus is too dry'
            );
        p1.enable();
        this.questionsRemaining++;

        let p2 = new PickOneQuestion(this, 600, 350, 300, 0, 1, 29, 21, 
            'Why is Venus so hot?', 
            [
            'Because the atmosphere traps heat very well', 
            'Because the atmosphere is super dense',
            'Because there are many volcanoes',
            'Because it is the closest planet to the Sun'
            ], 
            'Because the atmosphere traps heat very well'
            );
        p2.enable();
        this.questionsRemaining++;

        let p3 = new PickOneQuestion(this, 950, 350, 300, 0, 1, 28, 30, 
            'Olympus Mons is the tallest volcano on Venus', 
            [
            'False', 
            'True',  
            ], 
            'False'
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
        let notes = new Notebook(this, [this.width, this.height], ['Earth', 'Mars', 'Venus']);
        notes.enable();

        // display planet info 
        new InfoScreen(this, 'Venus');
    }

    update(){
        if(this.questionsRemaining === 0){
            // game over. display level complete screen 
            new LevelComplete(this, 'MercuryLevel', 'PLANET COMPLETE', 'NEXT PLANET');
            // only get in here once
            this.questionsRemaining--;
        }
    }

}