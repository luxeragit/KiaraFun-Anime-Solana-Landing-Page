import { useLayoutEffect, useRef } from 'react';
import { Cta } from './cta';
import { gsap, reducedMotion } from '@/lib/motion';

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { yPercent: 20, duration: 0.8, stagger: 0.14, ease: 'power3.out' });
      gsap.from('.hero-rise', { y: 14, duration: 0.6, stagger: 0.07, delay: 0.25, ease: 'power3.out' });
      gsap.from('.hero-mascot-inner', { scale: 1.06, duration: 1.2, ease: 'power2.out' });
      gsap.to('.hero-mascot-inner', { yPercent: 5, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-line-b', { xPercent: 3, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} aria-label="Introduction" className="relative isolate overflow-hidden lg:min-h-[100dvh]">
      <div className="hero-bg absolute inset-0 -z-10" aria-hidden="true" />

      <div className="px-6 pt-28 sm:px-10 lg:px-0 lg:pt-0">
        {/* Headline: line one tucked top-left in the sky, line two runs full-width under her chin */}
        <h1 className="relative z-10 font-display font-bold tracking-[-0.045em] text-k-navy lg:pointer-events-none lg:absolute lg:inset-0">
          <span className="block overflow-hidden pb-[0.1em] text-[clamp(2.4rem,9vw,4rem)] leading-none lg:absolute lg:left-8 xl:left-16 lg:top-[18dvh] lg:text-[3.4vw]">
            <span className="hero-line block">Meet your new</span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] text-[clamp(2.2rem,10.2vw,4.4rem)] leading-[1.02] lg:absolute lg:bottom-[5dvh] lg:left-14 lg:z-20 lg:text-[9.2vw] lg:leading-none">
            <span className="hero-line hero-line-b block">Solana launchpad.</span>
          </span>
        </h1>

        <div className="hero-mascot hero-mask pointer-events-none relative z-0 mx-auto -mt-8 w-[min(104vw,520px)] max-lg:-mx-6 max-lg:w-[calc(100%+3rem)] max-lg:max-w-none sm:max-lg:mx-auto sm:max-lg:w-[min(80vw,560px)] lg:absolute lg:left-1/2 lg:top-[6dvh] lg:mx-0 lg:mt-0 lg:w-[min(86dvh,46vw)] lg:-translate-x-1/2">
          <div className="hero-mascot-inner">
            <img
              src="/assets/kiara-mascot.png"
              alt="Kiara, the KiaraFun mascot, smiling with her hands on her cheeks under a bright blue sky"
              width={1024}
              height={1024}
              fetchPriority="high"
              className="block w-full"
            />
          </div>
        </div>

        <div className="relative z-20 -mt-14 pb-16 lg:absolute lg:right-16 lg:top-[30dvh] lg:mt-0 lg:w-[16rem] lg:pb-0 xl:w-[18rem]">
          <p className="hero-rise mb-5 inline-flex items-center gap-2.5 rounded-full bg-white/75 py-2 pl-3 pr-4 text-sm font-semibold text-k-navy ring-1 ring-k-navy/10" data-testid="status-development">
            <span className="relative flex size-2.5">
              <span className="pulse-dot absolute inline-flex size-full rounded-full bg-k-sun" />
              <span className="relative inline-flex size-2.5 rounded-full bg-k-sun" />
            </span>
            Launchpad in development
          </p>
          <p className="hero-rise max-w-[26rem] text-lg leading-relaxed text-k-navy/90">
            Create tokens, discover new launches, and grow communities — with a little KiaraFun.
          </p>
          <div className="hero-rise mt-6 flex flex-wrap gap-3 lg:flex-col lg:items-start">
            <Cta id="launch-model" arrow="down" testId="button-launch-model">Explore the launch model</Cta>
            <Cta id="why" variant="ghost" testId="button-why">Why KiaraFun?</Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
