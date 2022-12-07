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
        this.box = scene.add.rectangle(0, 0, 0, 0, 0x00, 0.6);
        
        // create text 
        this.text = scene.add.bitmapText(0, 0, font, text, textSize)
            .setOrigin(0.5)
            .setMaxWidth(maxWidth);
        
        // make box a little bigger than the text 
        this.box.width = this.text.width*1.05;
        this.box.height = this.text.height*1.1;

        // center text in box 
        this.box.setOrigin(0.5);
        Phaser.Display.Align.In.Center(this.text, this.box, 0, this.text.height*0.02);

        // create container to allow for drags (probably won't use this)
        this.container = scene.add.container(xPos, yPos, [this.box, this.text]);
        this.container.setSize(this.box.displayWidth, this.box.displayHeight);

    }


}