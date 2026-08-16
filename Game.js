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
text: `
<p>Frequência 1 – O início de uma grande ideia<br></p>
Umas das memórias perdidas foi encontrada. Analise a primeira fonte histórica. Ela contém uma pista sobre a origem de uma das maiores revoluções da comunicação.
"A ideia consiste em levar música aos lares por meio da transmissão sem fios."
Fonte: SARNOFF apud OLIVEIRA (2011, p.23). Em: OLIVEIRA.
Ao ler essa fonte, qual inovação ela destaca?

`,
options:[
"A possibilidade de transmitir sons e informações sem o uso de fios.",
"A criação da televisão.",
"A invenção do telefone celular.",
"A transmissão de imagens pela internet."
],
correct:0
},

{
text:`
<p>Frequência 2 - Um evento histórico<br></p>
<p>"No dia 7 de setembro de 1922, brasileiros ouviram pela primeira vez uma transmissão de rádio..." Primeira transmissão oficial, em 1922, marcou o início do rádio no Brasil.
Fonte: BRASIL. Ministério das Comunicações. Publicado em 6 setembro 2022.<br></p>
Você acabou de chegar ao Rio de Janeiro, em 7 de setembro de 1922. Ao ligar um rádio experimental, você ouve um discurso que ficará marcado
na história do Brasil. Descubra qual acontecimento histórico estava sendo celebrado durante essa primeira transmissão oficial de rádio.
`,
options:[
"A Proclamação da República.",
"A inauguração da Rádio Sociedade.",
"O centenário da Independência do Brasil.",
"A criação do Ministério das Comunicações."
],
correct:2
},

{
text:`
<p>Frequência 3 – Novas conexões<br></p>

Uma nova memória foi restaurada.
Analise a fonte histórica e descubra o que impulsionou
o surgimento do radioamadorismo.
"Assim, duas foram as motrizes que alavancaram o radioamadorismo:
a curiosidade técnica e a necessidade de suprir lacunas de comunicação
entre pontos remotos..."
Fonte: FRANCO, Carlos Fernando Martins; MENESES, Verônica Dantas.
Radioamadorismo: comunicação, individualidade, comunidade.
Anais do XXXVII Congresso Brasileiro de Ciências da Comunicação
(INTERCOM), 2014.
De acordo com a fonte, por que o radioamadorismo começou
a ganhar força no início do século XX?
`,
options:[
"Porque as pessoas buscavam novas formas de comunicação e tinham interesse em experimentar a tecnologia.",
"Porque já existia internet em todo o país.",
"Porque o rádio era utilizado apenas para ouvir músicas.",
"Porque todas as cidades já possuíam sistemas eficientes de telefonia."
],
correct:0
},

{
text:`
<p>Frequência 4 - Sintonizando 1926<br></p>

Você acaba de desembarcar em 1926. Uma vitrine exibe um grande anúncio da "Philips".
As pessoas param para observá-lo com curiosidade. 
Fonte: Revista ELECTRON, disponível em Fundação Oswaldo Cruz. 

Se você fosse um morador daquela época, qual mensagem esse anúncio provavelmente lhe transmitiria?
`,
options:[
"Ter um rádio aproxima sua casa das novidades, da música e das informações.",
"O rádio será substituído em breve por outra tecnologia.",
"O rádio é um equipamento de uso exclusivo das fábricas.",
"Somente especialistas podem utilizar um rádio."
],
correct:0
},

{
text:`
Frequência 5 - A popularização do rádio

Se empresas passaram a fabricar e vender aparelhos de rádio no Brasil, o que isso indicava?
`,
options:[
"O rádio estava se tornando cada vez mais utilizado.",
"O rádio deixava de ser utilizado.",
"O rádio era usado apenas por cientistas.",
"O rádio só funcionava em outros países."
],
correct:0
},
{
text:`

<p>Frequência 6 – A missão educativa de Roquette-Pinto<br></p>

Em 1923, o educador Edgar Roquette-Pinto criou a Rádio Sociedade do Rio de Janeiro,
acreditando que o rádio poderia levar educação e cultura a todos.
"[...] A rádio foi projetada para ser uma verdadeira 'escola' [...]
Foi idealizada para ser, nas palavras de Roquette,
'o livro dos que não sabiam ler'."
Fonte: LIMA, Nísia Trindade; SÁ, Dominichi Miranda de.
Roquette-Pinto: ciência e humanismo no Brasil do século XX.
ANPUH, 2005, p. 8.
Ao chamar o rádio de "o livro dos que não sabiam ler", o que Roquette-Pinto queria destacar?
`,
options:[
"Que o rádio transmitia apenas aulas de alfabetização.",
"Que o rádio substituiria os livros.",
"Que apenas as escolas poderiam usar o rádio.",
"Que o rádio poderia levar conhecimento também às pessoas que não sabiam ler."
],
correct:3
},

{
text:`
<p>Frequência 7 – A criação da Rádio Sociedade<br></p>

"Roquette-Pinto foi o principal idealizador da Rádio Sociedade do Rio de Janeiro."
Fonte: MOREIRA; MASSARANI, 2001.
Qual era o principal objetivo de Roquette-Pinto ao criar a Rádio Sociedade?
`,
options:[
"Promover apenas programas musicais.",
"Difundir educação, ciência e cultura para a população.",
"Vender aparelhos de rádio.",
"Transmitir propagandas comerciais."
],
correct:1
},

{
text:`
<p>Frequência 8 – Ariosto Espinheira<br></p>

Uma nova memória foi encontrada.
Ariosto Espinheira transformou o rádio em uma verdadeira sala de aula sobre o Brasil.
"O Brasil foi apresentado aos estudantes de forma inédita:
como um país dividido em cinco regiões segundo suas características naturais." ESPINHEIRA, 1938, p.42,
apud 
Fonte: COELHO, 2016.
Desafio do Caçador de Pistas: O que Ariosto Espinheira pretendia ao ensinar Geografia pelo rádio?
`,
options:[
"Ensinar apenas a localização das capitais.",
"Divulgar notícias sobre as cidades brasileiras.",
"Incentivar viagens entre os estados.",
"Ajudar os estudantes a conhecerem melhor as diferentes regiões do Brasil."
],
correct:3
},

{
text:`
<p>Frequência 9 – História pelo Rádio<br></p>

As transmissões educativas utilizavam diferentes recursos sonoros
para tornar as aulas mais interessantes.
Fonte:"...utilizava recursos de sonoplastia [...] capazes de estimular a imaginação do ouvinte."
COELHO, 2016, p.162.
O que essa estratégia permitiu ao programa de rádio?
`,
options:[
"Ensinar apenas por imagens.",
"Aproximar os ouvintes das histórias por meio da imaginação.",
"Substituir os professores.",
"Divulgar propagandas comerciais."
],


        correct:1
      }
    
,
{
text:`
<p>Frequência 10 – Movimento de Educação de Base (MEB)<br></p>

"O Movimento de Educação de Base (MEB) tinha como objetivo ensinar jovens e adultos que moravam no campo ou em lugares afastados, promovendo a alfabetização e a formação cidadã."
Fonte: MACIEL, Rogério Andrade; CASTRO, Cesar Augusto (2016).
Por que o MEB utilizava o rádio?
`,
options:[
"Para transmitir apenas músicas.",
"Para substituir os professores.",
"Para divulgar propagandas.",
"Para levar educação a pessoas que viviam longe das escolas."
],
correct:3
},

{
text:`
<p>Frequência 11 – Cartas<br></p>

"As cartas facilitavam a comunicação entre professores e alunos que moravam distantes."
Fonte: Adaptado de ALVES, Kelly Ludkiewicz. Entre as cartas e o rádio. Salvador: EDUFBA, 2022.
O que as cartas permitiam nas escolas radiofônicas?
`,
options:[
"A compra de aparelhos de rádio.",
"A transmissão das aulas.",
"A comunicação entre professoras e estudantes.",
"A divulgação de notícias."
],
correct:2
},

{
text:`
<p>Frequência 12 – Projeto Minerva<br></p>

"O Projeto Minerva utilizava o rádio para ensinar trabalhadores que viviam em regiões remotas."
Fonte: ARGÔLO, Idália M. T. (2010).
O que essa iniciativa revela sobre o uso do rádio?
`,
options:[
"O rádio era usado apenas nas capitais.",
"O rádio servia somente ao entretenimento.",
"O rádio substituía todas as escolas.",
"O rádio podia ampliar o acesso à educação em diferentes regiões."
],
correct:3
},

{
text:`
<p>Frequência 13 – Ginásio do Ar<br></p>

"O Ginásio do Ar oferecia aulas pelo rádio para quem desejava concluir os estudos do ensino fundamental."
Fonte: ARGÔLO, Idália M. T. (2010).
Quem era o principal público do Ginásio do Ar?
`,
options:[
"Apenas crianças do ensino infantil.",
"Pessoas que queriam concluir os estudos.",
"Professores universitários.",
"Somente radialistas."
],
correct:1
},

{
text:`
<p>Frequência 14 – IRDEB<br></p>

"O IRDEB passou a produzir programas educativos para o rádio, contribuindo para a formação de milhares de pessoas na Bahia."
Fonte: ARGÔLO, Idália M. T. (2010).
Qual foi uma das contribuições do IRDEB?
`,
options:[
"Fabricar aparelhos de rádio.",
"Criar emissoras comerciais.",
"Produzir apenas programas musicais.",
"Produzir programas educativos para ampliar o acesso ao conhecimento."
],
correct:3
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
    this.resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const r = this.canvas.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;

      this.canvas.width = Math.floor(r.width * dpr);
      this.canvas.height = Math.floor(r.height * dpr);

      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);

      this.logicalWidth = r.width;
      this.logicalHeight = r.height;

      // IMPORTANT: after the HUD changes the canvas height, rebuild the
      // scene using the new logical dimensions. This keeps the answer
      // cards and the background inside the visible canvas.
      this.layoutScene();

      requestAnimationFrame(() => {
        const box = document.getElementById('questionDisplay');
        if (box) window.dispatchEvent(new Event('questionBoxResize'));
      });
    };

    window.addEventListener('resize', this.resizeCanvas);

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.resizeCanvas);
      this.resizeObserver.observe(this.canvas);
    }

    this.resizeCanvas();
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

    // The HUD occupies real layout space only after it is made visible.
    // Resize on the next frame so the canvas gets its final height before
    // positioning the player, background and answer cards.
    requestAnimationFrame(() => {
      if (this.resizeCanvas) {
        this.resizeCanvas();
      } else {
        this.layoutScene();
      }
    });
  }

  layoutScene() {
    this.entities = [];
    this.moringas = [];
    
    this.bg = new Background(this.logicalWidth || 800, this.logicalHeight || 600);
    this.entities.push(this.bg);

    if (this.state === 'PLAYING') {
      const mobile = this.logicalWidth <= 768;
      const playerY = mobile
        ? Math.max(10, this.logicalHeight - 115)
        : Math.max(10, this.logicalHeight - 300);
      this.player = new RoquettePinto(20, playerY);
      this.entities.push(this.player);

      if (this.currentQuestionIndex < this.questions.length) {
        this.loadQuestion(this.currentQuestionIndex);
      }
    }
  }

 loadQuestion(index) {

    if (this.bg) this.bg.setScenario(index);

    const q = this.questions[index];

    // Exibe o contexto e a fonte histórica com fonte menor,
    // deixando a pergunta em destaque e evitando a barra de rolagem.
    const questionDisplay = document.getElementById('questionDisplay');
    const rawText = q.text.trim();

    // ============================================================
    // Estrutura da caixa:
    //   1. Contexto
    //   2. Fonte histórica (menor + itálico)
    //   3. Pergunta (maior + negrito)
    //
    // A separação NÃO usa pontuação, porque referências bibliográficas
    // podem conter "." (p.23, 2011 etc.) e isso fazia algumas perguntas
    // desaparecerem.
    // ============================================================

    // A pergunta é sempre a última parte interrogativa do texto.
    // Usamos o último "?" e procuramos o início da linha/segmento da pergunta.
    // Isso evita que pontos de referências bibliográficas (p.23, 2011 etc.)
    // sejam confundidos com o fim da pergunta.
    const questionMark = rawText.lastIndexOf('?');
    let questionStart = -1;

    if (questionMark >= 0) {
      const beforeQuestion = rawText.slice(0, questionMark + 1);

      // Procuramos, de trás para frente, uma linha que tenha um marcador
      // natural de pergunta. A lista cobre as formulações presentes no jogo.
      const lines = beforeQuestion.split(/\r?\n/);
      const starters = /^(Ao ler|De acordo com|Se você|Se empresas|Ao chamar|Qual\b|Quem\b|Por que\b|O que\b|Desafio\b|Você acabou|Descubra\b|Qual era\b|Qual foi\b|Quem era\b)/i;

      let accumulated = 0;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (starters.test(line)) {
          questionStart = accumulated + lines[i].search(/\S/);
        }
        accumulated += lines[i].length + 1;
      }

      // Fallback seguro: a última linha antes do ?.
      if (questionStart < 0) {
        const lastNewline = beforeQuestion.lastIndexOf('\n');
        questionStart = lastNewline >= 0 ? lastNewline + 1 : 0;
      }
    } else {
      questionStart = rawText.lastIndexOf('\n') + 1;
    }

    const contextText = rawText.slice(0, questionStart).trim();
    const questionText = rawText.slice(questionStart).trim();

    // A fonte começa em "Fonte:" e vai até imediatamente antes da pergunta.
    // Assim fontes com várias linhas também são preservadas corretamente.
    const sourceMatch = contextText.match(/(?:^|\r?\n)\s*(Fonte:)/i);

    let contextOnly = contextText;
    let sourceText = '';

    if (sourceMatch) {
      const sourceStart = sourceMatch.index + sourceMatch[0].search(/Fonte:/i);
      contextOnly = contextText.slice(0, sourceStart).trim();
      sourceText = contextText.slice(sourceStart).trim();
    }

    questionDisplay.innerHTML = `
      ${contextOnly ? `<div class="historical-context">${contextOnly}</div>` : ''}
      ${sourceText ? `<div class="historical-source"><em>${sourceText}</em></div>` : ''}
      <div class="historical-question">${questionText}</div>
    `;

    // Mark the two longest question boxes so their typography can be
    // adjusted without changing the game flow or the other frequencies.
    questionDisplay.classList.remove('frequency-3', 'frequency-6');
    if (index === 2) questionDisplay.classList.add('frequency-3');
    if (index === 5) questionDisplay.classList.add('frequency-6');

    // ============================================================
    // Question box
    //
    // Desktop: preserve the original visual proportions from style.css.
    // Mobile: use a compact box and smaller context/source text.
    // ============================================================
    const contextElement = questionDisplay.querySelector('.historical-context');
    const sourceElement = questionDisplay.querySelector('.historical-source');
    const questionElement = questionDisplay.querySelector('.historical-question');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const compact = window.innerWidth <= 420;

    if (isMobile) {
      Object.assign(questionDisplay.style, {
        overflow: 'hidden',
        overflowY: 'hidden',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '100%',
        lineHeight: '1.15',
        whiteSpace: 'normal',
        wordBreak: 'normal',
        overflowWrap: 'break-word',
        height: compact ? 'clamp(138px, 27dvh, 215px)' : 'clamp(145px, 29dvh, 250px)',
        minHeight: compact ? '138px' : '145px',
        padding: compact ? '8px 9px' : '10px 12px'
      });

      if (contextElement) {
        Object.assign(contextElement.style, {
          fontSize: compact ? '11px' : '12px',
          lineHeight: '1.18',
          fontWeight: '400',
          margin: '0 0 4px 0',
          width: '100%',
          maxWidth: '100%',
          whiteSpace: 'normal',
          overflowWrap: 'break-word'
        });
      }

      if (sourceElement) {
        Object.assign(sourceElement.style, {
          fontSize: compact ? '9px' : '10px',
          lineHeight: '1.12',
          fontWeight: '400',
          fontStyle: 'italic',
          margin: '0 0 6px 0',
          width: '100%',
          maxWidth: '100%',
          whiteSpace: 'normal',
          overflowWrap: 'break-word'
        });
      }

      Object.assign(questionElement.style, {
        fontSize: compact ? '16px' : '18px',
        lineHeight: '1.2',
        fontWeight: '700',
        margin: '0',
        width: '100%',
        maxWidth: '100%',
        whiteSpace: 'normal',
        overflowWrap: 'break-word'
      });

      const fitQuestionBox = () => {
        let attempts = 0;
        while (questionDisplay.scrollHeight > questionDisplay.clientHeight + 1 && attempts < 50) {
          const qSize = parseFloat(getComputedStyle(questionElement).fontSize);
          const cSize = contextElement ? parseFloat(getComputedStyle(contextElement).fontSize) : 0;
          const sSize = sourceElement ? parseFloat(getComputedStyle(sourceElement).fontSize) : 0;

          if (qSize > 13) {
            questionElement.style.fontSize = `${qSize - 0.35}px`;
          } else if (contextElement && cSize > 8.5) {
            contextElement.style.fontSize = `${cSize - 0.2}px`;
          } else if (sourceElement && sSize > 7.5) {
            sourceElement.style.fontSize = `${sSize - 0.15}px`;
          } else {
            break;
          }
          attempts++;
        }
      };

      requestAnimationFrame(fitQuestionBox);
    } else {
      // Do not inject desktop dimensions from JavaScript.
      // style.css remains the source of truth for the desktop layout.
      Object.assign(questionDisplay.style, {
        overflow: 'hidden',
        overflowY: 'hidden',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        width: '95%',
        maxWidth: '1500px',
        lineHeight: '1.7',
        whiteSpace: 'normal',
        wordBreak: 'normal',
        overflowWrap: 'normal'
      });

      if (contextElement) {
        Object.assign(contextElement.style, {
          fontSize: '20px',
          lineHeight: '1.35',
          fontWeight: '400',
          margin: '0 0 5px 0'
        });
      }

      if (sourceElement) {
        Object.assign(sourceElement.style, {
          fontSize: '14px',
          lineHeight: '1.2',
          fontWeight: '400',
          fontStyle: 'italic',
          margin: '0 0 7px 0'
        });
      }

      Object.assign(questionElement.style, {
        fontSize: '24px',
        lineHeight: '1.35',
        fontWeight: '700',
        margin: '0'
      });
    }

    this.entities = this.entities.filter(e => !(e instanceof Moringa));
    this.moringas = [];

    const mobile = this.logicalWidth <= 768;

    if (mobile) {
      // Two columns on phones/tablets. Dimensions are calculated from the
      // actual canvas width, so cards never extend beyond the viewport.
      const columns = 2;
      const marginX = Math.max(6, Math.floor(this.logicalWidth * 0.025));
      const gapX = 8;
      const gapY = 10;
      const cardWidth = Math.max(
        110,
        Math.floor((this.logicalWidth - marginX * 2 - gapX) / columns)
      );
      const cardHeight = this.logicalWidth <= 420 ? 78 : 84;

      // Keep the answer area visible near the upper/middle part of the
      // actual canvas. The background remains fully visible behind it.
      const startY = Math.max(18, Math.floor(this.logicalHeight * 0.08));

      q.options.forEach((opt, i) => {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const x = marginX + col * (cardWidth + gapX);
        const y = startY + row * (cardHeight + gapY);

        const m = new Moringa(x, y, opt, i === q.correct, {
          mobile: true,
          width: cardWidth,
          height: cardHeight
        });

        this.moringas.push(m);
        this.entities.push(m);
      });
    } else {
      // Desktop: original horizontal layout.
      const leftMargin = 30;
      const rightMargin = 40;
      const usableWidth = this.logicalWidth - leftMargin - rightMargin;
      const spacing = usableWidth / q.options.length;

      q.options.forEach((opt, i) => {
        const x = leftMargin + i * spacing;
        const y = this.logicalHeight - 400;
        const m = new Moringa(x, y, opt, i === q.correct);
        this.moringas.push(m);
        this.entities.push(m);
      });
    }

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

    const selectAnswer = (e) => {
      if (this.state !== 'PLAYING') return;
      if (this.player && this.player.isMoving) return;
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clickedEntity = this.getObjectAt(x, y);
      if (clickedEntity && clickedEntity instanceof Moringa) {
        this.player.walkTo(Math.max(0, clickedEntity.x - 60), () => {
          this.handleAnswer(clickedEntity.isCorrect);
        });
      }
    };

    this.canvas.addEventListener('pointerdown', selectAnswer, { passive: true });
  }

  handleAnswer(isCorrect) {
    if (isCorrect) {
      this.audio.playCorrect();
      this.score += 10;

      const messages = [
        "Frequência restaurada! Você interpretou a pista corretamente. As ondas ficaram mais fortes.", 
	    "Excelente! Você tem feito bom uso das fontes históricas.",
	    "Você acertou de novo! Excelente sacada.",
		"Que investigação! Você encontrou a evidência certa e recuperou mais um fragmento da História.",
		"Boa observação! Um verdadeiro caçador também faz inferência.",
		"Muito bem! Mais uma memória foi recuperada. Continue sintonizando a História.",
		"Demais! Toda investigação exige atenção às evidências. Você foi no alvo.",
		"Que maravilha! Você posicionou o dial bem na frequência certa.",
		"Frequência restaurada! Você interpretou a pista corretamente. As ondas ficaram mais fortes.", 
	    "Excelente! Você tem feito bom uso das fontes históricas.",
	    "Você acertou de novo! Boa sacada.",
		"Boa observação! Um verdadeiro caçador de pistas sabe interpretar as fontes históricas.",
		"Muito bem! Mais uma memória foi recuperada. Continue sintonizando a História.",
		"Parabéns! Você demonstrou atenção às fontes e mostra que sabe tudo sobre a educação via rádio no Brasil."
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
      alert("Humm... A frequêcia ficou instável! Releia a fonte e tente novamente.");
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
