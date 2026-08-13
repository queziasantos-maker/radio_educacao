GUIA TÉCNICO DO PROJETO ROQUETTE PINTO
======================================================================
ESTRUTURA DO PROJETO
 - roquette-main/
 - roquette-main/AudioSystem.js
 - roquette-main/Background.js
 - roquette-main/Background.js-ori
 - roquette-main/Game.js
 - roquette-main/Game.js-html
 - roquette-main/Game.old.js
 - roquette-main/GameObject.js
 - roquette-main/Moringa.js
 - roquette-main/Moringa.js-ori
 - roquette-main/README.md
 - roquette-main/RoquettePinto.js
 - roquette-main/RoquettePinto.js-ori
 - roquette-main/assets.js
 - roquette-main/index.html
 - roquette-main/index.html-ori
 - roquette-main/style-old.css
 - roquette-main/style.css

RESUMO DE FUNCIONAMENTO
- index.html inicia o jogo e carrega CSS e scripts.
- style.css controla aparência da interface.
- Game.js contém a lógica principal (perguntas, fases, pontuação e fluxo).
- Background.js desenha o cenário.
- RoquettePinto.js desenha e anima o personagem.
- Moringa.js desenha as alternativas.
- AudioSystem.js controla música e efeitos.

GUIA DE CUSTOMIZAÇÃO
1. Alterar perguntas:
   Abra Game.js e localize o vetor this.questions.
   Cada objeto possui texto, alternativas e índice da resposta correta.

2. Alterar música:
   Abra AudioSystem.js. Procure startBGM() e playTone().
   Se desejar MP3, substitua o Oscillator por HTMLAudioElement.

3. Alterar efeitos sonoros:
   Edite playCorrect() e playWrong().

4. Alterar personagem:
   Abra RoquettePinto.js.
   O método draw() desenha o personagem usando Canvas.
   Modifique fillRect(), arc(), lineTo() para mudar aparência.

5. Alterar tamanho do personagem:
   Procure super(x,y,largura,altura) e os fatores de escala.

6. Alterar velocidade:
   Procure this.speed.

7. Alterar cenário:
   Abra Background.js e altere as cores, sol, chão e torres.

8. Alterar alternativas:
   Abra Moringa.js.
   Ajuste largura, altura e ctx.font para tamanho dos textos.

9. Alterar fontes:
   style.css -> font-size, font-family.

10. Alterar cores da interface:
    style.css -> background, color, border.

11. Adicionar imagens:
    Use new Image() e ctx.drawImage().

12. Organização recomendada:
    assets/images
    assets/audio
    assets/fonts

COMO PROFESSORES PODEM ADAPTAR O JOGO
- Trocar perguntas para qualquer disciplina.
- Criar novos cenários relacionados ao conteúdo.
- Alterar personagem para figuras históricas.
- Inserir narração em áudio.
- Adicionar novas fases duplicando a estrutura existente.

OBSERVAÇÃO
Este documento é um resumo técnico. Uma documentação completa pode detalhar cada função e classe individualmente.


