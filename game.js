

//TODO
//Add a enemy damage fix - his attacks and damahge on hero are not perfect
//Add music and jumping music
//




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

player1_HP = document.querySelector(".p1-hp");
player2_HP = document.querySelector('.p2-hp');


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

    constructor(x, y, hp,container,img,size,isEnemy) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.width = 30 * size;
        this.height = 30 * size;
        this.container = container;
        this.img = img;
        this.canJump = false;
        this.isDead = false;
        this.isFlip = false;
        this.isAttacking = false;
        this.isEnemy = isEnemy;
        
        
    }

    show() {
        this.container.style.top = `${this.y}px`;
        this.container.style.left = `${this.x}px`;
    }

    update() {

        // left steps
        if((this.y+this.height >= sideSteps.y && this.y+this.height <= sideSteps.y+5 ) && (this.x+this.width/2>= sideSteps.x && (this.x+2)<=sideSteps.x+sideSteps.width )){
            
               if(this.ySpeed>0){

                   playerImg1.classList.remove('jump');
                   this.ySpeed = 0;
               }
               
           
        }


        if (this.x + this.width == canvasXPosition + 1000 && this.xSpeed > 0) {
            this.xSpeed = 0;
            // this.ySpeed = -3;
           
        } else if (this.x == canvasXPosition && this.xSpeed < 0) {
            this.xSpeed = 0;
            // this.ySpeed = -3;
           
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.ySpeed = this.ySpeed + gravity;

        if(this.hp <= 0){
            this.isDead = true
            if(this.isEnemy){

                this.img.classList.add("die-enemy");
            }else{
                this.img.classList.add("die");
            }
        }

       this.container.style.top = `${this.y}px`;
        
       this.container.style.left = `${this.x}px`;
        if(this.y  >= ground.y - this.height){
            this.ySpeed = 0;
            
            this.canJump = true;
            this.img.classList.remove('jump');
        }else{
            this.canJump = false;
        }



        
    }

    attack(villan){
       if(villan.hp >=0){

           if(!this.isEnemy){
            var swordPostiton = this.y + 12;
               if(this.isFlip){
                if(((this.x)>(villan.x+10)) && ((this.x)<(villan.x+villan.width-5))&& swordPostiton>villan.y&&swordPostiton<(villan.y+villan.height)){
                    villan.hp -= 10;
                }
               }else{
                if(((this.x+this.width)>(villan.x+10)) && ((this.x+this.width)<(villan.x+villan.width-5))&& swordPostiton>villan.y&&swordPostiton<(villan.y+villan.height)){
                    villan.hp -= 10;
                }
               }
           }else{
            var swordPostiton = this.y + 20;
            if(this.isFlip){
                if(((this.x)>(villan.x+10)) && ((this.x)<(villan.x+villan.width-5))&& swordPostiton>villan.y&&swordPostiton<(villan.y+villan.height)){
                    villan.hp -= 3;
                }
               }else{
                if(((this.x+this.width)>(villan.x+10)) && ((this.x+this.width)<(villan.x+villan.width-5))&& swordPostiton>villan.y&&swordPostiton<(villan.y+villan.height)){
                    villan.hp -= 3;
                }
               }
           }
       }

    }

    target(player){
        playerImg2.classList.remove('jump-enemy');
         if(player.x >= this.x && player.x <= this.x+this.width-20 && !this.isDead){
             this.xSpeed =0;
            attackPlayer();
        }
        else if(player.x>this.x+this.width && !this.isDead){
            playerImg2.classList.remove('attack-enemy');
            chaseRight();
        }else if(player.x<this.x && !this.isDead){
            playerImg2.classList.remove('attack-enemy');
            chaseLeft();
        }
    }
}

function chaseRight(){
        playerContainer2.classList.remove('flip');
        playerImg2.classList.add('move-fwd-enemy');
        player2.xSpeed = 1;
        player2.isFlip = false;
}

function chaseLeft(){
    player2.xSpeed = -1;
        playerImg2.classList.add('move-fwd-enemy');
        playerContainer2.classList.add('flip');
        player2.isFlip = true;
}

function attackPlayer(){
    playerImg2.classList.remove('move-fwd-enemy');
    playerImg2.classList.add('attack-enemy');
    player2.attack(player1);
    player1_HP.innerText = `Hero Hp: ${player1.hp}`;
}

var canvasXPosition = (window.innerWidth / 2) - 500;
var canvasYPosition = (window.innerHeight / 2) - 300;
// add gravity to jumps
var gravity = 0.1;

var canJump = false;
// making grounds
var ground = new GroundBlocks(canvasXPosition, canvasYPosition + 550, 1000, 50);
var sideSteps = new GroundBlocks(canvasXPosition+50,canvasYPosition+ 400,100,20);

var player1 = new Player(canvasXPosition + 50, canvasYPosition  , 100,playerContainer1,playerImg1,playerSize,false);
 var player2 = new Player(canvasXPosition + 1000 - 20, canvasYPosition , 100,playerContainer2,playerImg2,playerSize*2.1,true);


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
    sideSteps.show();

    //player
    player1.show();
    player2.show();

}


// Game Update Loop
function update() {
    // background
    player1.update();
    player2.update();
    player2.target(player1);

}

function keyPress(key) {
    // player 1 
    if (key.keyCode == 68) {
        // p1 move right
        playerContainer1.classList.remove('flip');
        playerImg1.classList.add('move-fwd');
        player1.isFlip=false;
        player1.xSpeed = 2;
    } else if (key.keyCode == 65) {
        // p1 move left
        playerContainer1.classList.add('flip');
        playerImg1.classList.add('move-fwd');
        player1.isFlip=true;
        player1.xSpeed = -2;
    } else if (key.keyCode == 87 && player1.canJump) {
        // p1 jump
        player1.jump = true;
        playerImg1.classList.add('jump');
        player1.ySpeed -= 6;
        
    }else if(key.keyCode == 32){
        // p1 attack
        if(!player1.isAttacking){
            player1.isAttacking = true;
            player1.attack(player2);
        }
        playerImg1.classList.add('attack');
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
        player1.jump = false
        // player1.ySpeed = 0;
    }else if(key.keyCode == 32){
        playerImg1.classList.remove('attack');
        player1.isAttacking = false;
        // console.log(`player 2 hp : ${player2.hp}`);
        player2_HP.innerText = `Enemy Hp: ${player2.hp}`;
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