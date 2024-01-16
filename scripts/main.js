//Imports from local scripts i.e player, inputs, and background
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ObjectEnemy } from "./enemies.js";
import { UI } from "./UI.js";

//load everything before the page displays everything to avoid resource errors
window.addEventListener('load', function() {
    //canvas from index with id of canvas and get its context 2 dimensional and set its width and height
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1340;
    canvas.height = 500;

    //Creates game class with its width and height getting value from instantiated object below setting 
    //The game's width and height and variables setting as follows:

    //Ground Margin - offset for the player's ground baseline to stand on
    //Speed - world's speed based on player movements
    //Max Speed - the world's default max movespeed passed on player
    //Instantiated Classes to initialize and to be used and pass the game constructor's variables throughout
    //The scripts. Initialized Classes are Background to pass Game Class, Player to pass Game Class hence this keyword
    //Input Handler to initialize player movement keys
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 20;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1500;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.player.currentState = this.player.states[1];
            //Sets the current state of the player the index of states 1 which is new Idling(player/this class)
            this.player.currentState.enter();
            //Enter the current state of the player
        }

        //Update basically refreshes or update the canvas 60 frames per second and passes 
        //player the game's input keys and delta time from animation function below
        update(deltaTime) {
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //Handle Enemies
            if(this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
            });
            //Particle Handling
            this.particles.forEach(particle => {
                particle.update(this.player.currentState, deltaTime);
                if(particle.markedForDeletion) this.particles.splice(this.particles.indexOf(particle), 1)
            });
        }
        //Draw basically draws the background and player 
        //based on the variable context above drawing the 2d context
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.UI.draw(context)
        }
        addEnemy() {
            if(this.speed > 0 && Math.random() < 0.15) this.enemies.push(new GroundEnemy(this));
            else if(this.speed > 0 && Math.random() < 0.95) this.enemies.push(new ObjectEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    //Initialize the Game Class giving the canvas' width and height setting it on the constructor
    const game = new Game(canvas.width, canvas.height);

    //Limits the FPS of the animation of sprites instead of 60 fps refresh from sprites on the player script
    //the sprite runs 15 fps but the game runs on 60 fps. Functions gets a value when instantiated and 
    //run the deltaTime block.
    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime =  timeStamp - lastTime;
        lastTime = timeStamp;

        //Clears the canvas every frame then draw from context then update the game passing deltaTime
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.draw(ctx);
        game.update(deltaTime);
        //This function is already built-in on the js library where gets the frames and expects a function animate
        requestAnimationFrame(animate);
    }
    //Runs the animate function giving timeStamp a value of 0
    animate(0);
});