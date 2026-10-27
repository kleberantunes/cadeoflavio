import test from 'node:test';
import assert from 'node:assert/strict';
import {ALLY_POINTS,claimAlly,scoreLevel,safeProgress} from '../frontend/core.mjs';
import {pickSceneHit} from '../frontend/hit-scene.mjs';

test('each distinct ally grants 250 points, never twice',()=>{
  const ids=['cast-01','cast-02'];
  const first=claimAlly([],ids[0],ids);
  assert.deepEqual(first,{found:['cast-01'],added:ALLY_POINTS});
  assert.deepEqual(claimAlly(first.found,ids[0],ids),{found:first.found,added:0});
  assert.deepEqual(claimAlly(first.found,ids[1],ids),{found:ids,added:ALLY_POINTS});
  assert.deepEqual(claimAlly([], 'standing',ids),{found:[],added:0});
});
test('ally bonuses are included with time, hints and error deductions',()=>{
  assert.equal(scoreLevel(0,0,0,8),3000);
  assert.equal(scoreLevel(60,1,2,3),2025);
  assert.equal(scoreLevel(0,100,100,8),0);
});
test('saved records retain the matching ally count and accept older records',()=>{
  assert.deepEqual(safeProgress({0:{score:1500,stars:2,seconds:50,allies:2}}),{0:{score:1500,stars:2,seconds:50,allies:2}});
  assert.deepEqual(safeProgress({0:{score:1000,stars:2,seconds:50,allies:99}}),{0:{score:1000,stars:2,seconds:50}});
});
const asset=(alpha=255)=>({meta:{id:'cast-01'},image:{width:1,height:1},pixels:new Uint8ClampedArray([1,1,1,alpha])});
const box={x:0,y:0,w:10,h:10};
test('clicks select the visible ally and respect its alpha and transformed world box',()=>{
  const ally={type:'ally',id:'cast-01',box:{x:100,y:200,w:20,h:40},asset:asset()};
  assert.equal(pickSceneHit(110,220,[ally]).id,'cast-01');
  assert.equal(pickSceneHit(10,20,[ally]).type,'miss');
  assert.equal(pickSceneHit(5,5,[{type:'ally',box,asset:asset(0)}]).type,'miss');
});
test('foreground people block collection through their opaque pixels',()=>{
  const ally={type:'ally',id:'cast-01',box,asset:asset()};
  const npc={type:'npc',box,frame:{x:0,y:0,w:1,h:1},artwork:{width:1,alpha:new Uint8Array([255])}};
  assert.equal(pickSceneHit(5,5,[ally,npc]).type,'miss');
  assert.equal(pickSceneHit(5,5,[npc,ally]).type,'ally');
  npc.artwork.alpha[0]=0;
  assert.equal(pickSceneHit(5,5,[ally,npc]).type,'ally');
});
test('transparent space and props never become an extra target',()=>{
  const target={type:'target',box,asset:{...asset(),meta:{id:'car',region:{x:.4,y:.1,w:.3,h:.3}}}};
  assert.equal(pickSceneHit(1,8,[target]).type,'miss');
  assert.equal(pickSceneHit(5,2,[target]).type,'target');
  const cut={...target,occluder:{x:0,y:0,w:10,h:3}};
  assert.equal(pickSceneHit(5,2,[cut]).type,'miss');
});
