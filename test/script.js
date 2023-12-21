import platform from '../img/platform.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

console.log("hello")

const i = new Image()
i.src = platform

c.drawImage(i, 100, 100)

console.log(i)