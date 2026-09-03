import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { Footer, Header, Ticker } from '@/components/site/chrome';
import { RevealRoot } from '@/components/site/reveal';
import { stagger } from '@/lib/stagger';
import { news } from '@/lib/gs';
import { asset } from '@/lib/asset';

export function generateStaticParams() {
  return news.map((n) => ({ id: n.id }));
}

export default function Article({ params }: { params: { id: string } }) {
  const item = news.find((n) => n.id === params.id) ?? news[0];
  const related = news.filter((n) => n.id !== item.id && n.category === item.category).slice(0, 3);
  const more = (related.length ? related : news.filter((n) => n.id !== item.id)).slice(0, 3);

  return (
    <>
      <RevealRoot />
      <Ticker />
      <Header active="Haberler" />

      <section className="pagehero">
        <div className="ph">
          <img src={asset(item.image)} alt="" fetchPriority="high" />
        </div>
        <div className="wrap pagehero-in">
          <p className="crumb">
            <Link href="/">Ana sayfa</Link>
            <ChevronRight size={12} />
            <Link href="/haberler">Haberler</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--gold)' }}>{item.category}</span>
          </p>
          <h1 className="h1" style={{ fontSize: 'clamp(30px, 4.2vw, 68px)', textTransform: 'none' }}>
            {item.title}
          </h1>
          <p className="crumb" style={{ margin: '22px 0 0' }}>
            <time dateTime={item.iso}>
              {item.dateLabel} {item.dayLabel} · {item.timeLabel}
            </time>
          </p>
        </div>
      </section>

      <section className="sect">
        <div className="wrap">
          <article className="article" data-reveal>
            <div className="article-body">
              <p>{item.summary}</p>
              <p>
                Galatasaray Spor Kulübü’nün resmî açıklamaları, maç raporları ve şube haberleri bu akışta toplanır.
                Bu sayfa, kulübün RSS akışındaki özeti taşır; haberin tamamı kulübün kendi arşivinde yer alır.
              </p>
            </div>
            <p className="article-sig">Galatasaray Spor Kulübü</p>

            <div style={{ marginTop: 40, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a className="btn btn-ghost" href={`https://www.galatasaray.org${item.href}`} target="_blank" rel="noreferrer noopener">
                Haberin tamamı <ArrowRight size={15} />
              </a>
              <Link className="btn btn-ghost" href="/haberler">
                <ArrowLeft size={15} /> Tüm haberler
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="sect-tight" style={{ borderTop: '1px solid var(--line-gold)' }}>
        <div className="wrap">
          <div className="sect-head" data-reveal>
            <h2 className="h2" style={{ fontSize: 'clamp(26px, 3vw, 44px)' }}>
              İlgili <span className="gold">haberler</span>
            </h2>
            <Link className="tlink" href="/haberler">
              Tümü <ArrowRight size={15} />
            </Link>
          </div>

          <div className="cardgrid">
            {more.map((n, i) => (
              <Link className="card" key={n.id} href={`/haberler/${n.id}`} data-reveal style={stagger(i, 0.07)}>
                <div className="ph ph-zoom">
                  <img src={asset(n.image)} alt="" loading="lazy" />
                </div>
                <div className="card-meta">
                  <em>{n.category}</em>
                  <span>{n.dateLabel}</span>
                </div>
                <h3>{n.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
