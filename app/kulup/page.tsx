import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Mail, Users } from 'lucide-react';
import { Footer, Header, Ticker } from '@/components/site/chrome';
import { RevealRoot } from '@/components/site/reveal';
import { stagger } from '@/lib/stagger';
import { clubFacts, historyChapters } from '@/lib/gs';

export const metadata: Metadata = {
  title: 'Kulüp',
  description: 'Galatasaray Spor Kulübü: künye, yapı, üyelik ve taraftar.',
};

const UNITS = [
  {
    name: 'Galatasaray Spor Kulübü Derneği',
    body: '1905’te kurulan ana yapı. Tüm amatör ve profesyonel şubeler bu çatı altında toplanır.',
  },
  {
    name: 'Galatasaray Sportif A.Ş.',
    body: 'Futbol takımının sportif ve ticari faaliyetlerini yürüten, halka açık şirket.',
  },
  {
    name: 'Galatasaray Spor Okulları',
    body: 'Çocukları ve gençleri kulübün spor kültürüyle buluşturan yaygın eğitim programı.',
  },
  {
    name: 'Galatasaray Lisesi',
    body: 'Kulübün doğduğu okul. 1905’teki kuruluş kararı bu sıralarda alındı.',
  },
];

export default function Club() {
  return (
    <>
      <RevealRoot />
      <Ticker />
      <Header active="Kulüp" />

      <section className="pagehero">
        <div className="ph">
          <img src="/images/rams-park-matchday.webp" alt="Maç günü tribünde atkı sallayan taraftarlar" fetchPriority="high" />
        </div>
        <div className="wrap pagehero-in">
          <p className="crumb">
            <Link href="/">Ana sayfa</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--gold)' }}>Kulüp</span>
          </p>
          <h1 className="h1">
            Bir kulüpten
            <br />
            <span className="gold">fazlası.</span>
          </h1>
          <p className="deck">
            Galatasaray bir spor kulübü olarak kuruldu; bir kültür olarak büyüdü. 1905’ten bugüne aynı arma,
            aynı okul, aynı fikir.
          </p>
        </div>
      </section>

      <section className="sect-tight">
        <div className="wrap">
          <div className="stats">
            {clubFacts.map((f, i) => (
              <div className="stat" key={f.label} data-reveal style={stagger(i, 0.07)}>
                <strong className="gold num">{f.value}</strong>
                <b>{f.label}</b>
                <span>{f.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sect">
        <div className="wrap">
          <div className="sect-head" data-reveal>
            <div>
              <p className="eyebrow">Yapı</p>
              <h2 className="h2">
                Aynı çatı,
                <br />
                <span className="gold">dört kol.</span>
              </h2>
            </div>
          </div>

          <div className="faclist">
            {UNITS.map((u, i) => (
              <div className="fac" key={u.name} data-reveal style={stagger(i, 0.06)}>
                <div className="fac-kind">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3>{u.name}</h3>
                </div>
                <p className="fac-body">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- dünyaya yayılmak */}
      <section className="roar">
        <div className="ph">
          <img
            src="/images/kutlama-bruksel.webp"
            alt="Brüksel Grand-Place’ta belediye binasının balkonunda dalgalanan Galatasaray bayrağı"
            loading="lazy"
          />
        </div>
        <div className="wrap roar-copy" data-reveal>
          <p className="eyebrow">Brüksel, Haziran 2026</p>
          <h2 className="h2">
            Bir sınıfta başladı.
            <br />
            <span className="gold">Dünyaya yayıldı.</span>
          </h2>
          <p className="roar-quote">
            Grand-Place’ın balkonunda sarı-kırmızı bir bayrak. Kulübün taraftarı artık kurulduğu şehirle sınırlı değil.
          </p>
        </div>
      </section>

      <section className="light sect">
        <div className="wrap">
          <div className="sect-head" data-reveal>
            <div>
              <p className="eyebrow on-light">Hafıza</p>
              <h2 className="h2">
                Kulübün
                <br />
                <span className="claret">bölümleri.</span>
              </h2>
            </div>
            <Link className="tlink" href="/tarih" style={{ color: 'var(--ink)' }}>
              Yaşayan tarihe git <ArrowRight size={15} />
            </Link>
          </div>

          <div className="chapters">
            {historyChapters.map((c, i) => (
              <a
                href={c.href}
                key={c.title}
                target="_blank"
                rel="noreferrer noopener"
                data-reveal
                style={stagger(i % 4, 0.06)}
              >
                <em>{String(i + 1).padStart(2, '0')}</em>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sect-tight" style={{ background: 'var(--night)' }}>
        <div className="wrap">
          <div className="visit-grid">
            <div data-reveal>
              <p className="eyebrow">Katıl</p>
              <h2 className="h2">
                Üye ol,
                <br />
                <span className="gold">taraftar kal.</span>
              </h2>
            </div>
            <div data-reveal style={stagger(1)}>
              <p className="deck" style={{ marginBottom: 30 }}>
                Kulüp üyeliği, taraftar dernekleri ve iletişim kanalları.
              </p>
              <div className="visit-links" style={{ borderTopColor: 'var(--line-gold)' }}>
                <a href="https://www.galatasaray.org/s/uye-bilgileri-ve-uyelik-formu/161" target="_blank" rel="noreferrer noopener" style={{ borderBottomColor: 'var(--line-gold)' }}>
                  <Users size={17} /> Üyelik başvurusu <ArrowRight size={15} />
                </a>
                <a href="https://www.galatasaray.org/iletisim-formu" target="_blank" rel="noreferrer noopener" style={{ borderBottomColor: 'var(--line-gold)' }}>
                  <Mail size={17} /> İletişim <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
