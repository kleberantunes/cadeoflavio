# Onde Está o Flávio?

**Developed by AK Labs** · MVP web 0.1.0 · 27/10/2026

Jogo de busca visual e sátira política para navegadores desktop e mobile. O jogador procura uma caricatura listrada em quatro multidões: Rio, Brasília, Buenos Aires e Orlando. Público: jogadores casuais que gostam de jogos de observação.

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

## Estado das artes

O ZIP fornecido contém referências conceituais e uma prancha, **não** os sete PNGs de poses nem quatro cenários finais. Esta primeira edição usa a caricatura do Flávio da prancha e cenários vetoriais procedurais próprios, com 520/620/740/840 NPCs. As referências aparecem nas miniaturas e apresentação. As quatro poses distintas, a direção de arte detalhada do roteiro e a validação editorial final não estão concluídas.

Para regenerar o recorte e as miniaturas, `python scripts/prepare-assets.py` exige Pillow, NumPy e OpenCV. Os arquivos gerados já acompanham o projeto; Python não é necessário para jogar ou compilar.

## Roadmap

1. MVP: quatro fases, zoom/arraste, teclado/toque, pontuação, pausa, dicas, modo livre e progresso local.
2. Produção artística: mapas desenhados à mão, poses individuais aprovadas e revisão de escala, oclusão e dificuldade.
3. Produto: testes em dispositivos físicos iOS/Android, auditoria de acessibilidade, revisão de licenças e direitos de imagem, localização e distribuição.
4. Expansão: editor de cenários, pacotes de fases e empacotamento mobile/desktop conforme demanda.

Obra de ficção e sátira política. Cenas, residências e encontros são imaginários e não documentam acontecimentos ou relações reais.
