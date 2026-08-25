'use client';

import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className, as: As = 'div' }: ContainerProps) {
  return (
    <As className={cn('container-faceify', className)}>
      {children}
    </As>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  background?: 'default' | 'muted' | 'dark' | 'white';
  as?: React.ElementType;
}

export function Section({
  children,
  className,
  size = 'md',
  background = 'default',
  as: As = 'section',
}: SectionProps) {
  const bgMap = {
    default: 'bg-[var(--background)]',
    muted: 'bg-[var(--surface-muted)]',
    dark: 'bg-[var(--surface-dark)]',
    white: 'bg-[var(--surface)]',
  };

  const sizeMap = {
    sm: 'section-py-sm',
    md: 'section-py',
    lg: 'section-py-lg',
  };

  return (
    <As className={cn(sizeMap[size], bgMap[background], className)}>
      {children}
    </As>
  );
}
