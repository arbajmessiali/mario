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

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 250
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 32
        this.height = 32
    }

    draw() {
        if(anim.right.pressed)
            ctx.drawImage(createImg(player_src), frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, this.position.x, this.position.y, this.width * 2, this.height * 2);
        else if(anim.left.pressed)
            ctx.drawImage(createImg(player_src), frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, this.position.x, this.position.y, this.width * 2, this.height * 2);
        if(gameFrame % frameHold == 0){
        if(frameX < 2) frameX++;
        else frameX = 0;
    }
        /* c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    */
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else
            this.velocity.y = 0
    }
}

const player = new Player()

const keys = {
    right : {
        pressed: false
    },
    left : {
        pressed: false
    }
}

const anim = {
    right : {
        pressed: false
    },
    left : {
        pressed: false
    }
}

function animate(){
    ctx.clearRect(0,0,640,480);
    ctx.drawImage(imag, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, canvas.width, canvas.height);
    if(gameFrame % frameHold == 0){
    if(frameX < 2) frameX++;
    else frameX = 0;
    }
    gameFrame++
    requestAnimationFrame(animate);

    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }
    else if(keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    }
    else {
        player.velocity.x = 0
    }
};

animate();

addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
        case 65:
            keys.left.pressed = true
            anim.left.pressed = true
            break;
        case 83:
            break;
        case 68:
            keys.right.pressed = true
            anim.right.pressed = true
            break;
        case 87:
            player.velocity.y -= 20
            break;
    }
})

addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
        case 65:
            keys.left.pressed = false
            anim.left.pressed = false
            break;
        case 83:
            break;
        case 68:
            keys.right.pressed = false
            anim.right.pressed = false
            break;
        case 87:
            player.velocity.y = 0
            break;
    }
})