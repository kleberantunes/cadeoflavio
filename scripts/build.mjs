import { mkdir, cp, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import {poses,cast} from '../frontend/cast.mjs';
const root=path.resolve(import.meta.dirname,'..'),out=path.join(root,'dist');
await mkdir(path.join(out,'assets'),{recursive:true});
for(const name of await readdir(path.join(root,'frontend'))) await cp(path.join(root,'frontend',name),path.join(out,name),{recursive:true});
await cp(path.join(root,'assets','web'),path.join(out,'assets'),{recursive:true});
const sprite=await stat(path.join(out,'assets','flavio.png'));
if(sprite.size<1000)throw new Error('Missing target sprite');
const crowd=await stat(path.join(out,'assets','crowd','people-v3.webp'));
if(crowd.size<10000)throw new Error('Missing detailed NPC artwork');
for(const meta of [...Object.values(poses),...cast]){
  const file=await stat(path.join(out,'assets','cast',`${meta.id}.png`));
  if(file.size<1000)throw new Error(`Missing supplied cast sprite: ${meta.id}`);
}
console.log('Built static web game in dist/ — Developed by AK Labs');
