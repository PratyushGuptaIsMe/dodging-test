import { DODGING_TEST } from "./game.js";

function resizeCanvas(){
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
}
function animationLoop(t){
    deltatime = t - l;
    l = t;
    elapsedTime += deltatime / 1000;
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    GAME.update(deltatime, ctx, pressedKeysArray, elapsedTime);
    requestAnimationFrame(animationLoop);
}

const CANVAS = document.getElementById("canvas");
let ctx = CANVAS.getContext("2d");
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
let GAME = new DODGING_TEST(CANVAS);
window.GAME = GAME;
let deltatime = 0;
let l = 0;
let elapsedTime = 0;
let pressedKeysArray = [];

window.addEventListener("keydown", (e) => {
    if(!pressedKeysArray.includes(e.code)){
        pressedKeysArray.push(e.code);
    }
});

window.addEventListener("keyup", (e) => {
    pressedKeysArray = pressedKeysArray.filter(key => key !== e.code);
});

animationLoop(l);