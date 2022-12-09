import PlanetDescription from "./PlanetDescription";

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
        // planets have pre-determined locations based on my incredible intellect
        this.planets = [];
        for(let i = 0; i < entries.length; i++){
            switch(entries[i]){
                case 'Earth':
                    this.planets.push(
                        new PlanetDescription(scene, 
                            [150, 100], 'earth_lg', 0.5,
                            [300, 40], 'Earth', 
                            [300, 95], 'Life',
                            [600, 160], 'This is the description for Earth. Blah Blah Blah. ifhfhwhwfoeh wefbuiewfhhofwe qwifhwoihwof!!!!')
                    );
                    break;
                case 'Mars':
                    this.planets.push(
                        new PlanetDescription(scene, 
                            [150, 350], 'mars_lg', 0.5,
                            [300, 40], 'Mars', 
                            [300, 95], 'Old Water',
                            [600, 160], 'This is the description for Mars. GUIVE ME YO BARDS oijegjoierjoieroij woitcher sing me a song :)')
                    );
                    break;
                case 'Venus':
                    this.planets.push(
                        new PlanetDescription(scene, 
                            [210, 600], 'venus_lg', 0.5,
                            [300, 40], 'Venus', 
                            [300, 95], 'Hottest',
                            [600, 160], 'This is the description for Venus. SHE IS OUR HOT SISTER. WOAH MOMAMAMAMAM ibusfeuife')
                    );
                    break;
                case 'Mercury':
                    this.planets.push(
                        new PlanetDescription(scene, 
                            [470, 600], 'mercury_lg', 0.5,
                            [300, 40], 'Mercury', 
                            [300, 95], 'Sun\'s Favorite',
                            [600, 160], 'This is the description for Mercury. THE EXV IN MY BKJKNK bro get me outta here no cap bussin in my bus ')
                    );
                    break;
                case 'Jupiter':
                    this.planets.push(
                        new PlanetDescription(scene, 
                            [730, 600], 'jupiter_lg', 0.5,
                            [300, 40], 'Jupiter',
                            [300, 95], 'Size',
                            [600, 160], 'This is the description for Jupiter. Cells! At! Wprl! aADUHFIUH ,am i want some bread man yeikes jinkz scoobs')
                    );
                    break;
                case 'Saturn':
                    this.planets.push(
                        new PlanetDescription(scene, 
                            [1050, 620], 'saturn_lg', 0.2,
                            [300, 40], 'Saturn', 
                            [300, 95], 'Rings',
                            [600, 160], 'This is the description for Saturn. ARUIWQURFIUWEGHIOWEGH AIUIWUA NADSHASBDSA S JAFSJASB !')
                    );
                    break;
                case 'Uranus':
                    this.planets.push(
                        new PlanetDescription(scene, 
                            [1050, 400], 'uranus_lg', 0.5,
                            [300, 40], 'Uranus',
                            [300, 95], 'IDKYET',
                            [600, 160], 'This is the description for Uranus. aahasiudas je saod ams bruhhh wow he asiafk ofji[ewoeji[wfoij')
                    );
                    break;
                case 'Neptune':
                    this.planets.push(
                        new PlanetDescription(scene, 
                            [1050, 120], 'neptune_lg', 0.5,
                            [300, 40], 'Neptune',
                            [300, 95], 'BIGBLUE',
                            [600, 160], 'This is the description for Neptune. BADL! BALD! BALD 10IERFWEOI efjoiewjf ruh burh b[sa')
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