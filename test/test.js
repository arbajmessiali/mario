const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 200;
const CANVAS_HEIGHT = canvas.height = 200;

const imag = new Image();
imag.src = '../img/hero-sheet.png';

const spriteWidth = 32
const spriteHeight = 32

let frameX = 0
let frameY = 1
let gameFrame = 0
let frameHold = 7

function animate(){
    ctx.clearRect(0,0,640,480);
    ctx.drawImage(imag, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, canvas.width, canvas.height);
    if(gameFrame % frameHold == 0){
    if(frameX < 2) frameX++;
    else frameX = 0;
    }
    gameFrame++
    requestAnimationFrame(animate);
};

animate();