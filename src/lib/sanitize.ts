/**
 * HTML sanitizer for marketing-page titles + section headings.
 *
 * Allows a small whitelist of inline formatting tags (br, em, strong, b,
 * i, span) and escapes / strips everything else. Used by PageHero and
 * SectionHeading where copy comes from i18n message files and may
 * legitimately contain `<br/>` or `<span class="…">` for highlight
 * styling, but must not be a vector for `<script>` injection.
 *
 * Three-pass strategy (in order):
 *   Pass 1 — escape disallowed tags (open, close, self-closing) to `&lt;…&gt;`
 *   Pass 2 — strip attributes from allowed opening tags
 *            e.g. `<span class="x">` → `<span>`
 *   Pass 3 — strip attributes from allowed closing tags
 *            e.g. `</span onload=x>` → `</span>`
 *
 * Pass 2 + 3 prevent the "I allowed <span> but you snuck in
 * `<span onmouseover=alert(1)>`" attack.
 */
export const ALLOWED_INLINE_TAGS = /^(br|em|strong|b|i|span)$/i;

/**
 * Safe JSON serializer for use inside <script type="application/ld+json"> tags.
 *
 * JSON.stringify does NOT escape the forward slash in "</script>", so user-
 * controlled strings like `text</script><script>alert(1)</script>` are
 * preserved verbatim in the output. When that output is placed inside a
 * <script> tag the browser's HTML tokeniser finds the closing tag and
 * executes the injected payload — a stored XSS.
 *
 * The fix is a single targeted replacement: `</` → `<\/`. This is valid
 * JSON (the backslash is an allowed escape in JSON strings), valid
 * schema.org JSON-LD (parsers ignore it), and neutralises the vector.
 *
 * References:
 *   https://html.spec.whatwg.org/#script-data-end-tag-open-state
 *   https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html
 */
export function safeJsonLd(data: unknown): string {
    return JSON.stringify(data).replace(/<\//g, '<\\/');
}

export function sanitizeTitle(html: string): string {
    return html
        // Pass 1 — disallowed tags (any variant: <script>, </script>, <script/>)
        .replace(/<(\/?)([\w-]+)([^>]*?)(\/??)>/g, (_match, slash, tag, attrs, selfClose) => {
            if (ALLOWED_INLINE_TAGS.test(tag)) return _match; // keep for passes 2/3
            return `&lt;${slash}${tag}${attrs}${selfClose}&gt;`;
        })
        // Pass 2 — strip attributes from allowed opening tags
        .replace(/<(\w+)[^>]*>/g, (_match, tag) => {
            if (!ALLOWED_INLINE_TAGS.test(tag)) return _match;
            return `<${tag}>`;
        })
        // Pass 3 — strip attributes from allowed closing tags
        .replace(/<\/(\w+)[^>]*>/g, (_match, tag) => {
            if (!ALLOWED_INLINE_TAGS.test(tag)) return _match;
            return `</${tag}>`;
        });
}
