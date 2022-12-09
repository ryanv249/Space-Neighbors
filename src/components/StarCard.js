export default class StarCard{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} xPos 
     * @param {number} yPos
     * @param {String} imgId
     * @param {String} label
     */
    constructor(scene, xPos, yPos, imgId, label){
        // create components 
        // I don't entirely understand how positioning with containers work
        // As it stands, everything but the container needs to be 0.5 origin and 0,0. 
        this.card = scene.add.rectangle(0, 0, 100, 65, 0x8D4DE2, 0.7);
        this.text = scene.add.bitmapText(0, 0, 'GBD_w', label, 20);
        this.img = scene.add.image(0, 0, imgId);

        // fix origins for components
        this.card.setOrigin(0.5);
        this.text.setOrigin(0.5);
        this.img.setOrigin(0.5);

        // organize card layout
        Phaser.Display.Align.In.TopCenter(this.text, this.card, 0, -5);
        Phaser.Display.Align.In.BottomCenter(this.img, this.card, 0, -5);

        // create container to allow for drags 
        this.container = scene.add.container(xPos, yPos, [this.card, this.text, this.img]);
        this.container.setSize(this.card.displayWidth, this.card.displayHeight);

        // store starting position. 
        // used when removed from dropzone
        this.container.startX = xPos;
        this.container.startY = yPos;
    }


    /**
     *  Calls setInteractive() on the container, enabling hover highlight.
     *  @param {boolean} drag
     *  Enable drag too?
     *  @param {{}} onClick 
     *  'pointerdown' optional function 
     */
    enable(drag, onClick){
        this.container.setInteractive({useHandCursor: true});
        // become blue 
        this.container.on('pointerover', () => {
            this.card.setFillStyle(0x409BE5, 0.7);
        });
        // go back to purple
        this.container.on('pointerout', () => {
            this.card.setFillStyle(0x8D4DE2, 0.7);
        });

        // apply passed function 
        this.container.on('pointerdown', () => onClick());

        if(drag){
            this.container.scene.input.setDraggable(this.container);
        }
    }
}


/**
 * Given a Scene, attempts to create a StarCard with the given name at the passed coordinates.
 * If an invalid planet name is passed, this function returns null.
 * @param {Phaser.Scene} scene 
 * @param {number} xPos 
 * @param {number} yPos 
 * @param {String} planet 
 * Proper name of planet, e.g., 'Earth' 
 * @returns {StarCard}
 */
export function makeCard(scene, xPos, yPos, planet){
    let card;
    switch(planet){
        case 'Earth':
            card = new StarCard(scene, xPos, yPos, 'earth_sm', 'Earth');
            break;
        case 'Jupiter':
            card = new StarCard(scene, xPos, yPos, 'jupiter_sm', 'Jupiter');
            break;
        case 'Mars':
            card = new StarCard(scene, xPos, yPos, 'mars_sm', 'Mars');
            break;
        case 'Mercury':
            card = new StarCard(scene, xPos, yPos, 'mercury_sm', 'Mercury');
            break;
        case 'Neptune':
            card = new StarCard(scene, xPos, yPos, 'neptune_sm', 'Neptune');
            break;
        case 'Saturn':
            card = new StarCard(scene, xPos, yPos, 'saturn_sm', 'Saturn');
            break;
        case 'Uranus':
            card = new StarCard(scene, xPos, yPos, 'uranus_sm', 'Uranus');
            break;
        case 'Venus':
            card = new StarCard(scene, xPos, yPos, 'venus_sm', 'Venus');
            break;
        default:
            card = null;
    }
    return card; 
}