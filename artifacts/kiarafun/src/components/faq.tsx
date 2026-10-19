import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { ScrollTrigger } from '@/lib/motion';

const ITEMS = [
  { q: 'What is KiaraFun?', a: 'KiaraFun is an upcoming Solana token launchpad exploring a more creative and transparent way to bring community tokens to life.' },
  { q: 'Is KiaraFun live?', a: 'Not yet. The platform is currently in development.' },
  { q: 'What makes KiaraFun different?', a: 'Our vision combines launch storytelling, clearer token information, and a community-focused discovery experience.' },
  { q: 'Which blockchain will KiaraFun support?', a: 'KiaraFun is being designed for Solana Mainnet.' },
  { q: 'Will I need a wallet?', a: 'Wallet interaction is planned for the future launchpad application. The landing page does not require a wallet connection.' },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-k-cloud py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-4">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-k-navy/70">
            <span className="h-px w-10 bg-k-ribbon" /> FAQ
          </p>
          <h2 id="faq-title" className="font-display text-[clamp(2.3rem,5vw,4.4rem)] font-extrabold leading-[1] tracking-[-0.035em] text-k-navy">
            Good <em className="font-accent font-normal italic tracking-normal text-k-ribbon">questions.</em>
          </h2>
          <p className="mt-4 max-w-xs text-k-navy/70">Short, honest answers about where KiaraFun stands today.</p>
        </div>
        <div className="lg:col-span-8 lg:pl-10">
          <div className="border-t border-k-navy/20">
            {ITEMS.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={it.q} className="border-b border-k-navy/20">
                  <h3>
                    <button
                      type="button"
                      id={`${uid}-b${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${uid}-p${i}`}
                      data-testid={`button-faq-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="font-display text-xl font-semibold tracking-tight text-k-navy transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:translate-x-1.5 sm:text-2xl">{it.q}</span>
                      <span className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${isOpen ? 'rotate-45 border-k-ribbon bg-k-ribbon text-k-navy' : 'border-k-navy/30 text-k-navy group-hover:border-k-navy'}`}>
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${uid}-p${i}`}
                    role="region"
                    aria-labelledby={`${uid}-b${i}`}
                    className="faq-panel"
                    data-open={isOpen}
                    onTransitionEnd={() => ScrollTrigger.refresh()}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 text-lg leading-relaxed text-k-navy/75" inert={!isOpen}>{it.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
