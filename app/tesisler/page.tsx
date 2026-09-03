import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CalendarDays, ChevronRight, MapPin, Navigation, Ticket, Train } from 'lucide-react';
import { Footer, Header, Ticker } from '@/components/site/chrome';
import { RevealRoot } from '@/components/site/reveal';
import { stagger } from '@/lib/stagger';
import { facilities, matchdaySteps, stadiumFacts } from '@/lib/gs';
import { asset } from '@/lib/asset';

export const metadata: Metadata = {
  title: 'Tesisler',
  description:
    'Ali Sami Yen Spor Kompleksi RAMS Park’tan Florya’ya, Kalamış’tan Galatasaray Adası’na: kulübün tüm tesisleri.',
};

const rest = facilities.slice(1);

export default function Facilities() {
  return (
    <>
      <RevealRoot />
      <Ticker />
      <Header active="Tesisler" />

      <section className="pagehero">
        <div className="ph">
          <img src={asset('/images/aslantepe-aerial.webp')} alt="RAMS Park’ın havadan görünümü" fetchPriority="high" />
        </div>
        <div className="wrap pagehero-in">
          <p className="crumb">
            <Link href="/">Ana sayfa</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--gold)' }}>Tesisler</span>
          </p>
          <h1 className="h1">
            Armanın
            <br />
            <span className="gold">adresleri.</span>
          </h1>
          <p className="deck">
            Seyrantepe’deki evden Florya’daki antrenman sahasına, Küçükçekmece’deki kürek hangarından
            Galatasaray Adası’na kadar.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- RAMS Park */}
      <section className="sect">
        <div className="wrap">
          <div className="fac-hero">
            <div className="ph ph-zoom" data-reveal>
              <img src={asset('/images/rams-park-bowl.webp')} alt="RAMS Park tribünleri ve saha" loading="lazy" />
            </div>
            <div data-reveal style={stagger(1)}>
              <p className="eyebrow">Ana tesis</p>
              <h2 className="h2">
                Ali Sami Yen
                <br />
                Spor Kompleksi
                <br />
                <span className="gold">RAMS Park</span>
              </h2>
              <p className="deck" style={{ marginTop: 22 }}>
                {facilities[0].body}
              </p>

              <div className="venue-facts">
                {stadiumFacts.map((f) => (
                  <div key={f.label}>
                    <strong className="num">{f.value}</strong>
                    <b>{f.label}</b>
                    <span>{f.note}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a className="btn" href="https://www.passolig.com.tr" target="_blank" rel="noreferrer noopener">
                  <Ticket size={16} /> Bilet al
                </a>
                <a
                  className="btn btn-ghost"
                  href="https://maps.google.com/?q=Ali+Sami+Yen+Spor+Kompleksi+RAMS+Park"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Navigation size={16} /> Yol tarifi
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- maç günü */}
      <section className="sect-tight" style={{ background: 'var(--night)' }}>
        <div className="wrap">
          <div className="sect-head" data-reveal>
            <div>
              <p className="eyebrow">Maç günü</p>
              <h2 className="h2">
                Metrodan
                <br />
                <span className="gold">tribüne.</span>
              </h2>
            </div>
            <p className="lede" style={{ maxWidth: '36ch' }}>
              <Train size={15} style={{ display: 'inline', marginRight: 8, color: 'var(--gold)' }} />
              M3 Seyrantepe istasyonu stadın altındadır. Maç günlerinde ek sefer konulur.
            </p>
          </div>

          <div className="steps">
            {matchdaySteps.map((s, i) => (
              <div className="step" key={s.no} data-reveal style={stagger(i, 0.07)}>
                <em>{s.no}</em>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a className="btn btn-ghost" href="#tum-tesisler">
              <CalendarDays size={16} /> Müze & stadyum turu
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ tüm tesisler */}
      <section className="sect" id="tum-tesisler">
        <div className="wrap">
          <div className="sect-head" data-reveal>
            <div>
              <p className="eyebrow">Tüm tesisler</p>
              <h2 className="h2">
                Şehre yayılan
                <br />
                <span className="gold">bir kulüp.</span>
              </h2>
            </div>
            <p className="lede" style={{ maxWidth: '34ch' }}>
              {facilities.length} tesis; futbol, su sporları, binicilik ve amatör şubeler için.
            </p>
          </div>

          <div className="faclist">
            {rest.map((f, i) => (
              <div className="fac" key={f.name} data-reveal style={stagger(i % 4, 0.06)}>
                <div>
                  <div className="fac-kind">{f.kind}</div>
                  {f.image && (
                    <div className="ph ph-zoom fac-thumb">
                      <img src={asset(f.image)} alt={f.name} loading="lazy" />
                    </div>
                  )}
                </div>
                <div>
                  <h3>{f.name}</h3>
                  <p className="fac-loc">
                    <MapPin size={11} style={{ display: 'inline', marginRight: 6 }} />
                    {f.location}
                  </p>
                </div>
                <p className="fac-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- ziyaret */}
      <section className="light sect">
        <div className="wrap visit-grid">
          <div data-reveal>
            <p className="eyebrow on-light">Gel ve hisset</p>
            <h2 className="h2">
              Aslantepe
              <br />
              <span className="claret">seni bekliyor.</span>
            </h2>
          </div>
          <div data-reveal style={stagger(1)}>
            <p className="deck on-light" style={{ marginBottom: 30 }}>
              Maç günü, müze turu ya da sadece armanın evini görmek için. Yolculuğunu buradan planla.
            </p>
            <div className="visit-links">
              <a
                href="https://maps.google.com/?q=Ali+Sami+Yen+Spor+Kompleksi+RAMS+Park"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Navigation size={17} /> Yol tarifi & ulaşım <ArrowRight size={15} />
              </a>
              <a href="#tum-tesisler">
                <CalendarDays size={17} /> Müze & stadyum turu <ArrowRight size={15} />
              </a>
              <a href="https://www.passolig.com.tr" target="_blank" rel="noreferrer noopener">
                <Ticket size={17} /> Bilet & kombine <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
