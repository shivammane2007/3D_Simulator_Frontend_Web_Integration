'use client'

import ChapterLabel from '@/components/homepage/ChapterLabel'
import { sanitizeTitle } from '@/lib/sanitize'


export default function PageHero({
  label,
  title,
  subtitle,
  children,
  variant = 'warm',
}: {
  label?: string
  // string for back-compat (sanitized + dangerouslySetInnerHTML); ReactNode
  // for callers using `t.rich(...)` to inject styled `<em>` etc.
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  children?: React.ReactNode
  variant?: 'warm' | 'white'
}) {
  return (
    <section className={`${variant === 'warm' ? 'bg-warm' : 'bg-white'} editorial-surface editorial-hero px-5 md:px-12`}>
      <div className="max-w-[860px] mx-auto text-center">
        {label && <ChapterLabel text={label} className="justify-center mb-6" />}
        {typeof title === 'string' ? (
          <h1
            className="font-headline editorial-display font-normal tracking-tight text-ink leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: sanitizeTitle(title) }}
          />
        ) : (
          <h1 className="font-headline editorial-display font-normal tracking-tight text-ink leading-[1.1]">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="mt-5 text-lg text-slate-hp font-body font-normal max-w-[58ch] mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
