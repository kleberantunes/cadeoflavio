# Onde Está o Flávio?

**Developed by AK Labs** · MVP web 0.6.0 · 28/10/2026

Jogo de busca visual e sátira política para navegadores desktop e mobile. O jogador procura uma caricatura listrada em quatro multidões: Rio, Brasília, Buenos Aires e Orlando. Público: jogadores casuais que gostam de jogos de observação.

A versão 0.6.0 adiciona 64 figurantes regionais aos 44 existentes e renova a distribuição a cada partida. A busca usa 12 setores com histórico recente para variar os locais, preservando um alvo e oito aliados. Arte, prompts e detalhes do sorteio: `docs/ELENCO_REGIONAL.md`.

**Jogar:** https://cadeoflavio.pages.dev · **Código público:** https://github.com/kleberantunes/cadeoflavio

Para publicar atualizações, consulte `docs/PUBLICACAO.md`. O site usa Cloudflare Pages por upload direto; push no GitHub não dispara publicação automática. Visitas, visualizações e países de origem podem ser consultados no Cloudflare Web Analytics, conforme `docs/ANALYTICS.md`.

A integração oficial Google AdSense H5 Games Ads está preparada antes da primeira partida. O ID de editor fornecido está vinculado ao código de conexão e ao ads.txt. **Solicitações H5 ainda desativadas**, aguardando liberação H5, aprovação do site e configuração de consentimento. Consulte `docs/MONETIZACAO.md` para ativação.

## Executar

Requer Node.js 22 ou superior. Sem instalação de dependências.

```sh
npm test
npm run build
npm run dev
```

Abra http://127.0.0.1:4173. O diretório `dist/` é a versão estática para hospedagem. Não abra index.html diretamente via file://: os módulos precisam de HTTP.

## Jogar

- Escolha um destino e encontre o personagem mostrado no topo.
- Arraste a cena; amplie com roda, pinça ou botões. No teclado, setas movem, +/− ampliam, Enter procura na mira central e espaço pausa.
- Acerto: 1.000 pontos +10 por segundo restante. Erro: −25 pontos no resultado e −3 segundos. Até três dicas por fase, custando 150 pontos cada.
- Oito aliados opcionais por fase: +250 pontos cada, no máximo uma vez por partida. Procure-os antes do Flávio, que encerra a fase e confirma o bônus. Retratos no painel mostram o progresso; aliados encontrados recebem marcação verde. Cliques respeitam a transparência e a ordem de sobreposição dos personagens.
- Três estrelas: sem dicas e mais de metade do tempo. Duas: conclusão normal. Uma: duas ou mais dicas. Modo livre não tem bônus temporal e rende até duas estrelas.
- Progresso e recordes ficam apenas no navegador. Sem cadastro ou coleta de dados do jogo. A fonte Google Fonts é opcional e possui fallback local.

## Arquitetura e stack

JavaScript ES Modules + Canvas 2D + CSS. Cenas fora da tela em 4104 × 2736 px; câmera compartilhada pelo desenho e detecção de alvo; hitbox com teste de transparência do sprite. Sem backend no MVP.

- `frontend/`: interface, regras puras e renderizador de cenários.
- `assets/pack-v3/`: pacote original fornecido, preservado.
- `assets/web/`: sprite extraído da prancha e miniaturas WebP.
- `scripts/`: build, servidor local e preparação de assets.
- `tests/`: regras de jogo e transformações de câmera.
- `docs/adr/`: decisões e limitações. `commercial/`: preparação comercial.
- `backend/`, `mobile/`, `desktop/`, `integrations/`: reservados para expansão.

## Personagens fornecidos — versão 0.2.0

Na versão 0.3.0, os figurantes geométricos foram substituídos por **44 pessoas ilustradas** com rostos expressivos, anatomia, volume e sombras próximos do acabamento do template. Os personagens fornecidos continuam intactos. O novo elenco está em `assets/npc-art-v3/`, com prompts e fontes; o jogo carrega um único atlas WebP em `assets/web/crowd/`. Para regenerar o atlas, execute `python scripts/prepare-npc-atlas.py` no ambiente de autoria com Pillow, NumPy e OpenCV. Python não é necessário para jogar ou compilar o site.

Os seis novos PNGs e a prancha de nove caricaturas foram integrados por solicitação direta do usuário. Os rostos e as cores originais foram mantidos, incluindo o traje vermelho/branco/azul. Essa solicitação atualiza a antiga restrição editorial de usar exclusivamente preto e branco.

Cada partida tem um único alvo. Poses disponíveis: em pé, cadeira de praia, bandeira americana, carro, comemorando, apontando e a variante listrada da prancha. Oito coadjuvantes da prancha aparecem misturados aos personagens procedurais nos quatro destinos, na mesma profundidade e escala local. A miniatura identifica a pose em uso. Reiniciar troca posição e pose entre as alternativas do destino.

Originais: `assets/personagens-fornecidos/`. Sprites preparados: `assets/web/cast/`, com remoção de margens transparentes e fragmentos desconectados; nenhum rosto foi redesenhado ou recolorido. `python scripts/prepare-cast.py` regenera o elenco usando Pillow, NumPy e OpenCV. Proveniência registrada no manifesto JSON. O jogo e o build não exigem Python.

## Estado das artes na primeira entrega

O ZIP inicial continha referências conceituais e uma prancha, sem os PNGs de poses nem os quatro cenários finais. As poses foram recebidas e integradas na versão 0.2.0. Os cenários continuam vetoriais procedurais, com 520/620/740/840 personagens. As referências aparecem nas miniaturas e apresentação. A direção de arte detalhada dos mapas e a validação editorial final permanecem pendentes.

Para regenerar o recorte e as miniaturas, `python scripts/prepare-assets.py` exige Pillow, NumPy e OpenCV. Os arquivos gerados já acompanham o projeto; Python não é necessário para jogar ou compilar.

## Roadmap

1. MVP: quatro fases, zoom/arraste, teclado/toque, pontuação, pausa, dicas, modo livre e progresso local.
2. Produção artística: mapas desenhados à mão, poses individuais aprovadas e revisão de escala, oclusão e dificuldade.
3. Produto: testes em dispositivos físicos iOS/Android, auditoria de acessibilidade, revisão de licenças e direitos de imagem, localização e distribuição.
4. Expansão: editor de cenários, pacotes de fases e empacotamento mobile/desktop conforme demanda.

Obra de ficção e sátira política. Cenas, residências e encontros são imaginários e não documentam acontecimentos ou relações reais.
