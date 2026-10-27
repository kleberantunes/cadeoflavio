# Publicação — Cloudflare Pages e GitHub

Developed by AK Labs · 27/10/2026

- Site público: https://cadeoflavio.pages.dev
- Repositório privado: https://github.com/kleberantunes/cadeoflavio
- Cloudflare: conta AKLabs, projeto Pages `cadeoflavio`, branch de produção `main`.
- Configuração de publicação: `wrangler.jsonc`; saída estática `dist/`.

## Atualizar o jogo

```sh
npm ci
npm test
npm run deploy:pages
git push origin main
```

O comando de publicação reutiliza o perfil local `aklabs` do `cf`: atualiza a sessão e transmite a credencial ao subprocesso Wrangler somente em memória, sem gravá-la ou imprimi-la. Os dois CLIs possuem armazenamentos separados. Em outro computador, autentique `cf auth create aklabs`, informe `CF_PROFILE_FILE` quando o perfil estiver em um caminho diferente, ou configure `CLOUDFLARE_API_TOKEN` no ambiente. A conta de destino é explicitamente a AKLabs. Nenhuma credencial é armazenada neste repositório. O lockfile fixa as dependências usadas na publicação.

O projeto foi criado com `cf pages create --profile aklabs`. O `cf` instalado (1.0.0-beta.12) não implementa upload direto para o Pages clássico e orienta o uso do Wrangler. Por isso o projeto inclui a configuração Pages e uma dependência de desenvolvimento do Wrangler para upload dos arquivos compilados.

A tentativa de integração nativa GitHub → Pages retornou o erro Cloudflare 8000011 na instalação Git. A publicação atual é por upload direto. **Push no GitHub não publica o site automaticamente.** O repositório é a origem versionada do código, e `npm run deploy:pages` atualiza o site. Uma automação futura precisa de configuração própria e credenciais com escopo adequado.

A URL privada da primeira hospedagem Sites permanece separada; esta publicação Pages permite jogar sem login.
