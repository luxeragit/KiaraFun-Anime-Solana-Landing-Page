import { AnchorLink } from './anchor-link';
import { BrandMark, Wordmark } from './art';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'features', label: 'Features' },
  { id: 'journey', label: 'Journey' },
  { id: 'meet', label: 'Meet Kiara' },
  { id: 'faq', label: 'FAQ' },
];

export function Footer() {
  return (
    <footer id="footer" className="bg-k-navy text-k-cloud">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-20">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 [&_span.text-k-ribbon]:text-k-ribbon">
            <BrandMark size={44} />
            <Wordmark className="!text-3xl text-k-cloud" />
          </div>
          <p className="mt-6 font-accent text-3xl italic text-k-blonde sm:text-4xl">Every Coin Has a Story.</p>
          <p className="mt-6 text-sm text-k-cloud/70">An upcoming launchpad, built for Solana. Currently in development.</p>
        </div>
        <nav aria-label="Footer" className="lg:col-span-3">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-k-cloud/50">Explore</p>
          <ul className="space-y-1">
            {LINKS.map((l) => (
              <li key={l.id}>
                <AnchorLink id={l.id} testId={`link-footer-${l.id}`} className="group inline-flex min-h-10 items-center text-lg text-k-cloud/90 transition-colors hover:text-k-cloud">
                  <span className="ul-sweep">{l.label}</span>
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-k-cloud/50">Ecosystem</p>
          <p className="text-lg text-k-cloud/90">Designed for the Solana ecosystem.</p>
        </div>
      </div>
      <div className="border-t border-k-cloud/15">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-8 text-xs leading-relaxed text-k-cloud/60 sm:px-10 lg:flex-row lg:justify-between lg:px-16">
          <p className="max-w-3xl">
            Risk disclosure: KiaraFun is in development and nothing on this site is financial advice. Crypto assets are volatile and you may lose everything you put in. No outcome, return, or level of safety is guaranteed.
          </p>
          <p className="shrink-0" data-testid="text-copyright">&copy; {new Date().getFullYear()} KiaraFun. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
