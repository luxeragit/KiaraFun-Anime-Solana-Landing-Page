import { useLayoutEffect, useRef } from 'react';
import { Cloud, Ribbon, Sparkle } from './art';
import { Cta } from './cta';
import { gsap, reducedMotion } from '@/lib/motion';

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion() || !root.current) return;
    const el = root.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-bg', { opacity: 0.8, duration: 0.5, ease: 'power1.out' })
        .from('.hl-line > span', { yPercent: 18, duration: 0.65, stagger: 0.08 }, 0.05)
        .from('.hero-eyebrow', { opacity: 0.7, y: 8, duration: 0.5 }, 0)
        .from('.hero-sub', { opacity: 0.7, y: 12, duration: 0.5 }, 0.15)
        .from('.hero-cta > *', { opacity: 0.7, y: 10, duration: 0.5, stagger: 0.06 }, 0.2)
        .from('.hero-status', { opacity: 0.7, duration: 0.5 }, 0.25)
        .from('.hero-mascot', { opacity: 0.8, x: 25, scale: 1.02, duration: 0.75, ease: 'power2.out' }, 0)
        .from('.hero-accent', { opacity: 0, scale: 0.5, rotate: -20, duration: 0.65, stagger: 0.08, ease: 'back.out(1.6)' }, 0.25)
        .from('.hero-cloud', { opacity: 0.5, x: -20, duration: 0.75, stagger: 0.1 }, 0.1);

      gsap.to('.hero-float', { y: -9, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.hero-breathe', { scale: 1.018, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      // Cursor-reactive clouds & ribbon (desktop pointers only)
      if (window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) {
        const items = gsap.utils.toArray<HTMLElement>('[data-depth]').map((n) => ({
          depth: Number(n.dataset.depth),
          x: gsap.quickTo(n, 'x', { duration: 1.1, ease: 'power3.out' }),
          y: gsap.quickTo(n, 'y', { duration: 1.1, ease: 'power3.out' }),
        }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          items.forEach((i) => {
            i.x(nx * i.depth);
            i.y(ny * i.depth);
          });
        };
        window.addEventListener('pointermove', move);
        return () => window.removeEventListener('pointermove', move);
      }
      return undefined;
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} aria-label="Introduction" className="relative isolate min-h-[100dvh] overflow-hidden">
      <div className="hero-bg absolute inset-0 -z-20" />

      {/* sky details */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-cloud absolute left-[-6%] top-[22%] hidden w-[22rem] opacity-80 lg:block" data-depth="-30">
          <Cloud className="drift w-full" />
        </div>
        <div className="hero-cloud absolute left-[34%] top-[8%] hidden w-44 opacity-70 lg:block" data-depth="40">
          <Cloud className="drift w-full [animation-delay:-6s]" />
        </div>
        <div className="hero-cloud absolute right-[-4%] top-[62%] hidden w-64 opacity-90 lg:block" data-depth="-50">
          <Cloud className="drift w-full [animation-delay:-3s]" />
        </div>
        <svg className="absolute bottom-[14%] left-[3%] hidden w-[46%] lg:block" viewBox="0 0 600 40" fill="none">
          <path d="M0 30C120 4 240 4 360 22S520 36 600 8" stroke="#182b49" strokeOpacity=".18" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="mx-auto grid min-h-[100dvh] max-w-[1440px] grid-cols-1 lg:grid-cols-12">
        {/* mascot */}
        <div className="relative order-1 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[60%]">
          <div className="hero-mascot hero-mask relative mx-auto mt-20 aspect-square w-[min(92vw,540px)] lg:mx-0 lg:mt-0 lg:h-full lg:w-full lg:max-w-none lg:aspect-auto">
            <div className="hero-float h-full w-full">
              <div className="hero-breathe h-full w-full">
                <img
                  src="/assets/kiara-mascot.png"
                  alt="Kiara, the KiaraFun mascot, smiling happily with her hands on her cheeks beneath a bright blue sky"
                  width={1024}
                  height={1024}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[50%_0%]"
                />
              </div>
            </div>
          </div>
          <div className="hero-accent absolute left-[6%] top-[19%] w-12 sm:w-16 lg:left-[6%] lg:top-[14%] lg:w-20" data-depth="26" style={{ rotate: '-14deg' }}>
            <Ribbon className="wiggle-hover w-full drop-shadow-[0_8px_8px_rgba(24,43,73,.18)]" />
          </div>
          <div className="hero-accent absolute right-[6%] top-[42%] w-6 lg:right-[4%] lg:w-9" data-depth="-18">
            <Sparkle className="w-full" />
          </div>
          <div className="hero-accent absolute bottom-[12%] left-[16%] hidden w-5 lg:block" data-depth="30">
            <Sparkle className="w-full" fill="#ffe5a5" />
          </div>
        </div>

        {/* copy */}
        <div className="relative z-10 order-2 flex flex-col justify-center px-6 pb-20 pt-2 sm:px-10 lg:col-span-6 lg:px-12 lg:py-32 xl:px-16">
          <p className="hero-eyebrow mb-5 flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-k-navy/75 sm:text-xs">
            <span className="h-px w-8 bg-k-ribbon" />A little different. A lot more fun.
          </p>
          <h1 className="font-display text-[clamp(2.75rem,7.2vw,7rem)] font-extrabold leading-[0.94] tracking-[-0.035em] text-k-navy">
            <span className="hl-line block overflow-hidden pb-[0.08em]">
              <span className="block">Every Coin</span>
            </span>
            <span className="hl-line block overflow-hidden pb-[0.12em]">
              <span className="block">
                Has a <em className="font-accent font-normal italic tracking-normal text-k-ribbon">Story.</em>
              </span>
            </span>
          </h1>
          <p className="hero-sub mt-6 max-w-[34rem] text-[1.08rem] leading-relaxed text-k-navy/80 sm:text-lg">
            Meet KiaraFun — an upcoming Solana launchpad where creative ideas, transparent launches, and communities come together.
          </p>
          <div className="hero-cta mt-9 flex flex-wrap items-center gap-3">
            <Cta id="about" testId="button-discover">Discover KiaraFun</Cta>
            <Cta id="journey" variant="ghost" testId="button-how-it-works">How It Works</Cta>
          </div>
          <p className="hero-status mt-8 flex items-center gap-2.5 text-sm font-medium text-k-navy/70">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-k-sun opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-k-sun" />
            </span>
            Currently in development · Built for Solana
          </p>
        </div>
      </div>

      <div className="absolute bottom-7 left-6 z-10 hidden items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.25em] text-k-navy/60 lg:flex xl:left-16" aria-hidden="true">
        <span className="relative block h-9 w-px overflow-hidden bg-k-navy/20">
          <span className="scroll-dot absolute left-[-1px] top-0 size-[3px] rounded-full bg-k-ribbon" />
        </span>
        Scroll
      </div>
    </section>
  );
}
