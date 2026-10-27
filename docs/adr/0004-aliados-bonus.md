# ADR 0004 — Aliados como objetivos opcionais

Developed by AK Labs · Aceito · 27/10/2026

O usuário solicitou pontos extras para os aliados. Os oito coadjuvantes existentes tornam-se alvos opcionais, com 250 pontos por identidade em cada partida. Cliques repetidos não pontuam e não penalizam. Não são incluídos novos personagens ou alegações sobre relações reais.

Encontrar Flávio continua encerrando a fase e confirma os pontos no resultado. O painel de retratos informa isso antes da busca; o bônus é discriminado separadamente no resultado e somado antes do piso de zero das penalidades. Reiniciar limpa as coletas. O melhor recorde salva a quantidade de aliados daquela partida; os recordes antigos continuam válidos.

O canvas registra as camadas desenhadas. O hit test percorre da frente para trás e consulta o alfa dos sprites, incluindo os figurantes do atlas. Isso impede coletar através de outro corpo opaco. Carro, bandeira e floreiras respeitam as regiões válidas do protagonista. O alfa do atlas é compactado em um byte por pixel e reutilizado nas partidas.

O posicionamento dos aliados usa candidatos com espaço geométrico para o rosto. Testes percorrem todas as posições válidas do alvo nas quatro fases para garantir oito aliados distintos. Não há revelação antecipada das posições nem alteração na arte dos personagens fornecidos.
