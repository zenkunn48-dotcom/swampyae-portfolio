import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowUp, BarChart3, CalendarDays, ChartNoAxesCombined } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { adsMetrics, gaMetrics, adsTrend, gaTrend, adsDateRange, gaDateRange, type AdsKey, type GaKey } from '@/lib/portfolio-analytics';

function TrendTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name?: string; value?: number; color?: string; payload?: { date?: string } }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="analytics-tooltip" role="status">
      <p className="mb-2 font-semibold">{payload[0]?.payload?.date}</p>
      {payload.map((point, index) => (
        <p key={index} className="flex items-center justify-between gap-5 text-xs">
          <span>{point.name}</span><span className="font-semibold tabular-nums">{Number(point.value).toFixed(1)}</span>
        </p>
      ))}
      <p className="mt-2 text-xs text-muted-foreground">Illustrative trend index</p>
    </div>
  );
}

export function MarketingAnalytics() {
  const [adsSelection, setAdsSelection] = useState<AdsKey[]>(['clicks', 'conversions']);
  const [gaSelection, setGaSelection] = useState<GaKey>('users');
  const adsRef = useRef<HTMLElement>(null);
  const gaRef = useRef<HTMLElement>(null);
  const adsEntered = useInView(adsRef, { once: true, amount: 0.08 });
  const gaEntered = useInView(gaRef, { once: true, amount: 0.08 });
  const reduceMotion = useReducedMotion();

  function toggleAds(key: AdsKey) {
    setAdsSelection(current => current.includes(key)
      ? current.length > 1 ? current.filter(item => item !== key) : current
      : [...current, key]);
  }

  const selectedGa = gaMetrics.find(metric => metric.key === gaSelection) ?? gaMetrics[0];
  const entrance = { initial: { opacity: 0, y: 0 }, transition: { duration: reduceMotion ? 0 : 0.6 } };
  const metricEntrance = (entered: boolean, index: number) => ({
    initial: { opacity: 0, y: 0 },
    animate: { opacity: entered ? 1 : 0, y: entered || reduceMotion ? 0 : 10 },
    transition: { duration: reduceMotion ? 0 : 0.5, delay: entered && !reduceMotion ? index * 0.08 : 0 },
  });

  return (
    <section id="analytics" className="py-12 sm:py-20" aria-labelledby="analytics-heading">
      <div className="mb-8">
        <span className="text-sm font-medium text-cyan">Performance & Measurement</span>
        <h2 id="analytics-heading" className="mt-3 text-3xl font-bold sm:text-4xl">Google Ads & Analytics</h2>
      </div>
      <div className="grid gap-8">
        <motion.article ref={adsRef} {...entrance} animate={{ opacity: adsEntered ? 1 : 0 }} className="analytics-card" aria-labelledby="ads-heading">
          <div className="analytics-card-heading">
            <div className="flex items-center gap-3"><span className="analytics-icon text-chart-ads-blue"><ChartNoAxesCombined size={22} /></span><h3 id="ads-heading" className="text-lg font-semibold sm:text-xl">Google Ads</h3></div>
            <span className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays size={14} />{adsDateRange}</span>
          </div>
          <div className="analytics-metrics" role="group" aria-label="Google Ads metrics">
            {adsMetrics.map((metric, index) => (
              <Button key={metric.key} variant="ghost" aria-pressed={adsSelection.includes(metric.key)} onClick={() => toggleAds(metric.key)} className={cn('analytics-metric', `analytics-metric-${metric.key}`, adsSelection.includes(metric.key) && 'is-selected')}>
                <span className="text-xs font-medium sm:text-sm">{metric.label}</span>
                <motion.span {...metricEntrance(adsEntered, index)} className="text-2xl font-semibold tabular-nums sm:text-3xl">{metric.value}</motion.span>
              </Button>
            ))}
          </div>
          <div className="analytics-plot" aria-label="Google Ads illustrative dual-line trend chart">
            {adsEntered && <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adsTrend} margin={{ top: 16, right: 14, bottom: 12, left: 0 }} accessibilityLayer>
                <CartesianGrid stroke="var(--chart-grid)" vertical={false} strokeDasharray="3 5" />
                <XAxis dataKey="index" type="number" domain={[0, 25]} ticks={[0, 6, 12, 18, 25]} tickFormatter={index => ['Jul 21, 2025', 'Oct', 'Jan', 'Apr', 'Jul 20, 2026'][[0, 6, 12, 18, 25].indexOf(index)] ?? ''} tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} axisLine={false} tickLine={false} padding={{ left: 36, right: 36 }} />
                <YAxis hide domain={[0, 110]} />
                <Tooltip content={<TrendTooltip />} cursor={{ stroke: 'var(--chart-grid)' }} />
                {adsMetrics.filter(metric => adsSelection.includes(metric.key)).map(metric => <Line key={metric.key} type="monotone" dataKey={metric.key} name={metric.label} stroke={metric.color} strokeWidth={2.5} dot={false} activeDot={{ r: 5, stroke: 'var(--foreground)', strokeWidth: 2 }} isAnimationActive={!reduceMotion} animationDuration={1800} animationEasing="ease-in-out" />)}
              </LineChart>
            </ResponsiveContainer>}
          </div>
          <div className="analytics-chart-footer"><span>Illustrative trend · summary metrics as supplied</span><span>Jul 2025 — Jul 2026</span></div>
          <p className="analytics-description">Strategic Google Ads Specialist with a proven track record of managing high-budget campaigns across Search, Display, and Performance Max, focused on optimizing Quality Score and reducing CPA to achieve consistent growth.</p>
        </motion.article>

        <motion.article ref={gaRef} {...entrance} animate={{ opacity: gaEntered ? 1 : 0 }} className="analytics-card" aria-labelledby="ga-heading">
          <div className="analytics-card-heading">
            <div className="flex items-center gap-3"><span className="analytics-icon text-chart-ads-gold"><BarChart3 size={22} /></span><h3 id="ga-heading" className="text-lg font-semibold sm:text-xl">Google Analytics 4 <span className="text-muted-foreground">(GA4)</span></h3></div>
            <span className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays size={14} />{gaDateRange}</span>
          </div>
          <div className="analytics-metrics" role="group" aria-label="GA4 metrics">
            {gaMetrics.map((metric, index) => (
              <Button key={metric.key} variant="ghost" aria-pressed={gaSelection === metric.key} onClick={() => setGaSelection(metric.key)} className={cn('analytics-metric analytics-ga-metric', gaSelection === metric.key && 'is-selected')}>
                <span className="text-xs font-medium sm:text-sm">{metric.label}</span>
                <motion.span {...metricEntrance(gaEntered, index)} className="text-2xl font-semibold tabular-nums sm:text-3xl">{metric.value}</motion.span>
                <motion.span {...metricEntrance(gaEntered, index)} className="flex items-center gap-1 text-xs font-medium text-chart-ads-green"><ArrowUp size={12} />{metric.growth}</motion.span>
              </Button>
            ))}
          </div>
          <div className="analytics-plot" aria-label={`${selectedGa.label}: illustrative current versus previous period chart`}>
            {gaEntered && <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gaTrend} margin={{ top: 16, right: 14, bottom: 12, left: 0 }} accessibilityLayer>
                <CartesianGrid stroke="var(--chart-grid)" vertical={false} strokeDasharray="3 5" />
                <XAxis dataKey="index" type="number" domain={[0, 25]} ticks={[0, 4, 8, 12, 17, 21, 25]} tickFormatter={index => ['01 Jan', '01 Feb', '01 Mar', '01 Apr', '01 May', '01 Jun', '01 Jul'][[0, 4, 8, 12, 17, 21, 25].indexOf(index)] ?? ''} tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} axisLine={false} tickLine={false} padding={{ left: 16, right: 16 }} />
                <YAxis hide domain={[0, 110]} />
                <Tooltip content={<TrendTooltip />} cursor={{ stroke: 'var(--chart-grid)' }} />
                <Line key={`${gaSelection}-previous`} type="monotone" dataKey={`${gaSelection}Previous`} name="Previous period" stroke="var(--chart-previous)" strokeDasharray="5 5" strokeWidth={2} dot={false} activeDot={{ r: 4 }} isAnimationActive={!reduceMotion} animationDuration={1800} />
                <Line key={gaSelection} type="monotone" dataKey={gaSelection} name={`${selectedGa.label} · current`} stroke="var(--chart-ads-blue)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, stroke: 'var(--foreground)', strokeWidth: 2 }} isAnimationActive={!reduceMotion} animationDuration={1800} animationEasing="ease-in-out" />
              </LineChart>
            </ResponsiveContainer>}
          </div>
          <div className="analytics-chart-footer"><span className="flex flex-wrap items-center gap-4"><span className="analytics-legend-current">Current period</span><span className="analytics-legend-previous">Previous period</span></span><span>Illustrative trend</span></div>
          <p className="analytics-description">Expert in Google Analytics 4 for deep-dive Behavioral Analysis and CRM data integration, enabling a unified view of the Customer Journey and data-driven Decision-Making.</p>
        </motion.article>
      </div>
    </section>
  );
}