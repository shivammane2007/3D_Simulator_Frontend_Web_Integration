import { Link } from '@/i18n/routing'

const variants = {
  primary: 'bg-[#CF4500] text-white editorial-primary hover:bg-[#B53D00]',
  secondary: 'border border-mist text-[#141413] hover:border-slate-hp/30 hover:bg-black/5',
  sage: 'bg-[#CF4500] text-white editorial-primary hover:bg-[#B53D00]',
  ghost: 'text-[#CF4500] hover:text-[#B53D00] hover:underline underline-offset-4',
} as const

const sizes = {
  md: 'px-8 py-3 text-sm',
  lg: 'px-11 py-4 text-base',
  block: 'w-full justify-center px-6 py-4 text-center text-base',
} as const

export default function MarketingButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: {
  children: React.ReactNode
  href: string
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`editorial-button inline-flex items-center gap-2 rounded-full font-sans font-semibold motion-safe:transition-colors motion-safe:duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  )
}
