import ChapterLabel from '@/components/homepage/ChapterLabel'
import { sanitizeTitle } from '@/lib/sanitize'


export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  dark,
}: {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
}) {
  const centered = align === 'center'

  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 md:mb-16`}>
      {label && <ChapterLabel variant={dark ? 'dark' : 'default'} text={label} className={centered ? 'justify-center mb-5' : 'mb-5'} />}
      <h2
        className={`font-headline editorial-heading text-balance tracking-tight font-normal leading-tight ${dark ? 'text-white' : 'text-ink'}`}
        dangerouslySetInnerHTML={{ __html: sanitizeTitle(title) }}
      />
      {subtitle && (
        <p className={`mt-4 text-base font-body font-normal leading-relaxed ${centered ? 'max-w-[58ch] mx-auto' : 'max-w-[58ch]'} ${dark ? 'text-white/85' : 'text-slate-hp'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
