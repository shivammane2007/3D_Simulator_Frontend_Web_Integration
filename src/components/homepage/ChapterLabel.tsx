export default function ChapterLabel({ text, className = '', variant = 'default' }: { text: string; className?: string; variant?: 'default' | 'dark' }) {
  // Founder feedback 2026-05-29: removed the leading horizontal dash
  // (`w-6 h-px bg-sage`) — read as AI-generated decoration. Keep the
  // `variant` prop API stable so existing callers don't need changes;
  // it now affects only the text color.
  const textColor = variant === 'dark' ? 'text-emerald-200' : 'text-sage'

  return (
    <div className={`flex items-center ${className}`}>
      <span style={variant === 'dark' ? { color: 'var(--color-sage-light)' } : undefined} className={`editorial-eyebrow text-xs font-semibold tracking-[0.15em] uppercase ${textColor} font-body`}>
        {text}
      </span>
    </div>
  )
}
