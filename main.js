const gameBoard = {
  board: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: {},
};

class Player {
  constructor(name, sign) {
    this.name = name;
    this.sign = sign;
  }
}

const playerX = new Player("Player X", "X");
const playerO = new Player("Player O", "O");

const allElements = Array.from(document.querySelectorAll(".element"));
allElements.forEach((element) => element.addEventListener(`click`, playSign));

const newTwoPlayerButton = document.querySelector(`.new-game`);
newTwoPlayerButton.addEventListener(`click`, newGame);

const announcements = document.querySelector(".announcements");

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

  if (playerX.name === "Player X" && playerO.name === "Player O") return;

  if (playerX.name === "Player X") {
    playerX.name = playerO.name;
    playerXName.value = playerO.name;

    playerO.name = "Player O";
    playerOName.value = "";

    updateDisplay();
    return;
  }
  if (playerO.name === "Player O") {
    playerO.name = playerX.name;
    playerOName.value = playerX.name;

    playerX.name = "Player X";
    playerXName.value = "";

    updateDisplay();
    return;
  }

  let tempName = playerX.name;
  playerX.name = playerO.name;
  playerO.name = tempName;

  tempName = playerXName.value;
  playerXName.value = playerOName.value;
  playerOName.value = tempName;
  updateDisplay();
});

function nextPlayer() {
  if (gameBoard.currentPlayer === playerX) {
    return playerO;
  }
  return playerX;
}

function checkGameWon() {
  return false;
}

function checkGameDraw() {
  for (let i = 0; i < gameBoard.board.length; i++) {
    if (gameBoard.board[i] === "") return false;
  }
  return true;
}

function updateDisplay() {
  if (checkGameDraw()) {
    announcements.textContent = `Game is a DRAW`;
    gameBoard.board.forEach((board, index) => {
      allElements[index].textContent = board;
    });
    return;
  }
  announcements.textContent = `${gameBoard.currentPlayer.name}'s turn to play`;
  gameBoard.board.forEach((board, index) => {
    allElements[index].textContent = board;
  });
}

function playSign() {
  if (checkGameWon() || checkGameDraw()) {
    return;
  }
  if (this.textContent) return;

  gameBoard.board[this.id] = gameBoard.currentPlayer.sign;

  checkGameWon();
  checkGameDraw();

  gameBoard.currentPlayer = nextPlayer();
  updateDisplay();
}

function newGame() {
  gameBoard.board = ["", "", "", "", "", "", "", "", ""];
  gameBoard.currentPlayer = playerX;

  updateDisplay();
}

newGame();
