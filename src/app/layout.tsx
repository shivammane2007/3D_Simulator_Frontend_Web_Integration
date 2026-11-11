import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import LenisProvider from '@/components/motion/LenisProvider';
import DemoModalWrapper from '@/components/DemoModalWrapper';
import FloatingDemoCTA from '@/components/FloatingDemoCTA';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}: ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.name}: ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}: AI Surgical Simulation Platform`,
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '144x144', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
    >
      <head>
        <meta name="theme-color" content="#FAFAF7" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Audiowide&family=DM+Mono:wght@400;500&family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Hedvig+Letters+Serif:opsz@12..24&family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=Lato:wght@400;700&family=Manrope:wght@400;500;600;700&family=Monda:wght@400;500;600;700&family=Outfit:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&family=Red+Hat+Display:wght@400;500;600;700&family=Rethink+Sans:wght@400;500;600;700&family=Tillana:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700&display=swap"
        />
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
            <DemoModalWrapper />
            <FloatingDemoCTA />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
