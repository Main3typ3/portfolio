let board;
let boardwidth = 380;
let boardheight = 646;
let context;


let birdwidth = 42;
let birdheight = 51;
let birdX = boardwidth / 11;
let birdY = boardheight / 2;    
let birdimage;


let bird = {
    x: birdX,
    y: birdY,
    width: birdwidth,
    height: birdheight
};

let pipearray = [];
let pipewidth = 64;
let pipeheight = 512;
let pipeX = boardwidth;
let pipeY = 0;

let toppipeimage;
let bottompipeimage;

let velocityX = -2; //pipe speed
let velocityY = 0; // Bird jump speed
let gravity = 0.3; // Bird fall speed
let Score = 0;

let gameover = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d"); 

    
    birdimage = new Image();
    birdimage.src = "flappymeimage.png";
    birdimage.onload = function() {
        context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);
    }
    toppipeimage = new Image();
    toppipeimage.src = "pipe.png";

    bottompipeimage = new Image();
    bottompipeimage.src = "pipedown.png";
    requestAnimationFrame(update);
    setInterval(PlacePipes,2100);

    document.addEventListener("keydown", moveBird);
    document.addEventListener("click", moveBirdmouse);
   
}

function update(){
    requestAnimationFrame(update);

    if(gameover){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);
    velocityY += gravity;

    bird.y = Math.max(bird.y + velocityY, 0);
    if (bird.y > board.height){
        gameover = true;
    }
    
    //bird.y += velocityY;
    context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);

    for(let i = 0; i < pipearray.length; i++){
        let pipe = pipearray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            Score += 0.5;
            pipe.passed = true;

        }

        if(detectcollison(bird, pipe)){
            gameover = true;
        }
    }

   while(pipearray.length > 0 && pipearray[0].x < -pipewidth){
         pipearray.shift();
   }

    context.fillstyle = "white";
    context.font = "24px Verdana";
    context.fillText("Score: "+ Score, 15, 35);

    if(gameover){
        context.fillText("Game Over", 120, board.height / 2);
        context.fillText("Score: "+ Score, 120, board.height / 2 + 30);
        context.font = "16px Verdana";
        context.fillText("Press up arrow / click to play again ", 70, board.height / 2 + 60);
        document.addEventListener("click", moveBirdmousereset);
    }
    

}

function PlacePipes(){
    if(gameover){
        return;
    }
    let randomPipeY = pipeY - pipeheight / 4 - Math.random() * (pipeheight/2);
    let openingspace = board.height /4;
    let topipe = {

        img: toppipeimage,
        x: pipeX,
        y: randomPipeY,
        width: pipewidth,
        height: pipeheight,
        passed:false
    };

    pipearray.push(topipe);

    let bottompipe = {
        img: bottompipeimage,
        x: pipeX,
        y: randomPipeY + pipeheight + openingspace,
        width: pipewidth,
        height: pipeheight,
        passed:false
    };
    pipearray.push(bottompipe);
    
}


function moveBirdmousereset(event){
    if (gameover){
    gameover = false;
    bird.y = birdY;
    Score = 0;
    pipearray = [];

    }
    

}
function moveBirdmouse(event){
    velocityY = -5; 
}




function moveBird(event){
    if(event.Code == "Space" || event.code == "ArrowUp" || event.code == "MouseClick"){
        velocityY = -6; 
    }
    if(gameover && (event.code == "Enter" || event.code == "Space" || event.code == "ArrowUp" || event.code == "MouseClick")){
        gameover = false;
        bird.y = birdY;
        Score = 0;
        pipearray = [];
        //requestAnimationFrame(update);
    }
}

function detectcollison (a, b){
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;

}