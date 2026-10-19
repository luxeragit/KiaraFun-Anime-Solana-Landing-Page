import type { ReactNode } from 'react';
import { scrollToSection } from '@/lib/motion';

type Props = {
  id: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  testId?: string;
};

export function AnchorLink({ id, className, children, onNavigate, testId }: Props) {
  return (
    <a
      href={`#${id}`}
      className={className}
      data-testid={testId}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.();
        scrollToSection(id);
      }}
    >
      {children}
    </a>
  );
}
