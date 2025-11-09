export class DODGING_TEST{
    constructor(CANVAS){
        this.canvas = CANVAS;
        this.player = new PLAYER(this)
        this.keysArray = [];
        this.elapsedTime = 0;

        this.OBSTACLE_ID_LIST = {
            square: 1,
            circle: 2,
        }

        this.obstacles = [new CIRCLE(this)];
    }
    update(deltatime, ctx, keysArray, elapsedTime){
        this.elapsedTime = elapsedTime;
        this.keysArray = keysArray;
        this.player.update(deltatime);
        this.collisionChecks();
        this.#draw(ctx);
        console.log(this.player.health);
    }
    collisionChecks(){
        this.obstacles.forEach((obstacle) => {
            this.#checkCollision(obstacle);
        })
    }
    #checkCollision(obstacle){
        if(obstacle.id === this.OBSTACLE_ID_LIST.square){
            
        }
        if(obstacle.id === this.OBSTACLE_ID_LIST.circle){
            if(((obstacle.x - Math.max(this.player.x, Math.min(obstacle.x, this.player.x + this.player.width))) ** 2 +
            (obstacle.y - Math.max(this.player.y, Math.min(obstacle.y, this.player.y + this.player.height))) ** 2)
            < (obstacle.radius ** 2)
            ){
                this.#damagePlayer(obstacle.damage);
                this.player.invincible = true;
            }
        }
    }
    #damagePlayer(damage){
        if(this.player.invincible === true){
            return;
        }
        this.player.health -= damage;
    }
    #draw(ctx){
        this.drawTimer(ctx);
        this.drawObstacles(ctx);
        this.player.draw(ctx);
    }
    drawObstacles(ctx){
        this.obstacles.forEach((obstacle) => {
            this.#drawObstacle(obstacle, ctx);
        })
    }
    #drawObstacle(obstacle, ctx){
        ctx.fillStyle = obstacle.Fcolor;
        ctx.strokeStyle = obstacle.Ocolor;
        ctx.lineWidth = obstacle.lineWidth;
        if(obstacle.id === this.OBSTACLE_ID_LIST.square){
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.length, obstacle.length);
            ctx.strokeRect(obstacle.x, obstacle.y, obstacle.length, obstacle.length);
        }
        if(obstacle.id === this.OBSTACLE_ID_LIST.circle){
            ctx.beginPath();
            ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    }
    drawTimer(ctx){
        ctx.font = "40px 'Hind Siliguri', sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "grey"
        ctx.fillText(this.elapsedTime.toFixed(2), 10, 10);
    }
}
class PLAYER{
    constructor(game){
        this.game = game;
        this.x = this.game.canvas.width/2;
        this.y = this.game.canvas.height/2;
        this.width = 15;
        this.height = 15;
        this.keysArray = this.game.keysArray;
        this.moveSpeed = 4;
        this.health = 100;
        this.invincible = false;
        this.hurt = false;
        this.invisibilityTimer = 0;
        this.invisibilityInterval = 650;
        this.hurtBlinkingSpeed = 150;
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

        if(this.invincible){
            if(Math.floor(this.invisibilityTimer / this.hurtBlinkingSpeed) % 2 === 0){
                ctx.fillStyle = "rgba(249, 93, 93, 1)";
                ctx.strokeStyle = "rgba(253, 78, 47, 1)";
                ctx.strokeRect(this.x, this.y, this.width, this.height);
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            return;
        }
        
        ctx.fillStyle = "rgb(255, 59, 59)";
        ctx.strokeStyle = "rgb(178, 34, 34)";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.restore();
    }

}

class OBSTACLES{
    constructor(game){
        this.game = game;
        this.canvas = this.game.canvas;

        this.Fcolor = "rgba(0, 0, 255, 1)";
        this.Ocolor = "rgba(0, 0, 174, 1)";
        this.lineWidth = 4;
    }
}

class SQUARE extends OBSTACLES{
    constructor(game){
        super(game);
        this.id = this.game.OBSTACLE_ID_LIST.square; 

        this.x = 100;
        this.y = 100;
        this.length = 100;
        
        this.damage = 10;
    }
}

class CIRCLE extends OBSTACLES{
    constructor(game){
        super(game);
        this.id = this.game.OBSTACLE_ID_LIST.circle;
        
        this.x = 200;
        this.y = 200;
        this.radius = 40;

        this.damage = 10;
    }
}