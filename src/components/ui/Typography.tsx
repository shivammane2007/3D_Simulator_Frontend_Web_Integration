import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  withDot?: boolean;
  onDark?: boolean;
}

export function Eyebrow({ children, className, withDot = true, onDark = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-eyebrow',
        withDot && 'eyebrow-dot',
        onDark && 'text-[var(--accent-muted)]',
        className
      )}
    >
      {children}
    </p>
  );
}

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4';

interface HeadingProps {
  children: React.ReactNode;
  level?: HeadingLevel;
  size?: HeadingSize;
  className?: string;
  onDark?: boolean;
  balance?: boolean;
}

export function Heading({
  children,
  level = 'h2',
  size,
  className,
  onDark = false,
  balance = true,
}: HeadingProps) {
  const Tag = level;

  const autoSize: HeadingSize =
    size ??
    (level === 'h1' ? 'h1' : level === 'h2' ? 'h2' : level === 'h3' ? 'h3' : 'h4');

  const sizeMap: Record<HeadingSize, string> = {
    display: 'text-display',
    h1: 'text-h1',
    h2: 'text-h2',
    h3: 'text-h3',
    h4: 'text-h4',
  };

  return (
    <Tag
      className={cn(
        sizeMap[autoSize],
        'font-display',
        onDark ? 'text-[var(--foreground-on-dark)]' : 'text-[var(--foreground)]',
        balance && 'text-balance',
        className
      )}
    >
      {children}
    </Tag>
  );
}

interface ProseProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onDark?: boolean;
}

export function Prose({ children, className, size = 'md', onDark = false }: ProseProps) {
  const sizeMap = {
    sm: 'text-small',
    md: 'text-body',
    lg: 'text-body-lg',
  };

  return (
    <p
      className={cn(
        sizeMap[size],
        'font-body',
        onDark
          ? 'text-[var(--foreground-muted-on-dark)]'
          : 'text-[var(--foreground-muted)]',
        className
      )}
    >
      {children}
    </p>
  );
}
