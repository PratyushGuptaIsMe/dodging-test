export class PLAYER{
    constructor(game){
        this.game = game;
        this.x = this.game.canvas.width/2;
        this.y = this.game.canvas.height/2;
        this.width = 15;
        this.height = 15;1
        this.keysArray = this.game.keysArray;
        this.moveSpeed = 4;
        this.health = this.game.maxHealth;
        this.invincible = false;
        this.hurt = false;
        this.invisibilityTimer = 0;
        this.invisibilityInterval = 650;
        this.hurtBlinkingSpeed = 216;
        this.dead = false;
    }
    #hurt(deltatime){
        this.invisibilityTimer += deltatime;
        if(this.invisibilityTimer > this.invisibilityInterval){
            this.invisibilityTimer = 0;
            this.invincible = false;
        }
    }
    update(deltatime){
        this.keysArray = this.game.keysArray;

        if(this.health <= 0){
            this.health = 0;
            this.dead = true;
        }

        if(this.dead){
            return;
        }

        if(this.invincible){
            this.#hurt(deltatime);
        }

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
        ctx.save();
        ctx.lineWidth = 5;

        if(this.dead){
            ctx.fillStyle = "rgba(8, 0, 255, 1)";
            ctx.strokeStyle = "rgba(12, 3, 107, 1)";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.fillRect(this.x, this.y, this.width, this.height);
            return;
        }

        if(this.invincible){
            if(Math.floor(this.invisibilityTimer / this.hurtBlinkingSpeed) % 2 === 0){
                ctx.fillStyle = "rgba(249, 93, 93, 1)";
                ctx.strokeStyle = "rgba(253, 78, 47, 1)";
            }else{
                ctx.fillStyle = "rgb(255, 155, 155)";
                ctx.strokeStyle = "rgb(255, 142, 118)";
            }
        }else{
            ctx.fillStyle = "rgb(255, 59, 59)";
            ctx.strokeStyle = "rgb(178, 34, 34)";
        }

        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.restore();
    }

}