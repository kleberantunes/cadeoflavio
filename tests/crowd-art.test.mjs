import test from 'node:test';
import assert from 'node:assert/strict';
import {NPC_FRAMES} from '../frontend/npc-data.mjs';
import {planCrowdSprites} from '../frontend/crowd.mjs';
import {levels,makeCrowd} from '../frontend/scenes.mjs';

test('production crowd uses 44 complete distinct cutouts with transparent gutters',()=>{
  assert.equal(NPC_FRAMES.length,44);assert.equal(new Set(NPC_FRAMES.map(f=>f.id)).size,44);
  assert.ok(NPC_FRAMES.filter(f=>f.striped).length>=10);
  for(const f of NPC_FRAMES){assert.ok(f.w>70&&f.h>250);assert.ok(f.x>=0&&f.y>=0);assert.ok(f.x+f.w<=2304&&f.y+f.h<=2592);}
});
for(const [index,level] of levels.entries())test(`${level.place}: every figurant gets detailed art, with the required striped distractions`,()=>{
  const people=makeCrowd(level),plan=planCrowdSprites(people,index);
  assert.equal(plan.size,people.length);
  assert.ok(new Set([...plan.values()].map(v=>v.frame.id)).size>=38);
  for(const p of people){const chosen=plan.get(p.id);assert.equal(chosen.frame.striped,p.striped);assert.ok(chosen.frame.h>0);}
  assert.deepEqual([...plan],[...planCrowdSprites(people,index)]);
});
