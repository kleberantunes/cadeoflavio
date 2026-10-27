// Supplied cast metadata and deterministic crowd placement. Developed by AK Labs.
const pose=(id,label,height=1.04,lift=0,region=null)=>({id,label,height,lift,region,src:`./assets/cast/${id}.png`});
export const poses={
  standing:pose('standing','Flávio em pé'),
  chair:pose('chair','Flávio na cadeira de praia',.85),
  flag:pose('flag','Flávio com a bandeira americana',.95,.08,{x:.02,y:.24,w:.81,h:.76}),
  car:pose('car','Flávio dentro do carro',.9,0,{x:.43,y:.07,w:.35,h:.41}),
  celebrating:pose('celebrating','Flávio comemorando',.72,.30),
  pointing:pose('pointing','Flávio apontando',.74,.28),
  classic:pose('classic','Flávio de listras pretas e brancas'),
};
export const cast=Array.from({length:8},(_,i)=>pose(`cast-${`${i+1}`.padStart(2,'0')}`,`Coadjuvante ${i+1}`));
export const levelPoses=[['standing','celebrating','classic'],['chair','car','standing'],['pointing','standing'],['flag','celebrating']];
export function castForCrowd(people,target,levelIndex){
  const plan=new Map(),pool=people.filter(p=>p!==target&&Math.hypot(p.x-target.x,p.y-target.y)>target.height*2&&p.x>100&&p.x<2300&&p.y>650&&p.y<1480);
  for(let i=0;i<cast.length;i++){
    const offset=Math.floor((i+.5)*pool.length/cast.length);
    const person=pool[(offset+levelIndex*19)%pool.length];
    if(person)plan.set(person.id,cast[(i+levelIndex*2)%cast.length].id);
  }
  return plan;
}
export function spriteBox(person,asset){
  const h=person.height*asset.meta.height,w=h*asset.image.width/asset.image.height;
  return {x:person.x-w/2,y:person.y-person.height*asset.meta.lift-h,w,h};
}
export function inHitRegion(x,y,meta){
  if(x<0||x>1||y<0||y>1)return false;
  const r=meta.region;
  return !r||x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h;
}
const cache=new Map();
export function loadSprite(meta){
  if(!cache.has(meta.id))cache.set(meta.id,(async()=>{
    const image=new Image();image.src=meta.src;await image.decode();
    const mask=document.createElement('canvas');mask.width=image.width;mask.height=image.height;
    const c=mask.getContext('2d',{willReadFrequently:true});c.drawImage(image,0,0);
    return {meta,image,pixels:c.getImageData(0,0,image.width,image.height).data};
  })().catch(error=>{cache.delete(meta.id);throw error;}));
  return cache.get(meta.id);
}
export async function loadCast(){return Object.fromEntries(await Promise.all(cast.map(async meta=>[meta.id,await loadSprite(meta)])));}
export function hitSprite(x,y,box,asset){
  const u=(x-box.x)/box.w,v=(y-box.y)/box.h;
  if(!inHitRegion(u,v,asset.meta))return false;
  const sx=Math.min(asset.image.width-1,Math.floor(u*asset.image.width)),sy=Math.min(asset.image.height-1,Math.floor(v*asset.image.height));
  return asset.pixels[(sy*asset.image.width+sx)*4+3]>80;
}
