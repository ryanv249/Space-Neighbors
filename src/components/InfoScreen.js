import {TextButton, makeDescription, Background } from "../components";

export default class InfoScreen{
    /**
     * Returns the InfoScreen for a given planet.
     * MUST BE PLACED LAST. USES A FAKE BACKGROUND TO HIDE QUESTIONS
     * @param {Phaser.Scene} scene 
     * @param {String} name 
     * Proper name of planet whose info will be displayed 
     */
    constructor(scene, name){
        // create components 
        // this is just a normal image which will block inputs to the questions (that are rendered underneath)
        this.wall = new Background(scene).setInteractive();
        this.info = makeDescription(scene, name, [250, 400], [120,150], [120,230], [760,360]);
        this.exit = new TextButton(scene, 800, 600, -1, 110, 70, 0x8D4DE2, 1, 60, 'GBD_w', 'OK');
        // due to reasons, need to call this align function
        // this class was one of the first things I wrote in Phaser, it could be better lol 
        this.exit.align();
        // turn on listeners
        this.exit.enable(
            () => this.hide(),
            () => this.exit.background.setFillStyle(0x409BE5),
            () => this.exit.background.setFillStyle(0x8D4DE2)
            );

        // manually activate description (avoid interactivity)
        this.info.img.setVisible(true);
        this.info.img.clearTint();
        this.info.desc.setVisible(true);
        this.info.name.setVisible(true);
        this.info.spec.setVisible(true);
    }

    /**
     * Close this InfoScreen.
     */
    hide(){
        // hide all components
        this.info.hide();
        this.exit.background.disableInteractive();
        this.exit.container.setVisible(false);

        // this will show all the questions, which have been there this whole time!
        this.wall.setVisible(false);
    }
}