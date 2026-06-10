class Moringa extends GameObject {
  constructor(x, y, text, isCorrect) {
    super(x, y, 120, 150);
    this.text = text;
    this.isCorrect = isCorrect;
    this.hover = false;
  }

  draw(ctx) {
    ctx.fillStyle = this.hover ? '#a0522d' : '#8b4513';
    ctx.beginPath();
    ctx.ellipse(this.x + 60, this.y + 100, 50, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(this.x + 40, this.y + 50);
    ctx.lineTo(this.x + 80, this.y + 50);
    ctx.lineTo(this.x + 70, this.y + 10);
    ctx.lineTo(this.x + 50, this.y + 10);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(this.x + 60, this.y + 10, 25, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#5c2e0b';
    ctx.fill();

    ctx.fillStyle = '#f0e6d2';
    ctx.fillRect(this.x + 10, this.y + 75, 100, 40);
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const words = this.text.split(' ');
    if (words.length > 1 && ctx.measureText(this.text).width > 90) {
      const half = Math.ceil(words.length / 2);
      const line1 = words.slice(0, half).join(' ');
      const line2 = words.slice(half).join(' ');
      ctx.fillText(line1, this.x + 60, this.y + 87);
      ctx.fillText(line2, this.x + 60, this.y + 103);
    } else {
      ctx.fillText(this.text, this.x + 60, this.y + 95);
    }
  }
}
