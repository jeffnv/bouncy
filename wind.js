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
