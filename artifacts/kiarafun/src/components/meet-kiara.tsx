import { useLayoutEffect, useRef } from 'react';
import { gsap, reducedMotion } from '@/lib/motion';
import { Ribbon, Sparkle } from './art';

const SWATCHES = [
  { name: 'Sky Blue', hex: '#2DA9F5' },
  { name: 'Ribbon Red', hex: '#FF515B' },
  { name: 'Sunshine Orange', hex: '#FFAA32' },
  { name: 'Soft Blonde', hex: '#FFE5A5' },
  { name: 'Deep Navy', hex: '#182B49' },
];

export function MeetKiara() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const st = { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 };
      gsap.fromTo('.m-ribbon', { rotate: -22, y: 20 }, { rotate: 14, y: -30, ease: 'none', scrollTrigger: st });
      gsap.fromTo('.m-frame', { rotate: -5 }, { rotate: 2, ease: 'none', scrollTrigger: st });
      gsap.to('.m-rays', { rotate: 40, ease: 'none', scrollTrigger: st });
      gsap.from('.m-copy > *', { y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.m-copy', start: 'top 80%', toggleActions: 'play none none reverse' } });
      gsap.from('.m-swatch', { scaleY: 0, transformOrigin: 'bottom', stagger: 0.07, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.m-swatches', start: 'top 90%', toggleActions: 'play none none reverse' } });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="meet" ref={root} aria-labelledby="meet-title" className="relative isolate overflow-hidden py-24 lg:py-36 [background:linear-gradient(180deg,#f6fbff_0%,#fff3cf_30%,#ffe5a5_62%,#fff1c7_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -left-[20%] top-[8%] -z-10 w-[70rem] max-w-none lg:left-[-10%]">
        <svg viewBox="-200 -200 400 400" className="m-rays w-full opacity-70">
          {Array.from({ length: 16 }).map((_, i) => (
            <path key={i} d="M0 0L-26 -200L26 -200Z" fill="#ffaa32" fillOpacity={i % 2 ? 0.1 : 0.05} transform={`rotate(${i * 22.5})`} />
          ))}
        </svg>
      </div>
      <Sparkle className="drift absolute right-[8%] top-[10%] -z-10 w-10" fill="#ff515b" />
      <Sparkle className="drift absolute bottom-[12%] left-[6%] -z-10 w-6 [animation-delay:-7s]" fill="#2da9f5" />

      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-16">
        <div className="relative lg:col-span-6 lg:pl-8">
          <div className="m-frame relative mx-auto w-[min(88vw,500px)] lg:mx-0">
            <div className="aspect-[10/11] overflow-hidden rounded-[2rem_2rem_2rem_40%] bg-k-sky shadow-[0_40px_60px_-30px_rgba(24,43,73,.55)] ring-8 ring-k-cloud">
              <img
                src="/assets/kiara-mascot.png"
                alt="Kiara waving hello with a big smile, her red ribbon bright against a cloudy sky"
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover object-[50%_10%] transition-transform duration-[1200ms] [transition-timing-function:var(--ease-out)] hover:scale-[1.04]"
              />
            </div>
            <div className="m-ribbon absolute -right-3 -top-12 w-24 sm:-right-8 sm:w-32">
              <Ribbon className="wiggle-hover w-full drop-shadow-[0_10px_10px_rgba(24,43,73,.22)]" />
            </div>
          </div>
        </div>

        <div className="m-copy lg:col-span-6 lg:pl-8">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-k-navy/75">
            <span className="h-px w-10 bg-k-ribbon" /> Meet Kiara
          </p>
          <h2 id="meet-title" className="font-display text-[clamp(2.6rem,6.4vw,6rem)] font-extrabold leading-[0.96] tracking-[-0.04em] text-k-navy">
            Say hello to <em className="font-accent font-normal italic tracking-normal text-k-ribbon">Kiara!</em>
          </h2>
          <p className="mt-6 max-w-lg text-xl leading-relaxed text-k-navy/85">
            Bright ideas, bold beginnings, and a whole lot of fun. Kiara is here to make every new story feel a little more exciting.
          </p>
          <div className="m-swatches mt-12">
            <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-k-navy/60">Kiara&apos;s colors</p>
            <ul className="flex max-w-lg items-end gap-2">
              {SWATCHES.map((s, i) => (
                <li key={s.hex} className="group flex-1">
                  <div className="m-swatch rounded-t-full transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:-translate-y-2" style={{ background: s.hex, height: `${[88, 112, 70, 96, 124][i]}px` }} />
                  <p className="mt-2 text-[0.7rem] font-bold leading-tight text-k-navy">{s.name}</p>
                  <p className="text-[0.68rem] tabular-nums text-k-navy/60">{s.hex}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
