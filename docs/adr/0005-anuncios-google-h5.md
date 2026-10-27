# ADR 0005 — Anúncio antes da primeira partida

Developed by AK Labs · Aceito · 27/10/2026

O usuário autorizou monetização com Google antes de jogar. Adotamos AdSense H5 Games Ads com a Ad Placement API oficial, no mesmo documento do canvas. A interface inicial já foi renderizada quando o jogador escolhe um destino; por isso o tipo correto é `start`, não `preroll`. Não envolvemos um banner AdSense comum em um modal próprio.

Há uma única oportunidade de anúncio por carregamento de página, antes da primeira busca. O SDK decide inventário, formato e frequência. O cronômetro só começa depois de `adBreakDone`. Áudio e controles são suspensos durante a exibição. Bloqueio ou indisponibilidade do SDK liberam o jogo; nenhuma espera fictícia é apresentada como anúncio. Navegação durante a preparação não abre uma peça atrasada na tela inicial.

Identificador do editor e habilitação ficam em um módulo público independente. A configuração inicia desativada e sem ID, pois a conta e a liberação H5 ainda precisam ser confirmadas. Ativar anúncios exige primeiro aprovação pelo Google, verificação do site e consentimento/CMP aplicável, conforme `docs/MONETIZACAO.md`. Dados financeiros e termos são concluídos pelo titular diretamente no Google.
