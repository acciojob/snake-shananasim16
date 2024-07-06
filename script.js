let snake = [
    { x: 1, y: 20 },
    { x: 2, y: 20 },
    { x: 3, y: 20 }
];
let food = { x: 10, y: 10 };
let score = 0;
let direction = 'right';

const gameBoard = document.getElementById('gameBoard');
const scoreBoard = document.getElementById('score');
const pixelElements = gameBoard.children;

function drawSnake() {
    snake.forEach(part => {
        const pixelId = `pixel${part.x * 40 + part.y}`;
        const pixelElement = document.getElementById(pixelId);
        pixelElement.classList.add('snakeBodyPixel');
    });
}

function drawFood() {
    const pixelId = `pixel${food.x * 40 + food.y}`;
    const pixelElement = document.getElementById(pixelId);
    pixelElement.classList.add('food');
}

function moveSnake() {
    switch (direction) {
        case 'right':
            snake.unshift({ x: snake[0].x + 1, y: snake[0].y });
            break;
        case 'left':
            snake.unshift({ x: snake[0].x - 1, y: snake[0].y });
            break;
        case 'up':
            snake.unshift({ x: snake[0].x, y: snake[0].y - 1 });
            break;
        case 'down':
            snake.unshift({ x: snake[0].x, y: snake[0].y + 1 });
            break;
    }

    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
        food = generateFood();
    } else {
        snake.pop();
    }

    drawSnake();
    drawFood();
}

function generateFood() {
    let x, y;
    do {
        x = Math.floor(Math.random() * 40);
        y = Math.floor(Math.random() * 40);
    } while (snake.some(part => part.x === x && part.y === y));
    return { x, y };
}

setInterval(moveSnake, 100);

// Initialize game
drawSnake();
drawFood();
    
  