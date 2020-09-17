let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let direction = "right";
let foodCoordinates = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") {
    direction = "left";
  }
  if (event.keyCode == 38 && direction != "down") {
    direction = "up";
  }
  if (event.keyCode == 39 && direction != "left") {
    direction = "right";
  }
  if (event.keyCode == 40 && direction != "up") {
    direction = "down";
  }
}

function createBG() {
  context.fillStyle = "lightGreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function createFood() {
  context.fillStyle = "red";
  context.fillRect(foodCoordinates.x, foodCoordinates.y, box, box);
}

function initGame() {
  if (snake[0].x > 15 * box && direction == "right") {
    snake[0].x = 0;
  }
  if (snake[0].x < 0 * box && direction == "left") {
    snake[0].x = 16 * box;
  }
  if (snake[0].y > 15 * box && direction == "down") {
    snake[0].y = 0;
  }
  if (snake[0].y < 0 * box && direction == "up") {
    snake[0].y = 16 * box;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(gameLoop);
      alert("Game over!");
    }
  }

  createBG();
  createSnake();
  createFood();

  let snakeXPosition = snake[0].x;
  let snakeYPosition = snake[0].y;

  if (direction == "right") {
    snakeXPosition += box;
  }
  if (direction == "left") {
    snakeXPosition -= box;
  }
  if (direction == "up") {
    snakeYPosition -= box;
  }
  if (direction == "down") {
    snakeYPosition += box;
  }

  if (
    snakeXPosition != foodCoordinates.x ||
    snakeYPosition != foodCoordinates.y
  ) {
    snake.pop();
  } else {
    foodCoordinates.x = Math.floor(Math.random() * 15 + 1) * box;
    foodCoordinates.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeXPosition,
    y: snakeYPosition,
  };

  snake.unshift(newHead);
}

let gameLoop = setInterval(initGame, 100);
