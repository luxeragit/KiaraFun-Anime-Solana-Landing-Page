import { CheckIcon } from './icons';
import { useState } from 'react';

const ITEMS = [
  { id: 'profiles', t: 'Richer token profiles', d: 'More than a name, ticker and chart. Creator updates, project identity and verifiable milestones live on the profile.' },
  { id: 'info', t: 'Clearer launch information', d: 'Supply, authorities, launch settings and risk notes, laid out plainly where they can be verified. Transparency does not remove trading risk.' },
  { id: 'discovery', t: 'More expressive discovery', d: 'Find community launches through their identity and updates. No ranking system exists yet.' },
] as const;

function Diagram({ id }: { id: string }) {
  if (id === 'profiles')
    return (
      <div className="space-y-2.5">
        {['Identity', 'Creator updates', 'Milestones'].map((l, i) => (
          <div key={l} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-k-navy ring-1 ring-k-navy/10" style={{ marginLeft: i * 18 }}>{l}</div>
        ))}
      </div>
    );
  if (id === 'info')
    return (
      <ul className="divide-y divide-k-navy/10 rounded-2xl bg-white px-4 ring-1 ring-k-navy/10">
        {['Supply', 'Mint authority', 'Freeze authority', 'Risk notes'].map((l) => (
          <li key={l} className="flex items-center justify-between py-3 text-sm font-semibold text-k-navy">
            {l}
            <span className="grid size-5 place-items-center rounded-full border border-k-navy/40">
              <CheckIcon className="size-2.5 text-[#ff515b]" aria-hidden="true" />
            </span>
          </li>
        ))}
      </ul>
    );
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="rounded-2xl bg-white p-2.5 ring-1 ring-k-navy/10">
          <div className={`aspect-square rounded-xl ${['bg-k-sky/35', 'bg-k-blonde', 'bg-k-ribbon/30'][i % 3]}`} />
          <div className="mt-2 h-1.5 w-2/3 rounded-full bg-k-navy/15" />
        </div>
      ))}
    </div>
  );
}

export function Why() {
  const [active, setActive] = useState<string>(ITEMS[0].id);
  return (
    <section id="why" aria-labelledby="why-title" className="bg-k-navy py-24 text-k-cloud lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-6">
          <h2 id="why-title" className="font-display text-[clamp(2rem,4vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.03em]">Why KiaraFun?</h2>
          <p className="mt-4 max-w-md text-lg text-k-cloud/75">Three directions we are designing toward. None are live yet.</p>
          <ul className="mt-10 border-t border-k-cloud/20">
            {ITEMS.map((it) => {
              const on = active === it.id;
              return (
                <li key={it.id} className="border-b border-k-cloud/20">
                  <button
                    type="button"
                    data-testid={`button-why-${it.id}`}
                    aria-pressed={on}
                    onClick={() => setActive(it.id)}
                    onMouseEnter={() => setActive(it.id)}
                    onFocus={() => setActive(it.id)}
                    className="group relative block w-full py-6 pr-4 text-left"
                  >
                    <span className={`absolute left-0 top-0 h-px origin-left bg-k-ribbon transition-transform duration-500 [transition-timing-function:var(--ease-out)] w-full ${on ? 'scale-x-100' : 'scale-x-0'}`} />
                    <span className={`block font-display text-2xl font-semibold transition-transform duration-300 sm:text-3xl ${on ? 'translate-x-2' : 'text-k-cloud/70 group-hover:translate-x-1'}`}>{it.t}</span>
                    <span className={`mt-2 block max-w-lg leading-relaxed text-k-cloud/75 transition-all duration-300 ${on ? 'translate-x-2' : ''}`}>{it.d}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-[1.8rem] bg-[#dcf0fd] p-5 text-k-navy sm:p-8 lg:sticky lg:top-28">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-k-navy/60">Concept sketch</p>
            <div key={active} className="min-h-[15rem] animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Diagram id={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
