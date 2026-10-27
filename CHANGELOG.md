# Changelog

Developed by AK Labs

## Estatísticas de acesso — 2026-10-27

- Cloudflare Web Analytics ativado para `cadeoflavio.pages.dev` pela integração nativa do Pages.
- Painel de visitas, visualizações, países, referências, dispositivos e navegadores; sem cookies de analytics ou localização por GPS.
- Configuração e instruções do painel registradas em `docs/ANALYTICS.md`. A medição começa nesta ativação, sem recuperar acessos anteriores.

## 0.4.0 — 2026-10-27

### Adicionado
- Oito aliados opcionais por fase, valendo 250 pontos por descoberta, sem recompensa duplicada.
- Painel de retratos com marcação dos encontrados e contador. Total de pontos ao vivo e bônus discriminado no resultado.
- Recorde local guarda também a quantidade de aliados da partida, preservando compatibilidade com os recordes antigos.

### Melhorado
- Detecção considera pixels visíveis da camada da frente: não é possível coletar um aliado através de outro personagem opaco.
- Posições dos aliados selecionadas com espaço visível para o rosto. Encontrar Flávio continua encerrando a fase; os bônus são opcionais.

## 0.3.0 — 2026-10-27

### Melhorado
- Figurantes das quatro cenas substituídos por 44 pessoas ilustradas com rostos, mãos, roupas e sombras mais próximos do template fornecido.
- Variedade de idades aparentes, tons de pele, tipos físicos, roupas, gestos e acessórios; distribuição contextual e prevenção de clones muito próximos.
- Atlas WebP transparente único para preservar o carregamento e a renderização eficiente das multidões.
- Mantidos os sprites fornecidos do alvo e coadjuvantes, a densidade das quatro fases, as distrações listradas, zoom e progresso local.
- Prompts e arquivos-fonte de arte registrados; testes verificam variedade e cobertura de todos os figurantes.

## Publicação — 2026-10-27

- Repositório privado `kleberantunes/cadeoflavio` criado com o histórico do projeto.
- Projeto Cloudflare Pages `cadeoflavio` criado na conta AKLabs para acesso público em `cadeoflavio.pages.dev`.
- Configuração Pages, dependência Wrangler com lockfile e comando `npm run deploy:pages` para publicação reproduzível.
- Integração Git automática indisponível devido ao erro Cloudflare 8000011; publicação configurada por upload direto, sem armazenar credenciais no repositório.

## 0.2.0 — 2026-10-27

### Adicionado
- Seis poses transparentes fornecidas do protagonista, com as cores originais, selecionadas conforme o destino. Reiniciar também troca a pose quando houver alternativas.
- Oito coadjuvantes extraídos da nova prancha de nove caricaturas em todas as multidões; a nona caricatura listrada é uma variação de alvo, mantendo um único Flávio por partida.
- Miniatura e nome do alvo acompanham a pose efetivamente usada na fase. Detecção reutiliza a máscara alfa carregada, sem alocar canvas a cada clique.
- Origens dos 15 sprites registradas em assets/web/cast/provenance.json. Originais preservados em assets/personagens-fornecidos.
- Testes de integração do elenco, escala proporcional, exclusividade de alvo e transparência.

### Alterado
- Rosto e traje seguem os novos PNGs enviados pelo usuário; a solicitação atual substitui a antiga restrição do roteiro a listras pretas e brancas.
- Poses cortadas na cintura aparecem atrás de floreiras para integrar os recortes à cena. Fundos procedurais e demais figurantes foram preservados.

## 0.1.0 — 2026-10-27

### Adicionado
- MVP web com quatro destinos e multidões de 520 a 840 NPCs.
- Zoom, arraste, pinça, controles de teclado e detecção por alfa do personagem fornecido.
- Cronômetro monotônico, pausa automática da aba, reinício com posição diferente e modo sem tempo.
- Dicas regionais, pontuação, estrelas, resultados, recordes locais e efeitos de áudio opcionais.
- Estrutura AK Labs, documentação de arquitetura, preparação de assets e testes das regras.

### Limitações conhecidas
- Artes de jogo procedurais nesta edição. O pacote recebido não inclui mapas finais ou as sete poses citadas; o alvo usa a caricatura extraída da prancha fornecida.
- Densidade é a quantidade de NPCs renderizados; oclusão reduz a contagem de silhuetas individualmente distinguíveis. Revisão artística da versão comercial pendente.
