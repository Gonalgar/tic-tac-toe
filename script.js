let board = [];
let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let gameActive = false;

const startButton = document.getElementById('startButton');
const boardDiv = document.querySelector('.board');
const statusDiv = document.querySelector('.status');

startButton.addEventListener('click', () => {
    player1 = document.getElementById('player1').value || 'Player 1';
    player2 = document.getElementById('player2').value || 'Player 2';
    gameActive = true;
    currentPlayer = 'X';
    board = Array(9).fill('');
    statusDiv.textContent = `${player1}'s turn (X)`;
    renderBoard();
});

function renderBoard() {
    boardDiv.innerHTML = '';
    board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.index = index;
        cellDiv.textContent = cell;
        cellDiv.addEventListener('click', () => makeMove(index));
        boardDiv.appendChild(cellDiv);
    });
}

function makeMove(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    if (checkWin()) {
        statusDiv.textContent = `${currentPlayer === 'X' ? player1 : player2} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        statusDiv.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = `${currentPlayer === 'X' ? player1 : player2}'s turn (${currentPlayer})`;
    }
    renderBoard();
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}