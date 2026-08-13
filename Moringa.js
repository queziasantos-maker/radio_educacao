class Moringa extends GameObject {
  constructor(x, y, text, isCorrect, options = {}) {
    const mobile = !!options.mobile;
    super(x, y, mobile ? (options.width || 170) : 120, mobile ? (options.height || 86) : 150);
    this.text = text;
    this.isCorrect = isCorrect;
    this.hover = false;
    this.mobile = mobile;
  }

  draw(ctx) {
    if (this.mobile) {
      this.drawMobile(ctx);
      return;
    }

    const rx = this.x + 5;
    const ry = this.y + 28;

    ctx.fillStyle = this.hover ? "#a86a2a" : "#8b5a2b";
    ctx.fillRect(rx, ry, 50, 40);
    ctx.strokeStyle = "#4a2c12";
    ctx.lineWidth = 2;
    ctx.strokeRect(rx, ry, 50, 40);

    ctx.fillStyle = "#d9c89c";
    ctx.fillRect(rx + 4, ry + 4, 25, 28);
    ctx.strokeStyle = "#8b5a2b";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(rx + 6, ry + 8 + i * 6);
      ctx.lineTo(rx + 26, ry + 8 + i * 6);
      ctx.stroke();
    }

    ctx.fillStyle = "#f5f2dc";
    ctx.fillRect(rx + 34, ry + 6, 12, 10);
    ctx.strokeStyle = "#d32f2f";
    ctx.beginPath();
    ctx.moveTo(rx + 36, ry + 14);
    ctx.lineTo(rx + 44, ry + 8);
    ctx.stroke();

    ctx.fillStyle = "#d4af37";
    ctx.beginPath(); ctx.arc(rx + 37, ry + 28, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(rx + 46, ry + 28, 2.5, 0, Math.PI * 2); ctx.fill();

    const bx = rx + 60;
    const by = ry;
    const bw = 210;
    const bh = 60;

    ctx.fillStyle = "#f7f0d8";
    ctx.strokeStyle = "#8b5a2b";
    ctx.lineWidth = 2;
    ctx.fillRect(bx, by, bw, bh);
    ctx.strokeRect(bx, by, bw, bh);

    ctx.fillStyle = "#000";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    this.drawWrappedText(ctx, this.text, bx + bw / 2, by + bh / 2, bw - 16, 13, 4);
  }

  drawMobile(ctx) {
    const bw = this.width;
    const bh = this.height;
    const radioW = 42;
    const radioH = 32;
    const rx = this.x + 5;
    const ry = this.y + 3;
    const bx = this.x + radioW + 10;
    const by = this.y + 3;
    const textW = bw - (radioW + 16);

    ctx.fillStyle = this.hover ? "#a86a2a" : "#8b5a2b";
    ctx.fillRect(rx, ry, radioW, radioH);
    ctx.strokeStyle = "#4a2c12";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(rx, ry, radioW, radioH);

    ctx.fillStyle = "#d9c89c";
    ctx.fillRect(rx + 3, ry + 3, 21, 23);
    ctx.strokeStyle = "#8b5a2b";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(rx + 5, ry + 7 + i * 5);
      ctx.lineTo(rx + 22, ry + 7 + i * 5);
      ctx.stroke();
    }
    ctx.fillStyle = "#f5f2dc";
    ctx.fillRect(rx + 29, ry + 5, 9, 8);
    ctx.strokeStyle = "#d32f2f";
    ctx.beginPath(); ctx.moveTo(rx + 31, ry + 12); ctx.lineTo(rx + 37, ry + 7); ctx.stroke();
    ctx.fillStyle = "#d4af37";
    ctx.beginPath(); ctx.arc(rx + 30, ry + 23, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(rx + 37, ry + 23, 2, 0, Math.PI * 2); ctx.fill();

    const boxW = Math.max(80, textW);
    const boxH = bh - 6;
    ctx.fillStyle = "#f7f0d8";
    ctx.strokeStyle = "#8b5a2b";
    ctx.lineWidth = 1.5;
    ctx.fillRect(bx, by, boxW, boxH);
    ctx.strokeRect(bx, by, boxW, boxH);

    ctx.fillStyle = "#000";
    ctx.font = "9px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    this.drawWrappedText(ctx, this.text, bx + boxW / 2, by + boxH / 2, boxW - 8, 10, 5);
  }

  drawWrappedText(ctx, text, centerX, centerY, maxWidth, lineHeight, maxLines) {
    const words = text.replace(/\s+/g, " ").trim().split(" ");
    const lines = [];
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);

    const visible = lines.slice(0, maxLines);
    if (lines.length > maxLines && visible.length) {
      let last = visible[visible.length - 1];
      while (ctx.measureText(`${last}…`).width > maxWidth && last.length > 1) {
        last = last.slice(0, -1);
      }
      visible[visible.length - 1] = `${last}…`;
    }

    const total = visible.length * lineHeight;
    const startY = centerY - total / 2 + lineHeight / 2;
    visible.forEach((lineText, i) => ctx.fillText(lineText, centerX, startY + i * lineHeight));
  }
}
