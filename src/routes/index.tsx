import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Menu, X, Sun, Moon, ArrowRight, Mail, Phone, MapPin,
  Linkedin, Github, Facebook, Target, BarChart3, Search,
  Palette, Calendar, Send, TrendingUp, Sparkles, Briefcase,
  Globe, Building2, Share2, ShieldCheck, Lightbulb, Settings,
} from "lucide-react";
import profilePhoto from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aung Swam Pyae — Digital Marketing Senior Supervisor" },
      { name: "description", content: "Results-driven digital marketing leader with 3+ years driving high-ROI multi-channel growth campaigns." },
    ],
  }),
  component: Portfolio,
});

const nav = [
  { id: "about", label: "About Me" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const services = [
  { icon: Lightbulb, title: "Digital Strategy", desc: "Formulating robust digital strategies based on in-depth market research and trend analysis. Expert in audience segmentation to ensure brand objectives align with long-term growth." },
  { icon: Target, title: "Paid Ads Campaign", desc: "Executing high-impact campaigns across Meta Ads and Google Ads. Leveraging advanced audience analysis, UTM tracking, and real-time optimization to maximize ROI and data-backed performance." },
  { icon: BarChart3, title: "Analytics & Local SEO", desc: "Managing global and local visibility through Google Business Profile management. Advanced tracking setup using Google Tag Manager, GA4 behavioral data, and custom CRM dashboard integrations." },
  { icon: Settings, title: "Marketing Automation & CMS", desc: "Designing lead-generation funnels and integrating automation workflows via HubSpot and Zapier. Seamless web development, optimization, and content updates on WordPress." },
  { icon: Palette, title: "Creative Direction & Content Strategy", desc: "Developing targeted content strategies, copywriting frameworks, and content calendars. Overseeing visual asset creation using Adobe Illustrator, Photoshop, and Canva." },
  { icon: Calendar, title: "Event Marketing & Execution", desc: "Directing the operational lifecycle of corporate events, from strategic planning and coordination to on-site execution, ensuring perfect alignment with marketing objectives." },
];

const domains = [
  { icon: Globe, title: "Digital Marketing Agency Ecosystem", desc: "Orchestrating media buying at scale across multiple client portfolios, managing cross-brand budgets, and leading multi-project delivery pipelines with precision." },
  { icon: Building2, title: "Corporate Marketing Leadership", desc: "Directing full-lifecycle corporate strategies from ideation to execution, aligning cross-departmental operations and unifying brand vision across stakeholders." },
  { icon: Share2, title: "Franchise & Network Operations", desc: "Specialized scaling for international education and franchise networks, localizing acquisition funnels and adapting global brand playbooks to regional markets." },
  { icon: ShieldCheck, title: "Management & Brand Activation", desc: "Architecting cohesive brand identities, executing high-impact on-ground activations, safeguarding digital assets, and protecting IP across all channels." },
];

const experience = [
  { date: "Oct 2025 – Present", role: "Digital Marketing Senior Supervisor", company: "Grand Cherry Oo Co., Ltd.", desc: "Orchestrated strategic brand initiatives, handled end-to-end media buying, developed campaign proposals, and directed the corporate events lifecycle." },
  { date: "May 2025 – Sep 2025", role: "Social Media Executive", company: "Salt & Pixel Digital Marketing Agency", desc: "Media buying, cross-brand marketing strategy, copyright claims management, asset protection, and team monitoring." },
  { date: "Jan 2025 – Apr 2025", role: "Digital Marketing Executive", company: "Olor Aromatherapy", desc: "Met conversion targets, analyzed consumer demographics, and deployed e-commerce branding strategies." },
  { date: "Dec 2023 – Dec 2024", role: "Digital Marketing Staff", company: "Willtec Myanmar", desc: "Drove digital acquisition for education services, career consulting, and the Japanese Language School franchise marketing." },
  { date: "Feb 2023 – Aug 2023", role: "Content Writer", company: "Yaung Ni Mobile", desc: "Engaging tech content creation and copywriting across product launches and platform updates." },
];

type Cat = "All" | "Meta Ads" | "Google Ads" | "Branding & Events";
const projects: { title: string; desc: string; badge: Exclude<Cat, "All">; stat: string; statLabel: string }[] = [
  { title: "High-Conversion Meta Ads", desc: "Optimized for Messages, Leads, and Video Plays. Achieved lower Cost Per Result while maximizing ROI across multiple verticals.", badge: "Meta Ads", stat: "↓ 42%", statLabel: "Cost Per Result" },
  { title: "Google Ads Performance Max", desc: "Search, Display, and PMax setup focused on boosting Quality Score, lowering CPA, and scaling profitable conversions.", badge: "Google Ads", stat: "371%", statLabel: "Actual ROAS" },
  { title: "Franchise Operations Marketing", desc: "Willtec Myanmar — Amplified brand footprint in the Myanmar–Japan education sector through integrated acquisition funnels.", badge: "Branding & Events", stat: "5×", statLabel: "Lead Growth" },
  { title: "Corporate Brand Activation", desc: "Grand Cherry Oo Co., Ltd. — Multi-channel campaign proposals with cross-functional leadership across creative & ops.", badge: "Branding & Events", stat: "12+", statLabel: "Activations" },
];

function Portfolio() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [filter, setFilter] = useState<Cat>("All");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  const filtered = filter === "All" ? projects : projects.filter(p => p.badge === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 sm:mx-4">
          <button onClick={() => scrollTo("about")} className="text-lg font-extrabold tracking-tight">
            ASP<span className="text-primary">.</span>
          </button>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setDark(d => !d)} aria-label="Toggle theme" className="rounded-full border border-border p-2 transition-colors hover:bg-secondary">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => setOpen(o => !o)} className="rounded-full border border-border p-2 md:hidden" aria-label="Menu">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="glass mx-4 mt-2 rounded-2xl p-4 md:hidden">
            {nav.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-secondary">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-5 pt-32 sm:px-6">
        {/* Hero */}
        <section id="about" className="relative grid items-center gap-12 py-12 md:grid-cols-2 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--primary), transparent)" }}
          />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Available for Strategic Roles
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Hi, I'm Aung Swam Pyae
            </h1>
            <p className="mt-2 text-2xl font-semibold text-gradient sm:text-3xl">
              Digital Marketing Senior Supervisor
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              A results-driven Digital Marketing Senior Supervisor with over 3 years of experience orchestrating high-impact, multi-channel growth strategies. I specialize in driving brand visibility and maximizing ROI through data-backed decision-making, conversion optimization, and innovative content marketing.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => scrollTo("projects")} className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-[0_10px_40px_-10px_var(--primary)]">
                Explore Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button onClick={() => scrollTo("contact")} className="inline-flex items-center gap-2 rounded-xl border border-border bg-transparent px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary">
                Let's Connect
              </button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { n: "371.24%", l: "Maximum Actual ROAS (Google Ads)" },
                { n: "15M+", l: "Ad Impressions Managed" },
                { n: "45%+", l: "Average CPA Reduction" },
                { n: "3+ Years", l: "Enterprise Marketing Experience" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="flex flex-col items-center rounded-2xl border border-border bg-card/50 p-4 text-center transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--primary)_25%,transparent)]"
                >
                  <div className="bg-gradient-to-br from-primary via-[color-mix(in_oklab,var(--primary)_70%,var(--foreground))] to-foreground bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
                    {s.n}
                  </div>
                  <div className="mt-2 text-[11px] font-medium uppercase leading-snug tracking-wide text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto">
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/30 blur-3xl" />
            <div className="glow-ring relative h-72 w-72 overflow-hidden rounded-full sm:h-96 sm:w-96">
              <img src={profilePhoto} alt="Aung Swam Pyae" className="h-full w-full object-cover" />
            </div>
            <div className="glass absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl px-4 py-2 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald" /> Data-Driven Growth
            </div>
            <div className="glass absolute -right-4 top-6 flex items-center gap-2 rounded-2xl px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" /> ROI Focused
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20">
          <SectionHead eyebrow="What I Do" title="Core Expertise & Services" sub="A full-stack marketing operator — from strategy and media buying to creative direction and event execution." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--primary)_20%,transparent)]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Marketing Domains */}
        <section id="domains" className="py-20">
          <SectionHead eyebrow="Branding & Marketing" title="Strategic Marketing Domains" sub="Four core competencies that define my versatility across agency, corporate, franchise, and brand activation environments." />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {domains.map((d) => (
              <div
                key={d.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--primary)_20%,transparent)]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
                  <d.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20">
          <SectionHead eyebrow="Career" title="Professional Journey" sub="A track record of compounding impact across agencies, e-commerce, education, and corporate brands." />
          <div className="relative mt-12 ml-3 border-l border-border pl-8">
            {experience.map((e, i) => (
              <div key={i} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[37px] top-1.5 flex h-4 w-4 items-center justify-center">
                  <span className="absolute h-4 w-4 animate-ping rounded-full bg-primary/40" />
                  <span className="relative h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                </span>
                <div className="rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/40">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold">{e.role}</h3>
                    <span className="rounded-full border border-border bg-secondary/60 px-3 py-0.5 text-xs text-muted-foreground">{e.date}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-primary">
                    <Briefcase className="h-3.5 w-3.5" /> {e.company}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20">
          <SectionHead eyebrow="Selected Work" title="Featured Campaigns & Case Studies" sub="Performance-driven campaigns engineered for measurable outcomes." />
          <div className="mt-8 flex flex-wrap gap-2">
            {(["All","Meta Ads","Google Ads","Branding & Events"] as Cat[]).map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  filter === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {filtered.map(p => (
              <div key={p.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/40">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">{p.badge}</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald">{p.stat}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.statLabel}</div>
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <SectionHead eyebrow="Contact" title="Get In Touch" sub="Open to senior digital marketing roles, consulting engagements, and strategic collaborations." />
          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2">
              {[
                { icon: Mail, label: "Email", value: "aungswampyae3@gmail.com", href: "mailto:aungswampyae3@gmail.com" },
                { icon: Phone, label: "Phone", value: "09 755 158 687", href: "tel:+95755158687" },
                { icon: MapPin, label: "Address", value: "Thiri Myaing 3rd Street, 13 Quarters, Hlaing Township, Yangon" },
              ].map(c => (
                <a key={c.label} href={c.href} className="flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:border-primary/40 hover:bg-card">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="mt-1 text-sm font-medium">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
            <form onSubmit={onSubmit} className="glass space-y-4 rounded-2xl p-6 lg:col-span-3">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" />
                <Field label="Email Address" name="email" type="email" />
              </div>
              <Field label="Subject" name="subject" />
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Message</label>
                <textarea required rows={5} className="w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
              </div>
              <button type="submit" className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_10px_40px_-10px_var(--primary)]">
                {sent ? "Message Sent ✓" : (<>Submit Message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>)}
              </button>
            </form>
          </div>
        </section>

        <footer className="mt-10 border-t border-border py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">© 2026 Aung Swam Pyae. All rights reserved.</p>
            <div className="flex items-center gap-2">
              {[Linkedin, Github, Facebook].map((I, i) => (
                <a key={i} href="#" className="rounded-full border border-border p-2 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base text-muted-foreground">{sub}</p>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      <input required name={name} type={type} className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
    </div>
  );
}
