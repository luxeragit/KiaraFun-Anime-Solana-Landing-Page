import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/motion';
import { LaunchSurface, type Phase } from './launch-surface';

const LINES: { text: string; hi?: string }[][] = [
  [{ text: 'Create' }, { text: 'your' }, { text: 'token.', hi: '#e63e4a' }],
  [{ text: 'Launch' }, { text: 'on' }, { text: 'Solana.', hi: '#1789d6' }],
  [{ text: 'Give' }, { text: 'your' }, { text: 'community' }, { text: 'something' }, { text: 'to' }, { text: 'build' }, { text: 'around.' }],
];
const BREAKS = [3, 6]; // word index where the config / profile phases begin
const NAVY = '#182b49';
const LOW = '#9db8cf';

export function Sequence() {
  const root = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>('all');

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({
      desktop: '(min-width: 1024px)',
      mobile: '(max-width: 1023px)',
      reduce: '(prefers-reduced-motion: reduce)',
    }, (context) => {
      const words = gsap.utils.toArray<HTMLElement>('.seq-word', el);
      if (context.conditions?.reduce) {
        gsap.set(words, { clearProps: 'all' });
        setPhase('all');
        return;
      }
      const STEP = 0.6;
      const desktop = !!context.conditions?.desktop;
      let last: Phase = 'all';
      const apply = (p: Phase) => {
        if (p !== last) {
          last = p;
          setPhase(p);
        }
      };
      if (desktop) apply('token');
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: () => {
          if (!desktop) return;
          const i = Math.floor((tl.time() - 0.5) / STEP);
          apply(i >= BREAKS[1] ? 'profile' : i >= BREAKS[0] ? 'config' : 'token');
        },
        scrollTrigger: {
          trigger: el.querySelector('.seq-text'),
          start: desktop ? 'top 62%' : 'top 82%',
          end: desktop ? 'bottom 58%' : 'bottom 62%',
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
      words.forEach((w, i) => {
        tl.fromTo(
          w,
          { opacity: 0.3, color: LOW, yPercent: 12 },
          { opacity: 1, color: w.dataset.hi || NAVY, yPercent: 0, duration: 1 },
          i * STEP,
        );
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(words, { clearProps: 'all' });
        setPhase('all');
      };
    });
    return () => mm.revert();
  }, []);

  let n = -1;
  return (
    <section id="launch-model" ref={root} aria-label="The launch model" className="relative bg-k-cloud">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-28">
        <div className="seq-text min-w-0 lg:col-span-7 lg:py-[6vh]">
          <p className="font-display text-[clamp(2.4rem,6.2vw,5.8rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-k-navy">
            {LINES.map((line, li) => (
              <span key={li} className="block lg:pb-[16vh] last:lg:pb-0 pb-5 last:pb-0">
                {line.map((w) => {
                  n += 1;
                  return (
                    <span key={n}>
                      <span className="seq-word" data-hi={w.hi}>{w.text}</span>{' '}
                    </span>
                  );
                })}
              </span>
            ))}
          </p>
        </div>
        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-[14vh]">
            <LaunchSurface phase={phase} />
          </div>
        </div>
      </div>
    </section>
  );
}
