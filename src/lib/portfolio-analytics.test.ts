import { test } from 'node:test';
import { deepStrictEqual, strictEqual } from 'node:assert';
import { adsMetrics, gaMetrics, adsDateRange, gaDateRange } from './portfolio-analytics';

test('Google Ads retains the four supplied summary values and range', () => {
  deepStrictEqual(adsMetrics.map(metric => metric.value), ['2.26K', '334.00', '$24.26', '$8.1K']);
  strictEqual(adsDateRange, 'Jul 21, 2025 – Jul 20, 2026');
});
test('GA4 retains the supplied values and percentage increases', () => {
  deepStrictEqual(gaMetrics.map(metric => [metric.value, metric.growth]), [
    ['9.6K', '269.2%'], ['20K', '42.9%'], ['862', '78.5%'], ['5.4K', '107.7%'],
  ]);
  strictEqual(gaDateRange, '01 Jan – 01 Jul');
});