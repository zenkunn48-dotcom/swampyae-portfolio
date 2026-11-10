import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EditorialHero() {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className="editorial-scene"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="editorial-topline">
        <span className="editorial-availability"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />Available for Management and Strategic Roles</span>
      </div>
      <h1 className="editorial-name"><span>AUNG</span> <span>SWAM PYAE</span></h1>
      <div className="editorial-portrait">
        <img src="/profile.jpg" alt="Aung Swam Pyae" width={1920} height={1920} fetchPriority="high" />
      </div>
      <div className="editorial-badge editorial-badge-roi"><Sparkles className="h-4 w-4 text-cyan" />ROI Focused</div>
      <div className="editorial-badge editorial-badge-growth"><TrendingUp className="h-4 w-4 text-emerald" />Data-Driven Growth</div>
      <p className="editorial-role text-center mx-auto whitespace-nowrap">Digital Marketing Senior Supervisor</p>
      <div className="editorial-bottomline">
        <div className="editorial-expertise">
          <p className="text-xs text-muted-foreground">Nearly 4 years of hands-on experience</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Media Buying", "Growth Strategy", "Brand Activations", "Marketing Strategies", "AI & Automation Strategist", "SEO", "SEM Strategies"].map(tag => <span key={tag} className="editorial-tag">{tag}</span>)}
          </div>
        </div>
        <Button asChild variant="outline" className="editorial-action group">
          <a href="#experience">Explore Portfolio <ArrowRight className="transition-transform group-hover:translate-x-1" /></a>
        </Button>
      </div>
    </motion.div>
  );
}