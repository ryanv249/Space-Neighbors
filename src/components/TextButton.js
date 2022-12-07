export default class TextButton{
    /**
     * Creates a Bitmap Text GO with the passed font and label with a Rectangle Shape GO as a background.
     * The background rectangle handles interaction, and it is scaled to fit the text + padding.
     * Can force rectangle size using forceW and forceH params. Use Align() to center text.
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} xPos 
     * @param {number} yPos 
     * position of background
     * @param {number} forceW
     * @param {number} forceH
     * background size overrides, for scaled size, pass -1.
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
    constructor(scene, xPos, yPos, forceW, forceH, color, textSize, font, label, onClick, onHover, offHover){
        // add objects to scene
        // rectangle starting size of 0,0 very important.
        this.background = scene.add.rectangle(xPos, yPos, 0, 0, color);
        this.text = scene.add.bitmapText(0, 0, font, label, textSize);

        // set base background size
        if(forceW !== -1 || forceH !== -1){
            // some dimension (or both) overriden
            this.background.width = forceW === -1 ? this.text.width : forceW;
            this.background.height = forceH === -1 ? this.text.height : forceH;
        }
        else{
            // background fully scaled to text
            this.background.width = this.text.width*1.1;
            this.background.height = this.text.height*1.1;
        }

        // set default offsets for Align() function
        this.offsetX = this.text.width*0.005;
        this.offsetY = this.text.height*0.15;

        // set rectangle to be interactable
        // cannot do it when adding rectangle since size is not set yet; bad stuff happens
        this.background
            .setOrigin(0)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => onClick())
            .on('pointerover', () => onHover())
            .on('pointerout', () => offHover());
    }

    
    /**
     * Center text within its background. Necessary to call whenever rectangle moved!
     * @param {number} offX 
     * x offset. default value:     this.text.width*0.005
     * @param {number} offY 
     * y offset. default value:     this.text.height*0.15
     */
    Align(offX, offY){
        // offset recommended due to built-in margins in bitmaptext object. 
        // default offset usually good enough for 1-line strings.
        Phaser.Display.Align.In.Center(this.text, this.background,
            offX === undefined ? this.offsetX : offX,
            offY === undefined ? this.offsetY : offY
            );
    }

}