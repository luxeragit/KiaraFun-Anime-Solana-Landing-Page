import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { ScrollTrigger } from '@/lib/motion';

const ITEMS = [
  { q: 'Is KiaraFun live?', a: 'No. The launchpad is in development. You cannot create, buy or sell tokens on KiaraFun yet.' },
  { q: 'Which blockchain does it use?', a: 'KiaraFun is being designed for Solana mainnet.' },
  { q: 'Will I need a wallet?', a: 'Wallet interaction is planned for the launchpad app. This site never asks you to connect one.' },
  { q: 'What will I be able to do?', a: 'The plan is to create tokens, discover launches, and follow creator updates and milestones.' },
  { q: 'Are launch dates, fees or tokenomics set?', a: 'Not yet. Nothing about them has been announced, so please ignore any claims to the contrary.' },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-k-cloud py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 sm:px-10 lg:grid-cols-12 lg:px-16">
        <h2 id="faq-title" className="font-display text-[clamp(2rem,4vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.03em] text-k-navy lg:col-span-4">FAQ</h2>
        <div className="border-t border-k-navy/20 lg:col-span-8">
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
                    className="group flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left"
                  >
                    <span className="font-display text-lg font-semibold text-k-navy transition-transform duration-300 group-hover:translate-x-1 sm:text-xl">{it.q}</span>
                    <span className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-k-ribbon bg-k-ribbon text-white' : 'border-k-navy/30 text-k-navy group-hover:border-k-navy'}`}>
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} className="faq-panel" data-open={isOpen} onTransitionEnd={() => ScrollTrigger.refresh()}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-5 text-[1.05rem] leading-relaxed text-k-navy/75" inert={!isOpen}>{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
