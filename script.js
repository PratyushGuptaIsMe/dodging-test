import { DODGING_TEST } from "/game.js";

function resizeCanvas(){
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
}
function animationLoop(t){
    deltatime = t - l;
    l = t;
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    GAME.update(deltatime, ctx, pressedKeysArray);
    requestAnimationFrame(animationLoop);
}

const CANVAS = document.getElementById("canvas");
let ctx = CANVAS.getContext("2d");
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
let GAME = new DODGING_TEST(CANVAS);
let deltatime = 0;
let l = 0;
let pressedKeysArray = [];
window.addEventListener("keydown", (e) => {
    if (!pressedKeysArray.includes(e.code)){
        pressedKeysArray.push(e.code);
    }
});

window.addEventListener("keyup", (e) => {
    pressedKeysArray = pressedKeysArray.filter(key => key !== e.code);
});

animationLoop(l);