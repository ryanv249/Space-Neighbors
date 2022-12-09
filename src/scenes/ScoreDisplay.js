export default class ScoreDisplay extends Phaser.Scene{
    /**
     * This scene displays the current score, affected by player actions in the other scenes. 
     * This scene should only be called once, by the first level. 
     */
    constructor(){
        super({key: 'ScoreDisplay'});
    }

    create(){
        this.star = this.add.image(this.scene.settings.data[0], this.scene.settings.data[1], 'star')
            .setScale(4)
            .setOrigin(0.5);
        this.display = this.add.bitmapText(this.scene.settings.data[0] + 130, this.scene.settings.data[1] + 10, 'GBD_w', '0', 92)
            .setOrigin(0.5);

        this.registry.events.on('changedata', this.updateData, this);
    }

    updateData(parent, key, data){
        if(key === 'score'){
            this.display.setText(data);
        }
    }
}