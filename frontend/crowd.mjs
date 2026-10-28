// Detailed generic NPC artwork; supplied identities stay in cast.mjs.
// Developed by AK Labs.
import {NPC_ATLAS,NPC_FRAMES} from './npc-data.mjs';
import {REGIONAL_ATLASES} from './regional-npc-data.mjs';
const regionFor=index=>['rio','brasilia','buenos-aires','orlando'][index]||'rio';

export function planCrowdSprites(people,levelIndex){
  const region=regionFor(levelIndex),regional=REGIONAL_ATLASES[region].frames;
  const plan=new Map(),placed=[];
  for(const p of people){
    const themed=(p.seed<.7?regional:NPC_FRAMES).filter(f=>f.striped===p.striped);
    const other=[...regional,...NPC_FRAMES].filter(f=>f.striped===p.striped&&!themed.includes(f));
    const pool=[...themed,...other];
    let hash=Math.imul(p.id+1+levelIndex*997+(Math.floor(p.seed*0x7fffffff)),0x45d9f3b);
    hash=Math.imul(hash^(hash>>>16),0x45d9f3b);
    const first=((hash^(hash>>>16))>>>0)%Math.max(1,themed.length);
    let frame=pool[first];
    for(let offset=0;offset<pool.length;offset++){
      const candidate=pool[(first+offset)%pool.length];
      const duplicate=placed.some(q=>q.frame.id===candidate.id&&Math.abs(q.y-p.y)<p.height*.8&&Math.hypot(q.x-p.x,q.y-p.y)<p.height*1.15);
      if(!duplicate){frame=candidate;break;}
    }
    const item={frame,mirror:p.seed<.38};
    plan.set(p.id,item);placed.push({x:p.x,y:p.y,frame});
    // Depth-sorted people only need a short, recent-neighbor window.
    while(placed.length>0&&placed[0].y<p.y-p.height)placed.shift();
  }
  return plan;
}
const sheets=new Map();
function loadAtlas(src){
  if(!sheets.has(src))sheets.set(src,(async()=>{
    const image=new Image();image.src=src;await image.decode();
    const mask=document.createElement('canvas');mask.width=image.width;mask.height=image.height;
    const c=mask.getContext('2d',{willReadFrequently:true});c.drawImage(image,0,0);
    const pixels=c.getImageData(0,0,image.width,image.height).data,alpha=new Uint8Array(image.width*image.height);
    for(let i=0;i<alpha.length;i++)alpha[i]=pixels[i*4+3];
    mask.width=0;mask.height=0;
    return {image,alpha,width:image.width};
  })().catch(error=>{sheets.delete(src);throw error;}));
  return sheets.get(src);
}
export async function loadCrowdArtwork(levelIndex=0){
  const [base,regional]=await Promise.all([loadAtlas(NPC_ATLAS),loadAtlas(REGIONAL_ATLASES[regionFor(levelIndex)].src)]);
  return {base,regional};
}
export const artworkForFrame=(frame,artwork)=>frame.atlas?artwork.regional:artwork.base;
export function crowdPersonBox(p,item){
  const f=item.frame,h=p.height*1.04*f.heightScale,w=h*f.w/f.h;
  return {x:p.x-w/2,y:p.y-h,w,h};
}
export function drawCrowdPerson(c,p,item,artwork){
  const f=item.frame,{w,h}=crowdPersonBox(p,item),sheet=artworkForFrame(f,artwork);
  c.fillStyle='#4c382b30';c.beginPath();c.ellipse(p.x,p.y+1,Math.min(w*.34,p.height*.28),p.height*.04,0,0,Math.PI*2);c.fill();
  c.save();c.translate(p.x,p.y);if(item.mirror)c.scale(-1,1);
  c.drawImage(sheet.image,f.x,f.y,f.w,f.h,-w/2,-h,w,h);c.restore();
}
