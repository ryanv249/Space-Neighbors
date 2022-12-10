export default class TextButton{
    /**
     * Creates a Bitmap Text GO with the passed font and label with a Rectangle Shape GO as a background.
     * The background rectangle handles interaction, and it is scaled to fit the text + padding.
     * Can force rectangle size using forceW and forceH params. Use Align() to center text.
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} xPos 
     * x-position of background
     * @param {number} yPos 
     * y-position of background
     * @param {number} wrapWidth 
     * maximum width allowed for text. set to -1 for no effect.
     * does not turn off size scaling.
     * @param {number} forceW
     * background width override. for scaled size, pass -1.
     * @param {number} forceH
     * background height override. for scaled size, pass -1.
     * @param {number} color 
     * color of background
     * @param {number} alpha 
     * transparency of background
     * @param {number} textSize
     * @param {String} font 
     * @param {String} label 
     * Text to be displayed inside button. 
     */
    constructor(scene, xPos, yPos, wrapWidth, forceW, forceH, color, alpha, textSize, font, label){
        // add objects to scene
        // rectangle starting size of 0,0 very important.
        this.background = scene.add.rectangle(0, 0, 0, 0, color, alpha);
        this.text = scene.add.bitmapText(0, 0, font, label, textSize);

        // restrict text width if set
        this.text.setMaxWidth((wrapWidth !== -1 ? wrapWidth : this.text.width));

        // set base background size
        if(forceW !== -1 && forceH === -1){
            // width override
            this.background.width = forceW;
            this.background.height = this.text.height*1.1;
        }
        else if(forceW === -1 && forceH !== -1){
            // height override
            this.background.width = this.text.width*1.1;
            this.background.height = forceH;  
        }
        else if(forceW !== -1 && forceH !== -1){
            // full override
            this.background.width = forceW;
            this.background.height = forceH;  
        }
        else{
            // background fully scaled to text
            this.background.width = this.text.width*1.1;
            this.background.height = this.text.height*1.1;
        }

        // properly set origin of background. cannot do it until final size is determined.
        this.background.setOrigin(0.5);

        // set default offsets for align() method
        this.offsetX = this.text.width*0.005;
        this.offsetY = this.text.height*0.09;

        // place into container 
        this.container = scene.add.container(xPos, yPos, [this.background, this.text]);
        this.container.setSize(this.background.displayWidth, this.background.displayHeight);

    }


    /**
     * Calls setInteractive() on button and applies passed listener functions.
     * @param {{}} onClick 
     * 'pointerdown' callback
     * @param {{}} onHover 
     * 'pointerover' callback
     * @param {{}} offHover 
     * 'pointerout' callback
     */
    enable(onClick, onHover, offHover){
        this.background.setInteractive({useHandCursor: true})
            .on('pointerdown', () => onClick())
            .on('pointerover', () => onHover())
            .on('pointerout', () => offHover());
    }

    
    /**
     * Center text within its background. Necessary to call whenever rectangle moved!
     * @param {number} offX 
     * x offset. default value:     this.text.width*0.005
     * @param {number} offY 
     * y offset. default value:     this.text.height*0.09
     */
    align(offX, offY){
        // offset recommended due to built-in margins in bitmaptext object. 
        Phaser.Display.Align.In.Center(this.text, this.background,
            offX === undefined ? this.offsetX : offX,
            offY === undefined ? this.offsetY : offY
            );
    }

}