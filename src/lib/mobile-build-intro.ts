import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { introScrollDistance, introScrub } from './build-intro';

/** Called only inside useGSAP/matchMedia, after fonts and the portrait are ready. */
export function setupMobileBuild(hero: HTMLElement, main: Element, skip: HTMLButtonElement | null) {
  const mobile = window.innerWidth < 768;
  let width = window.innerWidth;
  let height = window.innerHeight;
  ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' });
  const layer = document.createElement('div');
  layer.className = 'build-layer build-layer-light';
  layer.setAttribute('aria-hidden', 'true');
  hero.append(layer);
  const add = (className: string, text = '') => {
    const node = document.createElement('div'); node.className = className; node.textContent = text; layer.append(node); return node;
  };
  const ruler = add('build-ruler build-ruler-top');
  const guide = add('build-guide build-guide-horizontal');
  const status = add('build-status', 'Building portfolio… 0%');
  const selectors = ['.editorial-name span:first-child', '.editorial-name span:last-child', '.editorial-portrait', '.editorial-badge-roi', '.editorial-badge-growth', '.editorial-role', '.editorial-expertise', '.editorial-action', '.editorial-availability'];
  const items = selectors.flatMap((selector, index) => {
    const element = hero.querySelector<HTMLElement>(selector);
    if (!element) return [];
    const box = add(`build-box${index === 2 ? ' build-box-photo' : ''}`);
    // Three grouped selection stages, with skeletons only on the main content.
    const skeleton = index < 3 || index === 6 ? document.createElement('div') : null;
    if (skeleton) { skeleton.className = 'build-skeleton'; box.append(skeleton); }
    return [{ element, box, skeleton, index }];
  });
  const elements = items.map(item => item.element);
  const measure = () => {
    const bounds = hero.getBoundingClientRect();
    items.forEach(({ element, box }) => {
      const rect = element.getBoundingClientRect();
      Object.assign(box.style, { left: `${rect.left - bounds.left}px`, top: `${rect.top - bounds.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
    });
    const bottom = Math.min(hero.clientHeight, height - bounds.top) - 42;
    status.style.top = `${bottom}px`;
    if (skip) skip.style.top = `${bottom - 8}px`;
  };
  measure();
  gsap.set(elements, { opacity: 0 });
  gsap.set(items.map(item => item.box), { opacity: 0 });
  // Visible before the first swipe; full guide feedback within the first few pixels.
  gsap.set([ruler, guide], { opacity: 0.25 });
  hero.classList.remove('build-mobile-pending');
  const hint = hero.querySelector('.build-scroll-hint');
  // End the CSS entrance animation so its fill mode cannot override scrubbed opacity.
  if (hint instanceof HTMLElement) hint.style.animation = 'none';
  const promote = (active: boolean) => {
    hero.classList.toggle('build-pinned-light', active);
    elements.forEach(element => { element.style.willChange = active ? 'transform, opacity' : ''; });
  };
  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      id: 'portfolio-build', trigger: hero.parentElement, start: () => `top ${hero.closest('main') ? parseFloat(getComputedStyle(main).paddingTop) : 0}px`,
      end: () => `+=${introScrollDistance(width, height)}`, pin: hero.parentElement,
      scrub: introScrub(width), anticipatePin: 1,
      onToggle: self => promote(self.isActive),
    },
    onUpdate: () => {
      const progress = timeline.progress();
      status.textContent = progress >= .999 ? '✓ Live' : `Building portfolio… ${Math.round(progress * 100)}%`;
      hero.style.setProperty('--build-glow-opacity', String(Math.max(0, (progress - .9) * 10)));
    },
  });
  timeline.to({}, { duration: 1 }, 0)
    .to([ruler, guide], { opacity: 1, duration: .015 }, 0);
  if (hint) timeline.to(hint, { opacity: 0, duration: .08 }, 0);
  for (const { element, box, skeleton, index } of items) {
    const group = index < 3 ? 0 : index < 6 ? 1 : 2;
    timeline.to(box, { opacity: 1, duration: .06 }, .08 + group * .07);
    const at = index < 3 ? .30 + index * .045 : .55 + (index - 3) * .024;
    if (index === 0) {
      timeline.fromTo(element, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: .13 }, at);
    } else if (index === 2) {
      timeline.to(element, { opacity: 1, duration: .16 }, at);
      const image = element.querySelector('img');
      if (image) timeline.fromTo(image, { scale: 1.04, opacity: 0 }, { scale: 1, opacity: 1, duration: .16 }, at);
    } else {
      timeline.fromTo(element, { y: 12 }, { y: 0, opacity: 1, duration: index === 1 ? .13 : .1 }, at);
    }
    if (skeleton) timeline.to(skeleton, { opacity: 0, duration: .1 }, at);
  }
  timeline.to([ruler, guide, ...items.map(item => item.box)], { opacity: 0, duration: .2 }, .8)
    .to(status, { opacity: 0, duration: .02 }, .98);
  if (skip) {
    gsap.set(skip, { opacity: 1, pointerEvents: 'auto' });
    timeline.to(skip, { opacity: 0, pointerEvents: 'none', duration: .02 }, .98);
  }
  if (mobile) {
    main.querySelectorAll('section').forEach(section => {
      const nodes = section.querySelectorAll('h2, [data-build-card], .analytics-card, #proposals figure, .automation-shell, #brands .glass-panel, #experience button.glass, #experience div.glass.gradient-border, #contact a.glass, #contact form.glass');
      nodes.forEach((node, index) => gsap.fromTo(node, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .6, delay: (index % 3) * .05, clearProps: 'opacity,transform,willChange', scrollTrigger: { trigger: node, start: 'top 85%', once: true } }));
    });
  }
  const onResize = () => {
    if (window.innerWidth === width) return;
    width = window.innerWidth; height = window.innerHeight;
    // Measure final geometry, not the current animated transforms.
    const progress = timeline.progress(); timeline.progress(1);
    measure(); ScrollTrigger.refresh(); timeline.progress(progress);
  };
  window.addEventListener('resize', onResize);
  ScrollTrigger.refresh();
  return () => {
    window.removeEventListener('resize', onResize);
    promote(false); hero.style.removeProperty('--build-glow-opacity'); layer.remove();
    if (hint instanceof HTMLElement) hint.style.removeProperty('animation');
    hero.classList.remove('build-mobile-pending');
    ScrollTrigger.config({ ignoreMobileResize: false, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize' });
  };
}