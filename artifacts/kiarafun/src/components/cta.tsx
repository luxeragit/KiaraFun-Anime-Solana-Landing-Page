import type { ReactNode } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { AnchorLink } from './anchor-link';

type Props = { id: string; children: ReactNode; testId: string; variant?: 'primary' | 'ghost'; arrow?: 'right' | 'down' };

export function Cta({ id, children, testId, variant = 'primary', arrow = 'right' }: Props) {
  const styles =
    variant === 'primary'
      ? 'bg-k-navy text-k-cloud hover:shadow-[0_16px_26px_-12px_rgba(24,43,73,.75)]'
      : 'text-k-navy ring-1 ring-k-navy/30 hover:ring-k-navy hover:bg-white/60';
  const Icon = arrow === 'down' ? ArrowDown : ArrowRight;
  return (
    <AnchorLink id={id} testId={testId} className={`press group inline-flex min-h-12 items-center gap-2.5 rounded-full px-6 font-semibold ${styles}`}>
      {children}
      <Icon className={`size-4 transition-transform duration-300 ${arrow === 'down' ? 'group-hover:translate-y-1' : 'group-hover:translate-x-1'}`} />
    </AnchorLink>
  );
}
