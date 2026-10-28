import { mkdir, cp, readdir, stat, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import {poses,cast} from '../frontend/cast.mjs';
import adsConfig from '../frontend/ads-config.mjs';
import {REGIONAL_ATLASES} from '../frontend/regional-npc-data.mjs';
const root=path.resolve(import.meta.dirname,'..'),out=path.join(root,'dist');
await mkdir(path.join(out,'assets'),{recursive:true});
if(adsConfig.enabled&&!adsConfig.publisherId)throw new Error('Configure an approved AdSense publisher before enabling ads');
if(adsConfig.publisherId){
  if(!/^ca-pub-\d{16}$/.test(adsConfig.publisherId))throw new Error('Invalid AdSense publisher ID');
  await writeFile(path.join(out,'ads.txt'),`google.com, ${adsConfig.publisherId.slice(3)}, DIRECT, f08c47fec0942fa0\n`);
}else await rm(path.join(out,'ads.txt'),{force:true});
for(const name of await readdir(path.join(root,'frontend'))) await cp(path.join(root,'frontend',name),path.join(out,name),{recursive:true});
const indexPath=path.join(out,'index.html'),index=await readFile(indexPath,'utf8');
if(!index.includes('<!-- ADSENSE_ACCOUNT -->'))throw new Error('Missing AdSense account markup placeholder');
const accountMarkup=adsConfig.publisherId?`<meta name="google-adsense-account" content="${adsConfig.publisherId}">\n<script id="google-adsense" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.publisherId}" crossorigin="anonymous" data-ad-client="${adsConfig.publisherId}" data-ad-frequency-hint="120s"></script>`:'';
await writeFile(indexPath,index.replace('<!-- ADSENSE_ACCOUNT -->',accountMarkup));
await cp(path.join(root,'assets','web'),path.join(out,'assets'),{recursive:true});
const sprite=await stat(path.join(out,'assets','flavio.png'));
if(sprite.size<1000)throw new Error('Missing target sprite');
const crowd=await stat(path.join(out,'assets','crowd','people-v3.webp'));
if(crowd.size<10000)throw new Error('Missing detailed NPC artwork');
for(const atlas of Object.values(REGIONAL_ATLASES)){
  const file=await stat(path.join(out,atlas.src));
  if(file.size<10000||atlas.frames.length<12)throw new Error('Missing regional NPC artwork');
}
for(const meta of [...Object.values(poses),...cast]){
  const file=await stat(path.join(out,'assets','cast',`${meta.id}.png`));
  if(file.size<1000)throw new Error(`Missing supplied cast sprite: ${meta.id}`);
}
console.log('Built static web game in dist/ — Developed by AK Labs');
