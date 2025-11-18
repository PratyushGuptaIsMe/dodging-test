class OBSTACLES{
    constructor(game){
        this.game = game;
        this.canvas = this.game.canvas;
        this.markedForDeletion = false;
        this.time = this.game.elapsedTime;

        this.Fcolor = "rgba(0, 0, 255, 1)";
        this.Ocolor = "rgba(0, 0, 174, 1)";
        this.lineWidth = 4;
    }
    update(deltatime){
        this.time = this.game.elapsedTime;
    }
    draw(ctx){
        ctx.fillStyle = this.Fcolor;
        ctx.strokeStyle = this.Ocolor;
        ctx.lineWidth = this.lineWidth;
    }
}

export class CIRCLE extends OBSTACLES{
    constructor(game, sx, sy, radius, dmg){
        super(game);
        this.id = this.game.OBSTACLE_ID_LIST.circle;
        
        this.x = sx;
        this.y = sy;
        this.radius = radius;

        this.damage = dmg;
    }
    update(deltatime){
        super.update(deltatime);
    }
    draw(ctx){
        super.draw(ctx);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

export class POLYGON extends OBSTACLES{
    constructor(game, points, dmg){
        super(game);
        this.id = this.game.OBSTACLE_ID_LIST.polygon;       
        this.damage = dmg;

        this.points = points;
    }
    moveX(x){
        if(this.game.dead){
            return;
        }
        this.points.forEach((point) => {
            point.x += x;
        })
    }
    moveY(y){
        if(this.game.dead){
            return;
        }
        this.points.forEach((point) => {
            point.y += y;
        })
    }
    update(deltatime){
        super.update(deltatime);
        if(this.time < 10 && this.time > 0){
            this.moveX(2);
        }
        if(this.time > 10 && this.time < 20){
            this.moveX(-2);
        }
    }
    draw(ctx){
        super.draw(ctx);
        if(!this.points || !this.points.length){
            return;
        }

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for(let i = 1; i < this.points.length; i++){
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}