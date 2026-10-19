import { AnchorLink } from './anchor-link';
import { BrandMark, Wordmark } from './art';

const LINKS = [
  { id: 'launchpad', label: 'Launchpad' },
  { id: 'why', label: 'Why KiaraFun' },
  { id: 'faq', label: 'FAQ' },
];

export function Footer() {
  return (
    <footer id="footer" className="bg-k-navy text-k-cloud">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <div className="flex items-center gap-3">
          <BrandMark size={40} />
          <Wordmark className="!text-2xl text-k-cloud" />
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-1">
            {LINKS.map((l) => (
              <li key={l.id}>
                <AnchorLink id={l.id} testId={`link-footer-${l.id}`} className="group inline-flex min-h-11 items-center text-k-cloud/90 hover:text-k-cloud">
                  <span className="ul-sweep">{l.label}</span>
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-k-cloud/15">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-7 text-xs leading-relaxed text-k-cloud/65 sm:px-10 lg:flex-row lg:justify-between lg:px-16">
          <p className="max-w-3xl">Risk disclosure: KiaraFun is in development and nothing on this site is financial advice. Crypto assets are volatile and you may lose everything you put in. No outcome, return, or level of safety is guaranteed.</p>
          <p className="shrink-0" data-testid="text-copyright">&copy; {new Date().getFullYear()} KiaraFun</p>
        </div>
      </div>
    </footer>
  );
}
