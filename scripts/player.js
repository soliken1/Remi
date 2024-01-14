import { Sitting, Idling, Running, Jumping, Falling } from "./playerState.js"; //Player States Self Explanatory

export class Player {   //Exports the Player Class to the main.js script
    constructor(game) { //From the main.js script gets the game class and making the game class' variable accessible
        this.game = game;       //To this player.js script 
        this.width = 120;       //the player sprite's width and height;
        this.height = 120;      
        this.x = 0;    
        //Setting the origin position X of the player of coordinate 0;
        this.y = this.game.height - this.height - this.game.groundMargin;   
        //Setting the origin position of the player by this calculation the game's height = 500, 
        //the height of the player = 120
        //then the game's ground margin = 20;
        //Player's Coordinates is X = 0, Y = 360
        this.vy = 0;
        //Vertical Velocity of Player's Jump
        this.weight = 1;
        //And weight used for conditional statements if the player reaches an apex of the jump 
        //triggers the weight to make the player 'fall'
        this.image = document.getElementById('player');
        //Gets the sprite sheet of the player from the html file getting the img tagged id 'player'
        this.frameX = 0;
        this.frameY = 0;
        //Frame X and Y is to set the proper animation for the player example
        //The starting position of the png file is 0, 0 and the sprite sheet has a grid of 
        //120x120 hence, width and height of the player
        this.maxFrame;
        //MaxFrame is for the max animation of the current state of the player ex Running has a max sprite frame
        //of 7.
        this.fps = 15;
        //FPS Sets the animation frame to make the animation not extremely fast
        this.frameInterval = 1000/this.fps;
        //Interval of the animation i.e frequency of the animation's fps
        this.frameTimer = 0;
        //Timer of the animation to execute the next frame animation
        this.speed = 0;
        //Speed of the player
        this.maxSpeed = 10;
        //Player's max speed
        this.states = [new Sitting(this), new Idling(this), new Running(this), new Jumping(this), new Falling(this)];
        //States of the player when the user controls the character, these can be triggered by certain keys
        this.currentState = this.states[1];
        //Sets the current state of the player the index of states 1 which is new Idling(player/this class)
        this.currentState.enter();
        //Enter the current state of the player
    }

    //Update the movements of the player based on movements or set intervals
    update(input, deltaTime) {
        //Checks Collision
        this.checkCollision();
        this.currentState.handleInput(input);
        //Horizontal Movement
        this.x += this.speed;
        if (input.includes('A') || input.includes('a')) this.speed = -this.maxSpeed;
        else if (input.includes('D') || input.includes('d')) this.speed = this.maxSpeed;
        else this.speed = 0;
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        //Vertical Movement
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        //Sprite Animations
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context) {
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, 
                        this.x, this.y, 
                        this.height, this.width);
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x + this.width && 
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                enemy.markedForDeletion = true;
                this.game.score++;
            }else {
                //No Collision 
            }
        });
    }
}