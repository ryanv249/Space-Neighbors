import { Display } from "phaser";

export default class Button{
    /**
     * Creates a Bitmap Text GO with the passed font and label with a Rectangle Shape GO as a background.
     * The background rectangle handles interaction, and it is scaled to fit the text.
     * When arranging, move rectangle and then use Align() function to place text correctly. 
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} xPos 
     * @param {number} yPos 
     * position of background
     * @param {number} color 
     * color of background
     * @param {number} textSize
     * @param {String} font 
     * @param {String} label 
     * @param {*} onClick 
     * @param {*} onHover 
     * @param {*} offHover 
     * interactive callbacks
     */
    constructor(scene, xPos, yPos, color, textSize, font, label, onClick, onHover, offHover){
        // add objects to scene
        // rectangle starting size of 0,0 very important.
        this.background = scene.add.rectangle(xPos, yPos, 0, 0, color);
        this.text = scene.add.bitmapText(0, 0, font, label, textSize);

        // set base background size to match text
        this.background.width = this.text.width;
        this.background.height = this.text.height;

        // set rectangle to be interactable
        // cannot do it when adding rectangle since size is not set yet, bad stuff happens
        this.background
            .setOrigin(0)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => onClick())
            .on('pointerover', () => onHover())
            .on('pointerout', () => offHover());
    }

    Align(){
        // place text in middle of background.
        // offset necessary due to built-in margins in bitmaptext object
        Phaser.Display.Align.In.Center(this.text, this.background, this.text.width*0.005, this.text.height*0.1);
    }

}