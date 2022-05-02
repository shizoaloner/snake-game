const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

class Snakepart{
    constructor(x,y){
        this.x = x
        this.y = y
    }
}

let speed = 7

let tileCount = 20
let  tileSize = canvas.width/ tileCount - 2
const gulpSound = new Audio("gulp.mp3")
const gameOverSound = new Audio("mixkit-arcade-retro-game-over-213.wav")
const speedInc = new Audio("mixkit-player-boost-recharging-2040.wav")
let headX = 10
let headY = 10
let tailLength = 2
const snakeParts = []

let xVelocity = 0
let yVelocity = 0

let score = 0
let appleX = 5
let appleY = 5

function drawGame(){
    changeSnakePosition()
    let result = isGameOver()
    if(result){
        gameOverSound.play()
        return
    }


    clearScreen()
    cheakAppleCollision()
  
    drawApple()
    drawSnake()
    drawScore()
    lelvelUpdate()
    setTimeout(drawGame, 1000 / speed)
}

function lelvelUpdate(){
    if(score == 5){
        speed ==  8
        speedInc.play()
        
    }
    if(score == 10) {
        speed == 13
        speedInc.play()
    }
    if (score == 20) {
        speed == 17
        speedInc.play()
    }
}



function isGameOver(){
    let gameOver = false

    if(yVelocity === 0 && xVelocity === 0 ){
        return false
    }
    //l wall
    if (headX < 0) {
        gameOver = true
    }
    // r wall
    else if (headX >= tileCount) {
        gameOver = true
    }
    // u wall
    else if (headY < 0) {
        gameOver = true
    }
    // d wall
    else if (headY >= tileCount) {
        gameOver = true
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i]
        if(part.x === headX && part.y === headY){
            gameOver = true
            break
        }
    }


    if(gameOver){
        ctx.fillStyle = "white"
        ctx.font = "50px Vernada "
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop("0", "magenta")
        gradient.addColorStop("0.5", "blue")
        gradient.addColorStop("1.0", "red")

        ctx.fillStyle = gradient


        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2)

   

    }




    return gameOver
}
function drawScore(){
    ctx.fillStyle = "white"
    ctx.font = "10px Verdana"
    ctx.fillText("Score: " +score, canvas.width - 50,10)
}

function clearScreen(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0, canvas.width, canvas.height)
}
function drawSnake(){
    ctx.fillStyle = 'orange'
    ctx.fillRect(headX* tileCount, headY * tileCount,tileSize, tileSize)

    ctx.fillStyle = 'green'
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i]
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeParts.push(new Snakepart(headX, headY))
    while (snakeParts.length > tailLength) {
        snakeParts.shift()
    }
}

function changeSnakePosition(){
    headX = headX + xVelocity
    headY = headY + yVelocity

}

function drawApple(){
    ctx.fillStyle = 'red'
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}



function cheakAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * 20)
        appleY = Math.floor(Math.random() * 20)
        tailLength++
        score++
        gulpSound.play()
    }
}






document.body.addEventListener('keydown', keyDown)

function keyDown(event) {
    if (event.keyCode == 38){

        if(yVelocity == 1) return
        yVelocity = -1
        xVelocity = 0

    }
      
  
    if(event.keyCode == 40) {
            
    if(yVelocity == -1) return
        yVelocity = 1
        xVelocity = 0

}

if (event.keyCode == 37){

    if(xVelocity == 1) return
    yVelocity = 0
    xVelocity = -1

}
  
if(event.keyCode == 39) {
    
if(xVelocity == -1) return
    yVelocity = 0
    xVelocity = 1

}


}

drawGame()
