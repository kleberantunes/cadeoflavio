# ADR 0002 — Elenco fornecido nas multidões

Developed by AK Labs · Aceito · 27/10/2026

A solicitação direta do usuário de usar os novos personagens prevalece sobre as restrições de figurino do documento anexado. As cores e faces dos novos PNGs são preservadas. Originais são copiados para o projeto sem alteração. A preparação usa o alfa existente, mantém a maior silhueta, remove fragmentos desconectados e recorta margens transparentes. Nenhuma geração de imagem ou substituição de rosto é necessária.

Cada fase carrega uma pose do alvo e os oito coadjuvantes. A nona caricatura, que já representa o personagem listrado, integra as opções do alvo; duplicá-la como figurante criaria dois alvos reconhecíveis na mesma partida. As seis poses enviadas são distribuídas nos quatro destinos. As poses na cintura recebem oclusão por floreira para disfarçar a borda do recorte. Carro e bandeira têm região clicável restrita à área do personagem.

O elenco substitui oito posições da multidão, mantendo a quantidade, ordenação por profundidade e a maioria dos figurantes procedurais. Posicionamento determinístico exclui o alvo e sua vizinhança imediata. Desenho, miniatura e hit test compartilham o mesmo asset selecionado. A máscara alfa é preparada uma vez por asset e reutilizada nos cliques.

Os mapas continuam sendo o MVP procedural, com estilos de traço distintos dos sprites fornecidos. Harmonização artística completa continua pendente. Esta mudança integra o material recebido sem afirmar que os mapas finais foram produzidos.
