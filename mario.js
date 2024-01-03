function loading(){
    show = function(){
        document.querySelector(
            "#loader").style.display = "block";
        document.querySelector(
            "canvas").style.visibility = "hidden";  
        setTimeout(hide, 3000); // 3 seconds
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

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 640
canvas.height = 480

const platform_image = new Image()
const player_image = new Image()
platform_src = 'img/art.png'
player_src = 'img/hero-sheet.png'
sprite_src = 'img/spritesheet.png'
load_src = 'img/buttons.png'

function createImg(imgSrc){
    const image = new Image()
    image.src = imgSrc
    return image
}

const backgroundImg = new Image()
backgroundImg.src = 'img/background.jpg'

const spriteWidth = 32
const spriteHeight = 32

let frameX = 0
let frameR = 1
let frameL = 3
let frameS = 0
let gameFrame = 0
let frameHold = 7

const gravity = 1
let pos = 0
const finale = 5000

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
        this.width = 96
        this.height = 96
    }

    draw() {
        if(anim.right.pressed){
            c.drawImage(createImg(player_src), frameX * spriteWidth, frameR * spriteHeight, spriteWidth, spriteHeight, this.position.x, this.position.y, this.width, this.height);
        }
        else if(anim.left.pressed){
            c.drawImage(createImg(player_src), frameX * spriteWidth, frameL * spriteHeight, spriteWidth, spriteHeight, this.position.x, this.position.y, this.width, this.height);
        }
        else
            c.drawImage(createImg(player_src), frameX * spriteWidth, frameS * spriteHeight, spriteWidth, spriteHeight, this.position.x, this.position.y, this.width, this.height);
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
    }
}

class Platform {
    constructor({x, y, w, h}) {
        this.position = {
                x,
                y
        }

        this.width = w
        this.height = h
    }

    draw() {
        c.drawImage(createImg(sprite_src), 2, 32, 46, 16, this.position.x, this.position.y, this.width, this.height)
       /* c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        */
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
                x,
                y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
       /* c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        */
    }
}

let player = new Player()
let platforms = [new Platform({x:0, y:450, w:800, h:40}), 
    new Platform({x:200, y:100, w:200, h:32}), 
    new Platform({x:500, y:200, w:100, h:32}),
    new Platform({x:900, y:250, w:100, h:32}),
    new Platform({x:1000, y:450, w:800, h:40})]   

let genericObjects = [
    new GenericObject({
        x: 0,
        y:0,
        image: backgroundImg
    })
]

function init(){
    player = new Player()
    platforms = [new Platform({x:0, y:450, w:800, h:40}), 
        new Platform({x:200, y:100, w:200, h:32}), 
        new Platform({x:500, y:200, w:100, h:32}),
        new Platform({x:900, y:250, w:100, h:32}),
        new Platform({x:1000, y:450, w:800, h:40})]   

    genericObjects = [
        new GenericObject({
            x: 0,
            y:0,
            image: backgroundImg
        })
    ]
}

const keys = {
    right : {
        pressed: false
    },
    left : {
        pressed: false
    },
    up : {
        pressed: false
    },
    down : {
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

function animate() {
    requestAnimationFrame(animate)
    gameFrame++
    c.clearRect(0,0,canvas.width,canvas.height)
    c.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height + 100)
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()
    
    if(player.position.y > 450)
    {
        console.log('You lose')
    }

    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }
    else if(keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    }
    else {
        player.velocity.x = 0

        if (keys.right.pressed){
            platforms.forEach((platform) => {
                platform.position.x -= 5
            })
            pos += 5
        }
        else if (keys.left.pressed){
            platforms.forEach((platform) => {
                platform.position.x += 5
            })
            pos -= 5
        }
    }

    if(pos >= finale)
        console.log('win')

    platforms.forEach((platform) => {
    if(player.position.y + player.height <= platform.position.y + 5 && 
        player.position.y + player.height + player.velocity.y >= platform.position.y + 5 &&
        player.position.x + player.width >= platform.position.x + 30  &&
        player.position.x <= platform.position.x + platform.width - 30){
        player.velocity.y = 0
    }
  })

    if(player.position.y > canvas.height)
        init()
}

animate()

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
            keys.up.pressed = true
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
            keys.up.pressed = false
            break;
    }
})