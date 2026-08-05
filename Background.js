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

    // Base da torre
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20, y - 120);
    ctx.lineTo(x + 40, y);
    ctx.stroke();

    // Travessas
    for (let i = 0; i < 8; i++) {

        const yy = y - i * 15;

        ctx.beginPath();
        ctx.moveTo(x + 5, yy);
        ctx.lineTo(x + 35, yy);
        ctx.stroke();

    }

    // Diagonais
    for (let i = 0; i < 7; i++) {

        const y1 = y - i * 15;
        const y2 = y - (i + 1) * 15;

        ctx.beginPath();
        ctx.moveTo(x + 5, y1);
        ctx.lineTo(x + 35, y2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + 35, y1);
        ctx.lineTo(x + 5, y2);
        ctx.stroke();

    }

    // Antena superior
    ctx.beginPath();
    ctx.moveTo(x + 20, y - 120);
    ctx.lineTo(x + 20, y - 140);
    ctx.stroke();

    // Ondas de rádio
    ctx.strokeStyle = "#4FC3F7";
    ctx.lineWidth = 2;

    for (let r = 10; r <= 25; r += 7) {

        ctx.beginPath();
        ctx.arc(
            x + 20,
            y - 145,
            r,
            Math.PI * 1.2,
            Math.PI * 1.8
        );
        ctx.stroke();

    }

    // Estais
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x + 20, y - 80);
    ctx.lineTo(x - 20, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + 20, y - 80);
    ctx.lineTo(x + 60, y);
    ctx.stroke();
    }
}
