const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const scale = 20;
let snake = [{ x: 10 * scale, y: 10 * scale }];
let direction = { x: 0, y: 0 };
let food = { x: getRandomInt(0, canvas.width / scale) * scale, y: getRandomInt(0, canvas.height / scale) * scale };
let score = 0;

document.addEventListener('keydown', changeDirection);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function changeDirection(event) {
    const key = event.keyCode;
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    switch(key) {
        case LEFT:
            if (direction.x === 0) direction = { x: -scale, y: 0 };
            break;
        case UP:
            if (direction.y === 0) direction = { x: 0, y: -scale };
            break;
        case RIGHT:
            if (direction.x === 0) direction = { x: scale, y: 0 };
            break;
        case DOWN:
            if (direction.y === 0) direction = { x: 0, y: scale };
            break;
    }
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: getRandomInt(0, canvas.width / scale) * scale, y: getRandomInt(0, canvas.height / scale) * scale };
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);
}

function checkCollision() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function gameLoop() {
    if (checkCollision()) {
        alert('Game Over! Score: ' + score);
        snake = [{ x: 10 * scale, y: 10 * scale }];
        direction = { x: 0, y: 0 };
        score = 0;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    drawSnake();
}

setInterval(gameLoop, 100);
