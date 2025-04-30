const basket = document.getElementById('basket');
const scoreElement = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');

let score = 0;
let gameActive = true;
let basketPosition = window.innerWidth / 2;
let objects = [];

// Move basket with mouse
document.addEventListener('mousemove', (e) => {
    if (gameActive) {
        basketPosition = e.clientX;
        basket.style.left = `${basketPosition - 50}px`;
    }
});

// Create falling objects
function createObject() {
    if (!gameActive) return;

    const object = document.createElement('div');
    object.className = 'falling-object';
    object.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
    object.style.top = '-30px';
    document.querySelector('.game-container').appendChild(object);
    objects.push(object);

    // Move object down
    const fallInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(fallInterval);
            return;
        }

        const currentTop = parseInt(object.style.top);
        object.style.top = `${currentTop + 5}px`;

        // Check if object is caught
        const objectRect = object.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        if (
            objectRect.bottom >= basketRect.top &&
            objectRect.left >= basketRect.left &&
            objectRect.right <= basketRect.right
        ) {
            score++;
            scoreElement.textContent = score;
            object.remove();
            objects = objects.filter(obj => obj !== object);
            clearInterval(fallInterval);
        }

        // Check if object is missed
        if (currentTop > window.innerHeight) {
            gameOver();
            clearInterval(fallInterval);
        }
    }, 20);
}

// Game over function
function gameOver() {
    gameActive = false;
    finalScoreElement.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

// Restart game
restartButton.addEventListener('click', () => {
    score = 0;
    scoreElement.textContent = '0';
    gameActive = true;
    gameOverScreen.classList.add('hidden');
    objects.forEach(obj => obj.remove());
    objects = [];
    startGame();
});

// Start game
function startGame() {
    setInterval(createObject, 1000);
}

startGame();