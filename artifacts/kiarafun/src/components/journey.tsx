import { useLayoutEffect, useRef } from 'react';
import { gsap, reducedMotion } from '@/lib/motion';

const STEPS = [
  { n: '01', k: 'Create', h: 'Start with an idea.', p: 'Bring your token concept, identity, and story to life.' },
  { n: '02', k: 'Launch', h: 'Take the first step on-chain.', p: 'Publish your launch with visible mechanics and a clear journey ahead.' },
  { n: '03', k: 'Grow', h: 'Write the next chapter together.', p: 'Follow milestones, share updates, and build a community around your creation.' },
];
const MARK: [number, number][] = [[16.67, 73], [50, 42], [83.33, 31]];

export function Journey() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.j-path', { strokeDashoffset: 1, ease: 'none', scrollTrigger: { trigger: '.j-desk', start: 'top 75%', end: 'bottom 45%', scrub: 0.5 } });
      gsap.utils.toArray<HTMLElement>('.j-mark').forEach((m, i) => {
        gsap.from(m, { scale: 0, duration: 0.7, ease: 'back.out(2)', scrollTrigger: { trigger: '.j-desk', start: `top ${70 - i * 6}%`, toggleActions: 'play none none reverse' } });
      });
      gsap.from('.j-step', { y: 40, opacity: 0, stagger: 0.18, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.j-desk', start: 'top 60%', toggleActions: 'play none none reverse' } });
    });
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.j-vline', { scaleY: 0, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '.j-list', start: 'top 70%', end: 'bottom 70%', scrub: 0.4 } });
      gsap.utils.toArray<HTMLElement>('.j-step').forEach((s) => {
        gsap.from(s, { opacity: 0, y: 28, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 85%', toggleActions: 'play none none reverse' } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="journey" ref={root} aria-labelledby="journey-title" className="relative overflow-hidden bg-k-cloud py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-k-navy/70">
          <span className="h-px w-10 bg-k-ribbon" /> The Journey
        </p>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 id="journey-title" className="max-w-3xl font-display text-[clamp(2.3rem,5.6vw,5rem)] font-extrabold leading-[1] tracking-[-0.035em] text-k-navy">
            How KiaraFun will <em className="font-accent font-normal italic tracking-normal text-k-ribbon">work.</em>
          </h2>
          <p className="max-w-sm text-k-navy/70">The intended product journey. Token creation and launching are not available yet.</p>
        </div>

        <div className="j-desk relative mt-20 hidden lg:block">
          <div className="relative h-[260px]">
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 1200 260" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path d="M0 240C100 240 120 190 200 190C340 190 440 110 600 110C760 110 860 80 1000 80C1100 80 1150 50 1200 40" stroke="#182b49" strokeOpacity=".12" strokeWidth="2" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" />
              <path className="j-path draw" pathLength={1} d="M0 240C100 240 120 190 200 190C340 190 440 110 600 110C760 110 860 80 1000 80C1100 80 1150 50 1200 40" stroke="#2da9f5" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            {MARK.map(([x, y], i) => (
              <span key={i} className="j-mark absolute grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-k-navy font-display text-lg font-extrabold text-k-cloud shadow-[0_10px_20px_-8px_rgba(24,43,73,.6)] ring-4 ring-k-cloud" style={{ left: `${x}%`, top: `${y}%` }}>
                {STEPS[i].n}
                <span className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full bg-k-ribbon ring-2 ring-k-cloud" />
              </span>
            ))}
          </div>
          <ol className="grid grid-cols-3 gap-10 text-center">
            {STEPS.map((s) => (
              <li key={s.n} className="j-step mx-auto max-w-sm">
                <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-k-sky">{s.k}</p>
                <h3 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight text-k-navy">{s.h}</h3>
                <p className="mt-3 text-k-navy/70">{s.p}</p>
              </li>
            ))}
          </ol>
        </div>

        <ol className="j-list relative mt-14 lg:hidden">
          <span aria-hidden="true" className="absolute bottom-2 left-[27px] top-2 w-px bg-k-navy/15" />
          <span aria-hidden="true" className="j-vline absolute bottom-2 left-[26px] top-2 w-[3px] rounded bg-k-sky" />
          {STEPS.map((s) => (
            <li key={s.n} className="j-step relative pb-14 pl-20 last:pb-0">
              <span className="absolute left-0 top-0 grid size-14 place-items-center rounded-full bg-k-navy font-display text-lg font-extrabold text-k-cloud ring-4 ring-k-cloud">
                {s.n}
                <span className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full bg-k-ribbon ring-2 ring-k-cloud" />
              </span>
              <p className="pt-1 font-display text-sm font-bold uppercase tracking-[0.22em] text-k-sky">{s.k}</p>
              <h3 className="mt-1 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight text-k-navy">{s.h}</h3>
              <p className="mt-2 max-w-md text-k-navy/70">{s.p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
