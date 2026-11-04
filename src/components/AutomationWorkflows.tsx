import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Code2, GitBranch, Layers3, Search, Workflow, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const nodes = {
  n8n: { name: 'N8N Workflows', label: 'Triggers & pipelines', icon: Workflow, tone: 'coral', detail: 'Connect campaign inputs, automate data pipelines, and route leads through repeatable triggers. Less manual handoff means more time for testing and strategic decisions.' },
  lovable: { name: 'Lovable.dev', label: 'Web & SaaS prototypes', icon: Layers3, tone: 'cyan', detail: 'Turn campaign and product ideas into full-stack web and SaaS prototypes. Rapid iteration connects marketing requirements with usable digital experiences.' },
  code: { name: 'Claude Code / Codex', label: 'AI-assisted development', icon: Code2, tone: 'violet', detail: 'Use AI-assisted coding to develop integrations, refine application logic, and iterate on digital products. Human review keeps the work aligned with the brief.' },
  search: { name: 'AEO & GEO', label: 'AI search visibility', icon: Search, tone: 'lime', detail: 'Build answer-focused content and clear entity signals for AI Engine Optimization and Generative Engine Optimization. Align search visibility with audience intent and brand credibility.' },
} as const;

type NodeKey = keyof typeof nodes;
const stacks: Array<{ id: string; tab: string; eyebrow: string; title: string; description: string; outcome: string; order: NodeKey[] }> = [
  { id: 'automation', tab: 'AI WORKFLOWS', eyebrow: '01 / AUTOMATE', title: 'From manual tasks to connected growth.', description: 'Connect campaign data, AI-assisted tools, and digital experiences into repeatable workflows. Automation reduces repetitive work and creates room to scale campaigns with greater consistency.', outcome: 'Connected data. Faster execution.', order: ['n8n', 'lovable', 'code', 'search'] },
  { id: 'development', tab: 'DEV & BUILD', eyebrow: '02 / CREATE', title: 'Build faster. Iterate with purpose.', description: 'Translate marketing ideas into working web and SaaS prototypes with Lovable.dev and AI-assisted development. Connect the experience to automation, then refine it around audience needs.', outcome: 'From campaign brief to working product.', order: ['lovable', 'code', 'n8n', 'search'] },
  { id: 'visibility', tab: 'AEO & GEO', eyebrow: '03 / DISCOVER', title: 'Visibility for the next era of search.', description: 'Pair answer-focused content and generative search strategies with connected workflows. Structure brand knowledge, publish useful experiences, and streamline content operations for modern discovery.', outcome: 'Clear answers. Stronger brand signals.', order: ['search', 'n8n', 'code', 'lovable'] },
];

export function AutomationWorkflows() {
  const [active, setActive] = useState('automation');
  const [selected, setSelected] = useState<NodeKey | null>(null);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.08 });

  return (
    <motion.section ref={sectionRef} id="ai-workflows" className={cn('py-12 sm:py-20', !inView && 'automation-paused')} aria-labelledby="automation-heading" initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduceMotion ? 0 : 0.6 }}>
      <div className="mb-8">
        <span className="text-sm font-medium text-cyan">Intelligence & Execution</span>
        <h2 id="automation-heading" className="mt-3 text-3xl font-bold sm:text-4xl">AI & Automation Workflows</h2>
      </div>
      <Tabs value={active} onValueChange={value => { setActive(value); setSelected(null); }} className="automation-shell">
        <div className="automation-toolbar">
          <TabsList aria-label="AI and automation stacks" className="automation-tabs">
            {stacks.map(stack => <TabsTrigger key={stack.id} value={stack.id} className="automation-tab">{stack.tab}</TabsTrigger>)}
          </TabsList>
          <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><GitBranch size={14} /> Connected capabilities</span>
        </div>
        {stacks.map(stack => (
          <TabsContent key={stack.id} value={stack.id} className="m-0">
            <div className="automation-content">
              <motion.div key={`${stack.id}-${selected}`} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }} className="automation-copy" aria-live="polite">
                <span className="text-xs font-medium text-cyan">{stack.eyebrow}</span>
                <h3 className="mt-4 text-2xl font-semibold leading-snug">{selected ? nodes[selected].name : stack.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{selected ? nodes[selected].detail : stack.description}</p>
                <div className="mt-6 flex items-start gap-2 text-xs font-medium text-cyan"><ArrowUpRight size={16} className="shrink-0" />{stack.outcome}</div>
              </motion.div>
              <div className="automation-canvas" role="group" aria-label={`${stack.tab} capability workflow`}>
                <svg className="automation-connections" viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden="true">
                  {['M 260 90 H 340', 'M 450 145 V 180 H 150 V 215', 'M 260 270 H 340'].map(path => <g key={path}><path d={path} className="automation-wire" /><path d={path} className="automation-pulse" /></g>)}
                </svg>
                {stack.order.map((key, index) => {
                  const node = nodes[key];
                  return <Button key={key} variant="ghost" aria-pressed={selected === key} onClick={() => setSelected(current => current === key ? null : key)} className={cn('automation-node', `automation-tone-${node.tone}`, selected === key && 'is-active')}>
                    <span className="automation-node-top"><span className="automation-node-icon"><node.icon size={21} /></span><span className="text-[10px] font-medium tabular-nums text-muted-foreground">0{index + 1}</span></span>
                    <span className="automation-node-name">{node.name}</span>
                    <span className="automation-node-label">{node.label}</span>
                    <span className="automation-port automation-port-in" /><span className="automation-port automation-port-out" />
                  </Button>;
                })}
                <span className="automation-canvas-caption"><Zap size={12} /> MARKETING × DEVELOPMENT × AI</span>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </motion.section>
  );
}