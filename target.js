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
