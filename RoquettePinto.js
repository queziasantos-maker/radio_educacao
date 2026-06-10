class RoquettePinto extends GameObject {
  constructor(x, y) {
    super(x, y, 80, 150);
    this.targetX = x;
    this.isMoving = false;
    this.speed = 150;
    this.walkCycle = 0;
    this.onReachTarget = null;
  }

  walkTo(targetX, callback) {
    this.targetX = targetX;
    this.isMoving = true;
    this.onReachTarget = callback;
  }

  update(dt) {
    if (this.isMoving) {
      const dist = this.targetX - this.x;
      if (Math.abs(dist) > 5) {
        this.x += Math.sign(dist) * this.speed * dt;
        this.walkCycle += dt * 10;
      } else {
        this.x = this.targetX;
        this.isMoving = false;
        this.walkCycle = 0;
        if (this.onReachTarget) {
          const cb = this.onReachTarget;
          this.onReachTarget = null;
          cb();
        }
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#f1c27d';
    ctx.beginPath();
    ctx.arc(this.x + 40, this.y + 30, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x + 30, this.y + 25, 6, 0, Math.PI * 2);
    ctx.arc(this.x + 50, this.y + 25, 6, 0, Math.PI * 2);
    ctx.moveTo(this.x + 36, this.y + 25);
    ctx.lineTo(this.x + 44, this.y + 25);
    ctx.stroke();

    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(this.x + 20, this.y + 50, 40, 60);

    ctx.fillStyle = '#1a252f';
    const legOffset1 = this.isMoving ? Math.sin(this.walkCycle) * 10 : 0;
    const legOffset2 = this.isMoving ? Math.sin(this.walkCycle + Math.PI) * 10 : 0;
    
    ctx.fillRect(this.x + 20 + legOffset1, this.y + 110, 15, 40);
    ctx.fillRect(this.x + 45 + legOffset2, this.y + 110, 15, 40);
  }
}
