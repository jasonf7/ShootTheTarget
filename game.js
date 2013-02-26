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

var target = [], targetCount = 0, done = false;
var POINT = 0,TYPE = 1, WIDTH = 2;

var gameLoop = setInterval(function(){addTarget()}, 500);
var drawLoop = setInterval(function(){drawTargets()}, 5);

function addTarget(){  
    var intialPoint = new point(Math.random()*c.width, Math.random()*c.height);
    var random = Math.round(Math.random()); //Random from 0 to 1
    if(random === 0) {
        random--; 
    }
    target.push([intialPoint,random,30]);
    targetCount++;
    if(targetCount == 15){
        clearInterval(gameLoop);
        clearInterval(drawLoop);
        drawTargets();
        done = true;
        alert("Game Over!");
    }
}

var accuracy = 30;

function checkPoint(x,y){
    var hit = [];
    for(var i=0;i<targetCount;i++){
      if(x<target[i][POINT].x+accuracy && x>target[i][POINT].x-accuracy){
        if(y<target[i][POINT].y+accuracy && y>target[i][POINT].y-accuracy){
            hit.push(i);
        }
      }  
    }
    return hit;
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
    c.fillStyle = '#E6E6E6';  
    c.rect(0, 0, c.width, c.height);  
    c.fill();
}

window.addEventListener("mousedown",getPosition,false);

//var mouseLoop,
var mouseW=50, mouseX, mouseY, drawMouse = false;

function getPosition(event){
    //If we're interrupted, cancel old circle!
    if(mouseW!=50){
        mouseW = 50;
    }
    mouseX = event.x - canvasElement.offsetLeft;
    mouseY = event.y - canvasElement.offsetTop;     
    drawMouse = true;
    //remove hit stuff
    var hit = checkPoint((mouseX-15),(mouseY-15));
     for(var i=0;i < hit.length; i++){
        target.splice(hit[i],1);
        targetCount--;
    }
    
    if(!done){
        drawTargets();
    }
}

function drawMouseCircle(x, y){
    c.beginPath();    
    c.lineWidth = mouseW/10;
    c.strokeStyle = '#7fb883';
    c.arc(x,y,mouseW,0,2*Math.PI,true);
    c.stroke();  
    mouseW-=2;
    if(mouseW === 0){
        drawMouse = false;
    }
    
}

function drawTargets(){
    clear();
    if(drawMouse){
        drawMouseCircle(mouseX,mouseY);    
    }
    
    for(var i = 0; i < targetCount; i++){        
            
        if(target[i][TYPE] == 1){
            c.fillStyle = '#8DCDEE'; //blue
            c.beginPath();
            c.rect(target[i][POINT].x, target[i][POINT].y, target[i][WIDTH], target[i][WIDTH]);
            c.closePath();
            c.fill();
        }else{
            c.fillStyle = '#E84343';  //red
            c.beginPath();
            c.rect(target[i][POINT].x, target[i][POINT].y, target[i][WIDTH], target[i][WIDTH]);
            c.closePath();
            c.fill();
        }
        
        c.strokeStyle = '#585858';
        c.lineWidth = 1;
        c.rect(target[i][POINT].x, target[i][POINT].y, target[i][WIDTH], target[i][WIDTH]);
        c.stroke();
        
    }
    
}