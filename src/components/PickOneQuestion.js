import { makeCard } from "./StarCard";
import TextButton from "./TextButton";

export default class PickOneQuestion{
    /**
     * Creates a list of buttons which can be clicked.
     * @param {Phaser.Scene} scene 
     * @param {number} xPos 
     * @param {number} yPos 
     * @param {number} maxWidth 
     * The maximum width of the question label (and other text, if applicable).
     * The box will be slightly larger than this value.
     * @param {number} minHeight 
     * The minimum height of the enclosing box. Box will grow larger to fit choices if necessary.
     * @param {number} type
     * 0 -> StarCard buttons, 1 -> TextButtons 
     * @param {number} labelSize 
     * font size for question
     * @param {number} choiceSize
     * font size for choices (only applies to TextButtons)
     * @param {String} question 
     * The prompt to be answered.
     * @param {String[]} choices 
     * Depending on button type, either list of planet names or other strings. MAXIMUM 4 
     * @param {String} answer 
     * The single string (among the choices) which is correct. This is not multiple choice!
     */
    constructor(scene, xPos, yPos, maxWidth, minHeight, type, labelSize, choiceSize, question, choices, answer){
        // store the most recently pressed button and what it is 
        this.recentButton = null;
        this.recentAnswer = null;
        // store correct answer 
        this.answer = answer; 

        // create box, text components
        this.box = scene.add.rectangle(xPos, yPos, maxWidth*1.1, minHeight, 0x00, 0.6);
        this.text = scene.add.bitmapText(xPos, yPos, 'main_font_c', question, labelSize)
            .setMaxWidth(maxWidth);

        // store button type
        this.type = type;
        // populate list of buttons
        this.buttons = [];
        for(let i = 0; i < choices.length; i++){
            if(type === 0){
                // StarCard buttons 
                this.buttons.push(makeCard(scene, xPos, yPos, choices[i]));
            }
            else{
                // TextButtons 
                this.buttons.push(new TextButton(scene, xPos, yPos, maxWidth*0.9, -1, -1, 0x8D4DE2, 0.7, choiceSize, 'main_font_w', choices[i]));
            }
        }

        // determine if box height must be scaled to fit items 
        let neededHeight = this.text.height;
        if(type === 0){
            neededHeight += 65*choices.length;
        }
        else{
            for(let i = 0; i < choices.length; i++) {
                neededHeight += this.buttons[i].container.displayHeight;
            }
        }
        this.box.height = 20 + (neededHeight > minHeight *1.1 ? neededHeight*1.2: minHeight*1.1);
        // TextButtons need a bit more space
        if(type === 1)this.box.height += 5*choices.length;

        // reset box origin, now that size finalized 
        this.box.setOrigin(0.5);
        // arrange components 
        Phaser.Display.Align.In.TopCenter(this.text, this.box, 0, -20);
        Phaser.Display.Align.In.BottomCenter(this.buttons[0].container, this.box, 0, -10);
        // TextButtons have special alignment function
        if(type === 1) this.buttons[0].align();
        for(let i = 1; i < choices.length; i++) {
            Phaser.Display.Align.To.TopCenter(this.buttons[i].container, this.buttons[i - 1].container, 0, 10);
            if(type === 1) this.buttons[i].align();
        }

    }


    /**
     * Calls setInteractive() on all buttons and sets up listener functions.
     * Works by calling each class' enable() function.
     */
    enable(){
        if(this.type === 0){
            // set functions for StarCard buttons 
            for(let i = 0; i < this.buttons.length; i++){
                this.buttons[i].enable(
                    // no drag allowed 
                    false,
                    // on click
                    () => {this.recordAnswer(this.buttons[i]);}
                );
            }
        }
        else{
            // set functions for TextButtons 
            for(let i = 0; i < this.buttons.length; i++){
                this.buttons[i].enable(
                    // on click
                    () => {this.recordAnswer(this.buttons[i]);},
                    // on hover
                    () => {this.buttons[i].background.setFillStyle(0x409BE5, 0.7);},
                    // off hover
                    () => {this.buttons[i].background.setFillStyle(0x8D4DE2, 0.7);}
                );
            }
        }

    }

    /**
     * Store info about most recent button clicked.
     * Disables that button until another is pressed (or, if incorrect, when results checked).
     * @param {StarCard | TextButton} pressedButton 
     */
    recordAnswer(pressedButton){
        // if we're currently storing a button, turn it back on! 
        if(this.recentAnswer !== null){
            if(this.type === 0){
                this.recentButton.container.setInteractive();
                this.recentButton.text.setFont('title_font_w');
            }
            else{
                this.recentButton.background.setInteractive();
                this.recentButton.text.setFont('main_font_w');
            }
        }

        // store new info
        this.recentButton = pressedButton;
        this.recentAnswer = pressedButton.text.text;

        // disable button
        if(this.type === 0){
            // StarCards
            this.recentButton.container.disableInteractive();
            this.recentButton.text.setFont('title_font_b');
        }
        else{
            // TextButtons
            this.recentButton.background.disableInteractive();
            this.recentButton.text.setFont('main_font_b');
        }        
    }


    /**
     * Check current pressed button. 
     * If correct, disable other buttons, make them red, and become green.
     * If incorrect, keep button disabled and make it red.
     * 
     * 
     * TODO: make reset functions for classes to make this prettier
     */
    checkResults(){
        // has a button been pressed? 
        if(this.recentAnswer !== null){
            // has the correct button been pressed?
            if(this.recentAnswer === this.answer){
                // disable buttons
                if(this.type === 0){
                    // StarCards
                    for(let i = 0; i < this.buttons.length; i++){
                        this.buttons[i].container.disableInteractive();
                        this.buttons[i].card.setFillStyle(0xDF2727);
                    }
                    // make last pressed green 
                    this.recentButton.card.setFillStyle(0x2FC325);
                }
                else{
                    // TextButtons
                    for(let i = 0; i < this.buttons.length; i++){
                        this.buttons[i].background.disableInteractive();
                        this.buttons[i].background.setFillStyle(0xDF2727);
                    }
                    // make last pressed green 
                    this.recentButton.background.setFillStyle(0x2FC325);
                }
            }
            else{
                // make it red 
                if(this.type === 0){
                    // StarCards
                    this.recentButton.text.setFont('title_font_w');
                    this.recentButton.card.setFillStyle(0xDF2727);
                }
                else{
                    // TextButtons
                    this.recentButton.text.setFont('main_font_w');
                    this.recentButton.background.setFillStyle(0xDF2727);
                }

                // forget last pressed 
                this.recentButton = null;
                this.recentAnswer = null;
            }
        }
        
    }
}