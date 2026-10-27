# ONDE ESTÁ O FLÁVIO? — JOGO DE BUSCA E SÁTIRA POLÍTICA

## 1. Objetivo

Desenvolver um jogo web de objetos ocultos, inspirado na mecânica de procurar um personagem em ilustrações lotadas. O personagem principal é **o homem das imagens fornecidas**, vestido com camiseta e gorro de listras horizontais **pretas e brancas**, calça jeans e tênis preto. O rosto deve permanecer reconhecível, sem óculos. A experiência deve ser responsiva e funcionar com mouse, touchscreen e teclado.

**Nome oficial do jogo:** Onde Está o Flávio?.

> Aviso editorial: obra fictícia de humor e sátira política. Figuras públicas podem aparecer como caricaturas, sem insinuar que os encontros, condutas ou relações representados tenham acontecido. Milicianos são personagens ficcionais do cenário, não identificações ou acusações contra pessoas reais. O estilo visual deve ser original, sem copiar ilustrações oficiais de Onde Está Wally.

## 2. Personagem — fidelidade obrigatória

Usar diretamente os PNGs fornecidos. **Não substituir o rosto por outro personagem**. Não redesenhar, alterar feições ou inserir óculos. Priorizar composição com as imagens reais recortadas sobre cenários ilustrados ou fotográficos.

| Arquivo | Pose | Sugestão de fase |
|---|---|---|
| `assets/01_em_pe.png` | Em pé | Praça, festival, estádio |
| `assets/02_sentado.png` | Sentado | Aeroporto, arquibancada, praça |
| `assets/03_cadeira_de_praia.png` | Cadeira de praia | Praia |
| `assets/04_bandeira_americana.png` | Segurando bandeira dos EUA | Desfile ou multidão temática |
| `assets/05_dentro_do_carro.png` | No carro | Trânsito, estacionamento |
| `assets/06_comemorando.png` | Braços levantados | Estádio, show, festa |
| `assets/07_apontando.png` | Apontando | Feira, corredor, centro comercial |

**Observação de qualidade:** os recortes têm resoluções diferentes. Manter proporção original, evitar ampliação exagerada e verificar eventuais pixels remanescentes ao redor dos objetos. Todas as imagens devem preservar o canal alfa, sem fundo branco.

## 3. Proposta do jogo

O jogador recebe um cenário amplo, movimentado e cheio de distrações visuais. Entre centenas de pessoas, objetos e detalhes, deve encontrar o personagem listrado e clicar/toque sobre ele. O personagem pode estar parcialmente encoberto, mas deve ser identificável.

Fluxo:

1. Tela inicial com o título, botão **Jogar**, botão **Como jogar** e opção de som.
2. Seleção de fase ou início automático pela fase 1.
3. Cena exibida com contador regressivo, pontuação e dicas.
4. Ao tocar no personagem: destaque visual, efeito sonoro, bônus e próxima fase.
5. Ao errar: feedback discreto e penalidade leve, sem interromper a partida.
6. Se o tempo acabar: opção **Tentar novamente**.
7. Ao concluir as fases: tela de resultado, tempo total, estrelas e opção de jogar novamente.

## 4. Fases oficiais — ambientação local e multidão contextualizada

O título da página, menu, placares e metadados é **Onde Está o Flávio?**. O personagem jogável/alvo usa **exclusivamente os PNGs de Flávio disponibilizados no pack**; não alterar traços de rosto, gorro preto e branco, roupa listrada ou proporções.

| Fase | Local | População na cena | PNG sugerido | Desafio |
|---|---|---:|---|---|
| 1 — Cadê no Rio? | Comunidade fictícia no Rio de Janeiro | 450–600 | `01_em_pe.png` | Médio |
| 2 — Na casa do pai | Brasília, cenário residencial fictício inspirado na arquitetura local | 550–700 | `02_sentado.png` | Médio/alto |
| 3 — Casa Rosada | Plaza de Mayo, Buenos Aires, Argentina | 650–800 | `07_apontando.png` | Difícil |
| 4 — Férias em Orlando | Parque temático fictício em Orlando, com estética de turismo e atrações | 750–900 | `04_bandeira_americana.png` | Difícil |

### Fase 1 — Comunidade carioca: "Cadê no Rio?"

- Cenário: panorama de comunidade **fictícia** no Rio, vielas, escadarias, lajes, casas coloridas, comércio local, mototáxis, ônibus, feirantes, ambulantes, quadra, fios e vegetação tropical. Não usar endereço real de moradia ou identificar moradores.
- Multidão: moradores, trabalhadores, músicos, crianças acompanhadas, torcedores, turistas e vendedores, com variedade racial, de idades, roupas e atividades, sem apresentar a comunidade inteira como criminosa.
- Elementos de sátira: alguns **personagens fictícios representando milicianos** em uma situação cartunesca (sem alegar vínculo com o protagonista ou com qualquer pessoa identificável). Não utilizar insígnias reais, violência explícita nem uniformes oficiais para inventar denúncias.
- Camuflagens: varais com tecidos listrados, camisas de times alvinegros, cartazes, postes e bonés. Flávio aparece misturado às pessoas, na mesma escala, sem destaque.
- Composição: plano geral amplo com 450–600 NPCs e perspectivas coerentes; mistura de movimentação nas ruas e nos terraços.

### Fase 2 — Brasília: "Na casa do pai"

- Cenário: **residência inteiramente fictícia** em Brasília, com arquitetura modernista, jardim, área de entrada e rua adjacente; não reproduzir endereço, fachada identificável ou detalhes de segurança da residência real de Jair Bolsonaro.
- Elenco: caricatura reconhecível de **Jair Bolsonaro** como personagem secundário; políticos e assessores caricatos, jornalistas, apoiadores, curiosos, visitantes e seguranças genéricos formando uma multidão.
- Humor ambiental: filas de abraços, fotógrafos e celulares levantados, reuniões improvisadas e cartazes fictícios. Sem atribuir a pessoas reais diálogos, declarações ou atos específicos não documentados.
- Camuflagens: ternos escuros, bandeiras brasileiras, acessórios listrados, grupos em portas e jardins. Flávio aparece entre 550–700 personagens adicionais.

### Fase 3 — Buenos Aires: "Casa Rosada"

- Cenário: Praça de Maio, fachada externa da **Casa Rosada**, Buenos Aires, com elementos urbanos argentinos, manifestantes, turistas, barraquinhas e trânsito estilizado. Representar o entorno público, não salas privadas inventadas.
- Elenco: caricatura de **Javier Milei** como personagem secundário, acompanhado de aliados e apoiadores genéricos ou claramente fictícios, jornalistas, turistas, artistas de rua e transeuntes.
- Identidade local: bandeiras argentinas, camisetas da seleção, vendedores de empanadas, ônibus, mate, faixas em espanhol e arquitetura da região.
- Humor ambiental: leões de pelúcia, serpentinas e placas satíricas inventadas; nenhuma frase real atribuída sem fonte.
- Camuflagem: 650–800 personagens, múltiplos grupos em primeiro e segundo plano, camisas listradas e pequenos objetos visuais falsos.

### Fase 4 — Orlando: "Férias em família"

- Cenário: **parque temático fictício** em Orlando, inspirado no clima turístico dos grandes parques, sem reproduzir mapas, logotipos, personagens protegidos ou aparência exclusiva de atrações da Disney.
- Elenco: caricatura de **Eduardo Bolsonaro** como personagem secundário, turistas brasileiros e internacionais, funcionários do parque, famílias, crianças, personagens de fantasia originais e fotógrafos.
- Identidade local: filas longas, carrinhos de pipoca, atrações coloridas, castelo genérico, lojas de lembranças, bandeiras, malas, carrinhos de bebê e chapéus de turistas.
- Humor ambiental: dezenas de personagens vestidos com combinações preto e branco, filas que se cruzam, placas bilíngues em português/inglês e confusão visual intencional.
- Flávio usa preferencialmente o PNG com bandeira americana e fica entre 750–900 personagens adicionais, sem tamanho ampliado nem halo.

### Princípios editoriais e de arte em todas as fases

1. Cenários são **representações satíricas fictícias**, não registros históricos nem acusações. Exibir o aviso no menu "Obra de ficção e sátira política".
2. Pode haver caricaturas de figuras públicas no pano de fundo, com personagens genéricos ao redor; evitar imputar crimes ou filiação a milícias a pessoas reais.
3. O objetivo é **encontrar Flávio**, não identificar ou perseguir pessoas reais em localização privada. Nunca apresentar a residência real ou posicionamento real de pessoas.
4. Retratar a população local com diversidade, autenticidade cultural e atividades cotidianas, em vez de figurantes genéricos ou estereótipos degradantes.
5. Cada fase deve ter **centenas de personagens integrados no desenho**, não somente ícones repetidos, mantendo mistura de ocupações, roupas e ângulos.
6. Criar ilustrações originais de alta resolução, sem reutilizar artes dos livros de Wally nem personagens de marcas sem licença.

## REGRA OBRIGATÓRIA — ESCALA IGUAL PARA TODOS OS PERSONAGENS

- **Nenhuma personalidade, protagonista ou personagem secundário recebe tratamento de destaque.** Flávio, Jair Bolsonaro, Eduardo Bolsonaro, Javier Milei, Donald Trump, Marco Rubio, Nikolas Ferreira, parlamentares, ministros do STF e quaisquer personagens adicionais devem compartilhar o **mesmo padrão de proporções, traço, iluminação e nível de detalhe dos figurantes**.
- **A escala é determinada exclusivamente pela posição e profundidade na cena**, nunca pela fama ou importância do personagem. Em um mesmo plano de profundidade, personagens adultos de estatura semelhante devem ter aproximadamente a mesma altura em pixels (tolerância recomendada de ±10%, salvo variações anatômicas intencionais). Pessoas mais distantes ficam proporcionalmente menores, inclusive os personagens centrais.
- Proibido ampliar rostos ou corpos, usar poses de cartaz, enquadramento exclusivo, contraste exagerado, contornos especiais, brilho, setas ou círculos para facilitar a identificação. Nenhum personagem principal deve aparecer de forma isolada em espaço vazio.
- Integração real à multidão: permitir **oclusão parcial** por outras pessoas e objetos (sem tornar o alvo impossível de reconhecer); utilizar sombras, sobreposição, orientação e cores coerentes com o ambiente.
- A câmera do jogo não deve iniciar centralizada no Flávio, nem o posicionar obrigatoriamente no centro da composição. A posição do personagem procurado deve variar entre partidas, com regiões válidas predefinidas.
- O jogo deve ter distrações visuais: NPCs com peças listradas, bonés, silhuetas e gestos semelhantes ao personagem procurado, sem copiar exatamente sua identidade.
- **Critério de aceite:** visualizar cada cena reduzida e ampliada, comparar a altura em pixels dos personagens centrais e figurantes no mesmo plano, e rejeitar a arte se o personagem conhecido se destacar apenas pelo tamanho ou pelo tratamento visual.
- As pranchas conceituais anteriores **não são referência de escala**; nas artes finais, corrigir todos os personagens que estejam visualmente maiores que a multidão de seu plano.

## 4.1. REGRA CENTRAL: multidões muito densas (obrigatória)

Este projeto **não é** um jogo com um personagem escondido em um cenário quase vazio. O desafio principal é a procura visual em uma **multidão enorme**, como nos livros de busca e encontre. Cada tela deve parecer uma ilustração panorâmica viva, ocupada de ponta a ponta.

- **Mínimo de 300 personagens visíveis por fase**; meta de **500 a 900** em cenas de nível médio/difícil. Não contar o protagonista como personagem de preenchimento.
- Distribuir os personagens por **toda a área**, do primeiro plano ao fundo, incluindo bordas, cantos e espaços atrás de barracas, carros, cadeiras, arquibancadas ou estruturas.
- Organizar **multidões sobrepostas**, com diferentes alturas e escalas coerentes com a perspectiva; evitar linhas, grades ou personagens isolados com espaços vazios óbvios.
- Criar diversidade de corpos, roupas, poses, idades aparentes, acessórios e atividades. Incluir grupos conversando, andando, sentados, comemorando e interagindo com objetos.
- Adicionar **distrações intencionais**: roupas e bonés listrados, padrões em preto e branco, placas, guarda-sóis, bandeiras, figurinos contrastantes e personagens com silhuetas parecidas. Os coadjuvantes **não podem ser cópias do rosto do protagonista**.
- O protagonista deve ter **tamanho compatível com os personagens ao redor** (aproximadamente mesma escala local) e ser inserido na mesma camada visual, com sombras, oclusões e iluminação consistentes. Nunca destacar com halo, borda, transparência, seta ou cor diferente antes do acerto.
- Permitir **oclusão parcial de 10–35%** do protagonista por elementos do cenário, mas manter sinais identificáveis para que exista solução justa.
- Evitar posicionamento automático sempre no centro, frente ou em zonas de fácil destaque. Usar pontos válidos por fase, com teste de visibilidade.
- **Alta resolução:** recomendação 4096 × 2304 px ou maior por cena, com zoom legível; para telas menores, carregar versões otimizadas ou mosaicos (tiles). Não esticar uma imagem pequena.
- Estética: **ilustração 2D detalhada**, com contornos limpos, cores variadas, micro-histórias e muitos elementos simultâneos; criar arte original, sem copiar painéis protegidos.

### Densidade por nível (mínimos)

| Fases | Personagens adicionais | Densidade e distrações |
|---|---:|---|
| 1 — Rio | 450–600 | Vielas e terraços repletos de personagens, roupas alvinegras |
| 2 — Brasília | 550–700 | Multidão de políticos, visitantes e jornalistas |
| 3 — Buenos Aires | 650–800 | Praça com moradores, turistas e grupos políticos variados |
| 4 — Orlando | 750–900 | Filas de parque e multidão turística com vários falsos alvos |

### Construção dos cenários

1. Produzir um fundo panorâmico ilustrado original com cenário e objetos.
2. Adicionar centenas de NPCs com variação real de pose, silhueta, roupas e escala — preferencialmente como uma cena final renderizada de alta resolução, não centenas de elementos DOM ativos.
3. Inspecionar a cena para eliminar faixas vazias e repetições gritantes de personagens.
4. Inserir o PNG do protagonista como camada independente na coordenada válida; harmonizar visualmente a arte para que pareça fazer parte da multidão, **sem alterar o rosto e a caracterização**.
5. Testar o jogo em zoom 100%, em celular e desktop; ajustar dificuldade sem tornar o alvo impossível.

### Critério visual de reprovação

**Reprovar** qualquer fase que tenha menos de 300 coadjuvantes, grande área sem pessoas, protagonista maior que seus vizinhos, fundo genérico pouco detalhado, pessoas separadas em grade ou ausência de distrações que tornem a busca desafiadora.

## 5. Mecânica de interação

- A imagem da cena pode ser ampliada com roda do mouse, gesto de pinça ou botões de zoom.
- Permitir arrastar a cena ao aproximar; impedir que o conteúdo suma totalmente da viewport.
- O personagem deve ser uma camada HTML/canvas distinta, posicionada no mesmo sistema de coordenadas do fundo.
- A área clicável deve acompanhar o personagem em qualquer nível de zoom.
- A posição do personagem deve variar entre partidas, apenas entre pontos seguros predefinidos por fase.
- Não mover o personagem enquanto o usuário estiver jogando.
- Clique fora do alvo: feedback simples e opcional penalidade de 3 segundos.
- Clique correto: contorno/efeito de localização, mensagem **Encontrou!** e pontuação.
- Botão **Dica**: pulsar um círculo em torno de uma região aproximada, com custo de pontos; não revelar a posição exata.
- Botão **Pausar**: congelar temporizador e bloquear cliques na cena.
- Botão **Reiniciar**: reiniciar fase, tempo e posição.
- Não exigir login nem coletar dados pessoais no MVP.

### Pontuação proposta

- Encontrar personagem: 1.000 pontos.
- Bônus: +10 pontos por segundo restante.
- Clique errado: -25 pontos (mínimo zero).
- Dica usada: -150 pontos.
- Estrelas por fase: 3 sem dicas e com mais de 50% do tempo; 2 por conclusão normal; 1 após uso de múltiplas dicas.

## 6. Interface visual

Estilo lúdico, com cores vibrantes nos cenários para camuflar o traje preto e branco. Evitar que a interface se confunda com a cena. Cabeçalho compacto com fase, cronômetro, pontos, **Dica**, **Pausar** e controles de zoom. Em celular, controles fixos e botões de toque confortáveis. Para mostrar o que procurar, disponibilizar uma miniatura do personagem da fase no topo, sem revelar sua localização.

**Acessibilidade:** suporte a navegação por teclado nos menus, contraste adequado, rótulos acessíveis, opção sem áudio, alternativa sem cronômetro e respeito a `prefers-reduced-motion`.

## 7. Estrutura sugerida do projeto

```text
procure-o-flavio/
├── README.md
├── package.json
├── index.html
├── public/
│   ├── assets/
│   │   ├── 01_em_pe.png
│   │   ├── 02_sentado.png
│   │   ├── 03_cadeira_de_praia.png
│   │   ├── 04_bandeira_americana.png
│   │   ├── 05_dentro_do_carro.png
│   │   ├── 06_comemorando.png
│   │   └── 07_apontando.png
│   └── scenes/
│       ├── fase-01-rio.webp
│       ├── fase-02-brasilia.webp
│       ├── fase-03-buenos-aires.webp
│       └── fase-04-orlando.webp
├── src/
│   ├── App.jsx
│   ├── data/levels.js
│   ├── components/SceneViewer.jsx
│   ├── components/Hud.jsx
│   ├── components/LevelSelect.jsx
│   ├── components/EndScreen.jsx
│   ├── hooks/useGameTimer.js
│   ├── styles.css
│   └── main.jsx
└── tests/
    ├── hitbox.test.js
    └── scoring.test.js
```

**Stack:** React + Vite + JavaScript, com CSS responsivo e Canvas 2D ou HTML/CSS para sobreposição. Evitar banco de dados no MVP. Salvar apenas o progresso local, se desejado, em `localStorage`.

## 8. Modelo de dados das fases

```js
export const levels = [
  {
    id: 1,
    name: 'Cadê no Rio?',
    scene: '/scenes/fase-01-rio.webp',
    character: '/assets/01_em_pe.png',
    durationSeconds: 90,
    // Coordenadas normalizadas de 0 a 1 relativas ao fundo da cena.
    // Definir os valores apenas depois de criar/inspecionar cada cenário.
    spawnPoints: [],
    targetWidthFraction: 0.05,
  },
];
```

No componente de jogo, usar o mesmo sistema de transformações do fundo (pan + zoom) para desenhar o PNG e calcular a hitbox. A hitbox pode ser um retângulo ajustado à silhueta ou teste de alfa quando necessário; nunca depender apenas de coordenadas de tela fixas.

## 9. Requisitos funcionais

**RF01** — Exibir quatro fases temáticas selecionáveis.

**RF02** — Posicionar em cada fase o personagem correspondente dos arquivos fornecidos.

**RF03** — Reconhecer cliques/toques corretos mesmo com zoom e arraste.

**RF04** — Controlar cronômetro, erros, dicas, pontuação e término da fase.

**RF05** — Permitir pausa e reinício.

**RF06** — Mostrar progresso e resultados finais.

**RF07** — Funcionar em desktop e celular, em orientação vertical e horizontal.

**RF08** — Permitir jogar sem cadastro.

**RF09** — Exibir 450–900 NPCs por fase, conforme a dificuldade, formando multidões compactas e variadas.

**RF10** — Inserir o protagonista na escala dos personagens próximos, sem destaque visual antes do clique correto.

## 10. Requisitos não funcionais

- Interface otimizada para Chrome, Edge, Safari e Firefox atuais.
- Imagens de cenário em WebP/AVIF, com dimensões adequadas para zoom e carregamento sob demanda.
- Assegurar que a renderização e detecção de acertos sejam coerentes em diferentes densidades de tela.
- Evitar deslocamentos da interface durante o carregamento das imagens.
- Áudio opcional; não iniciar som automaticamente sem interação do usuário.
- Não incluir trackers nem coletar informações pessoais no protótipo.

## 11. Critérios de aceite

1. O rosto e a roupa do personagem correspondem às imagens originais enviadas.
2. Nenhuma versão do personagem contém óculos; as listras permanecem pretas e brancas.
3. O jogador consegue encontrá-lo nas sete cenas, com clique/toque funcional.
4. Os acertos continuam corretos após ampliar e arrastar o cenário.
5. Cronômetro, pontuação, dicas, pausa e fim de jogo funcionam.
6. A versão mobile permite jogar apenas com toque.
7. Todas as cenas e artes inseridas possuem direito de uso.
8. Todas as fases exibem multidão densa e distribuída pelo quadro; nenhuma é aprovada abaixo de 300 coadjuvantes.
9. Nas fases difíceis há pelo menos 650 coadjuvantes, distrações com listras e sobreposição natural.
10. O protagonista não aparece isolado, desproporcional ou visualmente assinalado.

## 12. Orientação para execução por agente de desenvolvimento

> Implemente o jogo web descrito neste arquivo com React, Vite e JavaScript. Use os sete PNGs do diretório `public/assets` sem alterar os rostos nem os trajes. É obrigatório que cada fase tenha pelo menos 300 personagens coadjuvantes e que as fases difíceis cheguem a 650–900, com multidão compacta, distribuição por toda a tela, vários falsos alvos e composição em profundidade. Rejeite cenários vazios ou com poucas pessoas. Crie a interface, o estado do jogo, pontuação, zoom, arraste, detecção de acerto, dicas, pausa, seleção de fases e resultados. Escreva testes para conversão de coordenadas/hitbox e lógica de pontuação. Os sete arquivos de fundo em `public/scenes` **ainda precisam ser produzidos ou fornecidos**: não invente URLs; enquanto não existirem, implemente cenários temporários originais desenhados com CSS/SVG, claramente marcados como placeholders. Não substitua o personagem por desenhos genéricos. Entregue o jogo executável com `npm install` e `npm run dev`.

## 13. Status dos materiais

- **Disponíveis:** sete imagens PNG do personagem, já caracterizado com listras pretas e brancas.
- **Não fornecidos:** cenários detalhados para as fases, efeitos sonoros e qualquer implementação de software.
- **Este documento:** especificação para construir o jogo, não um jogo já executável.


---

# ELENCO AMPLIADO — VERSÃO 2 (27/10/2026)

## Direção de arte e uso da prancha

Esta expansão agrega caricaturas de figuras públicas para uma obra de ficção satírica. Todos devem manter o mesmo traço, volume de cabeça, iluminação, perspectiva e espessura de contorno do protagonista do pacote inicial. O jogador procura somente Flávio; os demais são personagens secundários e distrações visuais. Evitar que a presença de pessoas numa cena sugira prova de encontro, vínculo ou participação em crimes.

A primeira prancha conceitual é `personagens_caricaturas_v1.png`. Nela há NOVE figuras em uma composição 3×3, não nove PNGs individuais e não um spritesheet com transparência verificada. Recortar cada personagem, limpar o fundo e revisar semelhança antes de usar no jogo. As representações são ilustrativas, não retratos oficiais nem reproduções da reportagem.

## Lista de personagens a produzir

| ID | Personagem | Aparência / figurino sugerido | Cena prioritária |
|---|---|---|---|
| `careca_inss` | Antônio Carlos Camilo Antunes, conhecido publicamente como “Careca do INSS” | Caricatura de homem calvo, traje social, pasta de documentos | Rio ou Brasília |
| `advogado_willer` | Advogado “Willer” (sobrenome e identificação ainda não confirmados) | Caricatura genérica de advogado com óculos, terno e autos, até confirmação de referência visual | Brasília |
| `eduardo_bolsonaro` | Eduardo Bolsonaro | Roupa turística e mochila ou terno, dependendo do cenário | Orlando |
| `jair_bolsonaro` | Jair Bolsonaro | Camisa verde-amarela ou roupa casual, em residência fictícia | Brasília |
| `javier_milei` | Javier Milei | Terno escuro e cabelo volumoso | Buenos Aires |
| `donald_trump` | Donald Trump | Terno azul e gravata vermelha | Orlando / Buenos Aires |
| `marco_rubio` | Marco Rubio | Terno escuro, gravata vermelha | Orlando |
| `nikolas_ferreira` | Nikolas Ferreira | Terno ou camisa casual, em interação cômica | Brasília |
| `flavio_bolsonaro` | Flávio Bolsonaro — personagem a localizar | MANTER identidade e figurino preto e branco do pack original: gorro e listras, sem óculos | TODAS |

Nomes próprios devem constar no catálogo de desenvolvimento, e nomes visíveis no jogo podem aparecer na seção de personagens satíricos. As pessoas reais são retratadas em contexto declaradamente fictício.

## Personagens extras para a multidão

Criar pelo menos 35 modelos de base para cada fase (adultos de variadas idades, biotipos e tons de pele, gêneros, profissões e atividades) e derivar 10–25 variações de figurino/pose/acessórios por modelo. A população deve refletir o contexto geográfico, sem reduzir moradores a estereótipos: no Rio, moradores, trabalhadores, comércio de rua, entregadores e visitantes; em Brasília, servidores, jornalistas, parlamentares e assessores; na Argentina, transeuntes, vendedores, turistas e repórteres; em Orlando, famílias, crianças, turistas e trabalhadores do parque.

**Risco de design**: quando há centenas de figuras com uma mesma roupa, encontrar Flávio fica fácil demais se ele for o único de listras. Incluir 15 a 30 figurantes com listras pretas e brancas em cada fase, com rostos, gorros ou acessórios diferentes, preservando uma única instância real do protagonista.

## Integração técnica

- Gerar versões individuais dos nove personagens em PNG/WebP com transparência verdadeira e resolução base 1024 px de altura.
- Exportar metadados com campos `id`, `nome`, `origem`, `sprite`, `escala`, `cena`, `interativo` e `papel` (`protagonista` ou `figurante`).
- Carregar as ilustrações como sprites e nunca criar a multidão com dezenas de cópias idênticas e alinhadas em grade.
- A posição de Flávio deve ser definida por semente de fase, no meio da cena, com sobreposição visual parcial limitada a 30% para manter a solução justa.
- Aplicar colisão para os elementos clicáveis e ignorar toques em decorativos, com hitboxes proporcionais ao corpo visível.
- Incluir aviso na abertura: “Obra de humor e ficção. As situações representadas não retratam eventos reais.”

## Fonte visual citada pelo criador

Reportagem G1 (26/10/2026): https://g1.globo.com/politica/eleicoes/2026/noticia/2026/10/26/flavio-bolsonaro-veja-quem-estava-junto-ao-candidato-derrotado-em-discurso-apos-apuracao.ghtml

A reportagem não pôde ser verificada na consulta; portanto, a lista de presentes na fotografia **não foi extraída ou validada**. Não atribuir a ela pessoas que não tenham sido identificadas em uma verificação futura.

## 12. Expansão do elenco e direção de arte — quatro multidões (27/10/2026)

As cenas abaixo são **ficção satírica**, não reportagens. Não associar pessoas reais a milícias, armas, delitos ou encontros inexistentes. Pessoas públicas inseridas no mesmo quadro não significam que estiveram juntas ou que mantenham relações políticas ou pessoais. Manter pessoas comuns como figuras variadas, sem estereótipos generalizantes.

### Rio de Janeiro — baile funk na laje

- Composição: vista de lajes interligadas, caixas de som, iluminação, DJs, dançarinos, vendedores, famílias e espectadores nos terraços; vielas abaixo e pôr do sol carioca ao fundo.
- Personagens principais fictícios: 18 a 30 **milicianos caricaturais não identificáveis**, distribuídos em pequenos grupos nas lajes e entradas; não desenhar rostos de pessoas reais para esses papéis. Alguns portam silhuetas distintas de armas longas e curtas, sem marcas, detalhes funcionais, especificações técnicas nem gestos de ameaça direcionados ao público.
- Outros figurantes: 120 frequentadores de baile, 75 moradores, 50 trabalhadores/comerciantes, 65 pessoas em janelas e escadas, 50 DJs/artistas/produção e demais transeuntes até atingir 450–600 figuras visíveis.
- Variações: bonés, correntes, camisas de time, estampas de baile, uniformes profissionais, chinelos, mochilas, cadeiras e mesas. Nem todo personagem da comunidade deve estar armado ou vinculado a crime.
- Alvo: Flávio listrado, discreto, parcialmente encoberto entre figurantes de uma laje.

### Buenos Aires — manifestação na Casa Rosada

- Composição: Plaza de Mayo lotada, Casa Rosada ao fundo, bandeiras argentinas, megafones, cartazes, vendedores, imprensa, policiais em função de segurança e faixas de diferentes opiniões.
- Personagens reconhecíveis: caricatura de Javier Milei com cabelo característico, terno e expressão teatral; aliados políticos genéricos e cidadãos com opiniões variadas.
- Multidão: 150 manifestantes com bandeiras, 140 manifestantes com cartazes, 110 jornalistas/fotógrafos, 80 trabalhadores e ambulantes, 80 turistas/transeuntes, 60 agentes de segurança, 30 figuras políticas ou assessores, complementando até 650–800.
- Cartazes legíveis em espanhol, representando visões divergentes. Não apresentar frases inventadas como falas reais de Milei.
- Alvo: Flávio misturado entre cartazes, mochilas e guarda-chuvas.

### Brasília — reunião satírica na casa do pai

- Composição: **residência ficcional**, sem copiar ou expor residência privada real, decoração de Brasília, jardim, varanda, churrasco, televisores, jornalistas e corredores.
- Personagens: caricatura de Jair Bolsonaro; caricaturas de deputados e senadores públicos reconhecíveis, quando autorizados pelo roteiro; e caricaturas de ministros do STF em participação **declaradamente fantasiosa** na sátira, sem alegar reunião ou proximidade real com Jair Bolsonaro.
- Multidão: 150 visitantes, 100 políticos/assessores de tipos variados, 80 membros de imprensa, 70 equipes de serviço, 80 simpatizantes e 70 outros figurantes, complementando até 550–700.
- Figurinos: ternos escuros, gravatas variadas, camisetas de campanha genéricas, crachás fictícios, aventais e vestimentas cotidianas; diversidade de idades e gêneros.
- Atribuir símbolos ou comportamentos políticos apenas de maneira satírica, sem produzir cartazes que pareçam provas de vínculos reais.
- Alvo: Flávio escondido no jardim ou perto da churrasqueira, entre outros personagens de roupa listrada.

### Orlando — turismo no parque com Eduardo

- Composição: parque temático de Orlando **ficcional**, castelo e montanhas-russas originais, atrações, filas, vendedores de lembranças, mascotes animais inventados, desfiles e turistas.
- Personagens: caricaturas de Eduardo e Flávio Bolsonaro em tom de sátira, apoiadores fictícios, famílias brasileiras, turistas de diversas nacionalidades, guias, seguranças, artistas e funcionários.
- Multidão: 300 turistas, 140 integrantes de famílias, 85 funcionários, 75 participantes de desfile, 70 apoiadores ficcionais, 50 artistas/mascotes inventados e demais até 750–900.
- Os personagens do parque serão **mascotes originais**, para permitir uso e distribuição do projeto sem depender de personagens licenciados. Não usar logotipos ou personagens Disney sem autorização.
- Alvo: Flávio entre chapéus, camisetas listradas, balões e personagens uniformizados.

### Assets e comportamento de jogo

- Criar em lotes as silhuetas PNG transparentes por categoria; cada asset com ID, categoria, fase, pose, camada e peso de frequência.
- Diversificar anatomia, tom de pele, cabelo, tamanho, roupa, gestos e direção do olhar. Para multidões de 450–900, usar instâncias repetidas com ajustes de cor, escala e espelhamento, evitando clones lado a lado.
- Visualização: arte-base de cada ambiente em pelo menos 4096×2730 px, com personagens organizados em camadas separadas ou renderização por sprites.
- Zona clicável exclusiva do personagem-alvo; distrações listradas semelhantes não devem disparar sucesso.
- A prancha de quatro ambientes é **referência de composição**, não representa quatro mapas finalizados ou os PNGs individuais do elenco.
