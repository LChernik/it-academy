// One grid cell size 
const grid = 15;
// One paddle height
const paddleHeight = grid * 5;
// Paddle speed
const paddleSpeed = 6;
// Ball speed
const ballSpeed = 5;

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// Max height a paddle can go up
const maxPaddleY = canvas.height - grid - paddleHeight;

function Paddle({x, y, width, height, dy}) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.dy = dy;
  this.top = () => this.y;
  this.bottom = () => this.y + this.height;
  this.right = () => this.x + this.width;
  this.left = () => this.x;
}

function Ball({x, y, width, height, dx, dy}) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.dx = dx;
  this.dy = dy;
  this.top = () => this.y;
  this.bottom = () => this.y + this.height;
  this.right = () => this.x + this.width / 2;
  this.left = () => this.x - this.width / 2;
  this.center = () => ({x: this.x, y: this.y});
}

// Right, left paddles and ball description
const leftPaddle = new Paddle({
  x: grid * 2,
  y: canvas.height / 2 - paddleHeight / 2,
  width: grid,
  height: paddleHeight,
  dy: 0
});

const rightPaddle = new Paddle({
  x: canvas.width - grid * 3,
  y: canvas.height / 2 - paddleHeight / 2,
  width: grid,
  height: paddleHeight,
  dy: 0,
});


const ball = new Ball({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: grid,
  height: grid,
  dx: 0,
  dy: 0,
});

const counter = {
  left: 0,
  right: 0
};

// Check whether two objects intersect;  credit to: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function collides(ball, paddle) {
    return ball.left() < paddle.right() &&
           ball.right() > paddle.left() &&
           ball.center().y < paddle.bottom() &&
           ball.center().y > paddle.top();
};

function loop() {
    requestAnimationFrame(loop);

    //Clear canvas
    context.clearRect(0,0,canvas.width,canvas.height);

    // Move paddles
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    if (leftPaddle.y < grid) {
        leftPaddle.y = grid; 
    } else if (leftPaddle.y > maxPaddleY) { 
        leftPaddle.y = maxPaddleY; 
    }
    if (rightPaddle.y < grid) {
        rightPaddle.y = grid;
    } else if (rightPaddle.y > maxPaddleY) { 
        rightPaddle.y = maxPaddleY; 
    }

    // Draw paddles
    context.fillStyle = 'yellow';
    context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    context.fillStyle = 'green';
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    // Move ball
    ball.x += ball.dx; 
    ball.y += ball.dy;

    // Push ball away from top and bottom
    if (ball.y < ball.width/2) { 
      ball.y = ball.width/2; 
      ball.dy *= -1; 
    } else if (ball.y > canvas.height - ball.width / 2) { 
      ball.y = canvas.height - ball.width / 2; 
      ball.dy *= -1; 
    }

    if (ball.x < 0) {
      counter.right ++;
      document.getElementById('counter').innerHTML = counter.left + ':' + counter.right;
    } else if (ball.x > canvas.width){
      counter.left ++;
      document.getElementById('counter').innerHTML = counter.left + ':' + counter.right;
    }

    if ( (ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 0;
        ball.dy = 0;
    }

    if (collides(ball, leftPaddle)) {
      ball.dx *= -1; 
      ball.x = leftPaddle.right() + ball.width / 2;
    } else if (collides(ball, rightPaddle)) {
      ball.dx *= -1;
      ball.x = rightPaddle.left() - ball.width;
    }

    // Draw a net
    context.fillStyle = 'white';
    for (let i = grid; i < canvas.height - grid; i += grid * 2) {
      context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
    }
    // Draw a ball
    context.beginPath();
    context.arc(ball.x, ball.y, ball.width / 2, 0, 2 * Math.PI);
    context.fillStyle = '#cf7bcb';
    context.fill();

    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 38) {
        rightPaddle.dy = -paddleSpeed;
      } else if (e.keyCode === 40) {
          rightPaddle.dy = paddleSpeed;
        }
      if (e.keyCode === 16) {
        leftPaddle.dy = -paddleSpeed;
      } else if (e.keyCode === 17) {
          leftPaddle.dy = paddleSpeed;
        }
    });
    
    document.addEventListener('keyup', function (e) {
    if (e.keyCode === 38 || e.keyCode === 40) {
      rightPaddle.dy = 0;
    }
    if (e.keyCode === 16 || e.keyCode === 17) {
      leftPaddle.dy = 0;
    }
    });
};
requestAnimationFrame(loop);

function start() {
  ball.dx = ballSpeed;
  ball.dy = -ballSpeed;
}