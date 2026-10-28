# ADR 0006 — Elenco regional e distribuição renovada por partida

Developed by AK Labs · Aceito · 28/10/2026

O usuário solicitou mais personagens com o público próprio de cada região e posições de busca menos repetitivas. A expressão inicial sobre milicianos foi esclarecida pelo usuário como referência à multidão inteira.

Adicionamos 16 figurantes por região, mantendo os 44 genéricos. Atlas separados por destino evitam baixar todos os 64 novos sprites ao abrir uma única fase. O registro de camada guarda a folha correta para que a detecção de transparência respeite tanto os sprites novos quanto os antigos. Prompts, fontes, rótulos e script de preparação ficam versionados.

A multidão anterior era sempre gerada com a semente fixa da fase. O filtro de candidatos ainda selecionava somente um a cada seis e os primeiros 24 em ordem de profundidade. Removemos esse recorte e passamos uma nova semente a cada rodada, sem alterar a arquitetura fixa do destino. A mesma semente continua reproduzível para testes.

O sorteio usa 12 setores e histórico curto por destino. Escolher setor antes da pessoa reduz o viés da densidade. Distância da última posição e exclusão dos setores recentes evitam repetições próximas. Fallbacks mantêm a solução em composições pequenas. A semente e o histórico ficam na sessão; personagens não se movem durante a busca.

Pontuação, aliados bônus, progresso local, Cloudflare Analytics e configuração AdSense permanecem compatíveis. O painel de aliados recebe um ajuste de largura em telas estreitas, identificado durante a conferência mobile.
