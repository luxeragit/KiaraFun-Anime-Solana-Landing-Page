import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

let lenis: Lenis | null = null;

export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** One Lenis instance, driven by the single GSAP ticker (no second rAF loop). */
export function startSmoothScroll() {
  if (reducedMotion()) return () => {};
  const l = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenis = l;
  l.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => l.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    l.destroy();
    if (lenis === l) lenis = null;
  };
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const done = () => {
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    history.replaceState(null, '', `${location.pathname}${location.search}#${id}`);
  };
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.5, onComplete: done });
  } else {
    el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
    done();
  }
}
