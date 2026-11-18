import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { introScrollDistance } from '@/lib/build-intro';
import { setupMobileBuild } from '@/lib/mobile-build-intro';

const targets = [
  ['.editorial-name span:first-child', 'H1 · AUNG', .35],
  ['.editorial-name span:last-child', 'H1 · SWAM PYAE', .43],
  ['.editorial-portrait', 'IMG · Profile', .55],
  ['.editorial-badge-roi', 'Badge', .64],
  ['.editorial-badge-growth', 'Badge', .68],
  ['.editorial-role', 'Title', .75],
  ['.editorial-expertise', 'Tags', .79],
  ['.editorial-action', 'Button', .84],
  ['.editorial-availability', 'Status', .82],
] as const;

/** All DOM measurements and GSAP registration stay inside the browser lifecycle. */
export function PortfolioBuildIntro() {
  const skip = useRef<HTMLButtonElement>(null);
  useGSAP((_context, contextSafe) => {
    gsap.registerPlugin(ScrollTrigger);
    const hero = document.querySelector<HTMLElement>('.editorial-scene');
    const main = document.querySelector('main');
    if (!hero || !main || !contextSafe) return;
    let disposed = false;
    const removals: Array<() => void> = [];
    const media = gsap.matchMedia();
    const initialize = contextSafe(() => {
      if (disposed) return;
      media.add('(prefers-reduced-motion: no-preference) and (max-width: 1023px)', () => setupMobileBuild(hero, main, skip.current));
      media.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
        const layer = document.createElement('div');
        layer.className = 'build-layer';
        layer.setAttribute('aria-hidden', 'true');
        hero.append(layer);
        const add = (className: string, text = '') => {
          const node = document.createElement('div');
          node.className = className;
          node.textContent = text;
          layer.append(node);
          return node;
        };
        const rulers = [add('build-ruler build-ruler-top'), add('build-ruler build-ruler-left')];
        const guides = [add('build-guide build-guide-horizontal'), add('build-guide build-guide-vertical')];
        const status = add('build-status', 'Building portfolio… 0%');
        const cursor = add('build-cursor');
        cursor.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M1 1v13l4-4 3 5 2-1-3-5h6Z"/></svg><span>ASP</span><i></i>';
        const items = targets.flatMap(([selector, label, at], index) => {
          const element = hero.querySelector<HTMLElement>(selector);
          if (!element) return [];
          const box = add(`build-box${label.startsWith('IMG') ? ' build-box-photo' : ''}`);
          const tag = document.createElement('span');
          tag.className = 'build-label'; tag.textContent = label; box.append(tag);
          const skeleton = document.createElement('div');
          skeleton.className = 'build-skeleton'; box.append(skeleton);
          for (let corner = 0; corner < 4; corner++) {
            const handle = document.createElement('i'); handle.className = `build-handle build-handle-${corner}`; box.append(handle);
          }
          return [{ element, box, skeleton, at, index }];
        });
        const measure = () => {
          const bounds = hero.getBoundingClientRect();
          for (const item of items) {
            const rect = item.element.getBoundingClientRect();
            Object.assign(item.box.style, { left: `${rect.left - bounds.left}px`, top: `${rect.top - bounds.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
          }
          const bottom = Math.min(hero.clientHeight, window.innerHeight) - 36;
          status.style.top = `${bottom}px`;
          if (skip.current) skip.current.style.top = `${bottom - 8}px`;
        };
        measure();
        const timeline = gsap.timeline({
          scrollTrigger: {
            id: 'portfolio-build', trigger: hero.parentElement, start: 'top top',
            end: () => `+=${introScrollDistance(window.innerWidth, window.innerHeight)}`,
            pin: hero.parentElement, scrub: 1, invalidateOnRefresh: true,
          },
          onUpdate: () => {
            const progress = timeline.progress();
            status.textContent = progress >= .999 ? '✓ Live' : `Building portfolio… ${Math.round(progress * 100)}%`;
          },
        });
        gsap.set(items.map(item => item.element), { opacity: 0 });
        gsap.set([...rulers, ...guides, ...items.map(item => item.box), cursor], { opacity: 0 });
        timeline.to({}, { duration: 1 }, 0);
        timeline.fromTo(rulers[0], { y: -16 }, { y: 0, opacity: 1, duration: .08 }, 0)
          .fromTo(rulers[1], { x: -16 }, { x: 0, opacity: 1, duration: .08 }, .03)
          .fromTo(guides[0], { scaleX: 0 }, { scaleX: 1, opacity: 1, duration: .1 }, .04)
          .fromTo(guides[1], { scaleY: 0 }, { scaleY: 1, opacity: 1, duration: .1 }, .05);
        for (const item of items) {
          const { element, box, skeleton, at, index } = item;
          const arrival = .15 + index * .019;
          timeline.to(box, { opacity: 1, duration: .035 }, arrival);
          if (index < 2) {
            timeline.fromTo(element, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: .12 }, at);
          } else if (index === 2) {
            // A fading frosted overlay provides blur without animating an expensive filter.
            const frost = document.createElement('div'); frost.className = 'build-photo-frost'; box.append(frost);
            const image = element.querySelector('img');
            timeline.to(element, { opacity: 1, duration: .16 }, at);
            if (image) timeline.fromTo(image, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: .16 }, at);
            timeline.to(frost, { opacity: 0, duration: .16 }, at);
          } else if (index === 3 || index === 4) {
            timeline.fromTo(element, { scale: .8 }, { scale: 1, opacity: 1, ease: 'back.out(1.4)', duration: .07 }, at);
          } else {
            timeline.fromTo(element, { y: 16 }, { y: 0, opacity: 1, duration: .06 }, at);
          }
          if (index === 6) timeline.fromTo(element.querySelectorAll('.editorial-tag'), { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: .004, duration: .04 }, at);
          timeline.to(skeleton, { opacity: 0, duration: .06 }, at);
          timeline.to(box, { opacity: 0, duration: .04 }, .85 + index * .008);
          timeline.to(cursor, { x: () => parseFloat(box.style.left) + Math.min(40, parseFloat(box.style.width) / 2), y: () => parseFloat(box.style.top) + 20, opacity: 1, duration: .04 }, arrival);
          timeline.fromTo(cursor.querySelector('i'), { scale: 0, opacity: .7 }, { scale: 1.5, opacity: 0, duration: .04 }, arrival + .04);
        }
        timeline.to([...rulers, ...guides, cursor], { opacity: 0, duration: .06 }, .9)
          .to(status, { opacity: 0, duration: .001 }, .999);
        if (skip.current) {
          gsap.set(skip.current, { opacity: 1, pointerEvents: 'auto' });
          timeline.to(skip.current, { opacity: 0, pointerEvents: 'none', duration: .02 }, .98);
        }

        const cardOverlays: HTMLElement[] = [];
        const sections = main.querySelectorAll<HTMLElement>('section');
        sections.forEach(section => {
          const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-build-card], .analytics-card, #proposals figure, .automation-shell, #brands .glass-panel, #experience button.glass, #experience div.glass.gradient-border, #contact a.glass, #contact form.glass'));
          const heading = section.querySelector('h2');
          if (heading) gsap.fromTo(heading, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .6, scrollTrigger: { trigger: heading, start: 'top 75%', once: true } });
          cards.forEach((card, index) => {
            const frame = document.createElement('div'); frame.className = 'build-card-frame'; frame.setAttribute('aria-hidden', 'true');
            const label = document.createElement('span'); label.className = 'build-label'; label.textContent = `Card · ${card.querySelector('h3')?.textContent || section.querySelector('h2')?.textContent || 'Metrics'}`;
            frame.append(label); card.append(frame); cardOverlays.push(frame);
            const originalPosition = card.style.position;
            if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
            removals.push(() => { card.style.position = originalPosition; });
            const content = Array.from(card.children).filter(child => child !== frame);
            const reveal = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 75%', once: true }, delay: index * .08 });
            reveal.fromTo(frame, { opacity: 0, clipPath: 'inset(50%)' }, { opacity: 1, clipPath: 'inset(0%)', duration: .25 })
              .fromTo(content, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, clearProps: 'opacity,transform,willChange' }, .2)
              .to(frame, { opacity: 0, duration: .2 }, .7);
          });
        });
        const observer = new ResizeObserver(() => { measure(); ScrollTrigger.refresh(); });
        observer.observe(hero);
        const onResize = () => { measure(); ScrollTrigger.refresh(); };
        window.addEventListener('resize', onResize);
        ScrollTrigger.addEventListener('refreshInit', measure);
        const image = hero.querySelector('img');
        const onLoad = () => { measure(); ScrollTrigger.refresh(); };
        image?.addEventListener('load', onLoad);
        ScrollTrigger.refresh();
        return () => {
          observer.disconnect(); window.removeEventListener('resize', onResize);
          ScrollTrigger.removeEventListener('refreshInit', measure);
          image?.removeEventListener('load', onLoad);
          layer.remove(); cardOverlays.forEach(node => node.remove());
          removals.splice(0).forEach(remove => remove());
        };
      });
    });
    const image = hero.querySelector('img');
    const imageReady = image && !image.complete && window.innerWidth < 1024
      ? new Promise<void>(resolve => {
        const finish = () => { image.removeEventListener('load', finish); image.removeEventListener('error', finish); resolve(); };
        image.addEventListener('load', finish); image.addEventListener('error', finish);
        removals.push(() => { image.removeEventListener('load', finish); image.removeEventListener('error', finish); });
      }) : Promise.resolve();
    void Promise.all([document.fonts.ready, imageReady]).then(initialize);
    return () => { disposed = true; media.revert(); removals.splice(0).forEach(remove => remove()); };
  }, []);

  return <Button ref={skip} variant="ghost" className="build-skip" onClick={() => {
    const trigger = ScrollTrigger.getById('portfolio-build');
    if (trigger) window.scrollTo({ top: trigger.end + 1, behavior: 'smooth' });
  }}>Skip intro ↓</Button>;
}