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
Frequência 1 – O início de uma grande ideia
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
Frequência 2 - Um evento histórico
"No dia 7 de setembro de 1922, brasileiros ouviram pela primeira vez uma transmissão de rádio..."
Fonte: BRASIL. Ministério das Comunicações.
Primeira transmissão oficial, em 1922, marcou o início do rádio no Brasil.
Publicado em 6 set. 2022.
Você acabou de chegar ao Rio de Janeiro, em 7 de setembro de 1922.
Ao ligar um rádio experimental, você ouve um discurso que ficará marcado
na história do Brasil.
Descubra qual acontecimento histórico estava sendo celebrado durante
essa primeira transmissão oficial de rádio.
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
Frequência 3 – Novas conexões

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
Frequência 4 - Sintonizando 1926

Você acaba de desembarcar em 1926. Uma vitrine exibe um grande anúncio da "Philips".
As pessoas param para observá-lo com curiosidade. 
Fonte: Revista ELECTRON, disponível em Fundação Oswaldo Cruz. 
Se você fosse um morador daquela época,
qual mensagem esse anúncio provavelmente lhe transmitiria?
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

Frequência 6 – A missão educativa de Roquette-Pinto

Em 1923, o educador Edgar Roquette-Pinto criou a Rádio Sociedade do Rio de Janeiro,
acreditando que o rádio poderia levar educação e cultura a todos.
Fonte:
"[...] A rádio foi projetada para ser uma verdadeira 'escola' [...]
Foi idealizada para ser, nas palavras de Roquette,
'o livro dos que não sabiam ler'."
LIMA, Nísia Trindade; SÁ, Dominichi Miranda de.
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
Frequência 7 – A criação da Rádio Sociedade

Fonte:
"Roquette-Pinto foi o principal idealizador da Rádio Sociedade do Rio de Janeiro."
MOREIRA; MASSARANI, 2001.
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
Frequência 8 – Ariosto Espinheira

Uma nova memória foi encontrada.
Ariosto Espinheira transformou o rádio em uma verdadeira sala de aula sobre o Brasil.
Fonte:
"O Brasil foi apresentado aos estudantes de forma inédita:
como um país dividido em cinco regiões segundo suas características naturais." ESPINHEIRA, 1938, p.42,
apud COELHO, 2016.
Desafio do Caçador de Pistas: O que Ariosto Espinheira pretendia ao ensinar Geografia pelo rádio?
`,
options:[
,
"Ensinar apenas a localização das capitais.",
"Divulgar notícias sobre as cidades brasileiras.",
"Incentivar viagens entre os estados.",
"Ajudar os estudantes a conhecerem melhor as diferentes regiões do Brasil."
],
correct:3
},

{
text:`
Frequência 9 – História pelo Rádio

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
Frequência 10 – Movimento de Educação de Base (MEB)

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
Frequência 11 – Cartas

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
Frequência 12 – Projeto Minerva

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
Frequência 13 – Ginásio do Ar

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
Frequência 14 – IRDEB

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
    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      const r = this.canvas.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;
      this.canvas.width  = Math.floor(r.width  * dpr);
      this.canvas.height = Math.floor(r.height * dpr);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
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

    document.getElementById('questionDisplay').innerHTML = q.text;

    this.entities = this.entities.filter(e => !(e instanceof Moringa));
    this.moringas = [];

    // Largura ocupada por cada conjunto (rádio + caixa)
    const objectWidth = 270;

    // Margens laterais
    const leftMargin = 30;
    const rightMargin = 40;

    // Área útil
    const usableWidth = this.logicalWidth - leftMargin - rightMargin;

    // Espaçamento entre centros dos objetos
    const spacing = usableWidth / q.options.length;

    q.options.forEach((opt, i) => {

        const x = leftMargin + i * spacing;

        const y = this.logicalHeight - 400;

        const m = new Moringa(
            x,
            y,
            opt,
            i === q.correct
        );

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
