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

        this.desc = new TextBox(scene, descPos[0], descPos[1], 580, 'PC_c', 18, desc).container
            .setVisible(false);

        // looks better if not transparent 
        this.desc.list[0].setFillStyle(0x00, 1);

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
                    [specPos[0], specPos[1]], 'Water Cycle',
                    [descPos[0], descPos[1]], 
                    'Earth is very unique. For starters, its Moon is the 5th largest in the system at 1/3 the size of Earth! The other Terrestrial moons don\'t even compare: ' + 
                    'Mars\' 2 moons are tiny while Venus and Mercury don\'t even have moons! ' +
                    'It is the only local planet to currently have liquid water on its surface. \n\n' + 
                    'Earth\'s surface is fresh thanks to it\'s unique system of Plate Tectonics:\n' +
                    'Basically the rocks which make up Earth\'s inner layers are thin and wet enough to form into giant pieces which then break apart and rub into eachother. ' +
                    'This system is responsible for volcanoes and earthquakes. It is part of the reason why Earth has almost no craters on its surface: the top layer is always being replaced! ' + 
                    'The other part is the water cycle, which helps by weathering any rocks that come up to the surface.\n\nThe water cycle is made possible by Earth\'s unique atmosphere! ' +
                    'Earth\'s atmosphere is 78% Nitrogen and 21% Oxygen, which is very different from the other terrestrial (rocky) planets: ' + 
                    'Both Mars and Venus have atmospheres which are 95% C02 while Mercury basically doesn\'t have an atmosphere. Earth really is special!'
                    );
            break;
        case 'Mars':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'mars_lg', 0.5,
                    [namePos[0], namePos[1]], 'Mars', 
                    [specPos[0], specPos[1]], 'Ancient Surface Water',
                    [descPos[0], descPos[1]], 
                    'Mars is about 1/2 the size of Earth but they have many other things in common. ' +
                    'Mars has clouds, sediment layers, sand dunes, volcanoes, and even polar ice caps which react to Earth-like seasons. ' + 
                    'Martian days are almost the same length as Earth days! But maybe the most important similarity with Earth is the evidence of water: ' +
                    'Mars is currently believed to have had liquid water flowing on its surface in the past, just like Earth does now!\n\n' +
                    'Mars has an incredibly large canyon on its surface called "Valles Marineris." It is 5x as deep as the Grand Canyon and is about the size of the USA! ' + 
                    'We believe that it was formed due to the lack of Martian Plate Tectonics. Basically the Martian crust is too thick to slide over itself like on Earth which means what began as a crack in the surface grew into a country-sized valley! ' +
                    'On a related note, that extra thickness is why Mars can support "Olympus Mons" which is a volcano 2x taller than Mt. Everest!'
                    );
            break;
        case 'Venus':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'venus_lg', 0.5,
                    [namePos[0], namePos[1]], 'Venus', 
                    [specPos[0], specPos[1]], 'Hottest Surface',
                    [descPos[0], descPos[1]], 
                    'Venus is seen as Earth\'s sister planet due to certain similarities they have. However Venus is overall very different from her Sister. ' + 
                    'Notably Venus has the hottest surface temperature in the system: hot enough to melt lead! Even Mercury (closest planet to the Sun) does not get as hot. ' +
                    'The reason Venus is so hot is because of its atmosphere. Venus\' atmosphere is 95% Carbon Dioxide which means that it traps heat super well!\n\n'+
                    'On top of that the atmosphere is so dense that air pressure on the surface is 90x that of Earth! Standing on Venus\' surface is like being at the bottom of a sea of lava. ' +
                    'Even light itself can\'t make it to the surface without problems. Almost all blue light gets absorbed by the thick clouds (which are made of battery acid by the way) and so Venus is very orange!\n\n' +
                    'Those clouds also stop us from seeing Venus. But from what we can tell Venus has volcanoes and a surface which gets constantly replaced like Earth. ' + 
                    'However Plate Tectonics would not be possible with how dry Venus is and so we are not sure exactly how Venus\' volcanoes work. Either way some of them are larger than Earth\'s tallest mountains!'                   
                    );
            break;
        case 'Mercury':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'mercury_lg', 0.5,
                    [namePos[0], namePos[1]], 'Mercury', 
                    [specPos[0], specPos[1]], 'Closest to the Sun',
                    [descPos[0], descPos[1]], 
                    'Mercury is so small and so close to the Sun that it\s atmosphere was blown away a long time ago. ' +
                    'Mercury has many weird properties being so close to the Sun. Mercury has a type of orbit which causes a Mercurian day to be 2/3 the length of a Mercurian year. ' +
                    'Since one year is 88 Earth-days a Mercurian day lasts 2 Earth-months! During those 88 days one side of Mercury is constantly in light while the other is not. ' +
                    'In other words a spot on Mercury experiences 88 days of burning sunlight followed by 88 days of freezing darkness.\n\n' + 
                    'Mercury is very dense for its size. Its core is 75% of its diameter! We believe that at some point Mercury was struck by a massive asteroid which blew off most of its crust. ' +
                    'We believe that this impact created both a large hole called "Caloris Basin" and very strange cracks and wrinkles on the opposite side of Mercury from it.\n\n' +
                    'Overall Mercury has a very scarred surface and looks very similar to Earth\'s moon. Mercury is also the smallest planet at only 1/3 the size of Earth!'
                    );
            break;
        case 'Jupiter':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'jupiter_lg', 0.5,
                    [namePos[0], namePos[1]], 'Jupiter',
                    [specPos[0], specPos[1]], '71% of planet mass',
                    [descPos[0], descPos[1]], 
                    'Jupiter is both the largest and most massive planet. It is about 11x the size of Earth and has 2x the mass of all other planets combined. ' +
                    'The 4 rocky planets are known as Terrestrial Planets because Terra is another name for Earth. We call them that because Earth is the most special rocky planet. ' +
                    'Similarly the 4 gas giant planets are known as Jovian Planets because Jove is another name for Jupiter and Jupiter is the most special one. ' + 
                    'One reason for this is that Jupiter has the largest and most diverse satelite system which contains the largest moon Ganymede! \n\n' +
                    'Like all gas giants Jupiter is a literal planet of storms.\nThe Great Red Spot is a massive hurricane which has lasted for over 300 years! ' +
                    'Jupiter has lightning that is much stronger than Earth\'s but it is actually rarer. In fact Jupiter doesn\'t even have the most intense winds in the system! \n\n' +
                    'Jupiter has a very strong magnetic field due to a layer of liquid "metallic"\nhydrogren near its core. Basically Jupiter is so massive that the atmospheric pressure near the core is enough to force gases into a weird sludge-like state which conducts electricity super well!'
                    );
            break;
        case 'Saturn':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'saturn_lg', 0.2,
                    [namePos[0], namePos[1]], 'Saturn', 
                    [specPos[0], specPos[1]], 'Awesome Rings',
                    [descPos[0], descPos[1]], 
                    'Saturn is the second largest planet but despite its size it is actually the least dense planet. Saturn would literally float in water! ' +
                    'It is also the most oblate (stretched out) gas giant. It is 10x the size of Earth but only has a 10.5 Earth-hour day! It is spinning incredibly fast.\n\n' + 
                    'Saturn is similar to Jupiter in several ways. They have similar atmospheres, storms which last for hundreds of years, and Saturn even has a similar "sludge" layer. ' + 
                    'However since Saturn is further from the Sun it is less colorful due to receiving less energy (causing fewer of the reactions which produce the color).\n\n' + 
                    'Saturn\'s most unique feature is its remarkable ring system. They are by far the brightest in the system and consist of objects of a wide range of sizes. ' +
                    'The rings are mostly ice but contain objects of different sizes all the way up to Titan, a huge moon!'
                    );
            break;
        case 'Uranus':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'uranus_lg', 0.5,
                    [namePos[0], namePos[1]], 'Uranus',
                    [specPos[0], specPos[1]], 'Side Spinner',
                    [descPos[0], descPos[1]], 
                    'Uranus\'s most unique attribute is its axis of rotation. Earth rotates at an angle of about 23.5 degrees, with all other planets being similar (though Mercury is at 0 degrees). ' + 
                    'Uranus rotates at an angle of 98 degrees. This means that it is effectively lying on its side! ' + 
                    'We have a couple different ideas about how this happened but we aren\'t sure just yet. One possibility is some kind of impact, similar to what might\'ve happened to Mercury!\n\n' +
                    'The biggest effect of this angle is that seasons on Uranus last for an extremely long time. ' +
                    'Each hemisphere (half) of Uranus will experience 20 years of summer followed by 20 years of winter! ' +
                    'Despite this, when we last measured Uranus, we found that the temperature was extremely even across the planet. It is not like Mercury which is half burning and half freezing!\n\n' + 
                    'Uranus is very far from the Sun. It is so cold that much of the gas in its atmosphere actually exists as ice! It also has rings but they are very dark due to the cold.'
                    );
            break;
        case 'Neptune':
            ret = new PlanetDescription(scene, 
                    [imgPos[0], imgPos[1]], 'neptune_lg', 0.5,
                    [namePos[0], namePos[1]], 'Neptune',
                    [specPos[0], specPos[1]], 'Diamond Rain',
                    [descPos[0], descPos[1]], 
                    'Neptune is by far the furthest planet from the Sun. It is so far away that it wasn\'t until 1989 that we got a probe close enough to learn about it. ' +
                    'Neptune is so blue because of the high concentration of Methane in its atmosphere. It actually only receives 3% of the energy from the Sun that Jupiter gets. ' + 
                    'Despite this, Neptune is a crazy planet.\n\nNeptune has the fastest winds in the solar system (1300 mph!) and maintains an incredibly violent atmosphere. ' + 
                    'It might actually rain diamonds on Neptune! We have no idea how it is possible for Neptune to sustain such a climate when it barely receives any sunlight.\n\n' +
                    'Neptune is even stranger when compared to Uranus. Uranus is nearly featureless due to how calm it is from a lack of energy, while Neptune looks more like a blue Saturn! ' + 
                    'Neptune and Uranus are nearly the same size and composition with similar magnetic fields and temperature (despite the massive difference in position) and yet are still so different. ' +
                    'Neptune might be the most mysterious planet in the system.'
                    );
            break;
        default:
            ret = null;
            break;
    }
    return ret;
}