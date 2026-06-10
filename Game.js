class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.entities = [];
    this.moringas = [];
    this.scrollX = 0;
    this.scrollY = 0;
    this.lastTime = 0;
    this.state = 'START';
    this.score = 0;
    this.currentQuestionIndex = 0;
    
    this.questions = [
      {
        text: "CAPÍTULO 1 - CHEGADA À CIDADE\n\nRoquette-Pinto chegou ao sertão e encontrou uma população sem acesso à escola. Entre os objetos existe uma pista que revela o ano que iniciou a revolução da educação pelo rádio.",
        options: ["Jornal 1912","Certificado 1923","Calendário 1938","Revista 1950"],
        correct: 1
      },
      {
        text: "CAPÍTULO 2 - A GRANDE IDEIA\n\nRoquette-Pinto procura uma tecnologia capaz de levar conhecimento para lugares onde não existem escolas.",
        options: ["Jornal","Rádio","Cinema","Telégrafo"],
        correct: 1
      },
      {
        text: "CAPÍTULO 3 - A PRIMEIRA RÁDIO\n\nQual instituição representa a emissora educativa criada por Roquette-Pinto?",
        options: ["Rádio Nacional","Rádio MEC","Rádio Sociedade","Rádio Tupi"],
        correct: 2
      },
      {
        text: "CAPÍTULO 4 - EDUCAÇÃO PELO AR\n\nQual conteúdo ajudaria mais na formação educacional da população?",
        options: ["Humor","Música Popular","Programas Educativos","Propaganda"],
        correct: 2
      }
    ]

    this.audio = new AudioSystem();

    this.initSave();
    this.setupResize();
    this.layoutScene();
    this.setupInput();
    this.start();
  }

async initSave() {
  this.saveData = {
    highScore: Number(localStorage.getItem("highScore") || 0)
  };
}
  setupResize() {
    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      const r = this.canvas.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;
      this.canvas.width  = Math.floor(r.width  * dpr);
      this.canvas.height = Math.floor(r.height * dpr);
      this.ctx.scale(dpr, dpr);
      this.logicalWidth = r.width;
      this.logicalHeight = r.height;
      this.layoutScene();
    };
    window.addEventListener('resize', fit);
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(fit).observe(this.canvas);
    fit();
  }

  startGame() {
    this.state = 'PLAYING';
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.audio.startBGM();
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('endScreen').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    this.updateHUD();
    this.layoutScene();
  }

  layoutScene() {
    this.entities = [];
    this.moringas = [];
    
    this.bg = new Background(this.logicalWidth || 800, this.logicalHeight || 600);
    this.entities.push(this.bg);

    if (this.state === 'PLAYING') {
      this.player = new RoquettePinto(20, this.logicalHeight - 150 - 150);
      this.entities.push(this.player);

      if (this.currentQuestionIndex < this.questions.length) {
        this.loadQuestion(this.currentQuestionIndex);
      }
    }
  }

  loadQuestion(index) {
    if (this.bg) this.bg.setScenario(index);
    const q = this.questions[index];
    document.getElementById('questionDisplay').innerText = q.text;

    this.entities = this.entities.filter(e => !(e instanceof Moringa));
    this.moringas = [];

    const margin = 20;
    const startX = 100 + margin;
    const endX = this.logicalWidth - 120 - margin;
    const availableWidth = Math.max(endX - startX, 0);
    const spacing = q.options.length > 1 ? availableWidth / (q.options.length - 1) : 0;

    q.options.forEach((opt, i) => {
      const isCorrect = (i === q.correct);
      const m = new Moringa(startX + i * spacing, this.logicalHeight - 200 -200 , opt, isCorrect);
      this.moringas.push(m);
      this.entities.push(m);
    });
  }

  screenToWorld(canvasX, canvasY) {
    return { x: canvasX + this.scrollX, y: canvasY + this.scrollY };
  }

  worldToScreen(worldX, worldY) {
    return { x: worldX - this.scrollX, y: worldY - this.scrollY };
  }

  getObjectAt(canvasX, canvasY) {
    const world = this.screenToWorld(canvasX, canvasY);
    for (let i = this.entities.length - 1; i >= 0; i--) {
      const entity = this.entities[i];
      const b = entity.getBounds();
      if (world.x >= b.x && world.x <= b.x + b.width &&
          world.y >= b.y && world.y <= b.y + b.height) {
        return entity;
      }
    }
    return null;
  }

  setupInput() {
    document.getElementById('startBtn').addEventListener('click', () => {
      this.audio.resume();
      this.startGame();
    });
    document.getElementById('restartBtn').addEventListener('click', () => {
      this.audio.resume();
      this.startGame();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.state !== 'PLAYING') return;
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const hoveredEntity = this.getObjectAt(x, y);
      this.moringas.forEach(m => {
        m.hover = (m === hoveredEntity);
      });
    });

    this.canvas.addEventListener('click', (e) => {
      if (this.state !== 'PLAYING') return;
      if (this.player && this.player.isMoving) return;
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clickedEntity = this.getObjectAt(x, y);
      if (clickedEntity && clickedEntity instanceof Moringa) {
        this.player.walkTo(clickedEntity.x - 60, () => {
          this.handleAnswer(clickedEntity.isCorrect);
        });
      }
    });
  }

  handleAnswer(isCorrect) {
    if (isCorrect) {
      this.audio.playCorrect();
      this.score += 10;

      const messages = [
        "Excelente! 1923 marcou o início da jornada educacional de Roquette-Pinto.",
        "Correto! O rádio seria capaz de alcançar milhares de brasileiros.",
        "Muito bem! A Rádio Sociedade tornou-se um marco da educação pelo rádio.",
        "Excelente! Educação e ciência eram prioridades das transmissões."
      ];

      alert(messages[this.currentQuestionIndex]);

      this.currentQuestionIndex++;

      if (this.currentQuestionIndex < this.questions.length) {
        this.loadQuestion(this.currentQuestionIndex);
        this.player.x = 20;
      } else {
        this.endGame();
      }
    } else {
      this.audio.playWrong();
      alert("Essa pista não parece correta. Observe melhor os objetos ao redor.");
      this.player.walkTo(20, null);
    }
    this.updateHUD();
  }

  endGame() {
    this.state = 'END';
    this.audio.stopBGM();
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('endScreen').classList.remove('hidden');
    
    let bestScore = this.score;
    if (this.saveData) {
      if (this.score > this.saveData.highScore) {
        this.saveData.highScore = this.score;
localStorage.setItem(
  "highScore",
  this.saveData.highScore
);
      }
      bestScore = this.saveData.highScore;
    }
    
    document.getElementById('finalScore').innerText = `Pontos: ${this.score}\nRecorde: ${bestScore}`;
  }

  updateHUD() {
    document.getElementById('scoreDisplay').innerText = `Pontos: ${this.score}`;
  }

  update(dt) {
    for (const entity of this.entities) {
      entity.update(dt);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.logicalWidth || this.canvas.width, this.logicalHeight || this.canvas.height);
    for (const entity of this.entities) {
      entity.draw(this.ctx);
    }
  }

  start() {
    const gameLoop = (timestamp) => {
      const dt = (timestamp - this.lastTime) / 1000;
      this.lastTime = timestamp;
      this.update(dt);
      this.draw();
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }
}
