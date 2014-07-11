function Square(x, y) {
  this.y = y;
  this.x = x;
  this.speedX = 0;
  this.speedY = 0;
  this.dead = false;
};

Square.prototype.atBottom = function(){
  return this.y >= HEIGHT;
}

Square.prototype.atTarget = function(target){

  var rightX = this.x >= target.x && this.x <= (target.x + target.width);
  var dy = this.y - target.y;
  //if it's 0 or less pixels above
  //or 20 or move pixels below
  var rightY = dy > -5 && dy < 20;
  return rightX && rightY;
}

Square.prototype.move = function (target) {
  this.y = this.y + this.speedY;
  this.x = this.x + this.speedX;
  if(this.speedY > 0 && (this.atBottom() || this.atTarget(target))){
    this.speedY = (this.speedY - 1) * -1;
  }
  if (this.speedY < 50) {
    this.speedY += 1;
  }
}

Square.prototype.applyWind = function (force) {
  this.speedX += force[0];
  this.speedY += force[1];
};

Square.prototype.resetAt = function (x, y) {
  this.y = y;
  this.x = x;
  this.speedY = 0;
  this.speedX = 0;
}

function Squares(w, h) {
  this.square = new Square(0, 0);
  this.keys = [];
  WIDTH = w;
  HEIGHT = h;
  this.wind = new Wind();
  this.target = new Target();
}

Squares.prototype.run = function (canvas) {
  this.ctx = canvas.getContext("2d");

  canvas.addEventListener("mouseup", this.click.bind(this));
  document.addEventListener("keydown", this.keyDown.bind(this));
  document.addEventListener("keyup", this.keyUp.bind(this));

  var that = this;
  setInterval(function () {
    that.tick();
  }, 20);
}

Squares.prototype.keyDown = function (event) {
  this.keys[event.keyCode] = true;
}

Squares.prototype.keyUp = function (event) {
  this.keys[event.keyCode] = false;
}

Squares.prototype.tick = function () {
  this.ctx.clearRect(0, 0, 500, 500);
  this.square.applyWind(this.measureWind());
  this.square.move(this.target);
  this.drawSquare();
  this.wind.moveParticles(this.measureWind());
  this.wind.drawParticles(this.ctx);
  this.target.move();
  this.target.drawTarget(this.ctx);
};

Squares.prototype.drawSquare = function () {
  this.ctx.fillStyle = "#F00000";
  this.ctx.fillRect(this.square.x, this.square.y, 8, 8);
};

Squares.prototype.drawParticles = function () {};
Squares.prototype.measureWind = function () {
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
Squares.prototype.click = function (event) {
  var x = event.x;
  var y = event.y;
  this.square.resetAt(x, y);
}
// we want 20 particles at a time, when they leave the screen or hit the
// make new ones
Wind = function () {
  this.particles = [];
  this.refreshParticles();
}

Wind.prototype.moveParticles = function (force) {
  this.particles.forEach(function (p) {
    p.blow(force);
    p.move();
  });
}

Wind.prototype.drawParticles = function (ctx) {
  this.refreshParticles();
  for (var i = 0; i < Wind.ParticleCount; i++) {
    var p = this.particles[i];
    ctx.fillStyle = "#333000";
    ctx.fillRect(p.x, p.y, 2, 2);
  }
}

Wind.ParticleCount = 30;

Wind.prototype.refreshParticles = function () {
  var valids = [];
  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    if (p.onScreen()) {
      valids.push(p)
    }
  }
  console.log(valids.length);
  this.particles = valids;

  var missingParticles = Wind.ParticleCount - this.particles.length;
  if (this.particles.length < Wind.ParticleCount) {
    while (missingParticles > 0) {
      this.particles.push(Particle.randomParticle());
      missingParticles--;
    }
  }
}

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

Target = function()  {
  this.width = 80;
  Moveable.call(this, WIDTH / 2, HEIGHT - 100, 1, 0);
}

Target.inherits(Moveable);

Target.prototype.drawTarget = function(ctx) {
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.width, this.y);
  ctx.lineWidth = 20;
  ctx.strokeStyle = '#0000ff';
  ctx.lineCap = 'round';
  ctx.stroke();
}

Target.prototype.move = function(){
  if((this.x + this.width) >= WIDTH || this.x < 0){
    this.speedX = this.speedX * -1;
  }
  Moveable.prototype.move.call(this);
}









