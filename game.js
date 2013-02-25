/**
 * A simple game where the user presses on randomly appearing food?
 * BY: TEAM ALY
 *  February 2013
*/
var canvasElement = document.getElementById('canvas');
    
var c = canvasElement.getContext('2d');  
c.width = 0;
c.height = 0;
resizeCanvas();
window.addEventListener('resize', resizeCanvas, false);

var target = [], targetCount = 0;
var POINT = 0,TYPE = 1, WIDTH = 2;

function addTarget(){    
    var random = Math.random()*c.width; //Random from 0 to width
    var randomY = Math.random()*c.height; //Random from 0 to height
    target[targetCount][POINT] = new point(random,randomY); //Add random point
    random = Math.random(); //Random from 0 to 1
    if(random === 0) {
        random--; 
    }
    target[targetCount][TYPE] = random; //Type: -1 or 1
    target[targetCount][WIDTH] = 30; //Width
    targetCount++;
}

function checkPoint(x,y){
    for(var i=0;i<targetCount;i++){
      if(x<target[i][POINT].x+10 && x>target[i][POINT].x-10){
        if(y<target[i][POINT].y+10 && y>target[i][POINT].y-10){
            return i;
        }
      }  
    }
    return -1;
}

function point(x, y){
    this.x = x;
    this.y = y;
}

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
    c.rect(0, 0, c.width, c.height);  
    c.closePath();  
    c.fill();
}

window.addEventListener("mousedown",getPosition,false);

var loop1, loop2, w=50;
addTarget();
drawTargets();

function getPosition(event){
    //If we're interrupted, cancel old circle!
    if(w!=50){
        w = 50;
        clear();
        clearInterval(loop1);
    }
    var x = event.x;
    var y = event.y; 
    x -= canvasElement.offsetLeft;
    y -= canvasElement.offsetTop;
    loop1 = setInterval(function(){drawMouseCircle(x,y)}, 6);
}

function drawMouseCircle(x, y){
//    clear();
    c.beginPath();    
    c.lineWidth = w/10;
    c.strokeStyle = '#7fb883';
    c.arc(x,y,w,0,2*Math.PI,true);
    c.stroke();
    w--;
    if(w===0){
        w=50;
        clear();
        clearInterval(loop1);
    }
}

function drawTargets(){
    clear();
    alert("t");
    for(var i = 0; i < targetCount; i++){
        if(target[i][TYPE] === 1){
            c.fillStyle = '#8DCDEE'; //blue
            c.beginPath();
            c.rect(target[i][POINT].x, target[i][POINT].y, target[i][WIDTH], target[i][WIDTH]);
            c.closePath();
            c.fill();
        }
        else{
            c.fillStyle = '#E84343';  //red
            c.beginPath();
            c.rect(target[i][POINT].x, target[i][POINT].y, target[i][WIDTH], target[targetCount][WIDTH]);
            c.closePath();
            c.fill();
        }
        
    }
    
}

var speed = 1000;
//setInterval(addTarget(), speed);