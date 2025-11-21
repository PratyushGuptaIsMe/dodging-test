import { POLYGON, CIRCLE } from "./obstacles.js";
import { PLAYER } from "./player.js";

export class DODGING_TEST{
    constructor(CANVAS){
        this.canvas = CANVAS;
        this.keysArray = [];
        this.elapsedTime = 0;
        this.gameoverTextSize = 25;
        this.maxGameoverTextSize = 120;

        this.patternRunning = true;
        this.currentPattern = '';
        this.bulletTimer = 0;
        this.bulletInterval = 100;

        this.bulletFanAngle = 90;
        this.bulletFanBulletDirection = 1; 

        this.OBSTACLE_ID_LIST = {
            polygon: 0,
            circle: 1,
        }
        this.maxHealth = 100;

        this.player = new PLAYER(this);
        this.obstacles = [new POLYGON(this, [{ x: 150, y: 80 },{ x: 220, y: 200 },{ x: 80, y: 200 }], 10, 'side-burst', 1, 10)];
    }
    update(deltatime, ctx, keysArray, elapsedTime){
        if(!this.dead){
            this.elapsedTime = elapsedTime;
            this.keysArray = keysArray;
        }
        if(this.player.dead){
            this.dead = true;
        }

        if(this.patternRunning === true){
            this.#determinePatternVairables();
            this.#determineBulletInterval();
            this.#determineBulletPattern();
            this.runSpawnerPatterns(deltatime);
        }

        this.player.update(deltatime);
        this.obstacles.forEach((obstacle) => {
            obstacle.update(deltatime);
        })
        if(this.dead){
            if(this.gameoverTextSize < this.maxGameoverTextSize){
                this.gameoverTextSize++;
            }
            this.#draw(ctx);
            return;
        }
        this.#draw(ctx);
        this.collisionChecks();
    }

    #determinePatternVairables(){
        this.bulletFanAngle += this.bulletFanBulletDirection * 2;

        if(this.bulletFanAngle >= 180){
            this.bulletFanBulletDirection = -1;
        }
        if(this.bulletFanAngle <= 0){
            this.bulletFanBulletDirection = 1;
        }
    }

    #determineBulletInterval(){

    }

    #determineBulletPattern(){
        this.currentPattern = 'bullet-fan-1';
    }

    spawnBullets(){
        let newObj;
        if(this.currentPattern === 'bullet-fan-1'){
            let x = this.canvas.width/2;
            let y = 0;
            let points = [{x: x, y: y}, {x: x+10, y: y}, {x: x+10, y: y+10}, {x: x, y: y+10}];

            let angle = this.bulletFanAngle;
            let direction = 1;
            newObj = new POLYGON(this, points, 10, 'bullet-fan', angle, x, y, direction)
        }
        this.obstacles.push(newObj);
    }

    runSpawnerPatterns(deltatime){
        this.bulletTimer += deltatime;
        if(this.bulletTimer >= this.bulletInterval){
            this.bulletTimer = 0;
            this.spawnBullets();
        }
    }

    collisionChecks(){
        this.obstacles.forEach((obstacle) => {
            if(this.#checkCollision(obstacle)){
                this.#damagePlayer(obstacle.damage);
                this.player.invincible = true;
            };
        })
    }
    #checkCollision(obstacle){
        if(obstacle.id === this.OBSTACLE_ID_LIST.polygon){
            if(this.#checkPolygonCollision_SAT(obstacle)){
                return true;
            }
        }
        if(obstacle.id === this.OBSTACLE_ID_LIST.circle){
            if(((obstacle.x - Math.max(this.player.x, Math.min(obstacle.x, this.player.x + this.player.width))) ** 2 +
            (obstacle.y - Math.max(this.player.y, Math.min(obstacle.y, this.player.y + this.player.height))) ** 2)
            < (obstacle.radius ** 2)
            ){
                return true;
            }
        }

        return false;
    }
    #checkPolygonCollision_SAT(obstacle) {
        const rectPoints = [
            { x: this.player.x, y: this.player.y },
            { x: this.player.x + this.player.width, y: this.player.y },
            { x: this.player.x + this.player.width, y: this.player.y + this.player.height },
            { x: this.player.x, y: this.player.y + this.player.height }
        ];
        const polygon = obstacle.points;

        if(!polygon || !polygon.length){
            return false;
        };

        const allPoints = polygon.concat(rectPoints);

        for(let i = 0; i < allPoints.length; i++){
            const p1 = allPoints[i];
            const p2 = allPoints[(i + 1) % allPoints.length];
            const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
            const axis = { x: -edge.y, y: edge.x };
            let minR = rectPoints[0].x * axis.x + rectPoints[0].y * axis.y;
            let maxR = minR;

            for(let j = 1; j < rectPoints.length; j++){
                const proj = rectPoints[j].x * axis.x + rectPoints[j].y * axis.y;
                if(proj < minR){
                    minR = proj;
                }
                if(proj > maxR){
                    maxR = proj;
                };
            }

            let minP = polygon[0].x * axis.x + polygon[0].y * axis.y;
            let maxP = minP;
            for(let j = 1; j < polygon.length; j++){
                const proj = polygon[j].x * axis.x + polygon[j].y * axis.y;
                if(proj < minP){
                    minP = proj;
                }
                if(proj > maxP){
                    maxP = proj;
                }
            }

            if(maxR < minP || maxP < minR){
                return false;
            }
        }

        return true;
    }


    #damagePlayer(damage){
        if(this.player.invincible === true){
            return;
        }
        this.player.health -= damage;
    }
    
    #draw(ctx){
        this.drawTimer(ctx);
        this.drawHPBAR(ctx);
        this.drawObstacles(ctx);
        this.player.draw(ctx);
        if(this.dead){
            this.#renderGameOverScreen(ctx);
        }
    }
    drawObstacles(ctx){
        this.obstacles.forEach((obstacle) => {
            obstacle.draw(ctx);
        })
    }
    #renderGameOverScreen(ctx){
        const gameoverText = "GAME OVER!";
        const timeText = "Time survived: " + this.elapsedTime.toFixed(2) + " seconds";
        const gtx = 0;
        const gty = -this.canvas.height * 0.08;
        const stx = 0;
        const sty = this.canvas.height * 0.08;

        ctx.save();
        ctx.lineWidth = 2;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.strokeStyle = "rgb(255, 165, 0)";
        ctx.font = `bold ${this.gameoverTextSize}px "Jersey 15", sans-serif`;
        ctx.fillText(gameoverText, this.canvas.width / 2 + gtx, this.canvas.height / 2 + gty);
        ctx.strokeText(gameoverText, this.canvas.width / 2 + gtx, this.canvas.height / 2 + gty);
        ctx.fillStyle = "#ffd700";
        ctx.strokeStyle = "#ff8c00";
        ctx.font = `bold ${this.gameoverTextSize * 0.85}px "Jersey 15", sans-serif`;
        ctx.fillText(timeText, this.canvas.width / 2 + stx, this.canvas.height / 2 + sty);
        ctx.strokeText(timeText, this.canvas.width / 2 + stx, this.canvas.height / 2 + sty);
        ctx.restore();
    }
    drawTimer(ctx){
        ctx.font = "40px 'Hind Siliguri', sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "grey"
        ctx.fillText(this.elapsedTime.toFixed(2), 10, 10);
    }
    drawHPBAR(ctx){
        let width = 250;
        let height = 30;
        let x = (this.canvas.width - width) / 2;
        let y = 10;

        ctx.save();

        ctx.fillStyle = "#2a2a2a";
        ctx.fillRect(x, y, width, height);

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000";
        ctx.strokeRect(x, y, width, height);
        let hpWidth;
        let text;
        if(this.player.health <= 0){
            hpWidth = width * (0 / this.maxHealth);
            text = `0 / ${this.maxHealth}`;
        }else{
            hpWidth = width * (this.player.health / this.maxHealth);
            text = `${this.player.health} / ${this.maxHealth}`;
        }
        ctx.fillStyle = "#e63946";
        ctx.fillRect(x, y, hpWidth, height);
        
        ctx.font = "bold 16px Minecraftia, sans-serif";
        ctx.textAlign = "center";

        let m = ctx.measureText(text);
        let textY = y + height / 2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;

        ctx.fillStyle = "#fff";
        ctx.fillText(text, x + width / 2, textY);

        ctx.restore();
    }
}