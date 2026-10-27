import test from 'node:test';
import assert from 'node:assert/strict';
import {createGameAds} from '../frontend/ads.mjs';

const config={enabled:true,publisherId:'ca-pub-1234567890123456',testMode:false};
function harness(settings=config){
  const scripts=[],requests=[],timers=new Map();let timerId=0;
  const win={location:{hostname:'localhost'}};
  const doc={createElement:()=>({dataset:{}}),head:{append:el=>scripts.push(el)}};
  const ads=createGameAds(settings,{win,doc,schedule:fn=>{timers.set(++timerId,fn);return timerId;},cancel:id=>timers.delete(id)});
  const ready=()=>{
    const queued=win.adsbygoogle.splice(0);
    win.adConfig=()=>{};
    win.adBreak=placement=>requests.push(placement);
    queued.find(options=>options.onReady).onReady();
  };
  return {ads,scripts,requests,timers,win,ready};
}

test('unconfigured accounts make no Google request and never block playing',async()=>{
  for(const settings of [{enabled:false}, {...config,publisherId:''}, {...config,publisherId:'wrong'}, {...config,publisherId:config.publisherId+'<script>'}]){
    const h=harness(settings);
    assert.equal((await h.ads.beforeGame()).status,'disabled');
    assert.equal(h.scripts.length,0);
  }
});

test('game starts only after the ad ends, with one placement per page',async()=>{
  const h=harness();const events=[];
  const first=h.ads.beforeGame({sound:true,beforeAd:()=>events.push('pause'),afterAd:()=>events.push('resume')});
  const repeated=h.ads.beforeGame();
  assert.equal(first,repeated);
  assert.equal(h.scripts.length,1);
  assert.match(h.scripts[0].src,/client=ca-pub-1234567890123456$/);
  h.ready();await Promise.resolve();
  assert.equal(h.requests.length,1);
  assert.equal(h.requests[0].type,'start');
  h.requests[0].beforeAd();
  let finished=false;first.then(()=>finished=true);await Promise.resolve();
  assert.equal(finished,false);
  assert.deepEqual(events,['pause']);
  h.requests[0].afterAd();h.requests[0].adBreakDone({breakStatus:'viewed'});
  assert.equal((await first).status,'viewed');
  assert.deepEqual(events,['pause','resume']);
  assert.equal((await h.ads.beforeGame()).status,'already-requested');
  assert.equal(h.requests.length,1);
});

test('no inventory, frequency limits and API errors allow the game to continue',async()=>{
  for(const status of ['noAdPreloaded','frequencyCapped','notReady','timeout','error']){
    const h=harness();const result=h.ads.beforeGame();h.ready();await Promise.resolve();
    h.requests[0].adBreakDone({breakStatus:status});
    assert.equal((await result).status,status);
  }
  const h=harness();const result=h.ads.beforeGame();h.ready();h.win.adBreak=()=>{throw Error('network');};
  assert.equal((await result).status,'error');
});

test('blocked or stalled SDK does not prevent play, including late initialization',async()=>{
  const blocked=harness();const a=blocked.ads.beforeGame();blocked.scripts[0].onerror();
  assert.equal((await a).status,'unavailable');
  const stalled=harness();const b=stalled.ads.beforeGame();
  for(const timeout of [...stalled.timers.values()])timeout();
  assert.equal((await b).status,'unavailable');
  stalled.ready();await Promise.resolve();
  assert.equal(stalled.requests.length,0);
});

test('cancelled navigation never opens a late ad on the home screen',async()=>{
  const h=harness();const result=h.ads.beforeGame({isCurrent:()=>false});h.ready();
  assert.equal((await result).status,'cancelled');assert.equal(h.requests.length,0);
  const retry=h.ads.beforeGame();await Promise.resolve();
  h.requests[0].adBreakDone({breakStatus:'noAdPreloaded'});await retry;
});

test('test creatives cannot be enabled on the public host',async()=>{
  const h=harness({...config,testMode:true});h.win.location.hostname='cadeoflavio.pages.dev';
  assert.equal((await h.ads.beforeGame()).status,'disabled');assert.equal(h.scripts.length,0);
});
