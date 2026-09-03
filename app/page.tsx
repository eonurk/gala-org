import Link from 'next/link';
import { ArrowRight, CalendarDays, ChevronRight, MapPin, Navigation, Ticket, Trophy } from 'lucide-react';
import { Footer, Header } from '@/components/site/chrome';
import { Crest } from '@/components/site/crest';
import { RevealRoot } from '@/components/site/reveal';
import { stagger } from '@/lib/stagger';
import { asset } from '@/lib/asset';
import {
  artifacts,
  fixtures,
  honours,
  marqueeItems,
  news,
  nextMatch,
  stadiumFacts,
  trophies,
} from '@/lib/gs';

const lead = news[5];
const stack = news.filter((n) => n.id !== lead.id).slice(0, 5);

/* Vitrinde kupası gösterilen kategoriler künye şeridinde tekrarlanmaz. */
const carded = new Set(trophies.map((t) => t.name));
const restOfHonours = honours.filter((h) => !carded.has(h.label));

export default function Home() {
  return (
    <>
      <RevealRoot />
      <Header />

      {/* ---------------------------------------------------------- hero */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src={asset('/images/rams-park-night.webp')}
            alt="RAMS Park’ta gece maçı: dolu tribünler ve sahayı saran dev bayrak"
            fetchPriority="high"
          />
        </div>
        <div className="hero-scrim" />
        <Crest className="hero-watermark" />

        <div className="wrap hero-in">
          {/* Maç künyesi fikstür bölümüne taşındı; kahraman tek sütun tipografi. */}
          <div className="hero-copy">
            <p className="eyebrow">1905’ten beri · İstanbul</p>
            <h1 className="hero-word">GALATASARAY</h1>
            <p className="hero-sub">
              <em>25 kez şampiyon.</em> <span>/</span> Beş yıldız. <span>/</span> Tek arma.
            </p>
            <p className="deck">
              Bir okul sırasında başladı, Avrupa’da kupayla taçlandı. Bugün 18 branşta aynı arma, aynı ses:
              sarı ile kırmızı.
            </p>
            <div className="hero-cta">
              <a className="btn" href="https://www.passolig.com.tr" target="_blank" rel="noreferrer noopener">
                <Ticket size={16} /> Maça gel
              </a>
              <Link className="btn btn-ghost" href="/tarih">
                121 yılı gez <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="scrollcue">
          <i /> Aşağı kaydır
        </div>
      </section>

      {/* ------------------------------------------------------- marquee */}
      <div className="mq" aria-hidden="true">
        <div className="mq-track">
          {[0, 1].flatMap((pass) =>
            marqueeItems.map((item) => <span key={`${pass}-${item}`}>{item}</span>),
          )}
        </div>
      </div>

      {/* -------------------------------------------------------- fikstür */}
      <section className="sect-tight" id="fikstur" style={{ background: 'var(--night)' }}>
        <div className="wrap">
          <div className="sect-head" data-reveal>
            <div>
              <p className="eyebrow">Fikstür</p>
              <h2 className="h2">
                Sıradaki
                <br />
                <span className="gold">doksan dakika.</span>
              </h2>
            </div>
            <a
              className="tlink"
              href="https://www.tff.org"
              target="_blank"
              rel="noreferrer noopener"
            >
              Tüm fikstür <ArrowRight size={15} />
            </a>
          </div>

          <div className="fixgrid">
            {/* Sıradaki maç, kahramandaki künyenin tam hâli:
                rakip, saat, tarih, saha ve bilet. */}
            <div className="fixcol" data-reveal>
              <p className="fixcol-head">
                <Ticket size={14} /> Sıradaki maç
              </p>

              <article className="nextfix">
                <p className="nf-kicker">
                  <span className="nf-pip" aria-hidden="true" /> {nextMatch.competition}
                </p>

                <p className="nf-tie">
                  <b>{nextMatch.home}</b>
                  <i>—</i>
                  <b>{nextMatch.away}</b>
                </p>

                <p className="nf-when">
                  <strong className="num">{nextMatch.timeLabel}</strong>
                  <span>{nextMatch.dateLabel}</span>
                </p>

                <p className="nf-where">
                  <MapPin size={12} /> {nextMatch.venue}
                </p>

                <div className="nf-foot">
                  <a
                    className="btn nf-btn"
                    href="https://www.passolig.com.tr"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Ticket size={14} /> Bilet al
                  </a>
                  <span className="nf-tag">İç saha</span>
                </div>
              </article>
            </div>

            <div className="fixcol" data-reveal style={stagger(1)}>
              <p className="fixcol-head">
                <CalendarDays size={14} /> Gelecek maçlar
              </p>
              <ol className="fixlist">
                {fixtures.slice(1).map((f) => (
                  <li key={`${f.date}-${f.short}`}>
                    <span className="fx-date">
                      <b>{f.date}</b>
                      <i>{f.day}</i>
                    </span>
                    <span className={`fx-comp fx-${f.comp === 'ŞL' ? 'ucl' : 'sl'}`}>{f.comp}</span>
                    <span className="fx-opp">
                      <b>{f.opponent}</b>
                      <i>{f.home ? 'İç saha · RAMS Park' : 'Deplasman'}</i>
                    </span>
                    <span className="fx-ha" data-home={f.home}>
                      {f.home ? 'İ' : 'D'}
                    </span>
                    <span className="fx-time num">{f.time}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- gündem */}
      <section className="sect" id="gundem">
        <div className="wrap">
          <div className="sect-head" data-reveal>
            <div>
              <p className="eyebrow">Kulübün nabzı</p>
              <h2 className="h2">
                Bugün
                <br />
                <span className="gold">Galatasaray</span>
              </h2>
            </div>
            <Link className="tlink" href="/haberler">
              Tüm haberler <ArrowRight size={15} />
            </Link>
          </div>

          <div className="newsgrid">
            <Link className="lead" href={`/haberler/${lead.id}`} data-reveal>
              <div className="ph ph-zoom">
                <img src={asset(lead.image)} alt="" loading="lazy" />
              </div>
              <div className="lead-meta">
                <span className="chip">{lead.category}</span>
                <span>
                  {lead.dateLabel} · {lead.timeLabel}
                </span>
              </div>
              <h3>{lead.title}</h3>
              <p>{lead.summary}</p>
            </Link>

            <div className="stack" data-reveal style={stagger(1)}>
              {stack.map((item) => (
                <Link key={item.id} href={`/haberler/${item.id}`}>
                  <div className="ph">
                    <img src={asset(item.image)} alt="" loading="lazy" />
                  </div>
                  <div className="stack-txt">
                    <p>{item.category}</p>
                    <h4>{item.title}</h4>
                    <span>
                      {item.dateLabel} · {item.timeLabel}
                    </span>
                  </div>
                  <ChevronRight size={17} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- kupa dolabı */}
      <section className="sect">
        <div className="wrap">
          <div className="sect-head" data-reveal>
            <div>
              <p className="eyebrow">Kupa dolabı</p>
              <h2 className="h2">
                Beş yıldız,
                <br />
                <span className="gold">bir arma.</span>
              </h2>
            </div>
            <Link className="tlink" href="/tarih">
              Kupaların hikâyesi <ArrowRight size={15} />
            </Link>
          </div>

          {/* Rakam yerine kupanın kendisi: vitrindeki gerçek fotoğraflar */}
          <div className="cabinet">
            {trophies.map((t, i) => (
              <figure className="cup" key={t.name} data-reveal style={stagger(i, 0.09)}>
                <div className="ph ph-zoom ph-object cup-shot">
                  <img src={asset(t.image)} alt={t.alt} loading="lazy" />
                  <span className="cup-branch">{t.branch}</span>
                </div>
                <figcaption>
                  <strong className="num gold">{t.count}</strong>
                  <div>
                    <b>{t.name}</b>
                    <span>{t.note}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Vitrine sığmayanlar — kupası yukarıda gösterilenler tekrar edilmez.
              Hepsinin fotoğrafı varsa bu şerit hiç basılmaz. */}
          {restOfHonours.length > 0 && (
            <ol className="ledger" data-reveal>
              {restOfHonours.map((h) => (
                <li key={h.label}>
                  <strong className="gold">{h.count}</strong>
                  <b>{h.label}</b>
                  <span>Son {h.note}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------ müze nesneleri */}
      <section className="sect-tight" id="muze" style={{ background: 'var(--night)' }}>
        <div className="wrap">
          <div className="sect-head" data-reveal>
            <div>
              <p className="eyebrow">Müzeden</p>
              <h2 className="h2">
                Kupanın
                <br />
                <span className="gold">yanındaki şeyler.</span>
              </h2>
            </div>
            <p className="lede" style={{ maxWidth: '30ch' }}>
              Bir kulübü kupalar kadar bıraktığı nesneler anlatır.
            </p>
          </div>

          <div className="relics">
            {artifacts.map((a, i) => (
              <article className="relic" key={a.title} data-reveal style={stagger(i, 0.08)}>
                <div className="ph ph-zoom ph-object">
                  <img src={asset(a.image)} alt={a.alt} loading="lazy" />
                </div>
                <p className="relic-meta">{a.meta}</p>
                <h3 className="h3">{a.title}</h3>
                <p>{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Aslantepe */}
      <section className="venue sect" id="aslantepe">
        <div className="wrap">
          <div className="venue-grid">
            <div className="ph ph-zoom" data-reveal>
              <img src={asset('/images/aslantepe-aerial.webp')} alt="RAMS Park’ın havadan görünümü" loading="lazy" />
            </div>

            <div className="venue-copy" data-reveal style={stagger(1)}>
              <p className="eyebrow">Evimiz</p>
              <h2 className="h2">
                Aslantepe’de
                <br />
                <span className="gold">bir gece.</span>
              </h2>
              <p className="deck" style={{ marginTop: 22 }}>
                2011’den beri Seyrantepe’deyiz. Çatısı kendi güneşini üreten, 52 bin kişinin tek nefeste bağırdığı
                bir bowl. Rakipler buraya gelmekten çekinir; taraftar buraya “Cehennem” der.
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

              <div style={{ marginTop: 34 }}>
                <Link className="btn btn-ghost" href="/tesisler">
                  Tesisleri gör <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- tribün */}
      <section className="roar">
        <div className="ph">
          <img src={asset('/images/tribun-ultraslan.webp')} alt="Tribünde açılan dev UltrAslan bayrağı" loading="lazy" />
        </div>
        <div className="wrap roar-copy" data-reveal>
          <p className="eyebrow">12. adam</p>
          <h2 className="h2">
            Sesin
            <br />
            <span className="gold">rengi var.</span>
          </h2>
          <p className="roar-quote">
            “Galatasaray bir his takımıdır.” Tribünde asılı o pankart, buranın kurallarını tek cümlede anlatır:
            burada takım oynar, taraftar taşır.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ tarih */}
      <section className="past">
        <div className="ph">
          <img src={asset('/images/founders.webp')} alt="Galatasaray’ın kurucu kuşağı" loading="lazy" />
        </div>

        <div className="wrap past-copy" data-reveal>
          <p className="eyebrow">Yaşayan hafıza</p>
          <span className="bigyear gold num">1905</span>
          <h2 className="h2" style={{ marginTop: 28 }}>
            Bir sınıfta başladı.
            <br />
            Dünyaya yayıldı.
          </h2>
          <p className="deck" style={{ marginTop: 20, maxWidth: '48ch' }}>
            Yılı seç. O sezonun insanlarını, kupalarını ve ardında bıraktığı izi tek tek dolaş.
          </p>
          <div style={{ marginTop: 32 }}>
            <Link className="btn" href="/tarih">
              <Trophy size={16} /> Tarihte yürü
            </Link>
          </div>
        </div>

        <div className="yearrail" aria-hidden="true">
          <span>1905</span>
          <i />
          <span>1959</span>
          <i />
          <span>2000</span>
          <i />
          <span>2026</span>
        </div>
      </section>

      {/* ---------------------------------------------------------- ziyaret */}
      <section className="light sect" id="ziyaret">
        <div className="wrap visit-grid">
          <div data-reveal>
            <p className="eyebrow on-light">Gel ve hisset</p>
            <h2 className="h2">
              Aslantepe
              <br />
              <span className="claret">seni bekliyor.</span>
            </h2>
            <p className="deck on-light" style={{ margin: '24px 0 30px', maxWidth: '34ch' }}>
              Maç günü, müze turu ya da sadece armanın evini görmek için.
            </p>
            <div className="visit-links">
              <Link href="/tesisler">
                <Navigation size={17} /> Yol tarifi & ulaşım <ArrowRight size={15} />
              </Link>
              <Link href="/tesisler">
                <CalendarDays size={17} /> Müze & stadyum turu <ArrowRight size={15} />
              </Link>
              <a href="https://www.passolig.com.tr" target="_blank" rel="noreferrer noopener">
                <Ticket size={17} /> Bilet & kombine <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <div className="ph ph-zoom visit-shot" data-reveal style={stagger(1)}>
            <img
              src={asset('/images/rams-park-bowl.webp')}
              alt="RAMS Park’ın boş tribünlerinde koltuklarla yazılmış Galatasaray yazısı"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
