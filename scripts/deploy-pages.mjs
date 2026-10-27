// Publish prebuilt assets using the existing Cloudflare profile in memory.
// Developed by AK Labs. Never persists or prints credentials.
import {readFileSync,existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import os from 'node:os';

const root=path.resolve(import.meta.dirname,'..');
const env={...process.env,CLOUDFLARE_ACCOUNT_ID:'96b85a677fde1276ed151f86d4b55903'};
if(!env.CLOUDFLARE_API_TOKEN){
  // cf and Wrangler have separate profile stores. Refresh through cf first.
  const refresh=spawnSync('cf',['pages','list','--profile','aklabs'],{cwd:root,shell:process.platform==='win32',encoding:'utf8',windowsHide:true});
  if(refresh.status!==0){console.error('Autentique o perfil Cloudflare aklabs com cf auth create aklabs, ou configure CLOUDFLARE_API_TOKEN.');process.exit(1);}
  const candidates=[
    process.env.CF_PROFILE_FILE,
    process.env.XDG_CONFIG_HOME&&path.join(process.env.XDG_CONFIG_HOME,'cloudflare/config/aklabs.json'),
    process.env.APPDATA&&path.join(process.env.APPDATA,'xdg.config/cloudflare/config/aklabs.json'),
    path.join(os.homedir(),'.config/cloudflare/config/aklabs.json'),
  ].filter(Boolean);
  const file=candidates.find(p=>existsSync(p));
  if(!file){console.error('Perfil aklabs não localizado. Informe CF_PROFILE_FILE ou CLOUDFLARE_API_TOKEN no ambiente.');process.exit(1);}
  const profile=JSON.parse(readFileSync(file,'utf8'));
  if(!profile.oauth_token||Date.parse(profile.expiration_time)<=Date.now()){
    console.error('Perfil aklabs sem sessão válida. Autentique com cf auth create aklabs.');process.exit(1);
  }
  env.CLOUDFLARE_API_TOKEN=profile.oauth_token;
}
const result=spawnSync(process.execPath,[path.join(root,'node_modules/wrangler/bin/wrangler.js'),'pages','deploy','dist','--project-name','cadeoflavio','--branch','main'],{cwd:root,env,stdio:'inherit',windowsHide:true});
if(result.error)console.error('Não foi possível iniciar o Wrangler. Execute npm ci.');
process.exit(result.status??1);
