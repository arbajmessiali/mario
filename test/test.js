document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.visibility = "hidden";
        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "body").style.visibility = "visible";
    }
};

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 200;
const CANVAS_HEIGHT = canvas.height = 200;

const imag = new Image();
imag.src = '../img/hero-sheet.png';

const spriteWidth = 32
const spriteHeight = 32

let frameS = 0
let frameL = 3
let frameR = 1
let frameX = 0
let gameFrame = 0
let frameHold = 7

class StartScreen {
    constructor({x, y, w, h}) {
        this.position = {
                x,
                y
        }

        this.width = w
        this.height = h
    }

    draw() {
        c.drawImage(createImg(load_src), 96, 32, 48, 16, this.position.x, this.position.y, this.width, this.height)
        c.drawImage(createImg(load_src), 288, 32, 48, 16, this.position.x, this.position.y + 30, this.width, this.height)
       /* c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        */
    }
}

let start

function startScreen(){
    start = new StartScreen({x:200, y:200, w:100, h:32})
    start.draw()
    if(keys.up.pressed)
        c.fillRect(190,200,10,32)
}

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
        if(anim.right.pressed){
            ctx.drawImage(imag, frameX * spriteWidth, frameR * spriteHeight, spriteWidth, spriteHeight, 0, 0, canvas.width, canvas.height);
            console.log('right draw')
        }
        else if(anim.left.pressed){
            ctx.drawImage(imag, frameX * spriteWidth, frameL * spriteHeight, spriteWidth, spriteHeight, 0, 0, canvas.width, canvas.height);
            console.log('left draw')
        }
        else
            ctx.drawImage(imag, frameX * spriteWidth, frameS * spriteHeight, spriteWidth, spriteHeight, 0, 0, canvas.width, canvas.height);
        
        //ctx.drawImage(imag, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, canvas.width, canvas.height);
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
    }
}

const player = new Player()

addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
        case 65:
            keys.left.pressed = true
            anim.left.pressed = true
            console.log('left')
            break;
        case 83:
            break;
        case 68:
            keys.right.pressed = true
            anim.right.pressed = true
            console.log('right')
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

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.draw()
    gameFrame++
    requestAnimationFrame(animate);
    startScreen()

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

