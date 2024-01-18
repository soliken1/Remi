export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 20;
        this.fontFamily = 'Helvetica';
    }
    draw(context) {
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //Score
        context.fillText('Score: ' + this.game.score, 20, 50);
        context.fillText('Movement: Arrow Keys | Attack: Space', 20, 75);
        context.fillText('Hitbox Toggle: G', 1100, 75);
        //Timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + this.game.time, 20, 100);
        //Game Over Message
        if(this.game.gameOver) {
            console.log(this.game.gameOver);
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('Nice', this.game.width * 0.5, this.game.height * 0.5);
        }
    }
}