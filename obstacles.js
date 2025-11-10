class OBSTACLES{
    constructor(game){
        this.game = game;
        this.canvas = this.game.canvas;

        this.Fcolor = "rgba(0, 0, 255, 1)";
        this.Ocolor = "rgba(0, 0, 174, 1)";
        this.lineWidth = 4;
    }
}

export class SQUARE_AA extends OBSTACLES{
    constructor(game){
        super(game);
        this.id = this.game.OBSTACLE_ID_LIST.square_aa; 

        this.x = 100;
        this.y = 100;
        this.length = 100;
        
        this.damage = 10;
    }
}

export class SQUARE_NAA extends OBSTACLES{
    constructor(game){
        super(game);
        this.id = this.game.OBSTACLE_ID_LIST.square_naa; 
        this.x = 100;
        this.y = 100;
        this.length = 100;
        
        this.damage = 10;

        this.points = [
            { x: 100, y: 100 },
            { x: 200, y: 100 },
            { x: 200, y: 200 },
            { x: 100, y: 220 }
        ]

    }
}

export class CIRCLE extends OBSTACLES{
    constructor(game){
        super(game);
        this.id = this.game.OBSTACLE_ID_LIST.circle;
        
        this.x = 200;
        this.y = 200;
        this.radius = 40;

        this.damage = 10;
    }
}

