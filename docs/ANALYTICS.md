# Estatísticas de acesso

Developed by AK Labs · 27/10/2026

O site público `https://cadeoflavio.pages.dev` usa Cloudflare Web Analytics para medir visitas, visualizações de página, países de origem, referências, dispositivos, navegadores e desempenho de carregamento.

## Consultar

1. Entre na conta AKLabs no [Cloudflare Web Analytics](https://dash.cloudflare.com/96b85a677fde1276ed151f86d4b55903/web-analytics).
2. Selecione `cadeoflavio.pages.dev`.
3. Ajuste o período e consulte os totais de visitas/visualizações e a distribuição por país. Os filtros permitem comparar país, dispositivo, navegador e origem do tráfego.

Uma visita pode incluir várias visualizações. Esses números não representam uma contagem exata de pessoas únicas. A localização é por país, sem cidade, endereço ou GPS. Bloqueadores e JavaScript desativado podem impedir a medição. O painel depende do processamento do Cloudflare e não deve ser tratado como contador instantâneo.

A coleta inicia com esta ativação, sem histórico retroativo. Pontuação, aliados encontrados e recordes do jogo continuam locais, sem envio ao analytics.

## Configuração

- Serviço RUM criado para o hostname público, com `auto_install: false` para não ativar uma segunda injeção por zona.
- Integração nativa do Pages configurada em `build_config.web_analytics_tag` e `build_config.web_analytics_token`.
- Site tag: `ab2f8c7bcf274a1fad8bf1e3fc1da00a`.
- O Pages insere o beacon no HTML publicado a cada novo deployment; o HTML-fonte local não contém uma cópia manual.
- O identificador do beacon presente no HTML público não é uma credencial da API. Credenciais administrativas não são incluídas no site ou no Git.
- Cloudflare Web Analytics não usa cookies ou fingerprinting para esse acompanhamento.

Para conferir, abra o HTML publicado e procure uma única inclusão de `static.cloudflareinsights.com/beacon.min.js`, depois verifique o carregamento e o envio do beacon no navegador.

Referências: [integração Pages](https://developers.cloudflare.com/pages/how-to/web-analytics/), [métricas](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/), [dimensões](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/), [privacidade](https://developers.cloudflare.com/web-analytics/about/).
