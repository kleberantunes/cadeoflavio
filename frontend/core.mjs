// Game rules and coordinate transforms. Developed by AK Labs.
export const ALLY_POINTS=250;
export const ALLY_TIME_SECONDS=15;
export const scoreLevel = (seconds, errors, hints, allies=0) => Math.max(0, 1000 + Math.floor(seconds) * 10 - errors * 25 - hints * 150 + Math.min(8,Math.max(0,Math.floor(allies)))*ALLY_POINTS);
export function claimAlly(found,id,availableIds,untimed=false){
  if(!availableIds.includes(id)||found.includes(id))return {found,added:0,secondsAdded:0};
  return {found:[...found,id],added:ALLY_POINTS,secondsAdded:untimed?0:ALLY_TIME_SECONDS};
}
export const starsFor = (seconds, duration, hints) => hints > 1 ? 1 : hints === 0 && seconds > duration / 2 ? 3 : 2;
export const penalize = seconds => Math.max(0, seconds - 3);
export const screenToWorld = (x, y, camera) => ({ x: (x - camera.x) / camera.scale, y: (y - camera.y) / camera.scale });
export function clampCamera(c, vw, vh, ww, wh) {
  const w = ww * c.scale, h = wh * c.scale;
  return { ...c, x: w <= vw ? (vw - w) / 2 : Math.max(vw - w, Math.min(0, c.x)), y: h <= vh ? (vh - h) / 2 : Math.max(vh - h, Math.min(0, c.y)) };
}
export function chooseSpawn(count, previous = -1, random = Math.random) {
  const candidates = Array.from({ length: count }, (_, i) => i).filter(i => i !== previous);
  return candidates.length ? candidates[Math.min(candidates.length - 1, Math.floor(random() * candidates.length))] : 0;
}
export function safeProgress(input) {
  const output = {};
  if (!input || typeof input !== 'object') return output;
  for (const [key, value] of Object.entries(input)) {
    if (!/^[0-3]$/.test(key) || !value || !Number.isInteger(value.score) || value.score < 0 || value.score > 10000 || !Number.isInteger(value.stars) || value.stars < 1 || value.stars > 3 || !Number.isFinite(value.seconds) || value.seconds < 0 || value.seconds > 86400) continue;
    output[key] = { score: value.score, stars: value.stars, seconds: value.seconds };
    if(Number.isInteger(value.allies)&&value.allies>=0&&value.allies<=8)output[key].allies=value.allies;
  }
  return output;
}
