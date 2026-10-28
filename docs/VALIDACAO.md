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
- Publicação Cloudflare confirmada: deployment `1e15ea5c-4a37-478e-9da3-c058de4dd3dd`, estágio `success`. Atlas público retornou HTTP 200 com 44 frames.
- Site público: Orlando carregado com 840 pessoas e zoom de 246%, com as novas ilustrações visíveis. Prévia capturada para revisão do usuário.

## 0.4.0 — aliados bônus

- 31 testes passaram, incluindo recompensa única por identidade, bônus com penalidades, compatibilidade dos recordes, pixels transparentes, sobreposição de figurantes e oito aliados distintos em todos os spawns das quatro fases.
- Navegador local: painel de oito retratos carregado; clicar no aliado 6 em zoom 246% marcou o retrato, atualizou para 1/8 e concedeu 250 pontos. Repetir o clique manteve 250 e exibiu a mensagem de já encontrado.
- Partida concluída em Buenos Aires com um aliado, uma dica e três erros no modo livre: resultado de 1.025 pontos (1.000 +250 −150 −75). Resultado discriminou 1/8 aliados e +250 pontos bônus.
- Detecção passou a considerar as camadas opacas da frente. Clicar em um figurante comum continuou aplicando a penalidade, sem coletar o aliado atrás dele.
- Publicação confirmada no Cloudflare: deployment `454f563b-715b-4b03-b167-a6ff8d5feb19`, estágio `success`. app.mjs público retornou HTTP 200 com o painel e a regra de bônus. Rio carregado no site público com 0/8 aliados e instrução de +250 por aliado.

## Estatísticas de acesso — 27/10/2026

- Site RUM criado para cadeoflavio.pages.dev e vinculado à configuração nativa do Pages.
- Deployment cd8089b1-73e2-4c8b-a857-6ed8563cac9f confirmado com estágio success.
- HTML público HTTP 200 com uma única inclusão do beacon e identificador esperado. JavaScript do beacon retornou HTTP 200.
- Navegador no endereço público carregou a tela inicial e confirmou um único script Cloudflare Insights no DOM.
- Build estático concluído. Não houve alteração nas regras do jogo; os 31 testes da versão 0.4.0 continuam sendo a referência da lógica.
- Os totais processados no painel não foram verificados nesta ativação. A coleta começa agora, sem histórico retroativo; localização disponível por país.

## 0.5.0 — preparação Google H5 Games Ads

- 37 testes passaram: seis novos cenários de anúncios e as 31 verificações anteriores do jogo.
- Fluxo publicitário testado com adaptador local: aguarda encerramento, não repete a solicitação, continua sem inventário/frequência, recupera falha do SDK e ignora inicialização tardia após timeout.
- Navegação cancelada não dispara anúncio tardio. Configuração vazia não carrega scripts do Google; modo de teste não é aceito no host público.
- Navegador local: Rio carregou com timer, canvas e oito aliados, sem script de publicidade e sem erros de console; página de privacidade aberta pelo rodapé e texto conferido.
- Build concluído. Sem ID de editor, ads.txt não é gerado com dados fictícios.
- Sessão Google consultada no Chrome exibiu Ausência de conta do Google AdSense. Conta/H5 e consentimento ainda precisam ser preparados; anúncio real, receita e consentimento do Google não foram validados.
- Publicação confirmada: deployment 82aabed1-5f0c-44d1-b29e-caa24c11e7cb com estágio success. Site, módulo de ads e página de privacidade retornaram HTTP 200; configuração pública preservou enabled:false e a inclusão única de Cloudflare Analytics.
- Navegador público: Rio abriu com cronômetro e oito aliados; nenhuma tag googlesyndication foi carregada enquanto a monetização permanece inativa.

## 0.5.1 — editor AdSense vinculado

- 38 testes passaram, incluindo reutilização do SDK já presente no HTML ao ativar H5. O teste novo falhou antes da correção por carregar uma segunda tag e passou depois dela.
- Deployment 3bd9bc8f-9e1c-42a1-bc6e-b0e8ba10cd4c confirmado com estágio success. HTML público contém uma meta tag do editor e uma única tag AdSense com async e crossorigin=anonymous.
- ads.txt público retornou HTTP 200 e a linha google.com, pub-3370399904738754, DIRECT, f08c47fec0942fa0. Identificador do cliente confere com o fornecido pelo usuário e com a conta Google acessível.
- AdSense confirmou Seu site foi verificado. Pedido de revisão enviado; tela final mostrou Você concluiu todas as etapas e Agradecemos por conectar o site. Pagamentos, termos e cadastro pessoal não foram alterados pelo agente.
- Navegador público carregou a página inicial e confirmou uma única tag Google com o editor correto. Cloudflare Analytics continua incluído uma única vez.
- Aprovação final e rendimento não confirmados. Solicitações H5 permanecem desativadas até a liberação do programa e preparação de consentimento. Captura da confirmação salva nos outputs da conversa.

## 0.6.0 — elenco regional e busca variada — 28/10/2026

- 64 sprites regionais criados pela ferramenta integrada image_gen: 16 por destino. Fontes transparentes, prompts completos e rótulos de listras preservados; empacotamento removeu um pequeno fragmento entre duas silhuetas de Orlando.
- Quatro atlas de aproximadamente 370–432 KB, carregados por destino. 44 sprites genéricos e identidades fornecidas preservados.
- 49 testes passaram antes da conferência de navegador; testes de arte regional foram repetidos após a limpeza de alfa. Cobertura inclui 96 distribuições, 12 setores por destino, histórico de seis setores, distância de 420 unidades quando disponível, oito aliados distintos e alvo único.
- Distribuições de referência: Rio 160 candidatos; Brasília 149; Buenos Aires 148; Orlando 141. Os valores variam por semente. O limite anterior de 24 foi removido.
- Navegador: quatro fases carregadas com seus públicos regionais e oito aliados, em zoom 246%. Reinício do Rio alterou a distribuição e a pose; sem erros de console na sequência das quatro fases.
- Tela 390 × 844 conferida em Orlando. Identificado e corrigido o corte do oitavo retrato de aliado; oito retratos visíveis na nova captura. Prévia de cada destino salva nos outputs da conversa.
- Build estático concluído, com verificações de presença dos quatro atlas regionais. Pontuação, recordes, Analytics e editor AdSense mantidos.
- Publicação confirmada: deployment a2533669-5794-48c1-ab58-f371afc879c6 com estágio success. Quatro atlas públicos retornaram HTTP 200 image/webp e os respectivos metadados confirmaram 16 personagens cada.
- Rio aberto no endereço público com o elenco regional, 520 pessoas, oito aliados e zoom de 246%; captura salva em rio-elenco-regional-publicado-v0.6.0.png. Inclusões únicas de Analytics e AdSense e ads.txt do editor preservados. Pacote de arte/prompts conferido com 15 arquivos.

## 0.6.1 — aliados concedem tempo — 28/10/2026

- 51 testes passaram, cobrindo 15 segundos por aliado distinto, oito coletas somando 120 segundos sem limitar à duração inicial, repetições/identidades inválidas sem recompensa e modo livre sem acréscimo de tempo.
- Navegador local em partida cronometrada do Rio: coleta do aliado 1 alterou 01:38 para 01:53, somou 250 pontos e marcou 1/8. Clique repetido exibiu Você já encontrou esse aliado; pontos permaneceram em 250 e o relógio continuou decrescendo normalmente.
- Painel e rodapé mostraram +15 s. Aviso de coleta confirmou +250 pontos e +15 s. Captura salva nos outputs da conversa.
- Build estático concluído e sintaxe do módulo app.mjs conferida. Bônus de tempo usa o mesmo bloqueio de coleta duplicada dos pontos.
