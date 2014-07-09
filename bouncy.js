function Square(x, y) {
  this.y = y;
  this.x = x;
  this.speed = 0;
  this.dead = false;
};

Square.prototype.move = function () {
  this.y = this.y + this.speed;
  if (this.y >= 499) {
    if ((this.speed * this.speed) < 4) {
      this.dead = true;
    }
    this.y = 499;
    this.speed = (this.speed - 2) * -1;
  }
  if (this.speed < 100) {
    this.speed += 1;
  }
}

function Squares() {
  this.squares = [];
}

Squares.prototype.run = function (canvas) {
  this.ctx = canvas.getContext("2d");
  canvas.addEventListener("mouseup", this.click.bind(this));
  var that = this;
  setInterval(function () {
    that.tick();
  }, 20);
}

Squares.prototype.tick = function () {
  this.ctx.clearRect(0, 0, 500, 500);
  var liveSquares = [];
  var that = this;
  this.squares.forEach(function (square) {
    square.move()
    if (!square.dead) {
      liveSquares.push(square);
    }
      that.ctx.fillStyle = "#F00000";
      that.ctx.fillRect(square.x, square.y, 8, 8);
  });
  this.squares = liveSquares;

};

Squares.prototype.click = function (event) {
  var x = event.x;
  var y = event.y;
  this.squares.push(new Square(x, y));
}
