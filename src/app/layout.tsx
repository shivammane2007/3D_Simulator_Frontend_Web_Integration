import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import LenisProvider from '@/components/motion/LenisProvider';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — AI Surgical Simulation Platform`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${dmSans.variable}`}
    >
      <head>
        <meta name="theme-color" content="#FAFAF7" />
      </head>
      <body
        className="antialiased bg-[var(--background)] text-[var(--foreground)]"
        style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}
      >
        <LanguageProvider>
          <LenisProvider>
            <Navigation />
            <main id="main-content" className="relative min-h-screen">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
