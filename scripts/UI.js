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
    }
}