export const adsMetrics = [
  { key: 'clicks', label: 'Clicks', value: '2.26K', color: 'var(--chart-ads-blue)' },
  { key: 'conversions', label: 'Conversions', value: '334.00', color: 'var(--chart-ads-red)' },
  { key: 'cpa', label: 'Cost / conv.', value: '$24.26', color: 'var(--chart-ads-gold)' },
  { key: 'cost', label: 'Cost', value: '$8.1K', color: 'var(--chart-ads-green)' },
] as const;

export const gaMetrics = [
  { key: 'users', label: 'Active users', value: '9.6K', growth: '269.2%' },
  { key: 'events', label: 'Event count', value: '20K', growth: '42.9%' },
  { key: 'keyEvents', label: 'Key events', value: '862', growth: '78.5%' },
  { key: 'newUsers', label: 'New users', value: '5.4K', growth: '107.7%' },
] as const;

export const adsDateRange = 'Jul 21, 2025 – Jul 20, 2026';
export const gaDateRange = '01 Jan – 01 Jul';
export type AdsKey = typeof adsMetrics[number]['key'];
export type GaKey = typeof gaMetrics[number]['key'];

// Illustrative shapes only: no daily or monthly account export was supplied.
const adsShape = [12, 18, 11, 28, 19, 38, 23, 17, 42, 29, 51, 33, 58, 44, 31, 62, 40, 67, 49, 76, 58, 45, 81, 61, 88, 72];
export const adsTrend = adsShape.map((value, index) => ({
  index,
  date: new Date(Date.UTC(2025, 6, 21) + index * (364 / 25) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
  clicks: value,
  conversions: Math.max(5, value * 0.63 + Math.sin(index * 1.9) * 13),
  cpa: 52 - value * 0.24 + Math.cos(index) * 8,
  cost: value * 0.8 + Math.cos(index * 1.5) * 8,
}));

const gaShape = [18, 22, 19, 28, 32, 25, 36, 44, 33, 48, 41, 54, 47, 61, 52, 58, 71, 63, 79, 66, 76, 88, 74, 91, 82, 96];
export const gaTrend = gaShape.map((value, index) => ({
  index,
  date: new Date(Date.UTC(2026, 0, 1) + index * (181 / 25) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
  users: value, usersPrevious: value * 0.36 + Math.cos(index) * 6,
  events: value * 0.9 + Math.sin(index) * 11, eventsPrevious: value * 0.61 + Math.cos(index) * 9,
  keyEvents: value * 0.86 + Math.cos(index * 1.7) * 9, keyEventsPrevious: value * 0.47 + Math.sin(index) * 7,
  newUsers: value * 0.94 + Math.sin(index * 1.4) * 7, newUsersPrevious: value * 0.44 + Math.cos(index) * 8,
}));