# Elenco regional e variedade de busca — 0.6.0

Developed by AK Labs · 28/10/2026

Foram criados 64 novos figurantes: 16 para cada destino, misturados aos 44 figurantes genéricos anteriores. O jogo passa a ter 108 modelos de figurantes, além dos sprites fornecidos de Flávio e dos oito aliados. A população simultânea continua em 520, 620, 740 e 840 pessoas por fase.

| Destino | Público do novo elenco |
| --- | --- |
| Rio de Janeiro | Moradores, comerciante de alimentos, entregador com capacete, cabeleireira, músico com pandeiro, vizinhos e público da festa |
| Brasília | Servidores e assessores, jornalistas, trabalhadores, jardineiro, estudantes e visitantes |
| Buenos Aires | Moradores, vendedor de jornais, padeiro, músico de rua, estudantes, trabalhadores, turistas e pessoas com mate |
| Orlando | Turistas, famílias, visitante jovem, guia, fotógrafos e funcionários de parque fictício |

O usuário esclareceu que desejava melhorar a multidão inteira. Estes figurantes são pessoas comuns; não foi criado um elenco de milicianos. Todos são identidades fictícias, sem substituir ou redesenhar as caricaturas fornecidas.

## Arte e arquivos

As quatro pranchas foram geradas pela ferramenta **image_gen integrada**, com o template fornecido como referência de acabamento. Os prompts completos estão em `assets/npc-regional-v1/prompts.json`; as quatro fontes PNG transparentes, na mesma pasta. O arquivo `labels.json` registra as roupas listradas conferidas visualmente e a escala do visitante mais jovem de Orlando.

`python scripts/prepare-regional-npcs.py` separa silhuetas e empacota quatro atlas WebP, com 16 sprites cada. Remove apenas pequenos fragmentos de alfa e separa uma união de um pixel entre silhuetas adjacentes, sem repintar rostos ou roupas. Requer Pillow, NumPy e OpenCV no ambiente de autoria. Python não é necessário para compilar ou jogar.

Os atlas ficam em `assets/web/crowd/{destino}-v1.webp`, com metadados JSON correspondentes. São aproximadamente 370–432 KB por destino. O frontend carrega o atlas genérico e apenas o atlas da região selecionada. Desenho e máscara de clique usam exatamente a mesma folha de sprites.

A maioria das pessoas utiliza o novo elenco local; o restante mantém o elenco genérico como visitantes e variedade adicional. Cada rodada varia o modelo, a orientação e as posições, com prevenção de clones muito próximos. Os personagens listrados continuam como distrações.

## Sorteio das buscas

Cada nova partida ou reinício recebe uma nova semente aleatória. A multidão inteira é redistribuída e os aliados acompanham a nova composição. Nada muda de lugar durante a partida em andamento.

A seleção deixou de descartar cinco em cada seis candidatos e limitar as posições a 24. Todas as posições com espaço geométrico para o rosto, dentro das margens de busca, são consideradas. A área é dividida em 12 setores; o sorteio escolhe primeiro o setor e depois uma pessoa, evitando favorecer somente os setores mais povoados.

O histórico da sessão evita os seis setores usados mais recentemente naquele destino e procura manter distância mínima de 420 unidades da posição anterior. Se uma composição não oferecer essa distância ou setores suficientes, o algoritmo usa as opções seguras disponíveis, sem bloquear o jogo. O histórico é separado por destino, fica somente em memória e não é enviado ao analytics ou ao AdSense.

As distribuições de referência têm 160, 149, 148 e 141 posições válidas, respectivamente. A quantidade varia conforme a semente; não é uma quantidade fixa de locais em toda partida.

## Verificação

49 testes passaram. Os testes de variedade percorrem 24 distribuições por destino, verificando cobertura dos 12 setores, distância e histórico, oito aliados distintos e alvo único. Os testes de arte conferem os quatro elencos, uso de todos os novos modelos, rótulos de listras e atlas correto para o clique.

As quatro cenas foram abertas no navegador com zoom de 246%, mantendo seus oito aliados. O reinício do Rio alterou a composição e a pose. Também foi conferido o layout em 390 × 844, com ajuste do painel para exibir os oito retratos sem cortar o último. Não houve erro de console na conferência das quatro fases.
