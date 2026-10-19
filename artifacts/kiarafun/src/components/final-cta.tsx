import { useLayoutEffect, useRef } from 'react';
import { gsap, reducedMotion } from '@/lib/motion';
import { Cloud, Ribbon, Sparkle } from './art';
import { Cta } from './cta';

export function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const st = { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 0.8 };
      gsap.fromTo('.f-cloud-a', { x: -80 }, { x: 60, ease: 'none', scrollTrigger: st });
      gsap.fromTo('.f-cloud-b', { x: 80 }, { x: -60, ease: 'none', scrollTrigger: st });
      gsap.from('.f-head', { yPercent: 100, duration: 1.1, stagger: 0.12, ease: 'power4.out', scrollTrigger: { trigger: '.f-head', start: 'top 85%', toggleActions: 'play none none reverse' } });
      gsap.from('.f-frame', { y: 80, rotate: 14, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.f-frame', start: 'top 92%', toggleActions: 'play none none reverse' } });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="story-start" aria-labelledby="final-title" className="relative isolate overflow-hidden pb-28 pt-28 lg:pb-40 lg:pt-44 [background:linear-gradient(180deg,#fff1c7_0%,#bde5fc_28%,#5cbcf7_70%,#2da9f5_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Cloud className="f-cloud-a absolute left-[-4%] top-[30%] w-72 opacity-90" />
        <Cloud className="f-cloud-b absolute right-[-3%] top-[52%] w-96 opacity-95" />
        <Cloud className="f-cloud-a absolute bottom-[-2rem] left-[22%] w-[32rem] max-w-none opacity-90" />
        <Sparkle className="drift absolute left-[14%] top-[22%] w-6" />
        <Sparkle className="drift absolute right-[22%] top-[34%] w-8 [animation-delay:-4s]" fill="#ffffff" />
      </div>

      <div className="mx-auto grid max-w-[1440px] items-end gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-8">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-k-navy/75">
            <span className="h-px w-10 bg-k-ribbon" /> Next episode
          </p>
          <h2 id="final-title" className="font-display text-[clamp(3rem,9.5vw,9rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-k-navy">
            <span className="block overflow-hidden pb-[0.1em]"><span className="f-head block">Your story</span></span>
            <span className="block overflow-hidden pb-[0.14em]"><span className="f-head block">starts <em className="font-accent font-normal italic tracking-normal text-k-ribbon">here.</em></span></span>
          </h2>
          <p className="mt-6 max-w-lg text-xl leading-relaxed text-k-navy/85">A more expressive way to launch on Solana is taking shape.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Cta id="top" variant="primary" testId="button-back-to-beginning">Back to the Beginning</Cta>
            <Cta id="features" variant="light" arrow="down" testId="button-explore-vision">Explore the Vision</Cta>
          </div>
        </div>
        <div className="relative lg:col-span-4 lg:justify-self-end">
          <div className="f-frame relative mx-auto w-[min(72vw,300px)] rotate-3 bg-k-cloud p-3 pb-12 shadow-[0_40px_50px_-25px_rgba(24,43,73,.6)]">
            <img src="/assets/kiara-mascot.png" alt="Kiara beaming under a bright blue sky" width={1024} height={1024} loading="lazy" className="aspect-square w-full object-cover" />
            <p className="absolute inset-x-0 bottom-3 text-center font-accent text-xl italic text-k-navy">to be continued...</p>
            <Ribbon className="wiggle-hover absolute -left-6 -top-8 w-16 -rotate-12 drop-shadow-[0_6px_6px_rgba(24,43,73,.25)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
