import test from 'node:test';
import assert from 'node:assert/strict';
import { cast, poses, levelPoses, castForCrowd, spriteBox, inHitRegion, hitSprite } from '../frontend/cast.mjs';
import { levels, makeCrowd, spawnCandidates } from '../frontend/scenes.mjs';

test('all six supplied poses are used and the target stays unique',()=>{
  for(const id of ['standing','chair','flag','car','celebrating','pointing']) assert.ok(levelPoses.flat().includes(id));
  assert.equal(cast.length,8);
  assert.ok(!cast.some(c=>c.id==='classic'));
  assert.ok(poses.classic);
});
for(const [i,level] of levels.entries())test(`${level.place}: supplied cast is mixed into existing crowd without replacing the target`,()=>{
  const people=makeCrowd(level),target=spawnCandidates(people)[0];
  const plan=castForCrowd(people,target,i);
  assert.equal(plan.size,8);assert.ok(!plan.has(target.id));
  assert.equal(new Set(plan.values()).size,8);
  for(const [id] of plan)assert.ok(people.some(p=>p.id===id));
  assert.deepEqual([...plan],[...castForCrowd(people,target,i)]);
});
test('all sprites preserve their aspect ratio and nearby adult scale',()=>{
  for(const meta of [...Object.values(poses),...cast]){
    const box=spriteBox({x:500,y:900,height:100},{meta,image:{width:300,height:600}});
    assert.equal(box.w/box.h,.5);
    assert.ok(box.h<=110&&box.h>=50);
  }
});
test('all valid target positions leave eight distinct fair bonus positions in every destination',()=>{
  for(const [i,level] of levels.entries()){
    const people=makeCrowd(level);
    for(const target of spawnCandidates(people)){
      const plan=castForCrowd(people,target,i);
      assert.equal(plan.size,8);assert.equal(new Set(plan.values()).size,8);
      for(const id of plan.keys()){
        const p=people.find(q=>q.id===id);
        assert.ok(!people.some(q=>q!==p&&q.y>p.y&&q.y<p.y+p.height*.55&&Math.abs(q.x-p.x)<p.height*.32));
      }
    }
  }
});
test('car and flag are scenery props, not additional clickable targets',()=>{
  assert.equal(inHitRegion(.1,.8,poses.car),false);
  assert.equal(inHitRegion(.65,.3,poses.car),true);
  assert.equal(inHitRegion(.9,.1,poses.flag),false);
  assert.equal(inHitRegion(.55,.65,poses.flag),true);
});
test('hit test follows the chosen sprite alpha in world coordinates, including box edges',()=>{
  const asset={meta:poses.standing,image:{width:2,height:2},pixels:new Uint8ClampedArray([0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,255])};
  const box={x:100,y:200,w:40,h:80};
  assert.equal(hitSprite(105,205,box,asset),true);
  assert.equal(hitSprite(135,205,box,asset),false);
  assert.equal(hitSprite(140,280,box,asset),true);
  assert.equal(hitSprite(141,280,box,asset),false);
});
