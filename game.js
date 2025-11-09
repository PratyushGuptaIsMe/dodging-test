export class DODGING_TEST{
    constructor(CANVAS){
        this.canvas = CANVAS;
        this.player = new PLAYER(this)
        this.keysArray = [];
    }
    update(deltatime, ctx, keysArray){
        this.keysArray = keysArray;
        this.#draw(ctx);
        this.player.update(deltatime);
    }
    #draw(ctx){
        this.player.draw(ctx);
    }
}
class PLAYER{
    constructor(game){
        this.game = game;
        this.x = 40;
        this.y = 40;
        this.width = 15;
        this.height = 15;
        this.keysArray = this.game.keysArray;
        this.moveSpeed = 4;
    }
    update(deltatime){
        this.keysArray = this.game.keysArray;

        if(this.keysArray.includes("ArrowDown") || this.keysArray.includes("KeyS")){
            this.y += this.moveSpeed;
        }
        if(this.keysArray.includes("ArrowUp") || this.keysArray.includes("KeyW")){
            this.y -= this.moveSpeed;
        }
        if(this.keysArray.includes("ArrowRight") || this.keysArray.includes("KeyD")){
            this.x += this.moveSpeed;
        }
        if(this.keysArray.includes("ArrowLeft") || this.keysArray.includes("KeyA")){
            this.x -= this.moveSpeed;
        }

        if(this.x < 0){
            this.x = 0;
        }
        if(this.y < 0){
            this.y = 0;
        }
        if(this.x + this.width > this.game.canvas.width){
            this.x = -this.width + this.game.canvas.width;
        }
        if(this.y + this.height > this.game.canvas.height){
            this.y = -this.height + this.game.canvas.height;
        }

    }
    draw(ctx){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}