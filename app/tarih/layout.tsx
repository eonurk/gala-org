import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yaşayan Tarih · Galatasaray',
  description: '1905’ten bugüne, Galatasaray tarihinde yıl yıl yürü.',
  openGraph: {
    title: 'Galatasaray · Yaşayan Tarih',
    description: 'Yılı seç; o sezonun insanlarını, kupalarını ve izlerini keşfet.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
