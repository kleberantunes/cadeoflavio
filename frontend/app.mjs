import { scoreLevel, starsFor, screenToWorld, clampCamera, chooseSpawn, penalize, safeProgress } from './core.mjs';
import { levels, makeCrowd, spawnCandidates, renderWorld, W, H } from './scenes.mjs';
import { poses, levelPoses, loadSprite, loadCast, hitSprite } from './cast.mjs';

const $=s=>document.querySelector(s), app=$('#app'), dialog=$('#dialog');
let progress={}, sound=false, untimed=false, audio, game=null, home=true, loadTicket=0;
try { progress=safeProgress(JSON.parse(localStorage.getItem('ak-flavio-v1')||'{}')); } catch {}
const fmt=n=>new Intl.NumberFormat('pt-BR').format(n);
const clock=n=>`${Math.floor(Math.max(0,n)/60)}`.padStart(2,'0')+':'+`${Math.floor(Math.max(0,n)%60)}`.padStart(2,'0');
const stars=n=>'★'.repeat(n)+'☆'.repeat(3-n);
const total=()=>Object.values(progress).reduce((n,v)=>n+v.score,0);
let toastTimeout;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>$('#toast').classList.remove('show'),2700);}
function beep(success=false){if(!sound)return;try{audio??=new AudioContext();audio.resume();const o=audio.createOscillator(),gain=audio.createGain();o.connect(gain);gain.connect(audio.destination);o.frequency.setValueAtTime(success?660:180,audio.currentTime);o.frequency.exponentialRampToValueAtTime(success?1100:120,audio.currentTime+.17);gain.gain.setValueAtTime(.065,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.25);o.start();o.stop(audio.currentTime+.26);}catch{}}
function modal(content){dialog.innerHTML=content;dialog.showModal();}
function save(){try{localStorage.setItem('ak-flavio-v1',JSON.stringify(progress));}catch{toast('O navegador não permitiu salvar o progresso.');}}
function renderHome(){
  ++loadTicket;home=true;if(game)game.active=false;game=null;document.body.classList.remove('playing');
  const complete=Object.keys(progress).length;
  app.innerHTML=`<section class="hero"><div class="hero-copy"><div class="eyebrow"><span class="live-dot"></span> BUSCA VISUAL · SÁTIRA · UM POUCO DE CAOS</div><h1>Todo mundo por aí.<br><span>Cadê o <em>Flávio?</em></span></h1><p>Quatro destinos. Centenas de distrações.<br>Um sujeito listrado tentando passar despercebido.<br>Seu trabalho? Encontrar.</p><div class="hero-actions"><button class="primary" id="play">Bora procurar <span>↗</span></button><span class="no-account">Sem cadastro.<br>Só precisa de um bom olho.</span></div><div class="travel-line"><span>RIO</span><i>········</i><span>BSB</span><i>········</i><span>BUE</span><i>········</i><span>MCO</span><b>✈</b></div></div><div class="hero-art"><div class="postcard"><img src="./assets/rio.webp" alt="Referência ilustrada de uma comunidade carioca em festa"><span class="postcard-label">PRÓXIMA PARADA: RIO DE JANEIRO</span><span class="postcard-note">Tem alguém<br>fora do lugar…</span></div><div class="wanted"><span>PROCURA-SE</span><img src="./assets/cast/standing.png" alt="Flávio de camiseta e gorro listrados"><b>Achou esse aqui?</b><small>Então você entendeu o jogo.</small></div><div class="stamp">BUSCA<br><b>EM ABERTO</b><br>AK LABS · 2026</div></div></section>
  <section class="destinations" aria-labelledby="destinations-title"><div class="section-top"><div><div class="eyebrow">ESCOLHA SUA PRÓXIMA PARADA</div><h2 id="destinations-title">Um roteiro nada discreto<span class="red">.</span></h2></div><div class="progress-summary"><strong>${complete}<span>/4</span></strong><span>destinos encontrados<br><b>${fmt(total())} pontos no passaporte</b></span></div></div><div class="level-grid">${levels.map((l,i)=>`<button class="level-card" data-level="${i}" aria-label="Jogar fase ${i+1}: ${l.name}"><div class="card-art"><img src="./assets/${l.slug}.webp" alt="Referência visual de ${l.place}"><span class="card-number">0${i+1}</span>${progress[i]?`<span class="card-done">${stars(progress[i].stars)}</span>`:''}<span class="card-arrow">↗</span></div><div class="card-content"><div class="card-country">${l.country}<span>${i<2?'●●○':'●●●'}</span></div><h3>${l.name}</h3><p>${l.description}</p><div class="card-meta"><span>⌖ ${l.place}</span><span>${l.tag}</span></div></div></button>`).join('')}</div></section>
  <section class="bottom-strip"><span class="strip-icon">◎</span><div><b>A pressa é inimiga da observação.</b><p>Amplie, arraste e desconfie de toda camiseta listrada.</p></div><label class="switch-label"><input type="checkbox" id="untimed" ${untimed?'checked':''}><span class="switch"></span>Jogar sem cronômetro</label></section>`;
  $('#play').onclick=()=>start(levels.findIndex((_,i)=>!progress[i])<0?0:levels.findIndex((_,i)=>!progress[i]));
  document.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>start(Number(b.dataset.level)));
  $('#untimed').onchange=e=>{untimed=e.target.checked;};
}

async function start(index,previous=-1,previousPose=null){
  const ticket=++loadTicket;home=false;if(game)game.active=false;dialog.close();document.body.classList.add('playing');
  app.innerHTML='<div class="loading"><span class="brand-eye">◉◉</span><p>Espalhando a multidão…</p></div>';
  const posePool=levelPoses[index],poseId=posePool[chooseSpawn(posePool.length,posePool.indexOf(previousPose))];
  let asset,castAssets;
  try{[asset,castAssets]=await Promise.all([loadSprite(poses[poseId]),loadCast()]);}catch{if(ticket===loadTicket){renderHome();toast('Não foi possível carregar os personagens. Tente novamente.');}return;}
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  if(ticket!==loadTicket)return;
  const l=levels[index],people=makeCrowd(l),candidates=spawnCandidates(people),spawn=chooseSpawn(candidates.length,previous);
  if(!candidates.length){renderHome();toast('Não foi possível preparar esta fase.');return;}
  const target=candidates[spawn],world=renderWorld(l,people,target,asset,castAssets);
  game={index,l,people,target,spawn,world,asset,seconds:l.duration,elapsed:0,errors:0,hints:0,active:true,paused:false,found:false,camera:{x:0,y:0,scale:1},hintUntil:0,miss:null,last:performance.now(),untimed};
  app.innerHTML=`<section class="game-shell"><div class="game-heading"><button class="back quiet" id="back">← Destinos</button><div><span class="eyebrow">DESTINO 0${index+1} / 04 · ${l.place.toUpperCase()}</span><h1>${l.name}<span class="red">.</span></h1></div><div class="game-progress">${levels.map((_,i)=>`<span class="${i===index?'current':progress[i]?'done':''}">${progress[i]?'✓':i+1}</span>`).join('<i></i>')}</div></div>
  <div class="hud"><div class="target-preview"><img src="${asset.meta.src}" alt="${asset.meta.label}"><div><small>SEU ALVO</small><b>${asset.meta.label}</b></div></div><div class="stat"><small>${untimed?'MODO LIVRE':'TEMPO RESTANTE'}</small><b id="timer">${untimed?'Sem pressa':clock(l.duration)}</b></div><div class="stat"><small>PONTOS NESTA BUSCA</small><b id="points">0</b></div><div class="hud-actions"><button id="hint" class="hint-button">◉ Dica <small>−150 pts</small></button><button id="pause" class="icon-button" aria-label="Pausar jogo">Ⅱ</button><button id="restart" class="icon-button" aria-label="Reiniciar fase">↻</button></div></div>
  <div class="scene-wrap" id="scene-wrap"><canvas id="scene" tabindex="0" role="application" aria-label="Cena de busca. Arraste para explorar. Use as setas para mover, mais e menos para ampliar, espaço para pausar. No teclado, o alvo é o centro da mira; pressione Enter para procurar ali."></canvas><div class="scene-caption"><span class="live-dot"></span> ${l.count} PESSOAS. UM FLÁVIO.</div><div class="zoom-controls"><button id="zoom-out" aria-label="Diminuir zoom">−</button><button id="reset-view" aria-label="Ver cena inteira">⌖</button><span id="zoom-label">100%</span><button id="zoom-in" aria-label="Aumentar zoom">+</button></div><div class="scene-instruction" id="scene-instruction">Arraste para explorar <span>·</span> Amplie para ver os detalhes</div></div><div class="game-footnote"><span>☞ Toque no personagem quando encontrá-lo. Um clique errado custa 3 segundos.</span><span>Setas: mover · +/−: zoom · Espaço: pausa</span></div></section>`;
  $('#back').onclick=renderHome;$('#hint').onclick=hint;$('#pause').onclick=pause;$('#restart').onclick=restart;
  setupCanvas();$('#zoom-in').onclick=()=>zoom(1.35);$('#zoom-out').onclick=()=>zoom(1/1.35);$('#reset-view').onclick=fit;
  fit();game.last=performance.now();$('#scene').focus({preventScroll:true});
}

function restart(){if(!game)return;const {index,spawn,asset}=game;start(index,spawn,asset.meta.id);}
let viewport={w:0,h:0},resizeObserver;
function fit(){if(!game)return;const s=Math.min(viewport.w/W,viewport.h/H);game.minScale=s;game.camera=clampCamera({scale:s,x:0,y:0},viewport.w,viewport.h,W,H);draw();}
function zoom(factor,cx=viewport.w/2,cy=viewport.h/2){if(!game||game.paused||game.found)return;const c=game.camera,p=screenToWorld(cx,cy,c),scale=Math.max(game.minScale,Math.min(game.minScale*6,c.scale*factor));game.camera=clampCamera({scale,x:cx-p.x*scale,y:cy-p.y*scale},viewport.w,viewport.h,W,H);draw();}
function draw(){
  if(!game||home||!$('#scene'))return;const canvas=$('#scene'),c=canvas.getContext('2d'),dpr=Math.min(devicePixelRatio||1,2),g=game;
  c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,viewport.w,viewport.h);c.fillStyle='#e1d9c6';c.fillRect(0,0,viewport.w,viewport.h);c.save();c.translate(g.camera.x,g.camera.y);c.scale(g.camera.scale,g.camera.scale);c.drawImage(g.world.canvas,0,0,W,H);
  if(g.hintUntil>performance.now()){
    const b=g.world.box;const hx=Math.floor((b.x+b.w/2)/360)*360+180,hy=Math.floor((b.y+b.h/2)/300)*300+150;
    c.fillStyle='#f7d34c30';c.strokeStyle='#fff7c7';c.lineWidth=5/g.camera.scale;c.setLineDash([10/g.camera.scale,8/g.camera.scale]);c.beginPath();c.ellipse(hx,hy,240,210,0,0,Math.PI*2);c.fill();c.stroke();c.setLineDash([]);
  }
  if(g.found){const b=g.world.box;c.strokeStyle='#fcf5b2';c.lineWidth=5/g.camera.scale;c.beginPath();c.arc(b.x+b.w/2,b.y+b.h/2,b.h*.8,0,2*Math.PI);c.stroke();}
  c.restore();
  if(g.keyboard){c.strokeStyle='#222a24';c.lineWidth=2;c.beginPath();c.moveTo(viewport.w/2-12,viewport.h/2);c.lineTo(viewport.w/2+12,viewport.h/2);c.moveTo(viewport.w/2,viewport.h/2-12);c.lineTo(viewport.w/2,viewport.h/2+12);c.stroke();}
  if(g.miss&&performance.now()-g.miss.time<600){c.fillStyle='#a1392b';c.font='bold 18px sans-serif';c.fillText('−3s',g.miss.x+8,g.miss.y-8);}
  $('#zoom-label').textContent=`${Math.round(g.camera.scale/g.minScale*100)}%`;
}
function setupCanvas(){
  const canvas=$('#scene');resizeObserver?.disconnect();resizeObserver=new ResizeObserver(()=>{if(!game||home)return;const bounds=canvas.getBoundingClientRect();viewport={w:bounds.width,h:bounds.height};const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(bounds.width*dpr);canvas.height=Math.round(bounds.height*dpr);fit();});resizeObserver.observe(canvas);
  const bounds=canvas.getBoundingClientRect();viewport={w:bounds.width,h:bounds.height};canvas.width=Math.round(bounds.width*Math.min(devicePixelRatio||1,2));canvas.height=Math.round(bounds.height*Math.min(devicePixelRatio||1,2));
  const pointers=new Map();let gesture=null,multi=false;
  const point=e=>{const b=canvas.getBoundingClientRect();return{x:e.clientX-b.left,y:e.clientY-b.top};};
  canvas.onpointerdown=e=>{if(!game?.active||game.paused||game.found||e.button>0)return;canvas.setPointerCapture(e.pointerId);const p=point(e);pointers.set(e.pointerId,p);if(pointers.size===1){gesture={start:p,prev:p,moved:false};multi=false;}else{multi=true;gesture.moved=true;}game.keyboard=false;};
  canvas.onpointermove=e=>{
    if(!pointers.has(e.pointerId)||!game?.active||game.paused)return;
    const p=point(e),old=pointers.get(e.pointerId);
    if(pointers.size===2){const other=[...pointers.entries()].find(([id])=>id!==e.pointerId)[1];const before=Math.hypot(old.x-other.x,old.y-other.y),after=Math.hypot(p.x-other.x,p.y-other.y);if(before>2)zoom(after/before,(p.x+other.x)/2,(p.y+other.y)/2);}
    else {if(Math.hypot(p.x-gesture.start.x,p.y-gesture.start.y)>7)gesture.moved=true;if(gesture.moved){game.camera=clampCamera({...game.camera,x:game.camera.x+p.x-old.x,y:game.camera.y+p.y-old.y},viewport.w,viewport.h,W,H);draw();}}
    pointers.set(e.pointerId,p);
  };
  canvas.onpointerup=e=>{if(!pointers.has(e.pointerId))return;const p=point(e);if(gesture&&!gesture.moved&&!multi)attempt(p.x,p.y);pointers.delete(e.pointerId);if(!pointers.size)gesture=null;};
  const cancel=e=>{pointers.delete(e.pointerId);if(!pointers.size)gesture=null;multi=true;};canvas.onpointercancel=cancel;canvas.onlostpointercapture=cancel;
  canvas.addEventListener('wheel',e=>{e.preventDefault();const p=point(e);zoom(Math.exp(-e.deltaY*.0015),p.x,p.y);},{passive:false});
  canvas.onkeydown=e=>{if(!game?.active)return;if([' ','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Enter'].includes(e.key))e.preventDefault();if(e.key===' '){pause();return;}if(game.paused)return;if(e.key==='+'||e.key==='=')zoom(1.25);else if(e.key==='-')zoom(.8);else if(e.key==='Enter')attempt(viewport.w/2,viewport.h/2);else if(e.key.startsWith('Arrow')){const dx=e.key==='ArrowLeft'?65:e.key==='ArrowRight'?-65:0,dy=e.key==='ArrowUp'?65:e.key==='ArrowDown'?-65:0;game.keyboard=true;game.camera=clampCamera({...game.camera,x:game.camera.x+dx,y:game.camera.y+dy},viewport.w,viewport.h,W,H);draw();}};
}
function attempt(x,y){
  const g=game;if(!g||!g.active||g.paused||g.found)return;const p=screenToWorld(x,y,g.camera),b=g.world.box;
  const hit=hitSprite(p.x,p.y,b,g.asset);
  if(hit){finish();return;}g.errors++;g.seconds=penalize(g.seconds);g.miss={x,y,time:performance.now()};beep();toast(g.untimed?'Ainda não! −25 pontos no resultado.':'Ainda não! −3 segundos.');updateHud();draw();if(!g.untimed&&g.seconds<=0)timeout();
}
function updateHud(){if(!game||home)return;$('#timer').textContent=game.untimed?'Sem pressa':clock(game.seconds);$('#timer').classList.toggle('urgent',!game.untimed&&game.seconds<=20);$('#points').textContent=fmt(Math.max(0,-game.errors*25-game.hints*150));}
function hint(){const g=game;if(!g||!g.active||g.paused||g.found)return;if(g.hints>=3){toast('Você já usou as três dicas desta busca.');return;}g.hints++;g.hintUntil=performance.now()+4500;fit();updateHud();beep();toast('Procure dentro da região pontilhada. A dica custa 150 pontos.');draw();if(g.hints===3)$('#hint').disabled=true;}
function pause(){const g=game;if(!g||!g.active||g.found||g.paused)return;g.paused=true;modal(`<span class="dialog-symbol">Ⅱ</span><div class="eyebrow">PODE RESPIRAR</div><h2 id="dialog-title">Uma pausa na busca.</h2><p>O Flávio continua por ali. O relógio espera por você.</p><button id="resume" class="primary">Continuar procurando →</button><button id="leave" class="quiet">Voltar aos destinos</button>`);$('#resume').onclick=()=>dialog.close();$('#leave').onclick=()=>{dialog.close();renderHome();};}
dialog.addEventListener('close',()=>{if(game?.paused){game.paused=false;game.last=performance.now();$('#scene')?.focus({preventScroll:true});}});
function timeout(){if(!game?.active)return;game.active=false;modal(`<span class="dialog-symbol">◷</span><div class="eyebrow">FOI POR POUCO</div><h2 id="dialog-title">O tempo voou.</h2><p>A multidão ganhou essa. Que tal olhar mais uma vez?</p><button id="retry" class="primary">Tentar novamente ↻</button><button id="leave" class="quiet">Voltar aos destinos</button>`);$('#retry').onclick=restart;$('#leave').onclick=()=>{dialog.close();renderHome();};}
function finish(){
  const g=game;g.found=true;g.active=false;const remaining=g.untimed?0:Math.ceil(g.seconds),score=scoreLevel(remaining,g.errors,g.hints),star=g.untimed?g.hints>1?1:2:starsFor(remaining,g.l.duration,g.hints);
  if(!progress[g.index]||progress[g.index].score<score)progress[g.index]={score,stars:star,seconds:Math.round(g.elapsed)};save();beep(true);$('#points').textContent=fmt(score);draw();
  const ticket=loadTicket;setTimeout(()=>{if(game!==g||ticket!==loadTicket)return;const last=g.index===3,all=Object.keys(progress).length===4;modal(`<span class="result-stars">${stars(star)}</span><div class="eyebrow">${all?'PASSAPORTE COMPLETO':'FLÁVIO LOCALIZADO'}</div><h2 id="dialog-title">${all?'Você tem olho pra coisa.':'Achou o Flávio!'}</h2><p>${all?'Quatro destinos, nenhuma fuga. Seu roteiro está completo.':`Encontrado em ${g.l.place}. Tem mais multidão pela frente.`}</p><div class="result-score">${fmt(score)}<small>pontos nesta fase</small></div><div class="result-details"><span>${clock(g.elapsed)}<small>de busca</small></span><span>${g.hints}<small>dicas usadas</small></span><span>${g.errors}<small>tentativas erradas</small></span></div>${all?`<p class="passport-total">Passaporte: <b>${fmt(total())} pontos</b> · ${clock(Object.values(progress).reduce((n,p)=>n+p.seconds,0))} de busca</p>`:''}<button id="next" class="primary">${last?'Ver meu passaporte':'Próximo destino →'}</button><button id="again" class="quiet">Procurar nesta fase de novo</button>`);$('#next').onclick=()=>last?(dialog.close(),renderHome()):start(g.index+1);$('#again').onclick=restart;},850);
}
function help(){const was=!!game?.active&&!game.paused;if(was)game.paused=true;modal(`<span class="dialog-symbol">◎</span><div class="eyebrow">MANUAL DO BOM OBSERVADOR</div><h2 id="dialog-title">Olhe. Amplie. Encontre.</h2><ol class="instructions"><li><b>Encontre o homem listrado.</b> A miniatura no topo mostra quem você procura.</li><li><b>Explore a cena.</b> Arraste, use a roda do mouse ou faça o gesto de pinça. Os botões + e − também ajudam.</li><li><b>Acerte no personagem.</b> Ganhe 1.000 pontos e mais 10 por segundo restante. Erros custam 25 pontos e 3 segundos.</li><li><b>Precisa de uma pista?</b> Até três dicas mostram uma região aproximada, por 150 pontos cada.</li></ol><p class="small-note">No teclado: setas movem a cena; +/− ampliam; Enter procura no centro da mira; espaço pausa. Prefere observar com calma? Ative o modo sem cronômetro na página inicial.</p><button id="close-help" class="primary">Entendi. Bora procurar →</button><p class="editorial">Obra de ficção e sátira política. Encontros e cenas imaginários. As referências fornecidas orientam esta edição de protótipo.</p>`);$('#close-help').onclick=()=>dialog.close();}
$('#help').onclick=help;
$('#sound').onclick=()=>{sound=!sound;$('#sound').setAttribute('aria-pressed',String(sound));$('#sound').setAttribute('aria-label',sound?'Desativar som':'Ativar som');$('#sound').innerHTML=`♫ <span>Som ${sound?'ligado':'desligado'}</span>`;if(sound)beep(true);};
$('.brand').onclick=e=>{e.preventDefault();dialog.close();renderHome();};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&game?.active&&!game.paused)pause();});
function frame(now){
  const g=game;if(g&&g.active&&!g.paused){const dt=(now-g.last)/1000;g.elapsed+=dt;if(!g.untimed)g.seconds=Math.max(0,g.seconds-dt);if(!g.untimed&&g.seconds<=0)timeout();else{updateHud();if(g.hintUntil>now||g.hintUntil>g.last||g.miss&&now-g.miss.time<750)draw();}}
  if(g)g.last=now;requestAnimationFrame(frame);
}
renderHome();requestAnimationFrame(frame);
