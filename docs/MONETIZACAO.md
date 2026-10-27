# Google AdSense H5 Games Ads

Developed by AK Labs · 27/10/2026

## Estado atual

A integração foi preparada para um anúncio intersticial antes da primeira partida, na transição entre a escolha do destino e a busca. **A monetização ainda está desativada:** falta identificar a conta AdSense, obter o ID público de editor e confirmar o acesso ao programa H5 Games Ads e a aprovação do site pelo Google. Não há receita ou anúncio real configurado nesta entrega.

Google Ads é usado para comprar anúncios. Google AdSense é usado para receber pela exibição. H5 Games Ads é um produto do AdSense com candidatura e aprovação próprias; a aprovação não é garantida. A sessão Google consultada no Chrome exibiu “Ausência de conta do Google AdSense”; pode existir uma conta em outro login. Nenhum cadastro, termo, dado financeiro ou campanha foi submetido.

## Vincular a conta

1. Abra [Google AdSense](https://adsense.google.com/) e entre no login que possui a conta. Se necessário, conclua o cadastro diretamente no Google, incluindo seus dados e termos.
2. Confira o estado da conta e cadastre `cadeoflavio.pages.dev` em **Sites**, seguindo o método de verificação exibido pelo AdSense. Não crie campanhas no Google Ads para esta finalidade.
3. Obtenha o **ID de editor**, no formato `ca-pub-` seguido de 16 dígitos, em Conta → Configurações → Informações da conta. É um identificador público; não compartilhe senha ou código de verificação.
4. Solicite o acesso ao [AdSense H5 Games Ads](https://support.google.com/adsense/answer/1705831?hl=pt-BR) e confirme sua liberação. O AdSense comum, sozinho, não confirma a participação no programa.
5. Configure as mensagens de privacidade e consentimento aplicáveis no AdSense. Para público no EEE, Reino Unido e Suíça, use a CMP certificada exigida pelo Google, com seu código efetivamente instalado e testado antes da ativação. A página de privacidade local não substitui a CMP.
6. Preencha `publisherId` em `frontend/ads-config.mjs`. O build produzirá `dist/ads.txt` com esse ID; confirme a autorização do vendedor no painel. Faça a verificação do site solicitada pelo Google. Mantenha `enabled:false` durante a aprovação.
7. Após aprovação do site, acesso H5 e configuração de consentimento, mude `enabled:true`, mantenha `testMode:false`, execute `npm test` e `npm run deploy:pages`. Confira a entrega no relatório H5 do AdSense. A disponibilidade e o valor dos anúncios são definidos pelo Google.

## Comportamento implementado

- Usa a Ad Placement API oficial, `type:'start'`, pois a página inicial e o catálogo de destinos já estão visíveis. Não usa `preroll`, reservado à inicialização antes da interface.
- Faz no máximo uma solicitação de anúncio por carregamento de página. Reiniciar a fase e seguir para outro destino não repetem o anúncio.
- SDK pré-carregado apenas quando há configuração válida. Sem conta, não há chamada ao Google nem atraso artificial.
- Se o SDK falhar, for bloqueado ou não ficar pronto em cinco segundos, a partida segue. Inicialização tardia não dispara anúncio depois disso.
- Não inicia o cronômetro ou o canvas antes do fim do intervalo publicitário. Durante anúncio real, silencia o áudio e bloqueia os controles da página; o Google controla o fechamento.
- A partida continua em `adBreakDone`, inclusive quando não há inventário ou a frequência limita a exibição. Não há pedido para clicar, recompensa por clique ou botão falso de anúncio.
- Navegar de volta antes de o SDK ficar pronto cancela aquela oportunidade de anúncio.
- `testMode:true` é aceito somente em localhost; os testes automatizados usam um adaptador local sem tráfego ao Google. Testes reais do SDK devem usar o modo de teste oficial, sem cliques em anúncios de produção.
- Pontuação, cronômetro, aliados e recordes não são enviados à API de anúncios.

## Arquivos

`frontend/ads-config.mjs`: configuração pública. `frontend/ads.mjs`: ciclo do SDK e do anúncio. `frontend/app.mjs`: início da busca e suspensão de áudio/controles. `frontend/privacidade.html`: informação aos visitantes. `scripts/build.mjs`: geração de ads.txt quando o editor estiver identificado. `tests/ads.test.mjs`: disponibilidade, encerramento, bloqueios, repetição e cancelamento.

Referências oficiais: [adesão](https://support.google.com/adsense/answer/1705831), [código AdSense](https://support.google.com/adsense/answer/9955214), [tipos de intervalo e callbacks](https://developers.google.com/ad-placement/apis/adbreak), [teste sem anúncios reais](https://developers.google.com/ad-placement/docs/test), [ads.txt e verificação](https://support.google.com/adsense/answer/7584263), [CMP e consentimento](https://support.google.com/adsense/answer/13554116).
