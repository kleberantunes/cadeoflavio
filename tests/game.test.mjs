import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreLevel, starsFor, screenToWorld, clampCamera, chooseSpawn, penalize, safeProgress } from '../frontend/core.mjs';
import { levels, makeCrowd, spawnCandidates } from '../frontend/scenes.mjs';

test('score accounts for time, errors and hints without going negative', () => {
  assert.equal(scoreLevel(60, 1, 2), 1275);
  assert.equal(scoreLevel(0, 100, 100), 0);
});
test('stars reward quick searches and charge multiple hints', () => {
  assert.equal(starsFor(51, 100, 0), 3);
  assert.equal(starsFor(50, 100, 0), 2);
  assert.equal(starsFor(95, 100, 2), 1);
});
test('hit testing uses transformed coordinates after pan and zoom', () => {
  assert.deepEqual(screenToWorld(425, 350, { x: -75, y: 50, scale: 2.5 }), { x: 200, y: 120 });
});
test('camera cannot lose the scene even in portrait aspect ratio', () => {
  const c = clampCamera({ x: 9000, y: -9000, scale: 1 }, 390, 700, 2400, 1600);
  assert.equal(c.x, 0); assert.equal(c.y, -900);
  const fit = clampCamera({ x: 8, y: -5, scale: .1 }, 390, 700, 2400, 1600);
  assert.equal(fit.x, 75); assert.equal(fit.y, 270);
});
test('retry selects a different safe spawn; single candidate is safe', () => {
  assert.equal(chooseSpawn(4, 2, () => .7), 3);
  assert.equal(chooseSpawn(1, 0), 0);
});
test('wrong click never creates negative remaining time', () => assert.equal(penalize(2), 0));
test('corrupted local progress cannot enter rendering or score totals', () => {
  assert.deepEqual(safeProgress({ 0: { score: '<img>', stars: 50 }, 1: { score: 2500, stars: 3, seconds: 42 } }), { 1: { score: 2500, stars: 3, seconds: 42 } });
});
for (const level of levels) {
  test(`${level.place}: dense depth-sorted crowd, distractors and fair randomized spawns`, () => {
    const people=makeCrowd(level),candidates=spawnCandidates(people);
    assert.equal(people.length,level.count);
    assert.ok(people.length>=450);
    assert.ok(candidates.length>=3,`Expected at least 3 spawns; got ${candidates.length}`);
    assert.ok(people.filter(p=>p.striped).length>60);
    for(let i=1;i<people.length;i++) assert.ok(people[i].y>=people[i-1].y);
    for(const p of candidates) {
      assert.ok(!people.some(q=>q!==p&&q.y>p.y&&q.y<p.y+p.height*.55&&Math.abs(q.x-p.x)<p.height*.32));
    }
    assert.deepEqual(makeCrowd(level),people);
  });
}
