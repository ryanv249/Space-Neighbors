export default class DropQuestion{
    /**
     * Create a dropzone at xPos, yPos which StarCards can be dropped into.
     * @param {Phaser.Scene} scene 
     * @param {number} xPos 
     * @param {number} yPos 
     * @param {number} numRequired 
     * How many StarCards must be input.
     * @param {String} question 
     * The question to display on screen. 
     * @param {String[]} answers 
     * Array containing names of which StarCards are valid responses. Size must be >= numRequired.
     */
    constructor(scene, xPos, yPos, numRequired, question, answers){
        // store list of valid responses, number of responses required 
        this.answers = answers;
        this.numRequired = numRequired;
        // list of card names currently in zone 
        this.storedNames = [];
        // references to cards currently in zone
        this.storedCards = [];

        // create enclosing box 
        this.box = scene.add.rectangle(xPos, yPos, 350, 0, 0x00, 0.6);

        // create text
        this.text = scene.add.bitmapText(xPos, yPos, 'main_font_c', question, 15)
            .setOrigin(0.5)
            .setMaxWidth(300);

        // size box to text 
        this.box.height = this.text.height + 250;
        this.box.setOrigin(0.5);

        // create drop zone background visual 
        this.backDrop = scene.add.rectangle(xPos, yPos, 300, 180, 0x00)
            .setOrigin(0.5);

        // create drop zone 
        this.zone = scene.add.zone(xPos, yPos, 300, 180).setRectangleDropZone(300, 180)
            .setOrigin(0.5);

        // arrange items, place into container 
        Phaser.Display.Align.In.TopCenter(this.text, this.box, 0, -20);
        Phaser.Display.Align.In.BottomCenter(this.backDrop, this.box, 0, -20);
        Phaser.Display.Align.In.Center(this.zone, this.backDrop, 0, 0);

        // The positioning used here is the opposite of what works in StarCard. Here, the container is at 0,0 and everything else is at xPos,yPos 
        // Doing that in StarCard breaks things and placing everything but this container at xPos,yPos also breaks things, so IDK 

        this.container = scene.add.container(0, 0, [this.box, this.text, this.backDrop, this.zone]);
        this.container.setSize(this.box.displayWidth, this.box.displayHeight);
    }

    /**
     *  Calls setInteractive() on the zone, enabling drag hover highlight and drop
     *  @param {String} name 
     *  Name of container used to differentiate between DropQuestions. 
     *  Bad Things happen if non-unique names used!
     */
     enable(name){
        this.container.name = name;
        this.zone.setInteractive();

        // when inside dropzone, make it grey 
        this.zone.scene.input.on('dragenter', function(pointer, gameObject, dropZone){
            if(dropZone.parentContainer.name === this.container.name){
                // console.log('see');
                this.backDrop.setFillStyle(0x3B3B3B);
            }
        }, this);

        // back to black on exit 
        this.zone.scene.input.on('dragleave', function(pointer, gameObject, dropZone){
            if(dropZone.parentContainer.name === this.container.name){
                // console.log('saw');
                this.backDrop.setFillStyle(0x00);
            }
        }, this);

        // also back to black on drop
        this.zone.scene.input.on('drop', function(pointer, gameObject, dropZone){
            if(dropZone.parentContainer.name === this.container.name){
                // console.log('bang');
                this.backDrop.setFillStyle(0x00);

                if(this.addCard(gameObject)){
                    // card placed inside zone, store data 
                    this.recordAnswer(gameObject);
                }
                else{
                    // not possible to place inside zone. reset card position 
                    gameObject.setX(gameObject.startX);
                    gameObject.setY(gameObject.startY);
                }
            }
        }, this);

        // place card back if not dropped inside zone 
        this.zone.scene.input.on('dragend', function(pointer, gameObject, dropped){
            if(!dropped){
                gameObject.setX(gameObject.startX);
                gameObject.setY(gameObject.startY);
            }
        }, this);
    }


    /**
     * Store dropped StarCard info.
     * @param {StarCard.container} gameObject 
     */
     recordAnswer(gameObject){
        // planet can only be used for a given dropzone once. 
        // questions will be built around this. 

        if(!this.storedNames.includes(gameObject.list[1].text)){
            // update zone card lists  
            this.storedNames.push(gameObject.list[1].text);
            this.storedCards.push(gameObject);
            console.log('stored!');
        }
    }


    /**
     * Formats a given StarCard's position in this question's dropzone if there is room. 
     * @param {StarCard.container} gameObject 
     */
    addCard(gameObject){
        if(this.storedNames.length + 1 > this.numRequired){
            // cannot fit new card in zone. 
            return false;
        }
        else{
            // can fit card. place in zone according to number of currently stored cards 
            // fancy arranging!
            switch(this.storedNames.length + 1){
                case 1:
                    Phaser.Display.Align.In.Center(gameObject, this.zone, 0, 0);
                    break;
                case 2:
                    Phaser.Display.Align.In.LeftCenter(this.storedCards[0], this.zone, -30, 0);
                    Phaser.Display.Align.In.RightCenter(gameObject, this.zone, -30, 0);
                    break;
                case 3:
                    Phaser.Display.Align.In.TopLeft(this.storedCards[0], this.zone, -40, -20);
                    Phaser.Display.Align.In.TopRight(this.storedCards[1], this.zone, -40, -20);
                    Phaser.Display.Align.In.BottomCenter(gameObject, this.zone, 0, -20);
                    break;
                case 4:
                    Phaser.Display.Align.In.TopLeft(this.storedCards[0], this.zone, -35, -20);
                    Phaser.Display.Align.In.TopRight(this.storedCards[1], this.zone, -35, -20);
                    Phaser.Display.Align.In.BottomLeft(this.storedCards[2], this.zone, -35, -20);
                    Phaser.Display.Align.In.BottomRight(gameObject, this.zone, -35, -20);
                    break;
            }
            // remove interactivity on newly placed card
            gameObject.disableInteractive();
            gameObject.scene.input.setDraggable(gameObject, false);
            return true;
        }
    }


    /**
     * Remove incorrect answers. 
     * Formats positions of cards by calling addCard
     */
    removeCards(){
        let correctCards = [];
        let correctNames = [];
        for(let i = 0; i < this.storedNames.length; i++){
            if(this.answers.includes(this.storedNames[i])){
                // card is correct. keep it
                correctNames.push(this.storedNames[i]);
                correctCards.push(this.storedCards[i]);
            }
            // reset position of card (even if correct)
            this.storedCards[i].setX(this.storedCards[i].startX);
            this.storedCards[i].setY(this.storedCards[i].startY);
            // reenable card 
            this.storedCards[i].setInteractive();
            this.storedCards[i].scene.input.setDraggable(this.storedCards[i], true);
        }

        // required to reset arrays due to how addCard positioning works
        this.storedNames = [];
        this.storedCards = [];

        // put correct cards back into zone 
        for(let i = 0; i < correctNames.length; i++){
            // place card back into zone and storage
            this.addCard(correctCards[i]);
            this.storedNames.push(correctNames[i]);
            this.storedCards.push(correctCards[i]);
        }
    }


    /**
     * Checks if enough correct responses given
     * If true, make zone green and disable interactivity on itself and cards
     */
    checkResults(){
        for(let i = 0; i < this.storedNames.length; i++){
            if(this.answers.includes(this.storedNames[i])){
                // correct answer, keep checking
                continue;
            }
            else{
                // incorrect answer found. remove cards 
                this.removeCards();
                return;
            }
        }
        // if here, all given answers correct.
        // do we have the number of required responses?
        if(this.storedNames.length === this.numRequired){
            // this question is complete 

            // disable zone and make green 
            this.zone.disableInteractive();
            this.backDrop.setFillStyle(0x2FC325);
        }
    }
    
}