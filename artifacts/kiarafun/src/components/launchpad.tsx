import { useRef, useState, type KeyboardEvent } from 'react';
import { Compass, Newspaper, Rocket } from 'lucide-react';
import { Ribbon } from './art';

const TABS = [
  { id: 'create', label: 'Create a token', Icon: Rocket, line: 'Creators set up token identity and review launch settings before anything goes out.' },
  { id: 'discover', label: 'Discover launches', Icon: Compass, line: 'People browse new tokens and read the details before they decide to take part.' },
  { id: 'follow', label: 'Follow its progress', Icon: Newspaper, line: 'Communities keep up with creator updates and launch milestones in one place.' },
] as const;
type TabId = (typeof TABS)[number]['id'];

function Create() {
  return (
    <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
      <div className="slot grid aspect-square w-28 place-items-center rounded-3xl"><Ribbon className="w-12 opacity-80" /></div>
      <div className="space-y-3">
        {['Token name', 'Ticker', 'Description'].map((f) => (
          <div key={f}>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-k-navy/55">{f}</p>
            <div className="mt-1 h-9 rounded-xl bg-k-cloud ring-1 ring-k-navy/10" />
          </div>
        ))}
        <div className="flex flex-wrap gap-2 pt-1">
          {['Supply', 'Authorities', 'Launch settings'].map((c) => (
            <span key={c} className="rounded-full bg-k-blonde px-3 py-1 text-xs font-bold text-k-navy">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Discover() {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {['New', 'Creator verified', 'Has updates'].map((c, i) => (
          <span key={c} className={`rounded-full px-3 py-1.5 text-xs font-bold ${i === 0 ? 'bg-k-navy text-k-cloud' : 'bg-k-cloud text-k-navy ring-1 ring-k-navy/15'}`}>{c}</span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="group rounded-2xl p-3 ring-1 ring-k-navy/10 transition-all duration-300 hover:-translate-y-1 hover:ring-k-navy/30">
            <div className="slot aspect-[4/3] rounded-xl" />
            <div className="mt-2.5 h-2.5 w-3/4 rounded-full bg-k-navy/15" />
            <div className="mt-1.5 h-2 w-1/2 rounded-full bg-k-navy/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Follow() {
  return (
    <ol className="relative space-y-4 pl-7 before:absolute before:bottom-2 before:left-[9px] before:top-2 before:w-px before:bg-k-navy/20">
      {[
        ['Creator update', 'Written by the project team', true],
        ['Launch milestone', 'Verifiable where possible', true],
        ['Next update', 'Appears when the creator posts', false],
      ].map(([t, d, on]) => (
        <li key={String(t)} className="relative">
          <span className={`absolute -left-7 top-1 size-[18px] rounded-full ${on ? 'bg-k-ribbon' : 'border-2 border-k-navy/30 bg-white'}`} />
          <p className="font-semibold text-k-navy">{t}</p>
          <p className="text-sm text-k-navy/65">{d}</p>
        </li>
      ))}
    </ol>
  );
}

export function Launchpad() {
  const [tab, setTab] = useState<TabId>('create');
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    const next = TABS[(i + dir + TABS.length) % TABS.length].id;
    setTab(next);
    refs.current[next]?.focus();
  };

  return (
    <section id="launchpad" aria-labelledby="launchpad-title" className="relative overflow-hidden bg-[linear-gradient(180deg,#f6fbff_0%,#dcf0fd_100%)] py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-5">
          <h2 id="launchpad-title" className="font-display text-[clamp(2rem,4vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.03em] text-k-navy">
            The launchpad we are building.
          </h2>
          <p className="mt-4 max-w-md text-lg text-k-navy/75">Three actions, one product. Pick one to see its planned screen.</p>
          <div role="tablist" aria-label="Planned launchpad actions" className="mt-8 flex flex-col gap-2">
            {TABS.map(({ id, label, Icon, line }, i) => {
              const on = tab === id;
              return (
                <button
                  key={id}
                  ref={(n) => { refs.current[id] = n; }}
                  role="tab"
                  type="button"
                  id={`tab-${id}`}
                  aria-selected={on}
                  aria-controls="launchpad-panel"
                  tabIndex={on ? 0 : -1}
                  data-testid={`tab-${id}`}
                  onClick={() => setTab(id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`press group flex items-start gap-4 rounded-2xl p-4 text-left ${on ? 'bg-white shadow-[0_18px_30px_-20px_rgba(24,43,73,.5)] ring-1 ring-k-navy/10' : 'hover:bg-white/60'}`}
                >
                  <span className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${on ? 'bg-k-ribbon text-white' : 'bg-white text-k-navy ring-1 ring-k-navy/15'}`}>
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-xl font-semibold text-k-navy">{label}</span>
                    <span className={`block text-[0.95rem] leading-snug text-k-navy/70 transition-opacity ${on ? 'opacity-100' : 'opacity-80'}`}>{line}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="surface rounded-[1.8rem] p-5 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <span className="font-display text-sm font-bold text-k-navy">{TABS.find((t) => t.id === tab)?.label}</span>
              <span className="rounded-full bg-k-blonde px-3 py-1 text-xs font-bold text-k-navy">Concept preview</span>
            </div>
            <div id="launchpad-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} key={tab} className="min-h-[18rem] animate-in fade-in slide-in-from-bottom-2 duration-300">
              {tab === 'create' && <Create />}
              {tab === 'discover' && <Discover />}
              {tab === 'follow' && <Follow />}
            </div>
          </div>
          <p className="mt-3 text-sm text-k-navy/65">Placeholder content only. KiaraFun is not live and shows no real tokens or activity.</p>
        </div>
      </div>
    </section>
  );
}
