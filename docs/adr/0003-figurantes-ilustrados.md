# ADR 0003 — Figurantes com o acabamento do template

Developed by AK Labs · 27/10/2026 · Aceito

O usuário pediu personagens mais reais e próximos do template fornecido. Os NPCs geométricos foram substituídos por arte raster original gerada com o template como referência de acabamento: contornos, volume, detalhes de rosto, mãos, roupas e sombras. Os PNGs de identidades fornecidas não foram redesenhados.

Três pranchas foram geradas pela ferramenta integrada image_gen com transparência. A seleção final tem 44 figurantes completos; quatro recortes da primeira prancha foram rejeitados por cortar os sapatos na margem. Os prompts e as fontes estão em assets/npc-art-v3. A preparação apenas separa silhuetas, remove fragmentos e empacota um atlas WebP, sem redesenhar rostos.

Um atlas de aproximadamente 1,4 MB evita carregar dezenas de imagens individuais. A pintura continua em Canvas 2D fora da tela. Os 520/620/740/840 personagens e posições válidas foram preservados, assim como o alvo único e as caricaturas fornecidas. A distribuição tem preferência temática, variação de orientação e evita repetir o mesmo figurante em vizinhos próximos. Pessoas com roupas listradas seguem como distrações.

Os cenários arquitetônicos continuam vetoriais; a presente mudança cobre personagens. Mapas finais detalhados permanecem uma etapa artística separada. Progresso salvo e regras não mudaram.
