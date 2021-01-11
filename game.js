
canvas = document.getElementById("gameCanvas");

//to fix the height and width of canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight ;

// Gets hold of the canvas area
canvasBoard = canvas.getContext("2d");

playerImg1 = document.getElementById('player1');
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
    }

    show(){
       playerContainer1.style.top = `${this.y}px`;
       playerContainer1.style.left = `${this.x}px`;
    }
}


var canvasXPosition = (window.innerWidth/2) - 500 ;
var canvasYPosition = (window.innerHeight/2) - 300;

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

}