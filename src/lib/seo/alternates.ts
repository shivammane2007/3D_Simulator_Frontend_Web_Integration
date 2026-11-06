/**
 * SEO helpers — canonical + hreflang alternates.
 *
 * Usage:
 *   import { buildAlternates } from "@/lib/seo/alternates";
 *
 *   // In generateMetadata:
 *   alternates: buildAlternates('/pricing', locale),
 *
 * Rules:
 *  - English uses no locale prefix (localePrefix: 'as-needed')
 *  - All 5 supported locales: en, th, ko, pt, ja
 *  - x-default always points to the EN (no-prefix) URL
 */

const BASE_URL = 'https://www.faceifylabs.com';
const LOCALES = ['en', 'th', 'ko', 'pt', 'ja'] as const;

/**
 * Build canonical + hreflang alternates for a given path and current locale.
 *
 * @param path  - The locale-agnostic path, e.g. '/pricing' or '/procedures/rhinoplasty'
 * @param locale - The current locale (used to set canonical)
 */
export function buildAlternates(
    path: string,
    locale: string,
): {
    canonical: string;
    languages: Record<string, string>;
} {
    const canonicalLocale = locale === 'en' ? '' : `/${locale}`;
    const canonical = `${BASE_URL}${canonicalLocale}${path}`;

    const languages: Record<string, string> = {};
    for (const loc of LOCALES) {
        const prefix = loc === 'en' ? '' : `/${loc}`;
        languages[loc] = `${BASE_URL}${prefix}${path}`;
    }
    languages['x-default'] = `${BASE_URL}${path}`;

    return { canonical, languages };
}

/**
 * Returns Next.js robots directive for non-EN pages whose content
 * has not been translated (English-only legal pages, etc.).
 *
 * @param locale - Current locale
 * @returns undefined for EN (let the page-level default apply),
 *          { index: false, follow: true } for non-EN locales.
 */
export function noindexForUntranslated(
    locale: string,
): { index: false; follow: true } | undefined {
    return locale === 'en' ? undefined : { index: false, follow: true };
}
