import { useEffect, useRef, useState } from 'react';
import { MenuIcon as Menu, CloseIcon as X } from './icons';
import { AnchorLink } from './anchor-link';
import { BrandMark, Wordmark } from './art';

const LINKS = [
  { id: 'launchpad', label: 'Launchpad' },
  { id: 'why', label: 'Why KiaraFun' },
  { id: 'faq', label: 'FAQ' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!open) return;
    wrap.current?.querySelector<HTMLElement>('#mobile-menu a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4" data-testid="nav-header">
      <div ref={wrap} className="relative w-full max-w-[760px]">
        <nav aria-label="Primary" className={`glass flex items-center justify-between gap-2 rounded-full transition-[padding] duration-300 ${scrolled ? 'py-1.5 pl-2 pr-1.5' : 'py-2.5 pl-2.5 pr-2.5'}`}>
          <AnchorLink id="top" className="group flex items-center gap-2.5 text-k-navy" testId="link-brand">
            <span className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"><BrandMark size={scrolled ? 32 : 36} /></span>
            <Wordmark />
          </AnchorLink>
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <AnchorLink id={l.id} testId={`link-nav-${l.id}`} className="press block rounded-full px-4 py-2 text-[0.94rem] font-medium text-k-navy hover:bg-white/80">
                  {l.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <span className="hidden items-center gap-2 rounded-full bg-k-blonde px-3.5 py-2 text-sm font-bold text-k-navy sm:inline-flex" data-testid="status-coming-soon">
              <span className="size-2 rounded-full bg-k-ribbon" />
              Coming Soon
            </span>
            <button
              ref={toggle}
              type="button"
              className="grid size-11 place-items-center rounded-full text-k-navy transition-colors hover:bg-white/70 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              data-testid="button-menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
        <div id="mobile-menu" hidden={!open} className="glass absolute left-0 right-0 top-full mt-2 rounded-3xl p-2 md:hidden">
          <ul>
            {LINKS.map((l) => (
              <li key={l.id}>
                <AnchorLink id={l.id} testId={`link-mobile-${l.id}`} onNavigate={() => setOpen(false)} className="flex min-h-12 items-center rounded-2xl px-4 text-lg font-semibold text-k-navy hover:bg-white/70">
                  {l.label}
                </AnchorLink>
              </li>
            ))}
            <li className="px-4 py-3 text-sm font-bold text-k-navy/70">Coming Soon</li>
          </ul>
        </div>
      </div>
    </header>
  );
}
