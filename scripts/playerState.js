import { Starry, Pierce } from "./particles.js";
const states = {
    SITTING: 0,
    IDLING:  1,
    RUNNING: 2, 
    JUMPING: 3,
    FALLING: 4,
    ROLLING: 5,
    DASHING: 6,
    HIT: 7,
}

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
        this.pierceActive = false;
    }
}

export class Sitting extends State {
    constructor(game) {
        super('SITTING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 1;
        this.game.player.maxFrame = 0;
    }
    handleInput(input) {
        if(input.includes('ArrowLeft')  || 
           input.includes('ArrowRight') 
           ) {
            this.game.player.setState(states.RUNNING, 1);
        }
        else if (input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING, 1);
        }
        else if(input.includes('Enter')) {
            this.game.player.setState(states.ROLLING, 2);
        }
        if(input.includes('ArrowDown') && 
        (input.includes('ArrowLeft') || input.includes('ArrowRight'))) {
        this.game.player.speed = 0;
        this.game.player.setState(states.SITTING, 0);
        } 
    }
}

export class Idling extends State {
    constructor(game) {
        super('IDLING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 0;
        this.game.player.maxFrame = 7;    
    }
    handleInput(input) {
        if(input.includes('ArrowLeft')  || 
           input.includes('ArrowRight') 
           ) {
            this.game.player.setState(states.RUNNING, 1);
        }
        else if(input.includes('ArrowDown')) {
            this.game.player.setState(states.SITTING, 0);
        }
        else if (input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING, 1);
        }
        else if(input.includes(' ')) {
            this.game.player.setState(states.ROLLING, 2.5);
        }
    }
}
export class Running extends State {
    constructor(game) {
        super('RUNNING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 7;
    }
    handleInput(input) {
        if (input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING, 1);
        } 
        else if(input.includes('ArrowDown')) {
            this.game.player.setState(states.SITTING, 0);
        }
        else if(input.includes(' ')) {
            this.game.player.setState(states.ROLLING, 2.5);
        } 
        else if(this.game.player.speed === 0) {
            this.game.player.setState(states.IDLING, 0);
        }
    }
}

export class Jumping extends State {
    constructor(game) {
        super('JUMPING', game);
    }
    enter() {
        if(this.game.player.onGround()) this.game.player.vy -= 27;
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
    }
    handleInput(input) {
        if(this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING, 1);
        }
        else if(input.includes(' ')) {
            this.game.player.setState(states.ROLLING, 2.5);
        }
        else if(!input.includes(' ') && (input.includes('ArrowLeft') || input.includes('ArrowRight')) && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        } 
    }
}

export class Falling extends State {
    constructor(game) {
        super('FALLING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 7;
        this.game.player.maxFrame = 6;
    }
    handleInput(input) {
        if(this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        }
    }
}

export class Rolling extends State {
    constructor(game) {
        super('ROLLING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 8;
        this.game.player.maxFrame = 7;
    }
    handleInput(input) {
        if(this.pierceActive === false) {
            this.game.particles.push(new Pierce(this.game));
            this.pierceActive = true;
        }
        if(!input.includes(' ')) {
            this.game.player.setState(states.RUNNING, 1);
            this.pierceActive = false;
        }
        else if(!input.includes(' ')) {
            this.game.player.setState(states.FALLING, 1);
        }
        else if(input.includes(' ') && input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vy -= 27;
        }
        this.game.particles.push(new Starry(this.game, this.game.player.x + this.game.player.width * 0.3, this.game.player.y + this.game.player.height * 0.5));
    }
}