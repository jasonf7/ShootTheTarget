var canvasElement = document.getElementById('canvas');
    
var c = canvasElement.getContext('2d');  
c.width = 0;
c.height = 0;
resizeCanvas();
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    var w = document.body.offsetWidth,
        h = document.body.offsetHeight;
    c.canvas.width  = w;
    c.canvas.height = h;
    c.width = c.canvas.width;
    c.height = c.canvas.height;
    clear();    
}

clear();

function clear(){
    c.fillStyle = '#00ffff';    
    c.beginPath();  
    c.rect(0, 0, c.width, c.height);  
    c.closePath();  
    c.fill();
}