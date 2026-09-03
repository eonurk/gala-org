import type { Metadata } from 'next';
import './globals.css';
import { asset } from '@/lib/asset';

/**
 * Oswald: başlıklar. Türkçe diyakritikleri (İ ı Ş ş Ğ ğ) geniş ve net çizilmiş,
 * dar-uzun oranı tribün ve skorboard tipografisine yakın.
 * Onest: gövde ve arayüz. Fraunces: yalnızca alıntılar.
 */
const FONTS =
  'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Onest:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@1,9..144,300..500&display=swap';

export const metadata: Metadata = {
  // Falls back to the non-GitHub-Pages deploy target when NEXT_PUBLIC_SITE_ORIGIN
  // isn't set (e.g. local dev, or the Cloudflare Workers build).
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://galatasaray-aslantepe.onurr.chatgpt.site'),
  title: {
    default: 'Galatasaray · Aslantepe',
    template: '%s · Galatasaray',
  },
  description:
    'Ali Sami Yen Spor Kompleksi RAMS Park’tan 1905’e. Galatasaray’ın evi, bugünü ve yaşayan tarihi.',
  openGraph: {
    title: '25 kez şampiyon. Beş yıldız. Tek arma.',
    description: '1905’ten bugüne Galatasaray’ın kulübü, tarihi ve bugünü tek yerde.',
    type: 'website',
    locale: 'tr_TR',
    images: [{ url: asset('/og.jpg'), width: 1200, height: 630, alt: 'Galatasaray — 1905’ten Sonsuza' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '25 kez şampiyon. Beş yıldız. Tek arma.',
    description: '1905’ten bugüne Galatasaray’ın kulübü, tarihi ve bugünü tek yerde.',
    images: [asset('/og.jpg')],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        <meta name="theme-color" content="#0a0908" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://hlkiurt3.rocketcdn.com" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
