import { Fragment, useLayoutEffect, useRef } from 'react';
import { gsap, reducedMotion } from '@/lib/motion';
import { Sparkle } from './art';

const SCENES = [
  { n: '01', label: 'Chapter 01 / The Idea', text: ['Every great launch', 'starts with a little', '*imagination.*'] },
  { n: '02', label: 'Chapter 02 / The Details', text: ['A good story deserves', 'a *clearer* launch.'] },
  { n: '03', label: 'Chapter 03 / The People', text: ['The next chapter', 'belongs to *everyone.*'] },
];

const PEOPLE: [number, number, number, string][] = [
  [60, 190, 1.1, '#2da9f5'], [150, 120, 1.5, '#ff515b'], [250, 200, 1.2, '#ffaa32'], [330, 110, 1.0, '#182b49'],
  [420, 190, 1.4, '#2da9f5'], [500, 100, 1.1, '#ff515b'], [210, 60, 0.9, '#2da9f5'], [390, 40, 0.9, '#ffaa32'],
];
const EDGES: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 6], [6, 3], [3, 7], [7, 5], [2, 4]];

function Words({ line }: { line: string }) {
  return (
    <>
      {line.split(' ').map((w, i, arr) => {
        const em = w.startsWith('*') || w.endsWith('*');
        const clean = w.replace(/\*/g, '');
        return (
          <Fragment key={i}>
            <span className={`w inline-block ${em ? 'font-accent font-normal italic tracking-normal text-k-ribbon' : ''}`}>{clean}</span>
            {i < arr.length - 1 ? ' ' : ''}
          </Fragment>
        );
      })}
    </>
  );
}

function Community() {
  return (
    <svg viewBox="0 0 560 250" className="relative mt-8 w-full max-w-[28rem]" aria-hidden="true">
      {EDGES.map(([a, b], i) => (
        <line key={i} className="draw community-line" pathLength={1} x1={PEOPLE[a][0]} y1={PEOPLE[a][1]} x2={PEOPLE[b][0]} y2={PEOPLE[b][1]} stroke="#182b49" strokeOpacity=".35" strokeWidth="1.2" />
      ))}
      {PEOPLE.map(([x, y, s, c], i) => (
        <g key={i} className="person">
          <g transform={`translate(${x} ${y}) scale(${s * 1.5})`}>
            <circle cx="0" cy="-9" r="6.5" fill={c} />
            <path d="M-12 12C-12 0 12 0 12 12z" fill={c} opacity=".85" />
          </g>
        </g>
      ))}
    </svg>
  );
}

export function Story() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const mm = gsap.matchMedia();
    const q = <T extends Element = HTMLElement>(s: string) => gsap.utils.toArray<T>(s, el);

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      el.classList.add('is-pinned');
      const total = 12;
      const scenes = q('.scene');
      const words = (i: number) => scenes[i].querySelectorAll('.w');
      const line = (i: number) => scenes[i].querySelector('.scene-line');
      gsap.set(scenes.slice(1), { autoAlpha: 0 });
      gsap.set('.w', { opacity: 0.12, yPercent: 30 });
      gsap.set('.scene-line', { scaleX: 0 });
      gsap.set('.community-line', { strokeDashoffset: 1 });
      gsap.set('.person', { scale: 0, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: { trigger: el, start: 'top top', end: '+=330%', pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
      });
      tl.fromTo('.story-progress', { scaleX: 0 }, { scaleX: 1, duration: total, ease: 'none' }, 0);

      // scene 1
      tl.to(line(0), { scaleX: 1, duration: 1.4 }, 0)
        .to(words(0), { opacity: 1, yPercent: 0, stagger: 0.18, duration: 0.7 }, 0.2)
        .to(scenes[0], { y: -50, autoAlpha: 0, duration: 0.9, ease: 'power2.in' }, 3.4)
        .to('.story-cloud', { opacity: 1, duration: 2.4, ease: 'none' }, 3.2)
        // scene 2
        .fromTo(scenes[1], { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 4.2)
        .to(line(1), { scaleX: 1, duration: 1.4 }, 4.3)
        .to(words(1), { opacity: 1, yPercent: 0, stagger: 0.2, duration: 0.7 }, 4.4)
        .to(scenes[1], { y: -50, autoAlpha: 0, duration: 0.9, ease: 'power2.in' }, 7.6)
        .to('.story-warm', { opacity: 1, duration: 2.4, ease: 'none' }, 7.4)
        // scene 3
        .fromTo(scenes[2], { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 8.4)
        .to(line(2), { scaleX: 1, duration: 1.4 }, 8.5)
        .to(words(2), { opacity: 1, yPercent: 0, stagger: 0.2, duration: 0.7 }, 8.6)
        .to('.community-line', { strokeDashoffset: 0, stagger: 0.12, duration: 0.8 }, 9)
        .to('.person', { scale: 1, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'back.out(2)' }, 9)
        .to({}, { duration: 0.01 }, total);

      gsap.to('.story-orb', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: '+=330%', scrub: true } });

      return () => el.classList.remove('is-pinned');
    });

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      q('.scene').forEach((scene, i) => {
        const st = { trigger: scene, start: 'top 78%', toggleActions: 'play none none reverse' };
        gsap.from(scene.querySelector('.scene-line'), { scaleX: 0, duration: 1, ease: 'power3.out', scrollTrigger: st });
        gsap.from(scene.querySelectorAll('.w'), { opacity: 0.12, yPercent: 30, stagger: 0.07, duration: 0.7, ease: 'power3.out', scrollTrigger: st });
        if (i === 2) {
          gsap.from(scene.querySelectorAll('.person'), { scale: 0, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: scene, start: 'top 55%', toggleActions: 'play none none reverse' } });
          gsap.from(scene.querySelectorAll('.community-line'), { strokeDashoffset: 1, stagger: 0.08, duration: 0.8, scrollTrigger: { trigger: scene, start: 'top 55%', toggleActions: 'play none none reverse' } });
        }
      });
      gsap.to('.story-cloud', { opacity: 1, ease: 'none', scrollTrigger: { trigger: '.scene:nth-child(2)', start: 'top 85%', end: 'top 30%', scrub: true } });
      gsap.to('.story-warm', { opacity: 1, ease: 'none', scrollTrigger: { trigger: '.scene:nth-child(3)', start: 'top 85%', end: 'top 30%', scrub: true } });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="about" ref={root} aria-label="The KiaraFun story" className="story relative isolate overflow-hidden">
      <div className="story-sky absolute inset-0 -z-30" />
      <div className="story-cloud absolute inset-0 -z-20 opacity-0 [background:linear-gradient(180deg,#e9f6ff_0%,#f6fbff_100%)]" />
      <div className="story-warm absolute inset-0 -z-10 opacity-0 [background:radial-gradient(60%_50%_at_80%_80%,rgba(255,229,165,.65),transparent_70%)]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="story-orb absolute -left-24 top-[55%] size-[26rem] rounded-full border border-k-navy/10" />
        <div className="story-orb absolute -left-40 top-[48%] size-[38rem] rounded-full border border-k-navy/[0.07]" />
        <Sparkle className="drift absolute right-[12%] top-[16%] w-6" />
        <Sparkle className="drift absolute right-[30%] top-[78%] w-4 [animation-delay:-5s]" fill="#ff515b" />
      </div>

      <div className="scenes mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {SCENES.map((s, i) => (
          <div key={s.n} className="scene relative py-24 sm:py-32 lg:max-w-[62rem]" data-testid={`scene-${s.n}`}>
            <span aria-hidden="true" className="outline-num absolute -top-2 right-0 font-display text-[9rem] font-extrabold leading-none sm:text-[13rem] lg:-top-24 lg:right-[-8rem] lg:text-[22rem]">
              {s.n}
            </span>
            <div className="relative flex items-center gap-4">
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-k-navy sm:text-xs">{s.label}</span>
              <span className="scene-line block h-px w-24 origin-left bg-k-navy/60 sm:w-48 lg:w-64" />
            </div>
            <p className="relative mt-6 font-display text-[clamp(2.2rem,6.2vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-k-navy">
              {s.text.map((line, li) => (
                <span key={li} className="block">
                  <Words line={line} />
                </span>
              ))}
            </p>
            {i === 2 && <Community />}
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="absolute inset-x-6 bottom-8 hidden h-px bg-k-navy/15 lg:block xl:inset-x-16">
        <div className="story-progress h-full origin-left bg-k-ribbon" style={{ transform: 'scaleX(0)' }} />
      </div>
    </section>
  );
}
