class Background extends GameObject {
  constructor(width, height, scenarioIndex = 0) {
    super(0, 0, width, height);
    this.setScenario(scenarioIndex);
  }

  setScenario(index) {
    this.scenarioIndex = index;
    const scenarios = [
      { sky1: '#87CEEB', sky2: '#FFD700', ground: '#D2B48C', sun: '#FF4500' },
      { sky1: '#FF7E5F', sky2: '#FEB47B', ground: '#CD853F', sun: '#FFD700' },
      { sky1: '#2C3E50', sky2: '#3498DB', ground: '#8B4513', sun: '#F1C40F' },
      { sky1: '#E0EAFC', sky2: '#CFDEF3', ground: '#A0522D', sun: '#FF8C00' }
    ];
    this.colors = scenarios[this.scenarioIndex % scenarios.length];
  }

  draw(ctx) {
    let gradient = ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, this.colors.sky1);
    gradient.addColorStop(0.5, this.colors.sky2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = this.colors.sun;
    ctx.beginPath();
    ctx.arc(this.width - 100, 100, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = this.colors.ground;
    ctx.fillRect(0, this.height - 150, this.width, 150);

    this.drawCactus(ctx, 150, this.height - 150);
    this.drawCactus(ctx, this.width - 200, this.height - 150);
  }

  drawCactus(ctx, x, y) {
    ctx.fillStyle = '#2E8B57';
    ctx.fillRect(x, y - 100, 20, 100);
    ctx.fillRect(x - 30, y - 70, 30, 15);
    ctx.fillRect(x - 30, y - 90, 15, 30);
    ctx.fillRect(x + 20, y - 50, 30, 15);
    ctx.fillRect(x + 35, y - 80, 15, 40);
  }
}
