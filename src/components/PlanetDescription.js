import TextBox from "./TextBox";
import TextButton from "./TextButton";

export default class PlanetDescription {
    /**
     * Planet info group object.
     * Displays the given name, image, description, and special characteristic at the specified coordinates.
     * Used within the Notebook and planet 'learn' screens.
     * 
     * @param {Phaser.Scene} scene 
     * @param {number[]} imgPos 
     * x,y coords to place planet image 
     * @param {*} img 
     * planet image
     * @param {number} imgScale
     * set size scaling of planet image
     * @param {number[]} namePos
     * x,y coords to place planet name 
     * @param {String} name
     * planet name
     * @param {number[]} specPos
     * x,y coords to place planet special characteristic
     * @param {String} spec
     * planet special characteristic
     * @param {number[]} descPos 
     * x,y coords to place planet description
     * @param {String} desc 
     * planet description
     */
    constructor(scene, imgPos, img, imgScale, namePos, name, specPos, spec, descPos, desc){
        // create components
        this.img = scene.add.image(imgPos[0], imgPos[1], img)
            // every planet but saturn is 512x512 scaled down to 256x256. saturn is special cuz rings (too wide)
            .setScale(imgScale)
            .setVisible(false)
            // tint image so that can highlight on hover
            .setTint(0x8C8C8C);

        this.desc = new TextBox(scene, descPos[0], descPos[1], 580, 'main_font_c', 20, desc).container
            .setVisible(false);

        this.name = scene.add.bitmapText(namePos[0], namePos[1], 'title_font_w', name, 50)
            .setVisible(false);

        this.spec = scene.add.bitmapText(specPos[0], specPos[1], 'main_font_c', spec, 40)
            .setVisible(false);

        // components are created invisible. calling scene will determine when to make visible (using hover or otherwise)
    }


    /**
     * This defines the listener functions for a PlanetDescription object.
     * must be called on a PlanetDescription after the first call to display(), since this does not call setInteractive()
     */
    defineInteractive(){
        // on hover, make planet image brighter and show text 
        this.img.on('pointerover', () =>{
            this.img.clearTint();
            this.desc.setVisible(true);
            this.name.setVisible(true);
            this.spec.setVisible(true);
        }, this);

        // off hover, darken image again and hide text
        this.img.on('pointerout', () =>{
            this.img.setTint(0x8C8C8C);
            this.desc.setVisible(false);
            this.name.setVisible(false);
            this.spec.setVisible(false);
        }, this);
    }


    /**
     * Make this PlanetDescription visible and give it an input object.
     */
    display(){
        // images are circles, create new hitarea to reflect this 
        if(this.img.input === null && this.name.text !== 'Saturn'){
            // only create hitarea once 
            // this is very finicky and all planets (besides saturn) are 512x512 scaled to 256x256 to make this work (DONT TOUCH IT)
            let shape = new Phaser.Geom.Circle(this.img.displayOriginX,  this.img.displayOriginY, this.img.displayHeight);
            this.img.setInteractive(shape, Phaser.Geom.Circle.Contains);
            // this.img.scene.input.enableDebug(this.img)
        }
        this.img.setInteractive();
        this.img.setVisible(true);
    }


    /**
     * Make this PlanetDescription entirely invisible and take away its input object.
     */
    hide(){
        this.img.disableInteractive();
        this.img.setVisible(false);
        this.desc.setVisible(false);
        this.name.setVisible(false);
        this.spec.setVisible(false);
    }

}