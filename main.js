const gameBoard = {
  board: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: {},
};

let gameOver = false;

const allElements = Array.from(document.querySelectorAll(".element"));
allElements.forEach((element) => element.addEventListener(`click`, playSign));

const newTwoPlayerButton = document.querySelector(`.new-game`);
newTwoPlayerButton.addEventListener(`click`, newGame);

const announcements = document.querySelector(".announcements");

const resetWins = document.querySelector(`.reset-wins`);
resetWins.addEventListener(`click`, () => {
  playerX.wins = 0;
  playerO.wins = 0;
  playerXWins.textContent = 0;
  playerOWins.textContent = 0;
});

let playerXWins = document.querySelector(`#player-x-wins`);
let playerOWins = document.querySelector(`#player-o-wins`);

class Player {
  constructor(name, sign, wins) {
    this.name = name;
    this.sign = sign;
    this.wins = wins;
  }
}

const playerX = new Player("Player X", "X", +playerXWins.textContent);
const playerO = new Player("Player O", "O", +playerOWins.textContent);

let playerXName = document.querySelector(`#player-x-input`);
playerXName.addEventListener(`keyup`, () => {
  playerX.name = playerXName.value;
  if (playerXName.value === "") playerX.name = "Player X";
  updateDisplay();
});

let playerOName = document.querySelector(`#player-o-input`);
playerOName.addEventListener(`keyup`, () => {
  playerO.name = playerOName.value;
  if (playerOName.value === "") playerO.name = "Player O";
  updateDisplay();
});

const swapPlayers = document.querySelector(`.swap-players`);
swapPlayers.addEventListener(`click`, () => {
  newGame();

  if (playerX.name === "Player X" && playerO.name === "Player O") {
    let tempName = playerXWins.textContent;
    playerXWins.textContent = playerOWins.textContent;
    playerOWins.textContent = tempName;

    tempName = playerX.wins;
    playerX.wins = playerO.wins;
    playerO.wins = tempName;

    return;
  }

  if (playerX.name === "Player X") {
    playerX.name = playerO.name;
    playerXName.value = playerO.name;

    playerO.name = "Player O";
    playerOName.value = "";

    let tempName = playerX.wins;
    playerX.wins = playerO.wins;
    playerO.wins = tempName;

    tempName = playerXWins.textContent;
    playerXWins.textContent = playerOWins.textContent;
    playerOWins.textContent = tempName;

    updateDisplay();
    return;
  }
  if (playerO.name === "Player O") {
    playerO.name = playerX.name;
    playerOName.value = playerX.name;

    playerX.name = "Player X";
    playerXName.value = "";

    let tempName = playerX.wins;
    playerX.wins = playerO.wins;
    playerO.wins = tempName;

    tempName = playerXWins.textContent;
    playerXWins.textContent = playerOWins.textContent;
    playerOWins.textContent = tempName;

    updateDisplay();
    return;
  }

  let tempName = playerX.name;
  playerX.name = playerO.name;
  playerO.name = tempName;

  tempName = playerXName.value;
  playerXName.value = playerOName.value;
  playerOName.value = tempName;

  tempName = playerX.wins;
  playerX.wins = playerO.wins;
  playerO.wins = tempName;

  tempName = playerXWins.textContent;
  playerXWins.textContent = playerOWins.textContent;
  playerOWins.textContent = tempName;
  updateDisplay();
});

function nextPlayer() {
  if (gameBoard.currentPlayer === playerX) {
    return playerO;
  }
  return playerX;
}

function checkGameWon() {
  if (
    gameBoard.board[0] != "" &&
    gameBoard.board[0] === gameBoard.board[1] &&
    gameBoard.board[1] === gameBoard.board[2]
  ) {
    gameWon();
    gameOver = true;
    allElements[0].classList.add(`win`);
    allElements[1].classList.add(`win`);
    allElements[2].classList.add(`win`);
  }
  if (
    gameBoard.board[3] != "" &&
    gameBoard.board[3] === gameBoard.board[4] &&
    gameBoard.board[4] === gameBoard.board[5]
  ) {
    gameWon();
    gameOver = true;
    allElements[3].classList.add(`win`);
    allElements[4].classList.add(`win`);
    allElements[5].classList.add(`win`);
  }
  if (
    gameBoard.board[6] != "" &&
    gameBoard.board[6] === gameBoard.board[7] &&
    gameBoard.board[7] === gameBoard.board[8]
  ) {
    gameWon();
    gameOver = true;
    allElements[6].classList.add(`win`);
    allElements[7].classList.add(`win`);
    allElements[8].classList.add(`win`);
  }
  if (
    gameBoard.board[0] != "" &&
    gameBoard.board[0] === gameBoard.board[3] &&
    gameBoard.board[3] === gameBoard.board[6]
  ) {
    gameWon();
    gameOver = true;
    allElements[0].classList.add(`win`);
    allElements[3].classList.add(`win`);
    allElements[6].classList.add(`win`);
  }
  if (
    gameBoard.board[1] != "" &&
    gameBoard.board[1] === gameBoard.board[4] &&
    gameBoard.board[4] === gameBoard.board[7]
  ) {
    gameWon();
    gameOver = true;
    allElements[1].classList.add(`win`);
    allElements[4].classList.add(`win`);
    allElements[7].classList.add(`win`);
  }
  if (
    gameBoard.board[2] != "" &&
    gameBoard.board[2] === gameBoard.board[5] &&
    gameBoard.board[5] === gameBoard.board[8]
  ) {
    gameWon();
    gameOver = true;
    allElements[2].classList.add(`win`);
    allElements[5].classList.add(`win`);
    allElements[8].classList.add(`win`);
  }
  if (
    gameBoard.board[0] != "" &&
    gameBoard.board[0] === gameBoard.board[4] &&
    gameBoard.board[4] === gameBoard.board[8]
  ) {
    gameWon();
    gameOver = true;
    allElements[0].classList.add(`win`);
    allElements[4].classList.add(`win`);
    allElements[8].classList.add(`win`);
  }
  if (
    gameBoard.board[2] != "" &&
    gameBoard.board[2] === gameBoard.board[4] &&
    gameBoard.board[4] === gameBoard.board[6]
  ) {
    gameWon();
    gameOver = true;
    allElements[2].classList.add(`win`);
    allElements[4].classList.add(`win`);
    allElements[6].classList.add(`win`);
  }
}

function gameWon() {
  gameBoard.currentPlayer.wins++;
  announcements.textContent = `${gameBoard.currentPlayer.name} has WON !!!`;
  playerXWins.textContent = playerX.wins;
  playerOWins.textContent = playerO.wins;

  gameBoard.board.forEach((board, index) => {
    allElements[index].textContent = board;
  });
}

function gameDraw() {
  announcements.textContent = `Game is a DRAW`;
  gameBoard.board.forEach((board, index) => {
    allElements[index].textContent = board;
  });
}

function checkGameDraw() {
  for (let i = 0; i < gameBoard.board.length; i++) {
    if (gameBoard.board[i] === "") return false;
  }
  gameDraw();
  gameOver = true;
}

function updateDisplay() {
  if (gameOver) return;
  announcements.textContent = `${gameBoard.currentPlayer.name} PLAYING`;
  gameBoard.board.forEach((board, index) => {
    allElements[index].textContent = board;
  });
}

function playSign() {
  if (gameOver) {
    return;
  }
  if (this.textContent) return;

  gameBoard.board[this.id] = gameBoard.currentPlayer.sign;

  checkGameWon();
  checkGameDraw();

  if (gameOver) return;
  gameBoard.currentPlayer = nextPlayer();
  updateDisplay();
}

function newGame() {
  gameOver = false;

  allElements.forEach((element) => {
    element.classList.remove(`win`);
  });

  gameBoard.board = ["", "", "", "", "", "", "", "", ""];
  gameBoard.currentPlayer = playerX;

  updateDisplay();
}

newGame();
