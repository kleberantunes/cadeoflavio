# Changelog

Developed by AK Labs

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
