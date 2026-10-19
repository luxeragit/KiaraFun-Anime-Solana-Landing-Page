import type { CSSProperties } from 'react';

export function Cloud({ className, style, fill = '#ffffff' }: { className?: string; style?: CSSProperties; fill?: string }) {
  return (
    <svg viewBox="0 0 130 70" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        fill={fill}
        d="M24 66C8 66 2 50 16 44c-2-16 18-24 30-14C52 10 84 8 92 30c18-4 32 14 18 26-4 4-8 10-16 10z"
      />
    </svg>
  );
}

export function Ribbon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 100" className={className} style={style} aria-hidden="true" focusable="false">
      <path fill="#ff515b" d="M60 46C34 8 6 14 6 38c0 20 34 20 54 8z" />
      <path fill="#ff515b" d="M60 46C86 8 114 14 114 38c0 20-34 20-54 8z" />
      <path fill="#e23a46" d="M60 46C40 30 24 30 14 36c6 12 30 16 46 10zM60 46c20-16 36-16 46-10-6 12-30 16-46 10z" opacity=".55" />
      <path fill="#ff515b" d="M52 50 30 92l16-8 8 12 8-44z" />
      <path fill="#e23a46" d="M68 50l22 42-16-8-8 12-6-30z" />
      <rect x="50" y="36" width="20" height="22" rx="9" fill="#ff7078" />
    </svg>
  );
}

export function Sparkle({ className, style, fill = '#ffaa32' }: { className?: string; style?: CSSProperties; fill?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true" focusable="false">
      <path fill={fill} d="M20 0c1.5 11 8.5 18.5 20 20-11.5 1.5-18.5 9-20 20-1.5-11-8.5-18.5-20-20C11.500 18.500 18.500 11 20 0z" />
    </svg>
  );
}

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="relative inline-block shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-[0_4px_12px_-4px_rgba(24,43,73,.5)]"
      style={{ width: size, height: size }}
    >
      <img
        src="/assets/kiara-mascot.png"
        alt=""
        width={1024}
        height={1024}
        className="absolute inset-0 h-full w-full origin-[50%_42%] scale-[1.75] object-cover"
      />
    </span>
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display text-[1.2rem] font-extrabold leading-none tracking-tight ${className}`}>
      <span>Kiara</span>
      <span className="text-k-ribbon">Fun</span>
    </span>
  );
}
