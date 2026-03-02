import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kowa Namu Ne Foundation — Come With Us',
    template: '%s | Kowa Namu Ne Foundation',
  },
  description:
    'The Kowa Namu Ne Foundation is dedicated to youth empowerment, education, healthcare, and humanitarian support across Nigeria.',
  keywords: ['Nigeria', 'foundation', 'scholarship', 'youth empowerment', 'education', 'JAMB', 'WAEC', 'NECO', 'humanitarian'],
  authors: [{ name: 'Kowa Namu Ne Foundation' }],
  creator: 'Kowa Namu Ne Foundation',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://kowanamunejoundation.org'),
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://kowanamunejoundation.org',
    siteName: 'Kowa Namu Ne Foundation',
    title: 'Kowa Namu Ne Foundation — Come With Us',
    description: 'Empowering Nigerian youth through education, skills, and opportunity.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Kowa Namu Ne Foundation' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kowa Namu Ne Foundation',
    description: 'Empowering Nigerian youth through education, skills, and opportunity.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white font-body">{children}</body>
    </html>
  );
}
