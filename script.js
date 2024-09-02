const board = document.getElementById('gameBoard');
const cells = Array.from(document.getElementsByClassName('cell'));
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset');
const twoPlayerButton = document.getElementById('twoPlayer');
const playAIButton = document.getElementById('playAI');

let currentPlayer = 'X';
let isGameActive = true;
let gameMode = 'twoPlayer'; // default mode
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

twoPlayerButton.addEventListener('click', () => {
    gameMode = 'twoPlayer';
    startGame();
});

playAIButton.addEventListener('click', () => {
    gameMode = 'playAI';
    startGame();
});

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

function startGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    resultDisplay.textContent = '';
    currentPlayer = 'X';
    isGameActive = true;
}

function handleClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if (boardState[cellIndex] !== '' || !isGameActive) return;

    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        resultDisplay.textContent = `${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        resultDisplay.textContent = `It's a Draw!`;
        isGameActive = false;
        return;
    }

    if (gameMode === 'playAI' && currentPlayer === 'O') {
        currentPlayer = 'X';
        aiMove();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function aiMove() {
    let availableCells = boardState.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    
    boardState[randomIndex] = 'X';
    cells[randomIndex].textContent = 'X';

    if (checkWinner()) {
        resultDisplay.textContent = `AI Wins!`;
        isGameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        resultDisplay.textContent = `It's a Draw!`;
        isGameActive = false;
        return;
    }

    currentPlayer = 'O';
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function resetGame() {
    startGame();
}

