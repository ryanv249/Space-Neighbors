export default class TextBox{
    /**
     * Creates a slightly transparent textbox sized to fit text input.
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} xPos 
     * @param {number} yPos 
     * where to place box 
     * @param {number} maxWidth
     * maximum width of text. box will be slightly larger
     * @param {String} font 
     * @param {number} textSize 
     * @param {String} text 
     */
    constructor(scene, xPos, yPos, maxWidth, font, textSize, text){
        // create box 
        this.box = scene.add.rectangle(xPos, yPos, 0, 0, 0x00, 0.6)
            .setOrigin(0);
        
        // create text 
        this.text = scene.add.bitmapText(0, 0, font, text, textSize)
            .setMaxWidth(maxWidth);
        
        // make box a little bigger than the text 
        this.box.width = this.text.width*1.05;
        this.box.height = this.text.height*1.1;

        // center text in box 
        Phaser.Display.Align.In.Center(this.text, this.box);
    }


}