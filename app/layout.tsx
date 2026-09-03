import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Galatasaray · 1905’ten Sonsuza',
  description: 'Galatasaray’ın evi, bugünü ve 1905’ten bugüne yaşayan tarihi.',
  openGraph: {
    title: 'Burası Galatasaray.',
    description: 'Aslantepe’den 1905’e uzanan yaşayan Galatasaray deneyimi.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Burası Galatasaray — 1905’ten Sonsuza' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Burası Galatasaray.',
    description: 'Aslantepe’den 1905’e uzanan yaşayan Galatasaray deneyimi.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
