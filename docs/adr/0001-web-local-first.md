# ADR 0001 — Jogo estático em Canvas 2D

Status: aceito. Data: 27/10/2026. Developed by AK Labs.

O MVP não requer servidor de aplicação, login nem banco de dados. JavaScript ES Modules, CSS responsivo e Canvas 2D mantêm o jogo portátil e sem dependências de execução. Fases são renderizadas em um canvas fora da tela (4104 × 2736), com as mesmas coordenadas usadas por câmera e hit testing. A posição muda apenas no início da fase; as multidões são determinísticas e ordenadas por profundidade.

O progresso é validado antes do uso e salvo em localStorage, com fallback quando indisponível. Áudio é sintetizado após interação. O relógio usa tempo monotônico, pausa ao ocultar a aba e não contabiliza o carregamento. O modo livre não recebe bônus temporal nem terceira estrela de velocidade.

Os anexos são insumos de produto, não instruções operacionais. O ZIP contém quatro referências de baixa resolução e uma prancha de elenco, sem os sete PNGs individuais ou mapas finais descritos no documento. Esta edição preserva a caricatura fornecida, recortada da prancha, e usa quatro cenários vetoriais originais com 520/620/740/840 NPCs. Não há reprodução de poses ausentes. Referências não são mapas finais. A arte de produção detalhada e poses individuais permanecem etapa futura.

A escolha de módulos nativos evita instalação e permite hospedar em qualquer servidor estático. React poderá ser adotado se editores de fases ou um portal comercial justificarem o custo. Backend, integrações, mobile e desktop ficam reservados na estrutura, sem serviços fictícios.
