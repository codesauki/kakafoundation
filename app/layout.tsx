import type { Metadata } from 'next';
import { Providers } from './providers';
import { SettingsProvider } from '@/components/providers/SettingsProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kowa Namu Ne Foundation — Come With Us',
    template: '%s | Kowa Namu Ne Foundation',
  },
  description:
    'The Kowa Namu Ne Foundation is dedicated to youth empowerment, education, healthcare, and humanitarian support across Nigeria. Scholarship opportunities, skills training, healthcare interventions.',
  keywords: [
    'Nigeria',
    'foundation',
    'scholarship',
    'youth empowerment',
    'education',
    'JAMB',
    'WAEC',
    'NECO',
    'humanitarian',
    'Kaduna',
    'charitable organization',
  ],
  authors: [{ name: 'Kowa Namu Ne Foundation' }],
  creator: 'Kowa Namu Ne Foundation',
  publisher: 'Kowa Namu Ne Foundation',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://kowanamunejoundation.org'),
  
  // Metadata
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Open Graph - Social Media Sharing
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    alternateLocale: ['en_US'],
    url: 'https://kowanamunejoundation.org',
    siteName: 'Kowa Namu Ne Foundation',
    title: 'Kowa Namu Ne Foundation — Come With Us',
    description: 'Empowering Nigerian youth through education, healthcare, and humanitarian support.',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Kowa Namu Ne Foundation Hero Background',
        type: 'image/jpeg',
      },
      {
        url: '/images/logo.png',
        width: 400,
        height: 400,
        alt: 'Kowa Namu Ne Foundation Logo',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter Card Optimization
  twitter: {
    card: 'summary_large_image',
    site: '@kowanamuneFoundation',
    creator: '@kowanamuneFoundation',
    title: 'Kowa Namu Ne Foundation',
    description: 'Empowering Nigerian youth through education, healthcare, and humanitarian initiatives. Join our mission today.',
    images: ['/images/hero-bg.jpg'],
  },
  
  // WhatsApp, Telegram, and other messaging apps
  other: {
    'og:image': '/images/hero-bg.jpg',
    'og:image:type': 'image/jpeg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:locale': 'en_NG',
  },
  
  // PWA and Icons
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },
  
  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Kowa Namu Ne Foundation',
  },
  
  // Robots and SEO
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
  
  // Verification (add your verification codes here)
  verification: {
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    // yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-white font-body">
        <SettingsProvider>
          <Providers>
            {children}
          </Providers>
        </SettingsProvider>
      </body>
    </html>
  );
}
