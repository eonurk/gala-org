import type { Metadata } from 'next';
import { asset } from '@/lib/asset';

export const metadata: Metadata = {
  title: 'Yaşayan Tarih',
  description: '1905’ten bugüne, Galatasaray tarihinde yıl yıl yürü.',
  openGraph: {
    title: 'Galatasaray · Yaşayan Tarih',
    description: 'Yılı seç; o sezonun insanlarını, kupalarını ve izlerini keşfet.',
    images: [{ url: asset('/og.jpg'), width: 1200, height: 630 }],
  },
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
