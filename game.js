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
    c.width  = w;
    c.height = h;
    canvasElement.width = w;
    canvasElement.height = h;
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

window.addEventListener("mousedown",getPosition,false);

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
    loop = setInterval(function(){drawMouseCircle(x,y)}, 6);
}

function drawMouseCircle(x, y){
    clear();
    c.beginPath();    
    c.lineWidth = w/10;
    c.strokeStyle = '#7fb883';
    c.arc(x,y,w,0,2*Math.PI,true);
    c.stroke();
    w--;
    if(w===0){
        w=50;
        clear();
        clearInterval(loop);
    }
}

