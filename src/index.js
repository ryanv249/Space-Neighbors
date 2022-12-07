import Phaser from 'phaser';

import {
    Preloader, MainMenu, TutorialScene, TestLevel,
    EarthLevel, MarsLevel, VenusLevel, MercuryLevel, JupiterLevel, SaturnLevel, UranusLevel, NeptuneLevel
} from "./scenes/";

var config = {
    // type of display (webGL or canvas)
    type: Phaser.AUTO,
    // size of display (resolution)
    width: 800,
    height: 600,
    // place game into div called gameArea and center in middle of screen
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

    scene: 
    [ 
        Preloader, MainMenu, TutorialScene, TestLevel,
        EarthLevel, MarsLevel, VenusLevel, MercuryLevel, JupiterLevel, SaturnLevel, UranusLevel, NeptuneLevel
    ]
};

// this line is what 'runs' the game 
var game = new Phaser.Game(config);
