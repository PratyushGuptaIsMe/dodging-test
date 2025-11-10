import { SQUARE, POLYGON, CIRCLE } from "./obstacles.js";
import { PLAYER } from "./player.js";

export class DODGING_TEST{
    constructor(CANVAS){
        this.canvas = CANVAS;
        this.player = new PLAYER(this)
        this.keysArray = [];
        this.elapsedTime = 0;

        this.OBSTACLE_ID_LIST = {
            polygon: 0,
            square: 1,
            circle: 2,
        }

        this.obstacles = [new POLYGON(this)];
    }
    update(deltatime, ctx, keysArray, elapsedTime){
        this.elapsedTime = elapsedTime;
        this.keysArray = keysArray;
        this.player.update(deltatime);
        this.collisionChecks();
        this.#draw(ctx);
    }
    collisionChecks(){
        this.obstacles.forEach((obstacle) => {
            this.#checkCollision(obstacle);
        })
    }
    #checkCollision(obstacle){
        if(obstacle.id === this.OBSTACLE_ID_LIST.square){
            
        }
        if(obstacle.id === this.OBSTACLE_ID_LIST.polygon){

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
        if(obstacle.id === this.OBSTACLE_ID_LIST.polygon){
            this.drawPolygon(ctx, obstacle);
        }
    }
    drawPolygon(ctx, obstacle){
        if(!obstacle.points || !obstacle.points.length){
            return;
        }

        ctx.beginPath();
        ctx.moveTo(obstacle.points[0].x, obstacle.points[0].y);

        for(let i = 1; i < obstacle.points.length; i++){
            ctx.lineTo(obstacle.points[i].x, obstacle.points[i].y);
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    drawTimer(ctx){
        ctx.font = "40px 'Hind Siliguri', sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "grey"
        ctx.fillText(this.elapsedTime.toFixed(2), 10, 10);
    }
}