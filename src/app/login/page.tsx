'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { routes } from '@/config/routes';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Practice authentication demo mode. Access granted.');
  };

  return (
    <div className="min-h-[calc(100vh-144px)] flex items-center justify-center py-16">
      <Container>
        <div className="max-w-md mx-auto bg-[var(--surface)] p-8 md:p-10 rounded-[var(--radius-2xl)] border border-[var(--border)] shadow-[var(--shadow-xl)] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold font-display text-[var(--foreground)]">
              Surgeon Portal
            </h1>
            <p className="text-xs text-[var(--foreground-muted)]">
              Sign in to manage practice simulation plans and team seats.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--foreground)]">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="email"
                  placeholder="surgeon@clinic.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] text-xs text-[var(--foreground)] bg-[var(--background)] focus-visible:outline-none focus-visible:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[var(--foreground)]">
                  Password
                </label>
                <a href="#" className="text-[11px] text-[var(--accent)] hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] text-xs text-[var(--foreground)] bg-[var(--background)] focus-visible:outline-none focus-visible:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" fullWidth size="md">
                Sign In to Clinic Dashboard
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--foreground-muted)] space-y-2">
            <p>
              Don&apos;t have practice credentials?{' '}
              <Link href={routes.pricing} className="text-[var(--accent)] font-bold hover:underline">
                View Plans
              </Link>
            </p>
            <p className="text-[11px] text-[var(--foreground-subtle)] flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Secured with JWT Session Authorization</span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
