
Function.prototype.inherits = function(base){
  function Surrogate(){};
  Surrogate.prototype = base.prototype;
  this.prototype = new Surrogate();
}

Moveable = function(x,y, speedX, speedY){
  this.x = x;
  this.y = y;
  this.speedX = speedX;
  this.speedY = speedY;
}

Moveable.prototype.move = function(){
  this.y += this.speedY;
  this.x += this.speedX;
}

Moveable.prototype.push = function(force){
  this.speedX += force[0];
  this.speedY += force[1];
}

Moveable.prototype.onScreen = function(){
  var validX = this.x < WIDTH && this.x >= 0;
  var validY = this.y < HEIGHT && this.y >= 0;
  return validX && validY;
}
