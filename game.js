
canvas = document.getElementById("gameCanvas");

//to fix the height and width of canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight ;

// Gets hold of the canvas area
canvasBoard = canvas.getContext("2d");

// player Size 
var playerSize = getComputedStyle(document.documentElement)
    .getPropertyValue('--player-size');

// player 1 sprite
playerImg1 = document.getElementById('player1');
// player 1 container
playerContainer1 = document.querySelector('.playerContainer-1');



class GroundBlocks{

    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    show(){

        canvasBoard.fillStyle = '#130f40';
        canvasBoard.fillRect(this.x,this.y,this.width,this.height);

    }


}


class Player{

    constructor(x,y,hp){
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.width = 30 * playerSize;
        this.height = 30 * playerSize;
    }

    show(){
       playerContainer1.style.top = `${this.y}px`;
       playerContainer1.style.left = `${this.x}px`;
    }

    update(){
       
            
            
            if(this.x + this.width == canvasXPosition+1000 && this.xSpeed > 0 ){
                this.xSpeed = 0;
            }else if(this.x == canvasXPosition && this.xSpeed <0){
                this.xSpeed = 0;
            }
       
            this.x += this.xSpeed;


        playerContainer1.style.top = `${this.y}px`;
        playerContainer1.style.left = `${this.x}px`;
    }
}


var canvasXPosition = (window.innerWidth/2) - 500 ;
var canvasYPosition = (window.innerHeight/2) - 300;
var gravity = 0.1;
// making grounds
var ground = new GroundBlocks(canvasXPosition,canvasYPosition+550,1000,50);

var player1 = new Player(canvasXPosition+20,canvasYPosition+550,1000);


// on resize fix the sizes
window.onresize = function(){
    canvasXPosition = (window.innerWidth/2) - 500 ;
    canvasYPosition = (window.innerHeight/2) - 300;
}






window.onload = function(){
    start();
    setInterval(update,10);
}

// Game Start function
function start(){
    // background
    canvasBoard.fillStyle = 'lightblue';
    canvasBoard.fillRect(canvasXPosition,canvasYPosition,1000,600);

    //base-ground
    ground.show();
   
    //player
    player1.show();
}


// Game Update Loop
function update(){
    // background
    player1.update();

}

function keyPress(key){

    if(key.keyCode == 68){
        playerContainer1.classList.remove('flip');
        playerImg1.classList.add('move-fwd');
        player1.xSpeed = 2;
    }else if(key.keyCode == 65){
        playerContainer1.classList.add('flip');
        playerImg1.classList.add('move-fwd');
        player1.xSpeed = -2 ;
    }
}

function keyUp(key){

    if(key.keyCode == 68){
        player1.xSpeed= 0;
        playerImg1.classList.remove('move-fwd');
    }else if(key.keyCode == 65){
        player1.xSpeed=0;
    }
}


window.onkeydown = keyPress;

window.onkeyup = keyUp;