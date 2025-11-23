
export class PATTERNS{
    constructor(){
        this.currentPattern = 0;
        this.patternClass = null;
    }
    pattern(pattern, obj, obtionalVariable1, obtionalVariable2, obtionalVariable3, obtionalVariable4){
        let ov1 = obtionalVariable1;
        let ov2 = obtionalVariable2;
        let ov3 = obtionalVariable3;
        let ov4 = obtionalVariable4;

        if(this.currentPattern === 'null'){
            return;
        }

        if(pattern === 'null'){
            this.currentPattern = 'null';
        }

        if(pattern === 'side-burst'){
            this.currentPattern = 'side-burst';
            this.patternClass = new SideBurst(obj, ov1, ov2);
        }

        if(pattern === 'move'){
            this.currentPattern = 'move';
            this.patternClass = new Moving(obj, ov1, ov2, ov3)
        }
    }
    update(obj){
        if(this.patternClass !== null){
            this.patternClass.update(obj);
        }
    }
}

class ObjectPattern{
    constructor(obj, obtionalVariable1, obtionalVariable2, obtionalVariable3, obtionalVariable4){
        this.obj = obj;
        this.points = this.obj.points;
        this.startTime = this.obj.time;
        this.globalTime = this.startTime;
        this.objTime = 0;

        if(obtionalVariable1){
            this.optionalVariable1 = obtionalVariable1;
        }
        if(obtionalVariable2){
            this.optionalVariable2 = obtionalVariable2;
        }
        if(obtionalVariable3){
            this.optionalVariable3 = obtionalVariable3;
        }
        if(obtionalVariable4){
            this.optionalVariable3 = obtionalVariable4;
        }
    }
    update(obj){
        this.globalTime = obj.time;
        this.objTime = this.globalTime - this.startTime;
        if(this.objTime >= obj.timeAlive){
            obj.markedForDeletion = true;
        }
    }
}

class SideBurst extends ObjectPattern{
    constructor(obj, ov1, ov2){
        super(obj, ov1, ov2);
    }
    update(obj){
        super.update(obj);

        if(this.objTime < this.optionalVariable1 && this.objTime > 0){
            obj.moveX(this.optionalVariable2);
        }
        if(this.objTime < this.optionalVariable1 * 2 && this.objTime > this.optionalVariable1){
            obj.moveX(-this.optionalVariable2);
        }
    }
}

class Moving extends ObjectPattern {
    constructor(obj, ov1, ov2, ov3, ov4) {
        super(obj, ov1, ov2, ov3, ov4);

        this.angle = this.optionalVariable1 * (Math.PI / 180);
        this.offsetX = this.optionalVariable2;
        this.offsetY = this.optionalVariable3;
        this.direction = this.optionalVariable4 || 1;
        this.obj.x += this.offsetX;
        this.obj.y += this.offsetY;
        
        this.speed = 4;
    }

    update(obj) {
        super.update(obj);
        obj.moveX(Math.cos(this.angle) * this.speed);
        obj.moveY(Math.sin(this.angle) * this.speed * this.direction);
    }
}
