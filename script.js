const canvas = document.querySelector("#board");
const ctx = canvas.getContext('2d');
const walls = document.querySelector('#wallButton');
class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let speed = 7;
let pause = false;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

const snakeParts = [];
let tailLenght = 2;
let score = 0;

var enableReset=false;

let noWalls=walls.checked;

const sound = new Audio('gulp.mp3');
const overSound = new Audio('over.wav');
const startSound= new Audio('beep.mp3')

window.addEventListener('keydown', handleKeyResponse);

window.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
     //console.log("Touch Start::i m working check ");
}, false);

window.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
     //console.log("Touch end::i m working check ");

    handleGesture();
}, false);

function handleGesture() {
    // console.log("handle gesture::i have been called check ");

    if (touchendY === touchstartY && touchendX=== touchstartX) {
        //'Tap'
    }
    else if (Math.abs(touchendX - touchstartX) > Math.abs(touchendY - touchstartY)) {
        if (touchendX < touchstartX) {
       //     console.log('Swiped left')
            moveObj('ArrowLeft');
        }
        
        else if (touchendX > touchstartX) {
            //'Swiped right'
            moveObj('ArrowRight');
        }
    }
    else {


        if (touchendY < touchstartY) {
            //'Swiped up'
            moveObj('ArrowUp');

        }

        else if (touchendY > touchstartY) {
            //'Swiped down'
            moveObj('ArrowDown');

        }
    }
}
function handleKeyResponse(e) {
    moveObj(e.key);
}

function drawgame() {
    if (!pause) {
        moveSnake();
        if (!over()) {

            clearScreen();
            drawApple();
            drawSnake();
            checkCollision();
            setTimeout(drawgame, 1000 / speed);

        }
    }
}
function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLenght) {
        snakeParts.shift();
    }
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
function moveSnake() {
    headY = headY + yVelocity;
    headX = headX + xVelocity;

    if(noWalls)
    {
        if (headY < 0) {
            headY=tileCount-1;
        }
        else if (headY === tileCount) {
            headY=0;
        }
        else if (headX === tileCount) {
            headX=0;
        }
        else if (headX < 0) {
            headX=tileCount-1;
        }
    }
}
function drawApple() {

    ctx.fillStyle = 'Red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}
function checkCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = ~~(Math.random() * tileCount);
        appleY = ~~(Math.random() * tileCount);
        tailLenght++;
        score++;
        sound.play();
        speed = speed + (speed / (speed * score));
    }
    updateScore();
}
function updateScore() {
    ctx.fillStyle = 'white';
    ctx.font = '13px Verdana';
    ctx.fillText('Score: ' + score, canvas.width - 80, 15);
}
function moveObj(e) {

    if (e) {
        switch (e) {

            case "ArrowUp": if (yVelocity === 1 || pause) { return; } xVelocity = 0; yVelocity = -1; break;
            case "ArrowRight": if (xVelocity === -1 || pause) { return; } xVelocity = 1; yVelocity = 0; break;
            case "ArrowDown": if (yVelocity === -1 || pause) { return; } xVelocity = 0; yVelocity = 1; break;
            case "ArrowLeft": if (xVelocity === 1 || pause) { return; } xVelocity = -1; yVelocity = 0; break;
            case " ": if (pause) { pause = false; drawgame(); } else pause = true; break;
            case 'r' || 'R': if(enableReset) reset(); break;
        }
        console.log(e.key);
    }
}
function over() {
    let gameOver = false;
    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    // wall collision
    if(!noWalls)
    {

        if (headY < 0) {
            gameOver = true;
        }
        else if (headY === tileCount) {
            gameOver = true;
        }
        else if (headX === tileCount) {
            gameOver = true;
        }
        else if (headX < 0) {
            gameOver = true;
        }
    }

    // body Collision
    for (let i of snakeParts) {
        if (i.x === headX && i.y === headY) {
            gameOver = true;
            break;
        }
    }
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        enableReset=true;
        overSound.play();
    }
    return gameOver;
}
function reset() {
    speed = 7;
    pause = false;
    headX = 10;
    headY = 10;
    xVelocity = 0;
    yVelocity = 0;
    appleX = 5;
    appleY = 5;
    tailLenght = 2;
    noWalls=walls.checked;
    for(let i in snakeParts)
    {
        snakeParts.pop();
    }
    score = 0;
    enableReset=false;
    clearScreen();
    startSound.play();
    drawgame();
}
function togglePause(){
    moveObj(' '); 
}
function reset(){
    moveObj('r');
}

startSound.play();
drawgame();