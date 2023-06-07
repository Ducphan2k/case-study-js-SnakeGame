// board
var blockSize = 25;
var rows = 20;
var clos = 20;
var board;
var context;

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
// move
var moveX = 0;
var moveY = 0;
//lenght

var snakeBody = [];

// food

var foodX;
var foodY;

// poitn
var point = 0;

var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = clos * blockSize;
  context = board.getContext("2d"); //used for drawing on the board

  placeFood();
  document.addEventListener("keyup", changeDirection);
  // update();
  setInterval(update, 200); //100 miliseconds
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
    point++;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime";
  snakeX += moveX * blockSize;
  snakeY += moveY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // game over conditions
  if (
    snakeX < 0 ||
    snakeX > clos * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert(`GameOver, số điểm của bạn là: ${point}`);

    prompt("vui lòng nhập tên của bạn:");
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert(`GameOver, số điểm của bạn là: ${point}`);
      prompt("vui lòng nhập tên của bạn:");
    }
  }
}

// Di chuyển
function changeDirection(e) {
  if (e.code == "Space") {
    alert("tam dung");
  } else {
    if (e.code == "ArrowUp" && moveY != 1) {
      moveX = 0;
      moveY = -1;
    }
    if (e.code == "ArrowDown" && moveY != -1) {
      moveX = 0;
      moveY = 1;
    }
    if (e.code == "ArrowLeft" && moveX != 1) {
      moveX = -1;
      moveY = 0;
    }
    if (e.code == "ArrowRight" && moveX != -1) {
      moveX = 1;
      moveY = 0;
    }
  }
}

function placeFood() {
  // 0-1) *  cols -> (0-19.999) -> (0-19)*25
  foodX = Math.floor(Math.random() * clos) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Start Game
let start = document.getElementById("start-btn");
let container = document.querySelector(".container");
start.addEventListener("click", function () {
  board.style.display = "block";
  container.style.display = "none";
});

// modal settings

let settingsBtn = document.getElementById("settings-btn");

let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".js-modal-close");

// Ham hien thi modal setting (them class opem vao modal)
function showSettings() {
  modal.classList.add("open");
  modal.style.visibility = "visible";
}

// ham an modal setting (go bo class open cua madal)
function hideSettings() {
  modal.classList.remove("open");
}

// // nghe hành vi click vào button settings
settingsBtn.addEventListener("click", showSettings);

// // nghe hanh vi click vao button close
modalClose.addEventListener("click", hideSettings);

// level speed

var select = document.getElementById("select");
var easy = document.getElementById("easy");
var normal = document.getElementById("normal");
var hard = document.getElementById("hard");
var supper = document.getElementById("supper");

function levelEasy() {
  placeFood.setInterval(update, 200);
}

function levelNormal() {
  placeFood.setInterval(update, 150);
}
function levelHard() {
  placeFood.setInterval(update, 100);
}
function levelSupper() {
  placeFood.setInterval(update, 50);
}

easy.addEventListener("change", levelEasy);
normal.addEventListener("change", levelNormal);
hard.addEventListener("change", levelHard);
supper.addEventListener("change", levelSupper);
