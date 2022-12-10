import {TextButton} from "../components";

export default class LevelComplete{
    /**
     * Provides a "Level Complete" message and a button which will start the given scene.
     * @param {Phaser.Scene} scene
     * @param {String} nextLevel 
     * The key of the scene to start 
     * @param {String} completeMessage
     * optional string to display instead of 'Level Complete'
     * @param {String} levelMessage
     * optional string to display instead of 'NEXT LEVEL'
     */
    constructor(scene, nextLevel, completeMessage, levelMessage){
        // make it extra obvious the level is over while also eating input (to prevent opening notebook) 
        this.background = scene.add.rectangle(0,0, scene.width, scene.height, 0x00, 0.5).setOrigin(0).setInteractive();

        // level complete message (want green background)
        this.message = new TextButton(scene, 600, 200, -1, -1, -1, 0x2FC325, 1, 100, 'GBD_b', (completeMessage === undefined ? 'Level Complete' : completeMessage));
        this.message.align();

        // next level button 
        this.button = new TextButton(scene, 600, 660, 400, 400, 80, 0x00, 1, 40, 'GBD_w', (levelMessage === undefined ? 'NEXT LEVEL' : levelMessage));
        this.button.align();
        
        // setup button 
        this.button.enable(
            () => {
                if(nextLevel === 'MainMenu'){
                    // going back to main menu. reset score and deactivate scoreboard 
                    scene.registry.set('score', 0);
                    scene.scene.stop('ScoreDisplay');
                }
                scene.scene.start(nextLevel);
            },
            () => this.button.text.setFont('GBD_c'),
            () => this.button.text.setFont('GBD_w')
            );
    }
}