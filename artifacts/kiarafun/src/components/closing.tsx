import { Ribbon } from './art';
import { Cta } from './cta';

export function Closing() {
  return (
    <section id="closing" aria-labelledby="closing-title" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f6fbff_0%,#9bd7fb_100%)] py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-8">
          <h2 id="closing-title" className="font-display text-[clamp(2.2rem,5.4vw,4.8rem)] font-bold leading-[1] tracking-[-0.035em] text-k-navy">KiaraFun is coming to Solana.</h2>
          <p className="mt-5 max-w-lg text-xl text-k-navy/80">A new place to create, discover, and follow community launches.</p>
          <div className="mt-8"><Cta id="launch-model" variant="primary" arrow="down" testId="button-back-launch-model">Back to the launch model</Cta></div>
        </div>
        <div className="hidden justify-self-end lg:col-span-4 lg:block">
          <Ribbon className="wiggle-hover w-52 -rotate-12 drop-shadow-[0_18px_18px_rgba(24,43,73,.22)]" />
        </div>
      </div>
    </section>
  );
}
