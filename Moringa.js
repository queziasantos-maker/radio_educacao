class Moringa extends GameObject {
  constructor(x, y, text, isCorrect) {
    super(x, y, 120, 150);
    this.text = text;
    this.isCorrect = isCorrect;
    this.hover = false;
  }

draw(ctx) {

    const rx = this.x + 5;
    const ry = this.y + 28;

    /* ==========================
       RÁDIO (50% do tamanho)
    ========================== */

    // Corpo
    ctx.fillStyle = this.hover ? "#a86a2a" : "#8b5a2b";
    ctx.fillRect(rx, ry, 50, 40);

    // Moldura
    ctx.strokeStyle = "#4a2c12";
    ctx.lineWidth = 2;
    ctx.strokeRect(rx, ry, 50, 40);

    // Alto-falante
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

    // Mostrador
    ctx.fillStyle = "#f5f2dc";
    ctx.fillRect(rx + 34, ry + 6, 12, 10);

    // Ponteiro
    ctx.strokeStyle = "#d32f2f";
    ctx.beginPath();
    ctx.moveTo(rx + 36, ry + 14);
    ctx.lineTo(rx + 44, ry + 8);
    ctx.stroke();

    // Botões
    ctx.fillStyle = "#d4af37";

    ctx.beginPath();
    ctx.arc(rx + 37, ry + 28, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(rx + 46, ry + 28, 2.5, 0, Math.PI * 2);
    ctx.fill();

/* ==========================
   CAIXA DA ALTERNATIVA
========================== */

const bx = rx + 60;
const by = ry;
const bw = 210;
const bh = 60;

ctx.fillStyle = "#f7f0d8";
ctx.strokeStyle = "#8b5a2b";
ctx.lineWidth = 2;

ctx.fillRect(bx, by, bw, bh);
ctx.strokeRect(bx, by, bw, bh);

/* ==========================
   TEXTO
========================== */

ctx.fillStyle = "#000";
ctx.font = "11px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

const maxWidth = bw - 16;

const words = this.text.split(" ");

let lines = [];
let line = "";

for (const word of words) {

    const test = line + word + " ";

    if (ctx.measureText(test).width > maxWidth) {

        lines.push(line.trim());
        line = word + " ";

    } else {

        line = test;

    }

}

if (line.length > 0)
    lines.push(line.trim());

const visibleLines = Math.min(lines.length, 4);

const lineHeight = 13;

const totalHeight = visibleLines * lineHeight;

const startY = by + (bh - totalHeight) / 2 + lineHeight / 2;

for (let i = 0; i < visibleLines; i++) {

    ctx.fillText(
        lines[i],
        bx + bw / 2,
        startY + i * lineHeight
    );

}
}
}
