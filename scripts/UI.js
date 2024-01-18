export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 20;
        this.fontFamily = 'Helvetica';
    }
    draw(context) {
        context.save();
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = 'red';
        context.shadowBlur = 0;
        context.fillStyle = this.game.fontColor;
        //Score
        context.fillText('Score: ' + this.game.score, 20, 50);
        context.fillText('Movement: Arrow Keys | Attack: Space | Plunge: ^ + ⌄', 20, 75);
        context.fillText('Hitbox Toggle: G', 1100, 75);
        //Timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 100);
        context.fillText('Duration: 4:29 Minutes', 20, 120);
        //Game Over Message
        if(this.game.time >= 119500) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('Game Over Bud', this.game.width * 0.5, this.game.height * 0.5);

        }
        context.restore();
    }
}