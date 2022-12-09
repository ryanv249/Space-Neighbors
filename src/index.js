import Phaser from 'phaser';

import {
    Preloader, MainMenu, TestLevel, ScoreDisplay,
    EarthLevel, MarsLevel, VenusLevel, MercuryLevel, JupiterLevel, SaturnLevel, UranusLevel, NeptuneLevel
} from "./scenes/";

var config = {
    // type of display (webGL or canvas)
    type: Phaser.AUTO,
    // size of display (resolution)
    width: 1200,
    height: 720,
    // place game into div called gameArea and center in middle of screen
    scale: {
        parent: "gameArea",
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    scene: 
    [ 
        Preloader, MainMenu, ScoreDisplay, TestLevel,
        EarthLevel, MarsLevel, VenusLevel, MercuryLevel, JupiterLevel, SaturnLevel, UranusLevel, NeptuneLevel
    ]
};

// this line is what 'runs' the game 
var game = new Phaser.Game(config);
