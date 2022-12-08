import TextBox from "./TextBox";

export default class PlanetDescription {
    /**
     * Planet image/description pairs to be displayed within the Notebook.
     * Used within the Notebook to generate whatever entries are required for a level.
     * 
     * @param {Phaser.Scene} scene 
     * @param {number[]} imgPos 
     * x,y coords to place planet image 
     * @param {number[]} descPos 
     * x,y coords to place planet decription
     * @param {*} img 
     * image to display 
     * @param {*} desc 
     * text to display 
     */
    constructor(scene, imgPos, descPos, img, desc){
        // create components
        this.img = scene.add.image(imgPos[0], imgPos[1], img)
            .setDisplaySize(256, 192)
            .setVisible(false)
            // tint image so that can highlight on hover
            .setTint(0x8C8C8C);

        this.desc = new TextBox(scene, descPos[0], descPos[1], 500, 'main_font_w', 20, desc).container
            .setVisible(false);

        // components are created invisible. Notebook will determine when components will be visible.
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
        }, this);

        // off hover, darken image again and hide text
        this.img.on('pointerout', () =>{
            this.img.setTint(0x8C8C8C);
            this.desc.setVisible(false);
        }, this);
    }

    /**
     * Make this PlanetDescription's image visible and give it an input object.
     */
    display(){
        // images are circles, change hitarea to reflect this 
        let shape = new Phaser.Geom.Circle(this.img.x + this.img.displayHeight*1.2, this.img.y + this.img.displayHeight*0.9, this.img.displayHeight*1.75);
        this.img.setInteractive(shape, this.handler);
        this.img.setVisible(true);
    }

    /**
     * custom input handler for PlanetDescription images (they are circles)
     */
    handler(shape, x, y, gameObject){
        if (shape.radius > 0 && x >= shape.left && x <= shape.right && y >= shape.top && y <= shape.bottom)
        {
            var dx = (shape.x - x) * (shape.x - x);
            var dy = (shape.y - y) * (shape.y - y);
    
            return (dx + dy) <= (shape.radius * shape.radius);
        }
        else
        {
            return false;
        }
    }

    /**
     * Make this PlanetDescription entirely invisible and take away its input object.
     */
    hide(){
        this.img.disableInteractive();
        this.img.setVisible(false);
        this.desc.container.setVisible(false);
    }
    

}