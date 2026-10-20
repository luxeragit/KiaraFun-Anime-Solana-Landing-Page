import { ImageIcon as ImagePlus } from './icons';
import { Ribbon } from './art';

export type Phase = 'token' | 'config' | 'profile' | 'all';

const CONFIG = [
  ['Supply', 'Set by the creator'],
  ['Mint authority', 'Shown when verifiable'],
  ['Freeze authority', 'Shown when verifiable'],
  ['Risk notes', 'Always included'],
];

/** Non-interactive, clearly conceptual preview of the future KiaraFun create-token flow. */
export function LaunchSurface({ phase }: { phase: Phase }) {
  return (
    <figure data-phase={phase} className="m-0 min-w-0 max-w-full" data-testid="surface-concept">
      <div className="surface rounded-[1.6rem] p-4 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Ribbon className="w-7" />
            <span className="font-display text-sm font-bold text-k-navy">New token</span>
          </div>
          <span className="rounded-full bg-k-blonde px-3 py-1 text-xs font-bold text-k-navy">Concept preview</span>
        </div>

        <div className="space-y-5">
          <div className="zone grid grid-cols-[3rem_minmax(0,1fr)] gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-4" data-zone="token">
            <div className="slot grid size-12 place-items-center rounded-2xl text-k-navy/60 sm:size-24">
              <ImagePlus className="size-6" aria-hidden="true" />
              <span className="sr-only">Token image</span>
            </div>
            <div className="min-w-0 space-y-2.5">
              <Field label="Token name" value="Your token name" />
              <div className="grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-[minmax(0,.8fr)_minmax(0,1fr)]">
                <Field label="Ticker" value="TICKER" />
                <Field label="Description" value="What it is, in a line" />
              </div>
            </div>
          </div>

          <div className="zone rounded-2xl bg-k-cloud p-4 ring-1 ring-k-navy/10" data-zone="config">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-k-navy/60">Launch configuration</p>
            <dl className="divide-y divide-k-navy/10">
              {CONFIG.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-2 text-sm">
                  <dt className="font-semibold text-k-navy">{k}</dt>
                  <dd className="text-right text-k-navy/65">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="zone" data-zone="profile">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-k-navy/60">Token profile</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl p-3 ring-1 ring-k-navy/10">
                <p className="text-sm font-semibold text-k-navy">Creator updates</p>
                <div className="slot mt-2 h-2 w-4/5 rounded-full" />
                <div className="slot mt-1.5 h-2 w-3/5 rounded-full" />
              </div>
              <div className="rounded-2xl p-3 ring-1 ring-k-navy/10">
                <p className="text-sm font-semibold text-k-navy">Milestones</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-k-ribbon" />
                  <span className="h-px flex-1 bg-k-navy/25" />
                  <span className="size-3 rounded-full border-2 border-k-navy/30" />
                  <span className="h-px flex-1 bg-k-navy/25" />
                  <span className="size-3 rounded-full border-2 border-k-navy/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-k-navy/65">Conceptual design. No tokens can be created yet.</figcaption>
    </figure>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-k-navy/55">{label}</p>
      <p className="mt-0.5 truncate rounded-xl bg-k-cloud px-3 py-2 text-sm text-k-navy/55 ring-1 ring-k-navy/10">{value}</p>
    </div>
  );
}
