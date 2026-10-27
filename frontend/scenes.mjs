// Original deterministic illustrated scenes. Developed by AK Labs.
export const W = 2400, H = 1600;
export const levels = [
  { name: 'Cadê no Rio?', place: 'Rio de Janeiro', country: 'BRASIL', slug: 'rio', color: '#e9ab64', count: 520, duration: 120, tag: 'Primeira parada', description: 'Entre lajes, música e muita gente, alguém resolveu se misturar.', stamp: 'RIO', seed: 23 },
  { name: 'Na casa do pai', place: 'Brasília', country: 'BRASIL', slug: 'brasilia', color: '#7fa17e', count: 620, duration: 135, tag: 'Olho nos detalhes', description: 'Um jardim cheio, uma reunião improvável e um convidado listrado.', stamp: 'BSB', seed: 78 },
  { name: 'Casa Rosada', place: 'Buenos Aires', country: 'ARGENTINA', slug: 'buenos-aires', color: '#d18d8c', count: 740, duration: 150, tag: 'Busca difícil', description: 'Bandeiras, cartazes e uma multidão. ¿Dónde está Flávio?', stamp: 'BUE', seed: 145 },
  { name: 'Férias em família', place: 'Orlando', country: 'ESTADOS UNIDOS', slug: 'orlando', color: '#8c90b4', count: 840, duration: 165, tag: 'Desafio final', description: 'A fila é enorme. O parque também. E ele está por aqui.', stamp: 'MCO', seed: 218 },
];
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export function makeCrowd(level) {
  const r = rng(level.seed), people = [];
  for (let i = 0; i < level.count; i++) {
    const y = 530 + r() * 1000, x = 45 + r() * 2310;
    people.push({ x, y, height: 77 + y / H * 53, skin: Math.floor(r() * 6), shirt: Math.floor(r() * 12), pose: Math.floor(r() * 6), hat: r() < .38, striped: r() < .19, seed: r(), id: i });
  }
  return people.sort((a,b) => a.y - b.y);
}
export function spawnCandidates(people) {
  // Replace a crowd member at a valid depth, with enough head room and no face occlusion.
  return people.filter(p => p.y > 700 && p.y < 1420 && p.x > 180 && p.x < 2220 && !people.some(q => q !== p && q.y > p.y && q.y < p.y + p.height * .55 && Math.abs(q.x - p.x) < p.height * .32)).filter((_, i) => i % 6 === 0).slice(0, 24);
}
function rect(c,x,y,w,h,color,stroke=true) { c.fillStyle=color; c.fillRect(x,y,w,h); if(stroke){c.strokeStyle='#51443d';c.lineWidth=2;c.strokeRect(x,y,w,h);} }
function path(c, points, fill, stroke='#51443d', width=2) { c.beginPath(); points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y)); c.closePath(); c.fillStyle=fill;c.fill();c.lineWidth=width;c.strokeStyle=stroke;c.stroke(); }
function circle(c,x,y,r,color,stroke=false) {c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=color;c.fill();if(stroke){c.strokeStyle='#51443d';c.lineWidth=1.5;c.stroke();}}
function text(c,t,x,y,size=18,color='#4b443a') {c.fillStyle=color;c.font=`700 ${size}px sans-serif`;c.fillText(t,x,y);}
function tree(c,x,y,s=1) {c.save();c.translate(x,y);c.scale(s,s);rect(c,-7,-90,14,95,'#9a7350');circle(c,0,-115,54,'#638365');circle(c,-28,-95,36,'#77916c');circle(c,28,-120,35,'#446c60');c.restore();}
function stall(c,x,y,color,label='') {rect(c,x,y,135,70,'#d9b789');rect(c,x-8,y-30,151,34,color);for(let i=0;i<7;i++)rect(c,x-8+i*22,y-30,10,34,'#fff4da',false);rect(c,x+7,y+5,121,12,'#6e5846');for(let i=0;i<9;i++)circle(c,x+15+i*13,y+24,5,['#dfb44e','#d87d5b','#92a364'][i%3]);if(label)text(c,label,x+9,y+57,12);}
function banner(c,x,y,w,label,color='#f2ce64'){rect(c,x,y,w,30,color);text(c,label,x+10,y+21,16);}
function architecture(c, level) {
  const r=rng(level.seed+10);
  const sky=c.createLinearGradient(0,0,0,650);sky.addColorStop(0,['#f5c18e','#d6e2cd','#cedfe4','#c7dce1'][levels.indexOf(level)]);sky.addColorStop(1,'#f9e5bd');rect(c,0,0,W,H,'#d6c9ac',false);rect(c,0,0,W,650,sky,false);
  for(let i=0;i<12;i++){c.globalAlpha=.45;circle(c,90+i*210,90+r()*160,40+r()*80,'#fff9e8');}c.globalAlpha=1;
  if(level.slug==='rio') {
    path(c,[[0,360],[160,140],[300,270],[470,100],[680,340],[900,170],[1140,430],[1550,290],[1850,130],[1980,330],[2200,130],[2400,390],[2400,730],[0,730]],'#789383');
    for(let row=0;row<3;row++)for(let i=0;i<15;i++){
      const x=i*171-35+(row%2)*70,y=260+row*115+r()*60,w=130+r()*65,h=110+r()*80;
      const col=['#d27f62','#e0bd80','#a1b4a0','#b88870','#e2ce99','#b89aaf'][Math.floor(r()*6)];
      rect(c,x,y,w,h,col);path(c,[[x-6,y],[x+w*.5,y-24],[x+w+8,y]],'#916f5e');
      for(let j=0;j<3;j++){rect(c,x+15+j*42,y+27,22,31,'#655e53');rect(c,x+17+j*42,y+29,9,27,'#a6b6af',false);}rect(c,x+60,y+h-47,26,47,'#736355');
    }
    for(let x=20;x<W;x+=290){c.strokeStyle='#5a5346';c.lineWidth=2;c.beginPath();c.moveTo(x,240);c.quadraticCurveTo(x+300,440,x+580,260);c.stroke();for(let j=0;j<9;j++)path(c,[[x+j*58,290+j*2],[x+j*58+12,307+j*2],[x+j*58+21,288+j*2]],['#e3b95c','#d07862','#9aa891'][j%3]);}
    banner(c,850,440,300,'BAILE DA COMUNIDADE');
  } else if(level.slug==='brasilia') {
    for(let i=0;i<20;i++)tree(c,i*140,450,.9+r()*.5);
    rect(c,450,240,1530,280,'#efebd7');rect(c,410,210,1600,30,'#f9f3df');
    for(let i=0;i<12;i++){rect(c,510+i*117,290,78,140,'#66878b');rect(c,510+i*117,290,4,140,'#d5d5c3',false);}for(let x=500;x<1980;x+=240){path(c,[[x,240],[x+28,240],[x-20,542],[x-40,542]],'#f9f3e1');}
    rect(c,480,500,1470,28,'#c1baa0');banner(c,1030,450,290,'BEM-VINDOS AO JARDIM','#dfce83');
    for(let i=0;i<7;i++)tree(c,70+i*375,630,.8);
    rect(c,1600,605,420,170,'#91b6ac');rect(c,1615,620,390,140,'#acd0c5');
  } else if(level.slug==='buenos-aires') {
    rect(c,300,260,1800,270,'#d69488');rect(c,260,230,1880,30,'#edb5a3');rect(c,920,170,560,360,'#e4a295');rect(c,910,155,580,25,'#efc6af');
    for(let i=0;i<21;i++){const x=340+i*81;rect(c,x,320,43,90,'#735d60');circle(c,x+21,320,21,'#735d60');rect(c,x-5,430,54,14,'#e8b49d');rect(c,x,465,42,56,'#9b716a');}rect(c,1150,385,100,145,'#795e5c');
    text(c,'CASA ROSADA',1080,220,28,'#8f5e5b');
    rect(c,1197,30,5,130,'#746658');rect(c,1203,38,140,70,'#86bdcc');rect(c,1203,61,140,23,'#fff8e5');circle(c,1270,72,7,'#d6b35c');
    for(let i=0;i<6;i++){tree(c,i*125,570,.9);tree(c,1850+i*125,570,.9);}
    path(c,[[120,700],[400,1500],[600,1600],[330,700]],'#c0b29a');
  } else {
    for(let i=0;i<8;i++){const x=180+i*290,y=310+r()*90;rect(c,x,y,170,160,['#dda78b','#a4b9aa','#bc9fb0'][i%3]);path(c,[[x-15,y],[x+85,y-92],[x+185,y]],'#aa7a75');}
    rect(c,940,270,520,290,'#d7bdc5');for(let i=0;i<5;i++){const x=900+i*135;rect(c,x,200,90,340,'#e7c7cc');path(c,[[x-12,200],[x+45,95-(i%2)*55],[x+102,200]],'#8b8ea7');rect(c,x+35,248,20,60,'#8b7b86');}
    rect(c,1160,430,85,130,'#7c6a7d');banner(c,1010,565,390,'PARQUE DOS SONHOS','#f3d482');
    c.strokeStyle='#c0817d';c.lineWidth=8;c.beginPath();c.moveTo(20,370);c.bezierCurveTo(300,-50,570,100,660,400);c.bezierCurveTo(760,650,800,200,1030,340);c.stroke();
    for(let i=0;i<8;i++){rect(c,48+i*90,350,7,200,'#a49e99');}for(let i=0;i<8;i++)tree(c,120+i*320,630,.75);
  }
  // Textured paving and little everyday stories throughout the searchable area.
  for(let i=0;i<1700;i++){const x=r()*W,y=540+r()*1060;c.globalAlpha=.13;rect(c,x,y,8+r()*23,2,'#756650',false);}c.globalAlpha=1;
  for(let j=0;j<4;j++){const y=770+j*230;c.strokeStyle='#e4d9be';c.lineWidth=4;c.beginPath();c.moveTo(0,y);c.bezierCurveTo(700,y-130,1600,y+100,2400,y-40);c.stroke();}
  const labels=level.slug==='buenos-aires'?['EMPANADAS','MATE','FLORES','CAFÉ']:level.slug==='orlando'?['POPCORN','LEMBRANÇAS','GELATO','TICKETS']:['PASTEL','CALDO DE CANA','CAFÉ','SORVETES'];
  for(let i=0;i<10;i++)stall(c,65+(i%5)*490+(i>4?140:0),690+Math.floor(i/5)*580,['#c77864','#7f9c89','#ccad62','#8399a7'][i%4],labels[i%4]);
  for(let i=0;i<12;i++){const x=100+r()*2200,y=780+r()*700;circle(c,x,y,38,'#f4e5c0',true);circle(c,x,y,29,'#d6bd8e');for(let j=0;j<3;j++)circle(c,x-16+j*16,y-3,6,'#f5f0d6');}
  for(let i=0;i<8;i++){const x=40+i*330,y=900+(i%3)*230;rect(c,x,y,70,10,'#987759');rect(c,x+6,y-5,4,25,'#655b48');rect(c,x+60,y-5,4,25,'#655b48');}
}
const skins=['#edc198','#ce966f','#a97050','#795140','#f2ceb0','#b8805e'];
const clothes=['#cc745e','#7b95a6','#e2b85d','#f0e5c4','#53696c','#a5889b','#80a187','#c68b65','#404c53','#c9c7aa','#ae6060','#668a9b'];
function person(c,p) {
  c.save();c.translate(p.x,p.y);const h=p.height,s=h/80;c.scale(s,s);c.lineCap='round';c.lineJoin='round';
  c.fillStyle='#625a4633';c.beginPath();c.ellipse(1,1,17,4,0,0,Math.PI*2);c.fill();
  const skin=skins[p.skin],shirt=clothes[p.shirt],dark='#50463d',leg=p.seed<.4?'#526f80':'#655c57';
  c.strokeStyle=dark;c.lineWidth=2;
  path(c,[[-12,-37],[-2,-37],[-3,-4],[-13,-4]],leg,dark);path(c,[[1,-37],[11,-37],[14,-4],[4,-4]],leg,dark);
  rect(c,-15,-4,13,5,'#514b45');rect(c,3,-4,15,5,'#514b45');
  path(c,[[-11,-62],[10,-62],[16,-36],[-16,-36]],shirt,dark);
  if(p.striped){c.save();c.beginPath();c.moveTo(-11,-62);c.lineTo(10,-62);c.lineTo(16,-36);c.lineTo(-16,-36);c.clip();for(let j=0;j<5;j++)rect(c,-18,-61+j*6,36,3,p.seed>.5?'#f5e8d0':'#484744',false);c.restore();}
  c.strokeStyle=skin;c.lineWidth=7;c.beginPath();c.moveTo(-12,-59);c.lineTo(-20,p.pose===0?-77:-36);c.moveTo(12,-59);c.lineTo(p.pose===1?24:21,p.pose===1?-78:-40);c.stroke();
  if(p.pose===3){rect(c,12,-55,14,18,'#8b6e4f');rect(c,13,-54,12,5,'#c1a777');}
  if(p.pose===4){c.strokeStyle='#6a5f4b';c.lineWidth=2;c.beginPath();c.moveTo(23,-35);c.lineTo(23,-105);c.stroke();rect(c,23,-105,34,22,p.skin%2?'#e4c671':'#94b9bf');rect(c,23,-98,34,7,'#f6eed9',false);}
  circle(c,0,-70,10,skin,true);c.fillStyle=dark;c.beginPath();c.ellipse(0,-76,10,5,0,Math.PI,Math.PI*2);c.fill();
  circle(c,3,-71,1.2,dark);c.strokeStyle='#8a5a49';c.lineWidth=1;c.beginPath();c.moveTo(1,-66);c.lineTo(5,-66);c.stroke();
  if(p.hat){rect(c,-12,-83,25,6,p.striped?'#eee7d6':shirt);rect(c,-7,-88,16,7,p.striped?'#56534c':shirt);}
  if(p.pose===5){circle(c,20,-94,13,['#d59186','#d6b45f','#7c9e9d'][p.skin%3],true);c.strokeStyle='#87755d';c.lineWidth=1;c.beginPath();c.moveTo(20,-80);c.lineTo(19,-41);c.stroke();}
  if(p.seed<.15){rect(c,-7,-72,6,4,'#4f4d48');rect(c,2,-72,6,4,'#4f4d48');}
  c.restore();
}
export function renderWorld(level, people, target, sprite, resolution=1.71) {
  const canvas=document.createElement('canvas');canvas.width=Math.round(W*resolution);canvas.height=Math.round(H*resolution);
  const c=canvas.getContext('2d');c.scale(resolution,resolution);architecture(c,level);
  let box;
  for(const p of people){
    if(p===target){const h=p.height*1.04,w=h*sprite.width/sprite.height;box={x:p.x-w/2,y:p.y-h,w,h};c.drawImage(sprite,box.x,box.y,w,h);} else person(c,p);
  }
  return {canvas, box};
}
