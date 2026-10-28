import test from 'node:test';
import assert from 'node:assert/strict';
import {levels,makeCrowd,spawnCandidates} from '../frontend/scenes.mjs';
import {chooseSearchSpawn,searchRegion} from '../frontend/search-layout.mjs';
import {castForCrowd} from '../frontend/cast.mjs';

const randomFor=seed=>()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};

for(const [levelIndex,level] of levels.entries()){
  test(`${level.place}: fresh rounds vary the entire crowd and cover all search sectors`,()=>{
    const first=makeCrowd(level,1001),second=makeCrowd(level,1002);
    assert.notDeepEqual(first,second);
    assert.deepEqual(first,makeCrowd(level,1001));
    let history=[];const seen=new Set(),random=randomFor(1234);
    for(let round=0;round<24;round++){
      const people=makeCrowd(level,2000+round),candidates=spawnCandidates(people);
      assert.equal(people.length,level.count);
      assert.ok(candidates.length>=50,`${candidates.length} safe positions`);
      assert.equal(new Set(candidates.map(searchRegion)).size,12);
      const target=chooseSearchSpawn(candidates,history,random);
      assert.ok(candidates.includes(target));
      assert.ok(!history.slice(-6).some(p=>searchRegion(p)===searchRegion(target)));
      if(history.length)assert.ok(Math.hypot(target.x-history.at(-1).x,target.y-history.at(-1).y)>=420);
      const allies=castForCrowd(people,target,levelIndex);
      assert.equal(allies.size,8);assert.equal(new Set(allies.values()).size,8);
      assert.ok(!allies.has(target.id));
      seen.add(searchRegion(target));history=[...history,target].slice(-6);
    }
    assert.equal(seen.size,12);
  });
}

test('spatial draw balances regions instead of favoring the most crowded one',()=>{
  const sparse={x:180,y:700},dense=Array.from({length:99},(_,i)=>({x:1900+i,y:1400}));
  assert.equal(chooseSearchSpawn([sparse,...dense],[],()=>.1),sparse);
  assert.ok(dense.includes(chooseSearchSpawn([sparse,...dense],[],()=>.9)));
});

test('empty or tiny candidate pools remain safe and do not loop',()=>{
  const only={x:500,y:900};
  assert.equal(chooseSearchSpawn([],[]),null);
  assert.equal(chooseSearchSpawn([only],[only]),only);
});
