/**
 * A simple game where the user presses on randomly appearing food?
 *  February 2013
*/
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
    c.fillStyle = 'LightGreen';    
    c.beginPath();  
    c.rect(0, 0, c.width, c.height);  
    c.closePath();  
    c.fill();
}

canvasElement.addEventListener("touchstart",getPosition,false);
canvasElement.addEventListener("mousedown",getPosition,false);

var loop, w=50;

function getPosition(event){
    //If we're interrupted, cancel old circle!
    if(w!=50){
        w = 50;
        clear();
        clearInterval(loop);
    }
    
    var x = event.x;
    var y = event.y; 
    x -= canvasElement.offsetLeft;
    y -= canvasElement.offsetTop;
    loop = setInterval(function(){drawMouseCircle(x,y)}, 7);
}

function drawMouseCircle(x, y){
    clear();
    c.beginPath();    
    c.lineWidth = w/7;
    c.strokeStyle = 'Green';
    c.arc(x,y,w,0,2*Math.PI,true);
    c.stroke();
    w--;
    if(w===0){
        w=50;
        clear();
        clearInterval(loop);
    }
}

