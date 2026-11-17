import { test } from 'node:test';
import { strictEqual } from 'node:assert';
import { introScrollDistance } from './build-intro';

test('desktop intro pins for 250vh', () => {
  strictEqual(introScrollDistance(1280, 900), 2250);
});
test('mobile intro pins for 150vh below 768px', () => {
  strictEqual(introScrollDistance(767, 800), 1200);
});
test('768px uses the desktop timeline', () => {
  strictEqual(introScrollDistance(768, 800), 2000);
});