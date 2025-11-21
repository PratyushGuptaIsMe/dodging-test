
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

        if(pattern === 'side-burst'){
            this.currentPattern = 'side-burst';
            this.patternClass = new SideBurst(obj, ov1, ov2);
        }
    }
    update(obj){
        if(this.patternClass !== null){
            this.patternClass.update(obj);
        }
    }
}

class SideBurst{
    constructor(obj, obtionalVariable1, obtionalVariable2){
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
    }
    update(obj){
        this.globalTime = obj.time;
        this.objTime = this.globalTime - this.startTime;

        if(this.objTime < this.optionalVariable1 && this.objTime > 0){
            obj.moveX(this.optionalVariable2);
        }
        if(this.objTime < this.optionalVariable1 * 2 && this.objTime > this.optionalVariable1){
            obj.moveX(-this.optionalVariable2);
        }
    }
}