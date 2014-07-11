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
  var passingY = this.y < target.y && (this.y + this.speedY) > target.y;
  return rightX && (rightY || passingY);
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

