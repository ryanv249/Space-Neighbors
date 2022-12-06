import Phaser from 'phaser';
import {logo} from "./assets/";
import {Preloader, MainMenu, TutorialScene} from "./scenes/";

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logo);
    }
      
    create ()
    {
        const logo = this.add.image(400, 150, 'logo');
      
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}

var config = {
    // type of display (webGL or canvas)
    type: Phaser.AUTO,
    // size of display (resolution)
    width: 800,
    height: 600,
    // place game into div called "gameArea" and center in middle of screen
    scale: {
        parent: "gameArea",
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    // make call to arcade physics system 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y : 300},
            debug: false
        }
    },

    scene: [TutorialScene, MainMenu, Preloader]
};

// this line is what 'runs' the game 
var game = new Phaser.Game(config);
