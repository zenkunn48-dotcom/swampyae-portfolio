import { test, expect } from 'bun:test';
import { adsMetrics, gaMetrics, adsDateRange, gaDateRange } from './portfolio-analytics';

test('Google Ads retains the four supplied summary values and range', () => {
  expect(adsMetrics.map(metric => metric.value)).toEqual(['2.26K', '334.00', '$24.26', '$8.1K']);
  expect(adsDateRange).toBe('Jul 21, 2025 – Jul 20, 2026');
});
test('GA4 retains the supplied values and percentage increases', () => {
  expect(gaMetrics.map(metric => [metric.value, metric.growth])).toEqual([
    ['9.6K', '269.2%'], ['20K', '42.9%'], ['862', '78.5%'], ['5.4K', '107.7%'],
  ]);
  expect(gaDateRange).toBe('01 Jan – 01 Jul');
});