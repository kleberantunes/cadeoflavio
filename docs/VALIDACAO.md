# Validação do MVP 0.1.0

Developed by AK Labs · 27/10/2026

- `npm test`: 11 testes passaram (pontuação, estrelas, limites da câmera, transformações, reinício, armazenamento inválido, densidade e pontos válidos nas quatro fases).
- `npm run build` e verificação de sintaxe dos módulos: passaram.
- Servidor HTTP local: resposta 200.
- Navegador integrado: interface conferida em larguras aproximadas de 600 e 1176 px; carregamento de Rio, Buenos Aires e Orlando; controles de zoom, dica, pausa e modo livre verificados.
- Fluxo completo em Orlando: um erro, uma dica e acerto após zoom de 276%; resultado observado 825 pontos e duas estrelas (1.000 −25 −150).
- Sprite inspecionado sobre fundo claro após correção para preservar o gorro e pompom.

Não foi realizada validação em dispositivos físicos, Safari/iOS, Firefox ou gestos de toque reais. A arte procedural não equivale aos mapas ilustrados finais descritos no roteiro. Revisão de oclusão artística e harmonização de traço do protagonista permanecem para a etapa de produção.

## Atualização 0.2.0 — personagens fornecidos

- 19 testes passaram, incluindo diversidade do elenco, alvo único, escala proporcional, regiões de clique e máscara alfa.
- Build verifica a presença dos 15 sprites novos (seis poses, oito coadjuvantes e uma pose clássica da prancha).
- Prancha técnica sobre fundo claro: inspecionados todos os recortes com transparência, preservando cores e feições.
- Navegador: alvo com bandeira americana em Orlando, miniatura correspondente, zoom a 276%, clique válido e resultado de 1.000 pontos no modo livre.
- Brasília: pose na cadeira de praia carregada; reinício alterou para pose dentro do carro e atualizou a miniatura.
- Figurantes procedurais mantidos, com os coadjuvantes visíveis entre eles. Dispositivos físicos e harmonização artística final continuam pendentes.

## Publicação Cloudflare Pages — 27/10/2026

- `https://cadeoflavio.pages.dev/`: HTTP 200, título correto e acesso sem login.
- Módulos app.mjs e cast.mjs e sprites standing.png/car.png: HTTP 200.
- Deployment `bfa542ea-4b12-49b2-96c0-1c3cb6d13be2`: estágio Cloudflare `success`.
- Navegador no endereço público: primeira fase carregada, multidão, miniatura, HUD e controles visíveis.
- GitHub `kleberantunes/cadeoflavio`: privado, branch principal `main`, código enviado.
- `npm test`: 19 testes passaram; `npm run build`: concluído antes do upload.
- Integração Git nativa não ativada por erro de instalação Cloudflare 8000011. Upload direto concluído com Wrangler, usando a sessão existente do cf somente em memória.

## 0.3.0 — figurantes ilustrados

- Três pranchas de autoria geradas pela ferramenta integrada image_gen seguindo o acabamento do template fornecido; 44 recortes completos selecionados e conferidos sobre fundo claro.
- Atlas transparente WebP de aproximadamente 1,35 MB; separação e empacotamento automáticos, preservando rostos, mãos, roupas e acessórios da arte selecionada.
- 24 testes passaram: cobertura de todos os NPCs das quatro fases, variedade de pelo menos 38 recortes por cena, distrações listradas, determinismo e todas as regras anteriores.
- Navegador: Rio carregado com 520 pessoas ilustradas, zoom verificado em 246% e 276%, dica e acerto no alvo clássico. Resultado observado: 850 pontos no modo livre após uma dica.
- Sprites fornecidos do Flávio e das caricaturas preservados. Arquitetura dos cenários e regras de progresso mantidas.
