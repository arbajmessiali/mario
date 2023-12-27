const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 640
canvas.height = 480

const platform_image = new Image()
const player_image = new Image()
platform_image.src = 'img/art.png'
player_image.src = 'img/hero-sheet.png'

const backgroundImg = new Image()
backgroundImg.src = 'img/background.jpg'

const spriteWidth = 32
const spriteHeight = 32

let frameX = 0
let frameY = 1
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
        this.width = 32
        this.height = 32
    }

    draw() {
        c.drawImage(player_image, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, this.position.x, this.position.y, this.width * 2, this.height * 2);
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
        c.drawImage(platform_image, this.position.x, this.position.y, this.width, this.height)
       /* c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        */
    }
}


const player = new Player()
const platforms = [new Platform({x:0, y:450, w:800, h:40}), 
    new Platform({x:200, y:100, w:200, h:20}), 
    new Platform({x:500, y:200, w:100, h:20}),
    new Platform({x:900, y:250, w:100, h:30})]

const keys = {
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
    if(player.position.y + player.height + 25 <= platform.position.y && 
        player.position.y + player.height + 25 + player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0
    }
  })
}

animate()

addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
        case 65:
            keys.left.pressed = true
            break;
        case 83:
            break;
        case 68:
            keys.right.pressed = true
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
            break;
        case 83:
            break;
        case 68:
            keys.right.pressed = false
            break;
        case 87:
            player.velocity.y = 0
            break;
    }
})