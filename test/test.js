function loading(){
    show = function(){
        document.querySelector(
            "#loader").style.display = "block";
        document.querySelector(
            "canvas").style.visibility = "hidden";  
        setTimeout(hide, 2000); // 2 seconds
      },

      hide = function(){
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "canvas").style.visibility = "visible";
      };
    show();
};

loading();

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGHT = canvas.height = 400;

const imag = new Image();
imag.src = '../img/hero-sheet.png';
load_src = '../img/buttons.png';

const spriteWidth = 32
const spriteHeight = 32

let frameS = 0
let frameL = 3
let frameR = 1
let frameX = 0
let gameFrame = 0
let frameHold = 7

function createImg(imgSrc){
    const image = new Image()
    image.src = imgSrc
    return image
}


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
        ctx.drawImage(createImg(load_src), 96, 32, 48, 16, this.position.x, this.position.y, this.width, this.height)
        ctx.drawImage(createImg(load_src), 288, 32, 48, 16, this.position.x, this.position.y + 30, this.width, this.height)
       /* c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        */
    }
}

let start

function startScreen(){
    start = new StartScreen({x:100, y:100, w:100, h:32})
    start.draw()
    if(keys.select.pressed)
        ctx.fillRect(85,100,10,32)
    else
        ctx.fillRect(85,130,10,32)
}

const keys = {
    right : {
        pressed: false
    },
    left : {
        pressed: false
    },
    select : {
        pressed: true
    },
    space : {
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
            if(keys.select.pressed)
                keys.select.pressed = false
            else
                keys.select.pressed = true
            break;
        case 68:
            keys.right.pressed = true
            anim.right.pressed = true
            console.log('right')
            break;
    }
})

addEventListener('keypress', ({keyCode}) => {
    switch(keyCode){
        case 87:
            player.velocity.y -= 20
            if(keys.select.pressed)
                keys.select.pressed = false
            else
                keys.select.pressed = true
            break;
        case 32:
                keys.space.pressed = true
            break;
    }
})

let startGame = false

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
    }
})

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    gameFrame++
    requestAnimationFrame(animate);
    startScreen()
    if(keys.select.pressed && keys.space.pressed){
        startGame = true
        keys.space.pressed = false
    }

    if(startGame)
        player.draw()

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

