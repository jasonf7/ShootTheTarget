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


var target = [], targetID=0, targetCount = 0, done = false, targetRate = 1,
    score=0, maxWidth=30, time=new Date().getTime(), maxTargets=29;
var BLUE = 1, RED = 2, ALL = -1; //Button types
var POINT = 0,TYPE = 1, WIDTH = 2, ID = 3;

var speed=1000;//the time interval between the appereance of each target
var gameLoop = setInterval(function(){addTarget()}, speed);
var drawLoop = setInterval(function(){drawTargets()}, 10);
var levelLoop = setInterval(function(){
        speed-=100;
        if(speed<400){
            speed=400;
        }
        clearInterval(gameLoop);
//        if(speed === 500){ //Faster at 800, 400
//            targetRate++;
//            if(targetRate>2){
//                targetRate = 2;
//            }
//        }
        gameLoop = setInterval(function(){addTarget()}, speed);
    },1000);
/*
* Adds a target to the array
*/
function addTarget(){  
    if(targetCount >= maxTargets){
        return;    
    }
    
    for(var i=0; i<targetRate; i++){
        var testX = Math.random()*(c.width-30);
        var testY = Math.random()*(c.height-30);
        var isOverlap = true;
       // console.log(targetCount);
        if(targetCount !== 0){
            while(isOverlap){
                var done = true;
                for(var j=0; j<targetCount; j++){
                    if(Math.abs(testX-target[j][POINT].x)<maxWidth){
                        if(Math.abs(testY-target[j][POINT].y)<maxWidth){
//                            console.log("bad");
                            done = false;
                            testX = Math.random()*(c.width-30);
                            testY = Math.random()*(c.height-30);
                            j= targetCount-1;
                        }
                    }
                }
                if(done){
                    isOverlap = false;
//                    console.log("good");
                }
            }
        }
        var intialPoint = new point(testX, testY);
        var random = Math.round(Math.random())+1; //Random from 1 to 2
        target.push([intialPoint,random,5,targetID]);
        targetCount++;
        targetID++;
    }
//    if(targetCount >= 30){        
//        drawEndScreen();
//    }
}

var accuracy = maxWidth/2 + 15;

function checkPoint(x,y){
    var hit = [];
    for(var i=0;i<targetCount;i++){
      if(x<target[i][POINT].x+accuracy && x>target[i][POINT].x-accuracy){
        if(y<target[i][POINT].y+accuracy && y>target[i][POINT].y-accuracy){
            hit.push(target[i][ID]);
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
    if(done){
        drawEndScreen();
    }
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
    
    if(!done){
        drawMouse = true;
        //remove hit stuff
        var hit = checkPoint((mouseX-15),(mouseY-15));
        for(var i=0;i < hit.length; i++){
            if(getLeader() == ALL 
                || target[getIndexFromID(hit[i])][TYPE]==getLeader()){
                score++;
            }else{
                score-=3;
            }
            target.splice(getIndexFromID(hit[i]),1);
            targetCount--;
        }    
        drawTargets();
    }else if(reloadable){
        clearInterval(canReload);
        window.location.reload(false);
    }
}

function getIndexFromID(id){
    var index = 0;
    for(var i=0;i<targetCount;i++){
        if(target[i][ID] == id){
            index = i;
        }
    }
    return index;
}

function drawMouseCircle(x, y){
    c.beginPath();    
    c.lineWidth = mouseW/10;
    c.strokeStyle = '#7fb883';
    c.arc(x,y,mouseW,0,2*Math.PI,true);
    c.stroke();  
    mouseW-=4;
    if(mouseW <= 0){
        drawMouse = false;
    }
    
}

function drawTargets(){
    clear();
    //Draw the score and timer in the background
    var deltaT = Math.round((new Date().getTime() - time)/100)/10; //in seconds
    c.fillStyle = '#dedede';
    c.beginPath();
    c.moveTo(c.width/2,c.height/2);
//    console.log(deltaT);
    c.arc(c.width/2,c.height/2,c.width*0.2,0,Math.round(20*Math.PI*deltaT/30)/10); //WHY IS IT 17?!?
    c.closePath();
    c.fill();
    c.fillStyle = '#c8c8c8';
    c.shadowColor = '#a0a0a0';
    c.shadowBlur = 1;
    c.shadowOffsetX = -1;
    c.shadowOffsetY = -1;
    c.font = 'bold '+c.height*0.6+'px Calibri';
    c.textAlign = 'center';
    c.fillText(score,c.width/2,c.height/2+c.height*0.19);
    c.shadowOffsetX = 0; c.shadowOffsetY=0;
    
    if(deltaT >= 30){
        drawEndScreen(); return;
    }
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
        if(target[i][WIDTH] < maxWidth){
            target[i][WIDTH]+=5;
        }
        
        c.strokeStyle = '#585858';
        c.lineWidth = 1;
        c.rect(target[i][POINT].x, target[i][POINT].y, target[i][WIDTH], target[i][WIDTH]);
        c.stroke();
        
    }
}

function getLeader(){
    var redCount=0, blueCount=0;
    for(var i=0;i<targetCount;i++){
        if(target[i][TYPE]==BLUE){
            blueCount++;
        }else{
            redCount++;
        }
    }
    if(blueCount > redCount){
        return BLUE;
    }else if(redCount > blueCount){
        return RED;
    }else{
        return ALL;
    }
}

var reloadable = false;
var canReload; 

function drawEndScreen(){    
    clear();
    clearInterval(gameLoop);
    clearInterval(drawLoop);
    clearInterval(levelLoop);
//    clearInterval(endLoop);
    done = true;
    c.fillStyle = '#c8c8c8';
    c.shadowColor = '#a0a0a0';
    c.shadowBlur = 1;
    c.shadowOffsetX = -1;
    c.shadowOffsetY = -1;
    c.font = 'bold '+c.width*0.13+'px Calibri';
    c.textAlign = 'center';
    c.fillText("Game Over!",c.width/2,c.height/2);    
    c.font = 'bold '+c.width*0.07+'px Calibri';       
    c.fillStyle = '#a0a0a0';
    c.shadowColor = '#707070';
    if(reloadable){
        c.fillText("Score: "+score+"  Click to restart!",c.width/2,c.height/2+c.height*0.2); 
    }else{
        c.fillText("Score: "+score,c.width/2,c.height/2+c.height*0.2);  
        canReload = setInterval(function(){reloadable=true;drawEndScreen()},3000);
    }
}

/**
 *  @deprecated
 */
function changeBar(){
    var randColor = Math.round(Math.random())+1;
    if(randColor == BLUE){
        c.fillStyle = '#8DCDEE'; 
        c.beginPath();
        c.rect(25, 100, 100, 100);
        c.closePath();
        c.fill(); 
    }else{
        c.fillStyle = '#E84343'; 
        c.beginPath();
        c.rect(25, 100, 100, 100);
        c.closePath();
        c.fill();
    }
}
