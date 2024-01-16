class Particle {
    constructor(game) {
        this.game = game;
        this.x = this.game.player.x;
        this.y = this.game.player.y;
        this.fps = 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.width = 120;
        this.height = 120;
        this.image = document.getElementById('particles');

        this.markedForDeletion = false;
    }
    update(states, deltaTime) {
        //Particle Position Relative To The Player
        this.x = this.game.player.x;
        this.y = this.game.player.y;
        //Animation
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
}

export class Aura extends Particle {
    constructor(game) {
        super(game);
        this.game = game;
        this.frameY = 0;
        this.maxFrame = 9;
    }
    update(states, deltaTime) {
        super.update(states, deltaTime);
        if(states.state === 'ROLLING') {
            this.markedForDeletion = true;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, 
            this.x + 10, this.y + 20, this.height, this.width);
    }
}
export class Plunge extends Particle {

}
export class Starry extends Particle {
    constructor(game, x, y) {
        super(game); 
        this.size = Math.random() * 30 + 30;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgb(231, 29, 29, 0.1)';
    }
    update() {
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;
        if(this.size < 0.5) this.markedForDeletion = true;
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}
export class Pierce extends Particle {
    constructor(game) {
        super(game);
        this.game = game;
        this.frameY = 1;
        this.maxFrame = 9;
        this.offsetX = 60;
    }
    update(states, deltaTime) {
        this.checkCollision();
        super.update(states, deltaTime);
        if(states.state != 'ROLLING') {
            this.markedForDeletion = true;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, 
            this.x + this.offsetX, this.y, this.height, this.width);

        if(this.game.debug) context.strokeRect(this.x + this.offsetX, this.y, this.width, this.height)

    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x + this.offsetX + this.width && 
                enemy.x + enemy.width > this.offsetX &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                enemy.markedForDeletion = true;
                this.game.score++;
                console.log('true')
            }else {
                //No Collision 
            }
        });
    }
}