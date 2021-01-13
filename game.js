
canvas = document.getElementById("gameCanvas");

//to fix the height and width of canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Gets hold of the canvas area
canvasBoard = canvas.getContext("2d");

// player Size 
var playerSize = getComputedStyle(document.documentElement)
    .getPropertyValue('--player-size');

// player 1 sprite
playerImg1 = document.getElementById('player1');
// player 1 container
playerContainer1 = document.querySelector('.playerContainer-1');

// player 2 img
playerImg2 = document.getElementById('player2');
// player 2 container
playerContainer2 = document.querySelector('.playerContainer-2');


class GroundBlocks {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    show() {

        canvasBoard.fillStyle = '#130f40';
        canvasBoard.fillRect(this.x, this.y, this.width, this.height);

    }

  


}


class Player {

    constructor(x, y, hp,container,img) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.width = 30 * playerSize;
        this.height = 30 * playerSize;
        this.container = container;
        this.img = img;
        this.canJump = false;
    }

    show() {
        this.container.style.top = `${this.y}px`;
        this.container.style.left = `${this.x}px`;
    }

    update() {



        if (this.x + this.width == canvasXPosition + 1000 && this.xSpeed > 0) {
            this.xSpeed = 0;
        } else if (this.x == canvasXPosition && this.xSpeed < 0) {
            this.xSpeed = 0;
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.ySpeed = this.ySpeed + gravity;

       this.container.style.top = `${this.y}px`;
        
       this.container.style.left = `${this.x}px`;
        console.log(this.y);
        if(this.y  >= ground.y - this.height){
            this.ySpeed = 0;
            
            this.canJump = true;
            this.img.classList.remove('jump');
        }else{
            this.canJump = false;
        }



        
    }
}


var canvasXPosition = (window.innerWidth / 2) - 500;
var canvasYPosition = (window.innerHeight / 2) - 300;
// add gravity to jumps
var gravity = 0.1;

var canJump = false;
// making grounds
var ground = new GroundBlocks(canvasXPosition, canvasYPosition + 550, 1000, 50);

var player1 = new Player(canvasXPosition + 20, canvasYPosition  , 1000,playerContainer1,playerImg1);
 var player2 = new Player(canvasXPosition + 100, canvasYPosition , 1000,playerContainer2,playerImg2);


// on resize fix the sizes
window.onresize = function () {
    canvasXPosition = (window.innerWidth / 2) - 500;
    canvasYPosition = (window.innerHeight / 2) - 300;
}






window.onload = function () {
    start();
    setInterval(update, 10);
}

// Game Start function
function start() {
    // background
    canvasBoard.fillStyle = 'lightblue';
    canvasBoard.fillRect(canvasXPosition, canvasYPosition, 1000, 600);

    //base-ground
    ground.show();

    //player
    player1.show();
    player2.show();

}


// Game Update Loop
function update() {
    // background
    player1.update();
    player2.update();

}

function keyPress(key) {

    if (key.keyCode == 68) {
        playerContainer1.classList.remove('flip');
        playerImg1.classList.add('move-fwd');
        player1.xSpeed = 2;
    } else if (key.keyCode == 65) {
        playerContainer1.classList.add('flip');
        playerImg1.classList.add('move-fwd');
        player1.xSpeed = -2;
    } else if (key.keyCode == 87 && player1.canJump) {
        playerImg1.classList.add('jump');
        player1.ySpeed -= 6;
    }else if(key.keyCode == 32){
        playerImg1.classList.add('attack');
    }else if(key.keyCode == 38 && player2.canJump){
        player2.ySpeed -= 6;
        playerImg2.classList.add('jump');
    }else if(key.keyCode == 39){
        playerContainer2.classList.remove('flip');
        playerImg2.classList.add('move-fwd');
        player2.xSpeed = 2;
    }else if(key.keyCode == 37){
        player2.xSpeed = -2;
        playerImg2.classList.add('move-fwd');
        playerContainer2.classList.add('flip');
    }else if(key.keyCode == 16){
        playerImg2.classList.add('attack');
    }
}

function keyUp(key) {

    if (key.keyCode == 68) {
        player1.xSpeed = 0;
        playerImg1.classList.remove('move-fwd');
    } else if (key.keyCode == 65) {
        player1.xSpeed = 0;
        playerImg1.classList.remove('move-fwd');
    } else if (key.keyCode == 87) {
        // player1.ySpeed = 0;
    }else if(key.keyCode == 32){
        playerImg1.classList.remove('attack');
    }else if(key.keyCode == 39){
        player2.xSpeed = 0;
        playerImg2.classList.remove('move-fwd');
    }else if(key.keyCode == 37){
        player2.xSpeed = 0;
        playerImg2.classList.remove('move-fwd');
    }else if(key.keyCode == 16){
        playerImg2.classList.remove('attack');
    }
}

window.onkeydown = keyPress;

window.onkeyup = keyUp;