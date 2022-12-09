import { makeDescription } from "../components";

export default class Notebook{
    /**
     * Creates a switch in the top right hand corner which, when flipped, brings up a menu displaying all the planets passed to this object.
     * NEEDS TO BE LAST PLACED OBJECT IN SCENE IN ORDER TO PROPERLY COVER ALL OTHER OBJECTS 
     * @param {Phaser.Scene} scene 
     * @param {number[]} screenBounds 
     * width, height of calling scene
     * @param {String[]} entries 
     * names of planets to include
     */
    constructor(scene, screenBounds, entries){
        // create base components
        this.onSwitch = scene.add.image(1050,70, 'notebook')
            .setScale(0.6);

        this.background = scene.add.rectangle(0, 0, screenBounds[0], screenBounds[1], 0x111111, 0.9)
            .setOrigin(0)
            .setVisible(false);

        this.offSwitch = scene.add.image(600,70, 'cancel')
            .setScale(0.6)
            .setVisible(false);

        // create list of PlanetDescriptions  
        // should be 1 entry per planet, obviously. this just allows for mixing and matching what is in notebook
        // planet specific coordinates determined by my massive intellect
        this.planets = [];
        for(let i = 0; i < entries.length; i++){
            switch(entries[i]){
                case 'Earth':
                    this.planets.push(
                        makeDescription(scene, entries[i],
                            [150, 100], 
                            [280, 30], 
                            [280, 95], 
                            [600, 290])
                    );
                    break;
                case 'Mars':
                    this.planets.push(
                        makeDescription(scene, entries[i],
                            [150, 350],
                            [280, 30],
                            [280, 95], 
                            [600, 260])
                    );
                    break;
                case 'Venus':
                    this.planets.push(
                        makeDescription(scene, entries[i],
                            [210, 600],
                            [280, 30], 
                            [280, 95],
                            [600, 260])
                    );
                    break;
                case 'Mercury':
                    this.planets.push(
                        makeDescription(scene, entries[i],
                            [470, 600], 
                            [280, 30], 
                            [280, 95],
                            [600, 260])
                    );
                    break;
                case 'Jupiter':
                    this.planets.push(
                        makeDescription(scene, entries[i],
                            [730, 600],
                            [280, 30],
                            [280, 95],
                            [600, 260])
                    );
                    break;
                case 'Saturn':
                    this.planets.push(
                        makeDescription(scene, entries[i],
                            [1050, 620],
                            [280, 30],
                            [280, 95],
                            [600, 260])
                    );
                    break;
                case 'Uranus':
                    this.planets.push(
                        makeDescription(scene, entries[i],
                            [1050, 400],
                            [280, 30],
                            [280, 95],
                            [600, 260])
                    );
                    break;
                case 'Neptune':
                    this.planets.push(
                        makeDescription(scene, entries[i],
                            [1050, 120],
                            [280, 30],
                            [280, 95],
                            [600, 260])
                    );
                    break;
                default:
                    break;
            }

        }
    }

    /**
     * Calls setInteractive() on this Notebook's onSwitch 
     * Sets up listeners for both switches. (should only be called once!)
     */
    enable(){
        // toggle onSwitch
        this.onSwitch.setInteractive({useHandCursor: true});

        // onSwitch listeners

        this.onSwitch.on('pointerover', () => {
            this.onSwitch.setScale(0.7);
        }, this);

        this.onSwitch.on('pointerout', () => {
            this.onSwitch.setScale(0.6);
        }, this);

        this.onSwitch.on('pointerdown', () => this.show());

        // offSwitch listeners

        this.offSwitch.on('pointerover', () => {
            this.offSwitch.setScale(0.7);
        }, this);

        this.offSwitch.on('pointerout', () => {
            this.offSwitch.setScale(0.6);
        }, this);

        this.offSwitch.on('pointerdown', () => this.hide());
    }


    /**
     * Display this notebook. 
     */
    show(){
        // first, hide and disable the onSwitch
        this.onSwitch.setVisible(false);
        this.onSwitch.disableInteractive();

        // hide the scoreboard
        this.background.scene.scene.sendToBack('ScoreDisplay');

        // set background to be visible and to be interactive 
        // this causes the background to block input to elements 'below' it, basically making a Notebook a pseudo-scene
        this.background.setVisible(true);
        this.background.setInteractive();

        // show and enable the offSwitch
        this.offSwitch.setVisible(true);
        this.offSwitch.setInteractive();

        // enable all entries 
        this.planets.forEach(entry => {
            // if this is the first time this notebook is being displayed, also define listeners
            if(entry.img.input === null){
                entry.display();
                entry.defineInteractive();
            }
            else{
                entry.display();
            }
        });
    }

    /**
     * Hide this notebook.
     */
    hide(){
        // first, hide and disable the offSwitch 
        this.offSwitch.setVisible(false);
        this.offSwitch.disableInteractive();

        // display the scoreboard 
        this.background.scene.scene.bringToTop('ScoreDisplay');

        // set background to be invisible and prevent it from blocking input 
        this.background.setVisible(false);
        this.background.disableInteractive();

        // show and enable the onSwitch
        this.onSwitch.setVisible(true);
        this.onSwitch.setInteractive();

        // disable all entries 
        this.planets.forEach(entry => {
            entry.hide();
        });
    }



}