// Balanced spatial draws and short search history. Developed by AK Labs.
export function searchRegion(p){
  const col=Math.max(0,Math.min(3,Math.floor((p.x-120)/540)));
  const row=Math.max(0,Math.min(2,Math.floor((p.y-620)/(860/3))));
  return row*4+col;
}

export function chooseSearchSpawn(candidates,history=[],random=Math.random){
  if(!candidates.length)return null;
  const previous=history.at(-1);
  const distant=previous?candidates.filter(p=>Math.hypot(p.x-previous.x,p.y-previous.y)>=420):candidates;
  const pool=distant.length?distant:candidates,regions=new Map();
  for(const person of pool){
    const region=searchRegion(person);
    if(!regions.has(region))regions.set(region,[]);
    regions.get(region).push(person);
  }
  const recent=history.slice(-6).map(searchRegion),available=[...regions.keys()];
  const fresh=available.filter(region=>!recent.includes(region));
  // With a small or unusual scene, fall back to the least recently used region.
  const oldest=Math.min(...available.map(region=>recent.lastIndexOf(region)));
  const choices=fresh.length?fresh:available.filter(region=>recent.lastIndexOf(region)===oldest);
  const pick=list=>list[Math.min(list.length-1,Math.max(0,Math.floor(random()*list.length)))];
  return pick(regions.get(pick(choices)));
}
