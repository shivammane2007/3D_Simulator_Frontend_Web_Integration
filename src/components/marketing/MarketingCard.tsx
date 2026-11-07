const variants = {
  white: 'bg-white border border-slate-200',
  warm: 'bg-warm border border-slate-200',
  'glass-dark': 'bg-white/5 border border-white/[0.08] backdrop-blur-none editorial-card-dark',
} as const

export default function MarketingCard({
  children,
  variant = 'white',
  hover = false,
  className = '',
}: {
  children: React.ReactNode
  variant?: keyof typeof variants
  hover?: boolean
  className?: string
}) {
  return (
    <div
      className={`editorial-paper editorial-card rounded-[20px] p-8 ${variants[variant]} ${
        hover ? 'motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg editorial-lift' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
