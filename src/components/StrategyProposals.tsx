import { motion, useReducedMotion } from "framer-motion";

const proposals = [
  {
    src: "/assets/proposals/linkedin-branding-proposal.png",
    title: "LinkedIn Branding Strategies 6 Months Proposal",
    alt: "LinkedIn Branding Strategies 6 Months Proposal cover mockup",
  },
  {
    src: "/assets/proposals/digital-awareness-proposal.png",
    title: "Digital Awareness Campaign Proposal",
    alt: "Digital Awareness Campaign Proposal cover mockup",
  },
];

export function StrategyProposals() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="proposals" className="py-12 sm:py-20" aria-labelledby="proposals-heading">
      <div className="mb-8">
        <span className="text-sm font-medium text-cyan">Proposals & Planning</span>
        <h2 id="proposals-heading" className="mt-3 text-3xl font-bold sm:text-4xl">Strategy & Proposals</h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2" style={{ perspective: "1400px" }}>
        {proposals.map((proposal, index) => (
          <motion.figure
            key={proposal.title}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 70, rotateX: 14, rotateY: index === 0 ? 12 : -12 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={reduceMotion ? undefined : { y: -8 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            className="group glass-panel rounded-3xl border border-white/15 bg-slate-900/40 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-300 ease-out hover:border-white/30 hover:bg-white/[0.08] hover:shadow-cyan-500/10 sm:p-8"
          >
            <div className="flex items-center justify-center overflow-hidden rounded-2xl px-2 py-4">
              <img
                src={proposal.src}
                alt={proposal.alt}
                loading="lazy"
                width={529}
                height={402}
                className="idle-float w-full max-w-sm drop-shadow-2xl transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                style={{ animationDelay: `${index * -1.6}s` }}
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
              <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[var(--cyan)] to-[var(--violet)]" aria-hidden />
              <span className="text-sm font-semibold tracking-wide text-foreground sm:text-base">{proposal.title}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
        Extensive experience managing complex Projects, encompassing the development of precise{" "}
        <strong className="font-semibold text-foreground">Proposals</strong> for{" "}
        <strong className="font-semibold text-foreground">Market Targeting</strong>,{" "}
        <strong className="font-semibold text-foreground">Digital Marketing Strategies</strong>, and{" "}
        <strong className="font-semibold text-foreground">Branding Strategies</strong>, all informed by rigorous Market
        Research, Current Market Trends, and Future Market Trends.
      </p>
    </section>
  );
}
