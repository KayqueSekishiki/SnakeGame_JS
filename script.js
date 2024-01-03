const btnInitial = document.getElementById("btnInitial");
const btnRestart = document.getElementById("btnRestart");
const textScore = document.getElementById("textScore");
let canvas = document.getElementById("snake");
let modalEndGame = document.getElementById("modal");

let context = canvas.getContext("2d");
let box = 32;
let count = 0;
let direction;

btnInitial.onclick = () => {
  canvas.style.display = "initial";
  btnInitial.style.display = "none";
};

btnRestart.onclick = () => {
  window.location.reload(true);
};

let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

function position() {
  return {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
  };
}

let food = position();

function CreateBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function CreateSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function CreateFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode === 37 && direction !== "right") direction = "left";
  if (event.keyCode === 38 && direction !== "down") direction = "up";
  if (event.keyCode === 39 && direction !== "left") direction = "right";
  if (event.keyCode === 40 && direction !== "up") direction = "down";
}

function initialMovement() {
  const moveList = ["right", "up", "left", "down"];
  let randomPosition = Math.floor(Math.random() * moveList.length);
  direction = moveList[randomPosition];
}

initialMovement();

function Init() {
  if (snake[0].x > 15 * box && direction !== "left") snake[0].x = 0;
  if (snake[0].x < 0 && direction !== "right") snake[0].x = 15 * box;
  if (snake[0].y > 15 * box && direction !== "up") snake[0].y = 0;
  if (snake[0].y < 0 && direction != "down") snake[0].y = 15 * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      modalEndGame.style.display = "flex";
      canvas.style.display = "none";
      textScore.innerText = `Your Score: ${count}`;
    }
  }

  CreateBG();
  CreateSnake();
  CreateFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    count++;
    food = position();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let game = setInterval(Init, 100);
