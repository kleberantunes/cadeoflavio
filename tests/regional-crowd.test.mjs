import test from 'node:test';
import assert from 'node:assert/strict';
import {REGIONAL_ATLASES} from '../frontend/regional-npc-data.mjs';
import {NPC_FRAMES} from '../frontend/npc-data.mjs';
import {planCrowdSprites,artworkForFrame} from '../frontend/crowd.mjs';
import {levels,makeCrowd} from '../frontend/scenes.mjs';

for(const [index,level] of levels.entries()){
  test(`${level.place}: has a dedicated cast, varied poses and matching striped distractions`,()=>{
    const atlas=REGIONAL_ATLASES[level.slug];
    assert.ok(atlas.frames.length>=12);
    assert.ok(atlas.frames.filter(f=>f.striped).length>=3);
    for(const f of atlas.frames){
      assert.equal(f.atlas,level.slug);assert.equal(f.group,level.slug);
      assert.ok(f.x>=0&&f.y>=0&&f.x+f.w<=atlas.width&&f.y+f.h<=atlas.height);
      assert.ok(f.h>250&&f.w>70);
    }
    const people=makeCrowd(level,111),plan=planCrowdSprites(people,index);
    const regional=[...plan.values()].filter(item=>item.frame.atlas);
    assert.ok(regional.length>people.length*.5);
    assert.equal(new Set(regional.map(v=>v.frame.id)).size,atlas.frames.length);
    assert.ok(regional.every(v=>v.frame.atlas===level.slug));
    assert.ok(new Set([...plan.values()].map(v=>v.frame.id)).size>=40);
    for(const p of people)assert.equal(plan.get(p.id).frame.striped,p.striped);
    const alternate=planCrowdSprites(makeCrowd(level,112),index);
    assert.notDeepEqual([...plan.values()].map(v=>v.frame.id),[...alternate.values()].map(v=>v.frame.id));
  });
}

test('regional hit masks and drawing use the same atlas, while preserving the generic cast',()=>{
  assert.equal(NPC_FRAMES.length,44);
  const base={id:'base'},regional={id:'rio'},artwork={base,regional};
  assert.equal(artworkForFrame(NPC_FRAMES[0],artwork),base);
  assert.equal(artworkForFrame(REGIONAL_ATLASES.rio.frames[0],artwork),regional);
});
