import { Background, DropQuestion, InfoScreen, LevelComplete, Notebook, PickOneQuestion, TextButton, TitleText } from "../../components";

export default class MarsLevel extends Phaser.Scene{
    constructor(){
        super({key: 'MarsLevel'});
    }
    
    // this is learning level 2. 
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
        new TitleText(this, 280, 'Mars', 100);

        // these questions will be displayed once the InfoScreen is hidden.
        let p1 = new PickOneQuestion(this, 250, 350, 300, 0, 1, 30, 21, 
            'Why does Mars not have Plate Tectonics?', 
            [
            'Because Plate Tectonics will only ever be possible on Earth', 
            'Because the Martian Crust is too thick', 
            'Because Mars doesn\'t have liquid water'
            ], 
            'Because the Martian Crust is too thick'
            );
        p1.enable();
        this.questionsRemaining++;

        let p2 = new PickOneQuestion(this, 600, 350, 300, 0, 1, 29, 30, 
            'What is the name of the huge Martian canyon?', 
            [
            'Valles Martianeris', 
            'Olympus Mons',
            'Valles Marineris',
            'Canis Major'
            ], 
            'Valles Marineris'
            );
        p2.enable();
        this.questionsRemaining++;

        let p3 = new PickOneQuestion(this, 950, 350, 300, 0, 1, 29, 30, 
            'How many moons does Mars have?', 
            [
            '0', 
            '1',
            '2', 
            '3',  
            ], 
            '2'
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
        let notes = new Notebook(this, [this.width, this.height], ['Earth', 'Mars']);
        notes.enable();

        // display planet info 
        new InfoScreen(this, 'Mars');
    }

    update(){
        if(this.questionsRemaining === 0){
            // game over. display level complete screen 
            new LevelComplete(this, 'VenusLevel', 'PLANET COMPLETE', 'NEXT PLANET');
            // only get in here once
            this.questionsRemaining--;
        }
    }

}