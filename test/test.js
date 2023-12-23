const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const imag = new Image();
imag.src = '../img/art.png';

function animate(){
    ctx.clearRect(0,0,640,480);
    ctx.fillRect(100,50,100,100);
    ctx.drawImage(imag, 0, 0);
    requestAnimationFrame(animate);
};

animate();