import {bomb, dude, platform, sky, star} from "../assets/index";

export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialScene' });
    }
  
    preload ()
    {
        // load these things
        this.load.image('sky', sky);
        this.load.image('ground', platform);
        this.load.image('star', star);
        this.load.image('bomb', bomb);
        this.load.spritesheet('dude', 
            dude,
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    
    create ()
    {
        // display these things
        
        // objects are displayed according to their center. that is, this image is centered at (400,300) 
        this.add.image(400,300,'sky');
        
        
        // can use normal top-left drawing by appending .setOrigin(0,0) 
        // this image's top left corner is at (400,300)
        // this.add.image(400,300,'sky').setOrigin(0,0);
        
        // order matters here. 
        // this image is visible because it is on top of the sky object. 
        // if we were to place sky after this star, the star would be below it not be visible.
        // this.add.image(400,300,'star');
    
        // this.add.image is created a new Image Game Object and adding it to the current Scene's display list (where all Game Objects live)
        // can position images anywhere. will not be visible if outside bounds but will still exist within the scene 
        // Scene extends infinitely in all directions 
        // Camera system controls your view and you can move and zoom the active camera as required 
        // can create new cameras for other views into the Scene 
    
        // creates a new Static Physics Group assigned to local var platforms 
        var platforms = this.physics.add.staticGroup();
        
        // Arcade Physics has dynamic/static physics bodies:
        // Dynamic Bodies can move around via forces i.e., velocity/acceleration and can bounce/collide with other objects (collision influenced by mass of body and other elements)
        // Static Bodies simply have a position and size (unaffected by gravity, cannot have a velocity, never moves under a collision)
    
        // a Group allows for multiple objects to be controlled as a unit 
        // can check for collision between Groups and other game objects 
        // Groups can create their own game objects (Physics Groups auto create physics enabled children)
    
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        // adds ground image at (400,568) but we need it to go across the whole screen 
        // setScale(2) doubles each size parameter. it is now 800x64 which is enough to cover the screen 
        // need to call refreshBody() because we scaled a static physics body (need to tell the physics world about the changes we made)
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        // other platforms at good places to be jumped between 
    
        var player = this.physics.add.sprite(100,450, 'dude');
    
        player.setBounce(0.2);
        
        
    }
    
    update ()
    {
    }
}