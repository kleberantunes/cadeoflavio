// Resolve front-to-back visible character pixels. Developed by AK Labs.
import {inHitRegion} from './cast.mjs';
const inside=(x,y,b)=>x>=b.x&&y>=b.y&&x<=b.x+b.w&&y<=b.y+b.h;
export function pickSceneHit(x,y,layers){
  for(let i=layers.length-1;i>=0;i--){
    const layer=layers[i],b=layer.box;
    if(layer.occluder&&inside(x,y,layer.occluder))return {type:'miss'};
    if(!inside(x,y,b))continue;
    const u=(x-b.x)/b.w,v=(y-b.y)/b.h;
    if(layer.type==='npc'){
      const f=layer.frame;
      const sx=f.x+Math.min(f.w-1,Math.floor((layer.mirror?1-u:u)*f.w));
      const sy=f.y+Math.min(f.h-1,Math.floor(v*f.h));
      if(layer.artwork.alpha[sy*layer.artwork.width+sx]>80)return {type:'miss'};
      continue;
    }
    const asset=layer.asset;
    const sx=Math.min(asset.image.width-1,Math.floor(u*asset.image.width)),sy=Math.min(asset.image.height-1,Math.floor(v*asset.image.height));
    if(asset.pixels[(sy*asset.image.width+sx)*4+3]<=80)continue;
    if(!inHitRegion(u,v,asset.meta))return {type:'miss'};
    return {type:layer.type,id:layer.id,box:b};
  }
  return {type:'miss'};
}
