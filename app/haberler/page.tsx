import type { Metadata } from 'next';
import { Footer, Header, Ticker } from '@/components/site/chrome';
import { RevealRoot } from '@/components/site/reveal';
import { NewsBrowser } from './browser';
import { news } from '@/lib/gs';

export const metadata: Metadata = {
  title: 'Haberler',
  description: 'Galatasaray’dan son haberler: futbol, basketbol, voleybol, su sporları ve amatör şubeler.',
};

export default function NewsIndex() {
  return (
    <>
      <RevealRoot />
      <Ticker />
      <Header active="Haberler" />

      <section className="pagehero">
        <div className="ph">
          <img src="/images/rams-park-koreografi.webp" alt="RAMS Park’ta şampiyonluk koreografisi" fetchPriority="high" />
        </div>
        <div className="wrap pagehero-in">
          <p className="eyebrow">Kulübün nabzı</p>
          <h1 className="h1">
            Haber
            <br />
            <span className="gold">akışı</span>
          </h1>
          <p className="deck">
            Sahadan, parkeden, havuzdan ve pistten. Tek armanın altındaki her şubeden gelen son gelişmeler.
          </p>
        </div>
      </section>

      <NewsBrowser items={news} />

      <Footer />
    </>
  );
}
