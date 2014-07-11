function Bouncy(w, h) {
  this.square = new Square(0, 0);
  this.keys = [];
  WIDTH = w;
  HEIGHT = h;
  this.wind = new Wind();
  this.target = new Target();
}

Bouncy.prototype.run = function (canvas) {
  this.ctx = canvas.getContext("2d");

  canvas.addEventListener("mouseup", this.click.bind(this));
  document.addEventListener("keydown", this.keyDown.bind(this));
  document.addEventListener("keyup", this.keyUp.bind(this));

  var that = this;
  setInterval(function () {
    that.tick();
  }, 20);
}

Bouncy.prototype.keyDown = function (event) {
  this.keys[event.keyCode] = true;
}

Bouncy.prototype.keyUp = function (event) {
  this.keys[event.keyCode] = false;
}

Bouncy.prototype.tick = function () {
  this.ctx.clearRect(0, 0, 500, 500);
  this.square.applyWind(this.measureWind());
  this.square.move(this.target);
  this.drawSquare();
  this.wind.moveParticles(this.measureWind());
  this.wind.drawParticles(this.ctx);
  this.target.move();
  this.target.drawTarget(this.ctx);
};

Bouncy.prototype.drawSquare = function () {
  this.ctx.fillStyle = "#F00000";
  this.ctx.fillRect(this.square.x, this.square.y, 8, 8);
};

Bouncy.prototype.drawParticles = function () {};
Bouncy.prototype.measureWind = function () {
  var wind = [0, 0];
  //left
  if (this.keys[37]) {
    wind[0] = -0.5;
  }
  //up
  if (this.keys[38]) {
    wind[1] = -0.5;
  }
  //right
  if (this.keys[39]) {
    wind[0] += 0.5;
  }
  //down
  if (this.keys[40]) {
    wind[1] += 0.5;
  }
  return wind;
};
Bouncy.prototype.click = function (event) {
  var x = event.x;
  var y = event.y;
  this.square.resetAt(x, y);
}
// we want 20 particles at a time, when they leave the screen or hit the
// make new ones

Particle = function (x, y) {
  Moveable.call(this, x, y, 0, 1);
}

Particle.inherits(Moveable);

Particle.prototype.blow = function (force) {
  this.push([force[0] * 2.5, force[1] * 2.5]);
}

Particle.randomParticle = function () {
  return new Particle(Math.random() * WIDTH, Math.random() * HEIGHT);
}
