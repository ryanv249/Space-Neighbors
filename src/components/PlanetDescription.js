import { TextBox } from "../components";

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

        this.desc = new TextBox(scene, descPos[0], descPos[1], 580, 'PC_c', 19, desc).container
            .setVisible(false);

        this.name = scene.add.bitmapText(namePos[0], namePos[1], 'GBD_w', name, 60)
            .setVisible(false);

        this.spec = scene.add.bitmapText(specPos[0], specPos[1], 'PC_c', spec, 30)
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

/**
 * Returns a PlanetDescription object for the given planet name using the given coordinates.
 * @param {Phaser.Scene} scene
 * @param {String} name 
 * planet name to match 
 * @param {number[]} imgPos 
 * x,y coords to place planet image 
 * @param {number[]} namePos
 * x,y coords to place planet name 
 * @param {number[]} specPos 
 * x,y coords to place planet special characteristic
 * @param {number[]} descPos 
 * x,y coords to place planet description
 * 
 */
export function makeDescription(scene, name, imgPos, namePos, specPos, descPos){
    let ret;
    switch(name){
        case 'Earth':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'earth_lg', 0.5,
                    [namePos[0], namePos[1]], 'Earth', 
                    [specPos[0], specPos[1]], 'Huge Moon',
                    [descPos[0], descPos[1]], 
                    'Earth is unique in many ways. For starters, its Moon is by far the largest in the system. ' + 
                    'The Moon is 1/3 the size of Earth! Mars\' moons are tiny, Venus and Mercury don\'t even have one!\n\n' +
                    'It is the only local planet to currently have liquid water on its surface. Earth\'s surface is also always fresh thanks to it\'s unique system of Plate Tectonics: ' +
                    'Basically the rocks which make up Earth\'s inner layers have enough moisture that they can form into giant pieces which then break apart and rub into eachother. ' +
                    'This system is responsible for volcanoes and earthquakes!\n\n' + 
                    'The atmosphere is 78% Nitrogen and 21% Oxygen, which is very different from the other terrestrial (rocky) planets.\n\n' + 
                    'Earth is Venus\' "sister" planet due to their similar sizes and distances from the sun. Mars is kind of like a younger cousin!'
                    );
            break;
        case 'Mars':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'mars_lg', 0.5,
                    [namePos[0], namePos[1]], 'Mars', 
                    [specPos[0], specPos[1]], 'Ancient Surface Water',
                    [descPos[0], descPos[1]], 'This is the description for Mars. GUIVE ME YO BARDS oijegjoierjoieroij woitcher sing me a song :)');
            break;
        case 'Venus':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'venus_lg', 0.5,
                    [namePos[0], namePos[1]], 'Venus', 
                    [specPos[0], specPos[1]], 'Hottest Surface',
                    [descPos[0], descPos[1]], 'This is the description for Venus. SHE IS OUR HOT SISTER. WOAH MOMAMAMAMAM ibusfeuife');
            break;
        case 'Mercury':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'mercury_lg', 0.5,
                    [namePos[0], namePos[1]], 'Mercury', 
                    [specPos[0], specPos[1]], 'Closest to the Sun',
                    [descPos[0], descPos[1]], 'This is the description for Mercury. THE EXV IN MY BKJKNK bro get me outta here no cap bussin in my bus ');
            break;
        case 'Jupiter':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'jupiter_lg', 0.5,
                    [namePos[0], namePos[1]], 'Jupiter',
                    [specPos[0], specPos[1]], '71% of planet mass',
                    [descPos[0], descPos[1]], 'This is the description for Jupiter. Cells! At! Wprl! aADUHFIUH ,am i want some bread man yeikes jinkz scoobs');
            break;
        case 'Saturn':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'saturn_lg', 0.2,
                    [namePos[0], namePos[1]], 'Saturn', 
                    [specPos[0], specPos[1]], 'Awesome Rings',
                    [descPos[0], descPos[1]], 'This is the description for Saturn. ARUIWQURFIUWEGHIOWEGH AIUIWUA NADSHASBDSA S JAFSJASB !');
            break;
        case 'Uranus':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'uranus_lg', 0.5,
                    [namePos[0], namePos[1]], 'Uranus',
                    [specPos[0], specPos[1]], 'Side Spinner',
                    [descPos[0], descPos[1]], 'This is the description for Uranus. aahasiudas je saod ams bruhhh wow he asiafk ofji[ewoeji[wfoij');
            break;
        case 'Neptune':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'neptune_lg', 0.5,
                    [namePos[0], namePos[1]], 'Neptune',
                    [specPos[0], specPos[1]], 'Diamond Rain',
                    [descPos[0], descPos[1]], 'This is the description for Neptune. BADL! BALD! BALD 10IERFWEOI efjoiewjf ruh burh b[sa');
            break;
        default:
            ret = null;
            break;
    }
    return ret;
}