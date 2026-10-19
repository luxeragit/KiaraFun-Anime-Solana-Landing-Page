import type { ReactNode } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { AnchorLink } from './anchor-link';

type Props = { id: string; children: ReactNode; testId: string; variant?: 'primary' | 'ghost' | 'light'; arrow?: 'right' | 'down' };

export function Cta({ id, children, testId, variant = 'primary', arrow = 'right' }: Props) {
  const base =
    'group relative inline-flex min-h-12 items-center gap-2.5 rounded-full px-7 text-[1rem] font-semibold transition-all duration-300 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5 active:translate-y-0';
  const styles = {
    primary: 'bg-k-navy text-k-cloud hover:shadow-[0_16px_26px_-12px_rgba(24,43,73,.75)]',
    ghost: 'text-k-navy ring-1 ring-k-navy/25 hover:ring-k-navy hover:bg-white/50',
    light: 'bg-k-cloud text-k-navy hover:shadow-[0_16px_26px_-12px_rgba(24,43,73,.55)]',
  }[variant];
  const Icon = arrow === 'down' ? ArrowDown : ArrowRight;
  return (
    <AnchorLink id={id} testId={testId} className={`${base} ${styles}`}>
      {variant === 'primary' && (
        <span className="absolute -right-1 -top-1 size-3 rounded-full bg-k-ribbon ring-2 ring-k-cloud transition-transform duration-500 group-hover:scale-125" />
      )}
      <span>{children}</span>
      <Icon className={`size-4 transition-transform duration-300 ${arrow === 'down' ? 'group-hover:translate-y-1' : 'group-hover:translate-x-1'}`} />
    </AnchorLink>
  );
}
