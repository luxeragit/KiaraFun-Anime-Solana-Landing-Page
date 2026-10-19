import { useLayoutEffect, useRef } from 'react';
import { gsap, reducedMotion } from '@/lib/motion';
import { Sparkle } from './art';

function Planned() {
  return (
    <span className="inline-flex items-center gap-2 border-b border-dashed border-k-navy/35 pb-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-k-navy/70">
      <span className="size-1.5 rounded-full bg-k-sun" />
      Planned Feature
    </span>
  );
}

const CHAPTERS = [
  { t: 'The beginning', d: 'A creator shares the idea and the personality behind it.' },
  { t: 'A turning point', d: 'Development updates and first community moments find their place.' },
  { t: 'An on-chain milestone', d: 'Verifiable checkpoints sit alongside the human story.' },
  { t: 'The next chapter', d: 'Still unwritten, and open to everyone following along.', open: true },
];

const RAILS: [string, number][] = [
  ['Mint authority', 92], ['Freeze authority', 64], ['Token supply', 78], ['Creator allocation', 48],
  ['Holder concentration', 70], ['Applicable fees', 86], ['Launch configuration', 58], ['Graduation progress', 40],
];

const SPOT = [
  { w: 'Creative identity', c: 'text-k-navy' },
  { w: 'Real community', c: 'text-k-ribbon' },
  { w: 'Visible progress', c: 'text-k-sky' },
];

export function Features() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // A: chapters
      const a = el.querySelector('#feature-chapters');
      gsap.from('.chapter-line', { scaleY: 0, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: a, start: 'top 65%', end: 'bottom 70%', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.chapter').forEach((c) => {
        gsap.from(c, { opacity: 0, x: 30, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 82%', toggleActions: 'play none none reverse' } });
      });
      // B: rails
      gsap.utils.toArray<HTMLElement>('.rail').forEach((r, i) => {
        gsap.from(r.querySelector('.rail-line'), { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power3.out', delay: i * 0.05, scrollTrigger: { trigger: r, start: 'top 90%', toggleActions: 'play none none reverse' } });
        gsap.from(r.querySelector('.rail-node'), { scale: 0, duration: 0.6, ease: 'back.out(2.4)', delay: 0.9 + i * 0.05, scrollTrigger: { trigger: r, start: 'top 90%', toggleActions: 'play none none reverse' } });
      });
      // C: spotlight
      gsap.utils.toArray<HTMLElement>('.spot-word').forEach((w) => {
        gsap.from(w.firstElementChild, { yPercent: 110, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: w, start: 'top 88%', toggleActions: 'play none none reverse' } });
      });
      gsap.utils.toArray<HTMLElement>('.spot-shape').forEach((s, i) => {
        gsap.to(s, { y: (i % 2 ? -1 : 1) * 70, ease: 'none', scrollTrigger: { trigger: '#feature-spotlight', start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="features" ref={root} aria-labelledby="features-title" className="relative isolate bg-k-cloud">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 sm:px-10 lg:px-16 lg:pt-36">
        <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-k-navy/70">
          <span className="h-px w-10 bg-k-ribbon" /> Why KiaraFun
        </p>
        <h2 id="features-title" className="max-w-4xl font-display text-[clamp(2.3rem,5.6vw,5rem)] font-extrabold leading-[1] tracking-[-0.035em] text-k-navy">
          Three ideas, one <em className="font-accent font-normal italic tracking-normal text-k-ribbon">expressive</em> launchpad.
        </h2>
        <p className="mt-5 max-w-xl text-lg text-k-navy/70">
          These are the directions we are building toward. None of them are live yet.
        </p>
      </div>

      {/* A — Chapters */}
      <article id="feature-chapters" className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-36">
        <div className="lg:col-span-5">
          <span aria-hidden="true" className="outline-num font-display text-[7rem] font-extrabold leading-none sm:text-[10rem]">A</span>
          <div className="-mt-4"><Planned /></div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-k-sky">Kiara Chapters</p>
          <h3 className="mt-3 font-display text-[clamp(2.2rem,4.8vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-k-navy">More than a ticker.</h3>
          <p className="mt-6 max-w-md text-xl leading-snug text-k-navy">Give every launch a beginning, a personality, and a journey worth following.</p>
          <p className="mt-4 max-w-md leading-relaxed text-k-navy/70">Creator stories, community updates, and on-chain milestones — brought together in one evolving experience.</p>
        </div>
        <div className="lg:col-span-7 lg:pl-16">
          <ol className="relative">
            <span aria-hidden="true" className="chapter-line absolute bottom-3 left-[15px] top-3 w-px bg-k-navy/30" />
            {CHAPTERS.map((c, i) => (
              <li key={c.t} className="chapter relative pb-12 pl-14 last:pb-0" style={{ marginLeft: `${[0, 2.5, 0.75, 3.5][i]}rem` }}>
                <span className={`absolute left-0 top-1 grid size-[31px] place-items-center rounded-full ${c.open ? 'border-2 border-dashed border-k-navy/50 bg-k-cloud' : 'bg-k-navy'}`}>
                  <span className={`size-2 rounded-full ${c.open ? 'bg-k-sun' : 'bg-k-ribbon'}`} />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-k-navy/55">Chapter 0{i + 1}</p>
                <h4 className="mt-1 font-display text-2xl font-semibold tracking-tight text-k-navy sm:text-3xl">{c.t}</h4>
                <p className="mt-1 max-w-sm text-k-navy/70">{c.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 pl-14 text-sm italic text-k-navy/55">A conceptual outline. No real token activity is shown.</p>
        </div>
      </article>

      {/* B — Transparency */}
      <article id="feature-transparency" className="relative overflow-hidden bg-[linear-gradient(180deg,#f6fbff_0%,#e4f3fe_50%,#f6fbff_100%)]">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-36">
          <div className="order-2 lg:order-1 lg:col-span-7 lg:pr-16">
            <ul className="divide-y divide-k-navy/10 border-y border-k-navy/15">
              {RAILS.map(([label, w]) => (
                <li key={label} className="rail grid grid-cols-[minmax(7.5rem,10.5rem)_1fr] items-center gap-4 py-4 sm:grid-cols-[13rem_1fr]">
                  <span className="text-sm font-medium text-k-navy sm:text-base">{label}</span>
                  <span className="relative flex h-6 items-center" aria-hidden="true">
                    <span className="rail-line absolute left-0 h-px bg-k-navy/45" style={{ width: `${w}%` }} />
                    <span className="absolute left-0 h-px w-full border-t border-dashed border-k-navy/15" />
                    <span className="rail-node absolute grid size-5 -translate-x-1/2 place-items-center rounded-full border border-k-navy/50 bg-k-cloud" style={{ left: `${w}%` }}>
                      <svg viewBox="0 0 12 12" className="size-2.5"><path d="M2 6.2l2.6 2.6L10 3.4" fill="none" stroke="#ff515b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm italic text-k-navy/55">Illustrative layout only. Every claim shown at launch must be backed by real on-chain data.</p>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <span aria-hidden="true" className="outline-num font-display text-[7rem] font-extrabold leading-none sm:text-[10rem]">B</span>
            <div className="-mt-4"><Planned /></div>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-k-sky">Launch Transparency</p>
            <h3 className="mt-3 font-display text-[clamp(2.2rem,4.8vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-k-navy">The details should never be a mystery.</h3>
            <p className="mt-6 max-w-md text-xl leading-snug text-k-navy">Important launch information deserves to be easy to find, understand, and verify.</p>
            <p className="mt-4 max-w-md leading-relaxed text-k-navy/70">Explore the vision for clearer token mechanics, visible launch conditions, and on-chain checkpoints.</p>
          </div>
        </div>
      </article>

      {/* C — Spotlight */}
      <article id="feature-spotlight" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="spot-shape absolute -right-24 top-[8%] size-[26rem] rounded-full bg-k-blonde/70" />
          <div className="spot-shape absolute left-[-6rem] top-[50%] size-[18rem] rounded-full bg-k-sky/20" />
          <div className="spot-shape absolute right-[18%] bottom-[6%] size-24 rounded-full bg-k-ribbon/80" />
          <svg className="spin-slower absolute right-[4%] top-[4%] w-[30rem] max-w-[80vw]" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="96" stroke="#182b49" strokeOpacity=".16" strokeDasharray="2 6" />
            <circle cx="100" cy="100" r="70" stroke="#182b49" strokeOpacity=".12" />
          </svg>
          <Sparkle className="drift absolute left-[10%] top-[14%] w-8" />
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
          <span aria-hidden="true" className="outline-num font-display text-[7rem] font-extrabold leading-none sm:text-[10rem]">C</span>
          <div className="-mt-4"><Planned /></div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-k-sky">Kiara Spotlight</p>
          <h3 className="mt-3 max-w-3xl font-display text-[clamp(2.2rem,4.8vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-k-navy">Find the next story worth following.</h3>
          <div className="mt-14 border-t border-k-navy/15 lg:mt-20" role="list">
            {SPOT.map((s, i) => (
              <div key={s.w} role="listitem" className="spot-word group relative overflow-hidden border-b border-k-navy/15 py-3 lg:py-5">
                <div className="flex items-baseline gap-5 transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:translate-x-3 lg:gap-8" style={{ paddingLeft: `${i * 4}%` }}>
                  <span className="text-xs font-bold tracking-widest text-k-navy/40">0{i + 1}</span>
                  <span className={`font-display text-[clamp(2.4rem,8.2vw,8rem)] font-extrabold leading-[1.02] tracking-[-0.04em] ${s.c}`}>{s.w}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <p className="max-w-xl text-xl leading-snug text-k-navy lg:col-span-6 lg:col-start-7">
              Discovery should be about more than numbers. Explore a future where creativity and genuine community activity matter.
            </p>
            <p className="max-w-xl text-sm italic text-k-navy/55 lg:col-span-6 lg:col-start-7">Spotlight ranking mechanics have not been finalized.</p>
          </div>
        </div>
      </article>
    </section>
  );
}
