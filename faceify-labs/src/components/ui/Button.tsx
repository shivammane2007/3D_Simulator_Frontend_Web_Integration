import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'signal' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

interface ButtonProps extends ButtonBaseProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  ariaLabel?: string;
}

interface LinkButtonProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
  ariaLabel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#141413] text-[#F3F0EE] border-[1.5px] border-[#141413] hover:bg-[#262627] hover:border-[#262627] active:scale-[0.98]',
  secondary:
    'bg-white text-[#141413] border-[1.5px] border-[#141413] hover:bg-[#F3F0EE] active:scale-[0.98]',
  signal:
    'bg-[#CF4500] text-white border-0 hover:bg-[#B33B00] active:scale-[0.98]',
  ghost:
    'bg-transparent text-[#141413] hover:bg-[#EBE7E3]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-xs font-medium rounded-[20px] min-h-[36px] tracking-[-0.02em]',
  md: 'px-6 py-2.5 text-sm font-medium rounded-[20px] min-h-[44px] tracking-[-0.02em]',
  lg: 'px-8 py-3.5 text-base font-medium rounded-[20px] min-h-[50px] tracking-[-0.02em]',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  fullWidth,
  disabled,
  type = 'button',
  onClick,
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  fullWidth,
  external,
  ariaLabel,
}: LinkButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {children}
    </Link>
  );
}

/**
 * Satellite Micro-CTA:
 * A 52px circular white button with ink arrow docked onto the bottom-right of a circular portrait
 */
export function SatelliteButton({
  href,
  ariaLabel = 'Explore',
  className,
}: {
  href: string;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        'w-[52px] h-[52px] rounded-full bg-white text-[#141413] flex items-center justify-center shadow-level-2 border border-black/5 hover:scale-105 transition-transform duration-200 cursor-pointer shrink-0 z-20 group',
        className
      )}
    >
      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-150" />
    </Link>
  );
}
