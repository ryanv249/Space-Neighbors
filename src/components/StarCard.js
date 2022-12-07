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
        this.card = scene.add.rectangle(0, 0, 0, 0, 0x8D4DE2, 0.7);
        this.label = scene.add.bitmapText(0, 0, 'title_font_w', label, 20);
        this.img = scene.add.image(0,0, imgId);

        this.card.width = 100;
        this.card.height = 65;

        // fix origins for container
        this.card.setOrigin(0.5);
        this.label.setOrigin(0.5);
        this.img.setOrigin(0.5);

        // create container to allow for drags 
        this.container = scene.add.container(xPos, yPos, [this.card, this.label, this.img]);
        this.container.setSize(this.card.displayWidth, this.card.displayHeight);

        // organize card layout
        Phaser.Display.Align.In.TopCenter(this.label, this.card, 0, -5);
        Phaser.Display.Align.In.BottomCenter(this.img, this.card, 0, -5);

    }
    /**
     *  Calls setInteractive() on the container, enabling hover highlight.
     *  @param {boolean} drag
     *  Enable drag too?
     */
    enableInteration(drag){
        this.container.setInteractive({useHandCursor: true});
        // become blue 
        this.container.on('pointerover', () => {
            this.card.setFillStyle(0x409BE5, 0.7);
        });
        // go back to purple
        this.container.on('pointerout', () => {
            this.card.setFillStyle(0x8D4DE2, 0.7);
        });

        if(drag){
            this.container.scene.input.setDraggable(this.container);
        }
    }

}