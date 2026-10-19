import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnchorLink } from './anchor-link';
import { BrandMark, Wordmark } from './art';
import { gsap, reducedMotion } from '@/lib/motion';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'features', label: 'Features' },
  { id: 'journey', label: 'Journey' },
  { id: 'faq', label: 'FAQ' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion() || !wrap.current) return;
    const tween = gsap.from(wrap.current, { y: -28, opacity: 0, duration: 1, delay: 0.35, ease: 'power3.out' });
    return () => {
      tween.kill();
    };
  }, []);

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
      <div ref={wrap} className="relative w-full max-w-[860px]">
        <nav
          aria-label="Primary"
          className={`glass flex items-center justify-between rounded-full transition-[padding,box-shadow] duration-500 ${
            scrolled ? 'py-1.5 pl-2 pr-1.5 sm:pl-3' : 'py-2.5 pl-2.5 pr-2.5 sm:pl-4'
          }`}
        >
          <AnchorLink id="top" className="group flex items-center gap-2.5 text-k-navy" testId="link-brand">
            <span className="transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
              <BrandMark size={scrolled ? 32 : 38} />
            </span>
            <Wordmark />
          </AnchorLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <AnchorLink
                  id={l.id}
                  testId={`link-nav-${l.id}`}
                  className="group relative block rounded-full px-4 py-2 text-[0.94rem] font-medium text-k-navy transition-transform duration-300 hover:-translate-y-px"
                >
                  <span className="absolute inset-0 scale-90 rounded-full bg-white/80 opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100" />
                  <span className="relative">{l.label}</span>
                  <span className="absolute bottom-1.5 left-4 right-4 h-[2px] origin-left scale-x-0 rounded bg-k-ribbon transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:scale-x-100" />
                </AnchorLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <AnchorLink
              id="meet"
              testId="link-nav-meet"
              className="group hidden items-center gap-1.5 rounded-full bg-k-navy py-2.5 pl-5 pr-4 text-[0.94rem] font-medium text-k-cloud transition-all duration-300 hover:-translate-y-px hover:shadow-[0_10px_20px_-8px_rgba(24,43,73,.7)] sm:inline-flex"
            >
              Meet Kiara
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </AnchorLink>
            <button
              ref={toggle}
              type="button"
              className="grid size-11 place-items-center rounded-full text-k-navy transition-colors hover:bg-white/70 lg:hidden"
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

        <div
          id="mobile-menu"
          hidden={!open}
          className="glass absolute left-0 right-0 top-full mt-2 origin-top rounded-[2rem] p-3 lg:hidden"
        >
          <ul className="flex flex-col">
            {[...LINKS, { id: 'meet', label: 'Meet Kiara' }].map((l, i) => (
              <li key={l.id}>
                <AnchorLink
                  id={l.id}
                  testId={`link-mobile-${l.id}`}
                  onNavigate={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-between rounded-2xl px-4 font-display text-2xl font-semibold text-k-navy transition-colors hover:bg-white/70"
                >
                  <span>{l.label}</span>
                  <span className="font-body text-xs font-medium tracking-widest text-k-navy/50">0{i + 1}</span>
                </AnchorLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
