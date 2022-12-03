import {
    bomb, dude, platform, sky, star,
    PC_png_blk, PC_png_wte, PC_png_cyn, PC_xml,
    notebook,
    } from "../assets/";

export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialScene' });
    }
    
  
    preload ()
    {
        // load these things for display
        this.load.image('sky', sky);
        this.load.image('ground', platform);
        this.load.image('star', star);
        this.load.image('bomb', bomb);
        this.load.spritesheet('dude', 
            dude,
            { frameWidth: 32, frameHeight: 48 }
        );

        this.load.image('notebook', notebook);

        // load 3 'different' fonts
        // just the color is different. this is a workaround to enable different colored text in canvas 
        // if webgl rendering worked, could just set tint and use a single font lol 
        this.load.bitmapFont('MenuFontBlk', PC_png_blk, PC_xml);
        this.load.bitmapFont('MenuFontWte', PC_png_wte, PC_xml);
        this.load.bitmapFont('MenuFontCyn', PC_png_cyn, PC_xml);

        // can do this in create, but i think it being here makes sense. this is basically an init function, right?
        this.score = 0;
        this.gameOver = false;
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
        this.platforms = this.physics.add.staticGroup();
        
        // Arcade Physics has dynamic/static physics bodies:
        // Dynamic Bodies can move around via forces i.e., velocity/acceleration and can bounce/collide with other objects (collision influenced by mass of body and other elements)
        // Static Bodies simply have a position and size (unaffected by gravity, cannot have a velocity, never moves under a collision)
    
        // a Group allows for multiple objects to be controlled as a unit 
        // can check for collision between Groups and other game objects 
        // Groups can create their own game objects (Physics Groups auto create physics enabled children)
    
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        // adds ground image at (400,568) but we need it to go across the whole screen 
        // setScale(2) doubles each size parameter. it is now 800x64 which is enough to cover the screen 
        // need to call refreshBody() because we scaled a static physics body (need to tell the physics world about the changes we made)
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        // other platforms at good places to be jumped between 
    
        // make dynamic sprite object
        // given a body property, a reference to its Arcade Physics Body  (Arcade Physics because thats what we chose. Impact and Matter.js are other defult physics plugins)
        // this Body represents the sprite in the Arcade Physics Engine
        // can add gravity to this player specifically through player.body.setGravityY()   <-- higher = heavier   
        // note: gravity already set to 300 in this game's config 
        this.player = this.physics.add.sprite(100,450, 'dude');
    
        // set collision bounciness
        this.player.setBounce(0.2);
        // sprite will interact with edge of scene  
        this.player.setCollideWorldBounds(true);
        // player will not interact with static bodies unless we tell Phaser we want them to 
        // if platforms were dynamic, player and platforms would bounce around eachother by default
        // we create a Collider object to monitor these physics objsects and check for collisions/overlap (can invoke callbacks)
        // performs separation between objects passed. if given a group, watches all group members 
        this.physics.add.collider(this.player, this.platforms);

        // create an animation called left which uses the first 3 sprites contained within the dude spritesheet
        // this is a global creation; visible and usable in all scenes 
        this.anims.create({
            // name of animation
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            // this animation will loop
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
        // phaser has a built-in Keyboard manager (handling events is very simple)
        // listen to up, down, left, right, space, and shift keys 
        this.cursors = this.input.keyboard.createCursorKeys();

        // give player a goal: stars to grab 
        this.stars = this.physics.add.group({
            // this is a config object which we are creating and then passing to the .add.group() function
            // populate the dynamic physics group stars with children who use the 'star' texture 
            key: 'star',
            // always makes 1 child, so 11 repeats = 12 children in total
            repeat: 11,
            // child 1: (12, 0)
            // child 2: (82, 0)
            // etc. y will default to x. steps are optional, can iterate starting from a specific index and even iterate backwards (see doc)
            setXY: {x: 12, y: 0, stepX: 70}
        });

        // give each child a random vertical bounciness [)
        this.stars.children.iterate(function(child){
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // allow stars to collide with platforms 
        this.physics.add.collider(this.stars, this.platforms);

        // check if player coords overlapping with star, collectStar is callback function 
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        // create a Text Game Object at (16, 16) with the starting text Score: 0 and following style 
        // default font is Courier
        // this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        // ^ bitchmode. real men download ttf file from dafont.com and export png and xml from snowb.org 
        // position, name of font to be used, font size   
        // this is also a Bitmap Text Game Object, there is a difference!
        this.scoreText = this.add.bitmapText(16, 16, 'MenuFontBlk', 'Score: 0', 32);

        // create dynamic object group which will store the bombs we release
        this.bombs = this.physics.add.group();

        // bombs will need to bounce off platforms 
        this.physics.add.collider(this.bombs, this.platforms);

        // bombs will call hitBomb callback function when hitting player
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);


        // mouse event experiments 
        this.notes = this.add.image(400, 300, 'notebook');
        this.notes.setInteractive();
        

        
        this.notes.on('pointerdown', function(pointer){
            // get the scene manager through the scene of this object
            // WHY THESE 2 VERY DIFFERENT THINGS THE SAME NAME 
            
            // kill current scene, start from beginning 
            // this.scene.scene.restart();

            // kill current scene, start PreloadScene 
            // this.scene.scene.start('PreloadScene');

            // start PreloadScene. runs in parallel with current scene 
            // this.scene.scene.launch('PreloadScene');

            // PreloadScene accessible because passed to game in index. 
            // that is the scene list!
        });

        this.notes.on('pointerover', function(pointer){
            console.log(this);
            this.scene.player.setTint(0xff0000);
        });

        this.notes.on('pointerout', function(pointer){
            this.scene.player.clearTint();
            this.setPosition(this.x + 20, this.y);
        });


    }
    
    update ()
    {
        if(this.gameOver){
            // dead! 
            return;
        }
        // use to avoid typing this so many times 
        let p = this.player;
        
        if(this.cursors.left.isDown){
            p.setVelocityX(-160);
            p.anims.play('left', true);
        }
        else if(this.cursors.right.isDown){
            p.setVelocityX(160);
            p.anims.play('right', true);
        }
        else{
            // if player isnt moving, turn to face camera
            p.setVelocityX(0);
            p.anims.play('turn');
        }
        // up key is pressed and player is colliding with other body (NOT world bounds)
        // negative velocity = go up 
        if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-370);
        }
    }

    /**
     * callback function invoked when player grabs star
     * @param {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} player 
     * @param {Phaser.GameObjects.GameObject} star 
     * param desc 2
     * 
     */
    collectStar(player, star){
        // disable physics body of star and make parent Game Object both inactive and invisible 
        // will trigger on player if not passed in, lol
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        
        // toggles color of text display depending on score. 
        // uses different fonts because cant set tint in canvas rendering mode (this is my workaround)
        if(this.score % 20 === 0){
            this.scoreText.setFont('MenuFontCyn');
        }
        else{
            this.scoreText.setFont('MenuFontWte');
        }

        // if no more active children in stars group  (passing false lets you check for number of inactive)
        if(this.stars.countActive(true) === 0){
            // we want to turn back on all the stars and then send in a bomb. this is the gameplay loop 

            this.stars.children.iterate(function (child) {
                // turn this child's body active again
                // also set its coordinates to x,y and activate / make visible the child itself
                child.enableBody(true, child.x, 0, true, true);

            });

            // choose random x to start bomb at depending on player position
            // just outside cuz long line 
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            // fully elastic collisions and give it a random x velocity
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

            // starting with black text again cuz why not 
            this.scoreText.setFont('MenuFontBlk');
        }


    }

        /**
     * callback function invoked when bomb hits player
     * @param {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} player 
     * param desc 1
     * @param {Phaser.GameObjects.GameObject} bomb 
     */
    hitBomb(player, bomb){
        // stop game
        this.physics.pause();

        // face screen and become red when dead 
        this.player.setTint(0xFF0000);
        player.anims.play('turn');

        // stops update() from doing anything
        this.gameOver = true;

    }

}