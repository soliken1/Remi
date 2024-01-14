const states = {
    SITTING: 0,
    IDLING:  1,
    RUNNING: 2, 
    JUMPING: 3,
    FALLING: 4,
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player) {
        super('SITTING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 1;
        this.player.maxFrame = 0;
    }
    handleInput(input) {
        if(input.includes('A') || 
           input.includes('a') ||
           input.includes('D') ||
           input.includes('d')
           ) {
            this.player.setState(states.RUNNING, 1);
        }
        if(input.includes('S') || input.includes('s') && 
          ((input.includes('D') || input.includes('d')) || 
          (input.includes('A') || input.includes('a')))) {
            this.player.speed = 0;
            this.player.setState(states.SITTING, 0);
        }
        else if (input.includes('W') || input.includes('w')) {
            this.player.setState(states.JUMPING, 1);
        } 
    }
}

export class Idling extends State {
    constructor(player) {
        super('IDLING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 0;
        this.player.maxFrame = 7;
    }
    handleInput(input) {
        if(input.includes('A') || 
           input.includes('a') ||
           input.includes('D') ||
           input.includes('d')
           ) {
            this.player.setState(states.RUNNING, 1);
        }
        else if(input.includes('S') || input.includes('s')) {
            this.player.setState(states.SITTING, 0);
        }
    }
}
export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.maxFrame = 7;
    }
    handleInput(input) {
        if (input.includes('W') || input.includes('w')) {
            this.player.setState(states.JUMPING, 1);
        } 
        else if(input.includes('S') || input.includes('s')) {
            this.player.setState(states.SITTING, 0);
        }
        else if(this.player.speed == 0) {
            this.player.setState(states.IDLING, 0);
        }
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }
    enter() {
        if(this.player.onGround()) this.player.vy -= 27;
        this.player.frameX = 0;
        this.player.frameY = 6;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        if(this.player.vy > this.player.weight) {
            this.player.setState(states.FALLING, 1);
           }
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 7;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        if(this.player.onGround()) {
            this.player.setState(states.RUNNING, 1);
           }
    }
}