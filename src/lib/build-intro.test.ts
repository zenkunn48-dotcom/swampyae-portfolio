import { test } from 'node:test';
import { strictEqual } from 'node:assert';
import { introScrollDistance, introScrub } from './build-intro';

test('desktop intro pins for 250vh', () => {
  strictEqual(introScrollDistance(1280, 900), 2250);
});
test('mobile intro pins for 100vh below 768px', () => {
  strictEqual(introScrollDistance(767, 800), 800);
});
test('tablet intro pins for 140vh from 768px', () => {
  strictEqual(introScrollDistance(768, 800), 1120);
});
test('1024px retains the desktop 250vh distance', () => {
  strictEqual(introScrollDistance(1024, 800), 2000);
});
test('mobile scrub has no smoothing delay', () => { strictEqual(introScrub(767), true); });
test('tablet scrub uses 0.3 seconds', () => { strictEqual(introScrub(768), 0.3); });
test('desktop scrub keeps one second', () => { strictEqual(introScrub(1024), 1); });