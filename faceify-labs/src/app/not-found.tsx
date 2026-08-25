import Link from 'next/link';
import { ArrowRight, Home, Sparkles } from 'lucide-react';
import { Section, Container } from '@/components/layout/Container';
import { routes } from '@/config/routes';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-144px)] flex items-center justify-center py-20 bg-[var(--background)]">
      <Container>
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="text-8xl font-black font-display text-[var(--accent-muted)]/30 select-none">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold font-display text-[var(--foreground)]">
              Page Not Found
            </h1>
            <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
              The clinical guide or simulation page you requested could not be located.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href={routes.home}
              className="px-5 py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </Link>

            <Link
              href={routes.procedures}
              className="px-5 py-2.5 rounded-full border border-[var(--border-strong)] text-[var(--foreground)] text-xs font-bold hover:bg-[var(--surface-muted)] transition-all"
            >
              Browse 85+ Procedures
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
