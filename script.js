const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');

const gridSize = 40;
const initialSnakeSpeed = 100; // in ms
let snakeSpeed = initialSnakeSpeed;
let score = 0;

// Initialize the snake's position and direction
let snake = [{ row: 20, col: 1 }];
let direction = 'right';

// Initialize the food's position
let food = getRandomPosition();

function getRandomPosition() {
    const row = Math.floor(Math.random() * gridSize) + 1;
    const col = Math.floor(Math.random() * gridSize) + 1;
    return { row, col };
}

function updateGame() {
    // Move the snake
    let head = { ...snake[0] };
    if (direction === 'up') {
        head.row--;
    } else if (direction === 'down') {
        head.row++;
    } else if (direction === 'left') {
        head.col--;
    } else {
        head.col++;
    }

    // Check for collisions
    if (head.row === food.row && head.col === food.col) {
        // Snake eats food
        snake.unshift(head);
        score++;
        scoreElement.textContent = score;
        food = getRandomPosition();
    } else {
        // Move the snake by adding a new head and removing the tail
        snake.pop();
        snake.unshift(head);
    }

    // Check for game over conditions
    if (head.row < 1 || head.row > gridSize || head.col < 1 || head.col > gridSize) {
        alert('Game over! Your score is ' + score);
        resetGame();
        return;
    }

    // Update the grid
    clearGrid();
    renderSnake();
    renderFood();
}

function renderSnake() {
    snake.forEach((segment, index) => {
        const pixel = document.getElementById(`pixel${segment.row}-${segment.col}`);
        pixel.classList.add('snakeBodyPixel');
    });
}

function renderFood() {
    const pixel = document.getElementById(`pixel${food.row}-${food.col}`);
    pixel.classList.add('food');
}

function clearGrid() {
    const pixels = document.querySelectorAll('.snakeBodyPixel, .food');
    pixels.forEach((pixel) => pixel.classList.remove('snakeBodyPixel', 'food'));
}

function resetGame() {
    clearInterval(gameLoop);
    snake = [{ row: 20, col: 1 }];
    direction = 'right';
    score = 0;
    scoreElement.textContent = score;
    snakeSpeed = initialSnakeSpeed;
    food = getRandomPosition();
    gameLoop = setInterval(updateGame, snakeSpeed);
}

// Create the grid
for (let row = 1; row <= gridSize; row++) {
    for (let col = 1; col <= gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.id = `pixel${row}-${col}`;
        pixel.classList.add('pixel');
        gameContainer.appendChild(pixel);
    }
}

// Start the game loop
let gameLoop = setInterval(updateGame, snakeSpeed);

// Handle keyboard input to change the snake's direction
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (event.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    } else if (event.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (event.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
});

