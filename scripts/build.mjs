import { mkdir, cp, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),out=path.join(root,'dist');
await mkdir(path.join(out,'assets'),{recursive:true});
for(const name of await readdir(path.join(root,'frontend'))) await cp(path.join(root,'frontend',name),path.join(out,name),{recursive:true});
await cp(path.join(root,'assets','web'),path.join(out,'assets'),{recursive:true});
const sprite=await stat(path.join(out,'assets','flavio.png'));
if(sprite.size<1000)throw new Error('Missing target sprite');
console.log('Built static web game in dist/ — Developed by AK Labs');
