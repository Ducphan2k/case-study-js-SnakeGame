const topWiner = [
  {
    name: "duck",
    point: 1,
  },
];

localStorage.setItem("topWiner", JSON.stringify(topWiner));

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

// speed
var speed = 200;

// Color
var boardColorDefault = "black";
var foodColorDefault = "red";
var SnakedColorDefault = "lime";

var gameOver = false;

function run() {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = clos * blockSize;
  context = board.getContext("2d"); //used for drawing on the board

  placeFood();
  document.addEventListener("keyup", changeDirection);
  // update();
  setInterval(update, speed); //100 miliseconds
}

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = boardColorDefault;
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = foodColorDefault;
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    point++;
    document.querySelector("#score").innerText = point;
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = SnakedColorDefault;
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
    tryAgain.style.display = "block";
    if (point > 3) {
      var playerName = prompt("Vui lòng nhập tên của bạn:");
      var playerScore = {
        name: playerName,
        score: point,
      };

      // Retrieve existing scores from local storage
      var storedScores = JSON.parse(localStorage.getItem("playerScores")) || [];

      // Add the new score to the array
      storedScores.push(playerScore);

      // Store the updated scores in local storage
      localStorage.setItem("playerScores", JSON.stringify(storedScores));
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
let detailStart = document.getElementById("detail-start");
let start = document.getElementById("start-btn");
let container = document.querySelector(".container");
start.addEventListener("click", function () {
  board.style.display = "block";
  detailStart.style.display = "flex";

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

select.addEventListener("change", function () {
  if (select.value === "easy") {
    speed = 200;
    run();
  } else if (select.value === "normal") {
    speed = 150;
    run();
  } else if (select.value === "hard") {
    speed = 100;
    run();
  } else if (select.value === "supper") {
    speed = 50;
    run();
  }
});

run();

// color
var boardColor = document.getElementById("board-color");
boardColor.addEventListener("change", function () {
  boardColorDefault = boardColor.value;
  update();
});
var foodColor = document.getElementById("food-color");
foodColor.addEventListener("change", function () {
  foodColorDefault = foodColor.value;
  update();
});
var SnakeColor = document.getElementById("head-snake-color");
SnakeColor.addEventListener("change", function () {
  SnakedColorDefault = SnakeColor.value;
  update();
});

// stop game
var stop = document.getElementById("stop-btn");
stop.addEventListener("click", function () {
  alert("tam dung");
});

// return
var turnBack = document.getElementById("turn-back-btn");
turnBack.addEventListener("click", function () {
  board.style.display = "none";
  detailStart.style.display = "none";

  container.style.display = "flex";
});

// try again
var tryAgain = document.getElementById("try-again-btn");
tryAgain.addEventListener("click", function () {
  tryAgain.style.display = "none";
  // Reset game state
  gameOver = false;
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  moveX = 0;
  moveY = 0;
  snakeBody = [];
  point = 0;
  document.querySelector("#score").innerText = point;

  // Clear existing interval
  clearInterval(gameInterval);
  // Clear canvas
  // context.clearRect(0, 0, board.width, board.height);
  // context.clearRect(foodX, foodY, blockSize, blockSize);
  update;
  // Run the game again
  run();
  function run() {
    // ... existing code ...

    // Start game interval
    gameInterval = setInterval(update, speed);
  }
});

// modal instruct
let instructBtn = document.getElementById("instruct-btn");
let modalInstruct = document.querySelector(".modal-instruct");
let modalInstructClose = document.querySelector(".modal-instruct-close");

function showInstruct() {
  modalInstruct.classList.add("open");
  modalInstruct.style.visibility = "visible";
}

function hideInstruct() {
  modalInstruct.classList.remove("open");
}

instructBtn.addEventListener("click", showInstruct);

modalInstructClose.addEventListener("click", hideInstruct);
