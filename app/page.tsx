import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  MapPin,
  Menu,
  Play,
  Radio,
  Ticket,
} from 'lucide-react';

const paths = [
  {
    eyebrow: '01 · Şimdi',
    title: 'Bugün ne oluyor?',
    body: 'Maçlar, canlı skorlar, son haberler ve tüm branşlardan gündem.',
    meta: 'Gündeme git',
    className: 'path-card path-card-yellow',
  },
  {
    eyebrow: '02 · Arma',
    title: 'Tek kulüp, çok takım.',
    body: 'Futboldan su topuna, sarı kırmızı forma için mücadele eden herkes.',
    meta: 'Takımları keşfet',
    className: 'path-card path-card-red',
  },
  {
    eyebrow: '03 · Hafıza',
    title: '1905’ten bugüne yürü.',
    body: 'Her yılı, her kırılma anını, kupaları ve insanları yaşayan bir arşivde gör.',
    meta: 'Tarihe gir',
    className: 'path-card path-card-dark',
    href: '/tarih',
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="aslantepe">
        <img
          className="hero-image"
          src="/images/aslantepe.jpg"
          alt="Gece ışıkları altında Ali Sami Yen Spor Kompleksi RAMS Park"
        />
        <div className="hero-shade" />
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Galatasaray ana sayfa">
            <img src="/images/gs-mark.png" alt="Galatasaray" />
            <span>GALATASARAY</span>
          </Link>
          <nav className="desktop-nav" aria-label="Ana menü">
            <a href="#bugun">Bugün</a>
            <a href="#takimlar">Takımlar</a>
            <Link href="/tarih">Tarih</Link>
            <a href="#ziyaret">Ziyaret</a>
          </nav>
          <div className="header-actions">
            <button className="icon-button" aria-label="Menüyü aç"><Menu size={19} /></button>
            <button className="ticket-button"><Ticket size={17} /> Biletler</button>
          </div>
        </header>

        <div className="hero-copy">
          <p className="kicker"><span /> Evimiz · Aslantepe</p>
          <h1>BURASI<br /><em>GALATASARAY.</em></h1>
          <p className="hero-deck">Bir stadyumdan fazlası. 1905’te başlayan hikâyenin bugün attığı kalp.</p>
          <div className="hero-links">
            <a className="primary-cta" href="#bugun">İçeri gir <ArrowDown size={18} /></a>
            <button className="watch-link"><span><Play size={14} fill="currentColor" /></span> Aslantepe’yi izle</button>
          </div>
        </div>

        <div className="match-card" aria-label="Sıradaki maç">
          <div className="match-topline"><span>Sıradaki maç</span><span className="live-dot"><i /> Süper Lig</span></div>
          <div className="match-body">
            <div className="team-mark mini-gs">GS</div>
            <div className="match-info"><strong>20:00</strong><span>PAZ · 13 EYL</span></div>
            <div className="team-mark opponent">VS</div>
          </div>
          <div className="match-place"><MapPin size={14} /> Ali Sami Yen Spor Kompleksi</div>
        </div>
        <p className="photo-credit">Fotoğraf: Ali Sami Yen Spor Kompleksi</p>
      </section>

      <section className="entry" id="bugun">
        <div className="section-intro">
          <p className="kicker dark"><span /> Kapılar açık</p>
          <h2>NEREDEN<br />BAŞLAMAK<br /><em>İSTERSİN?</em></h2>
          <p>Galatasaray tek bir sayfaya sığmaz. Kendi yolunu seç; güncele, armaya ya da 121 yıllık hafızaya gir.</p>
        </div>
        <div className="path-grid">
          {paths.map((path) => {
            const content = (
              <>
                <span className="path-eyebrow">{path.eyebrow}</span>
                <h3>{path.title}</h3>
                <p>{path.body}</p>
                <span className="path-link">{path.meta} <ArrowRight size={18} /></span>
              </>
            );
            return path.href ? (
              <Link key={path.title} href={path.href} className={path.className}>{content}</Link>
            ) : (
              <a key={path.title} href={path.eyebrow.includes('Arma') ? '#takimlar' : '#gundem'} className={path.className}>{content}</a>
            );
          })}
        </div>
      </section>

      <section className="pulse" id="gundem">
        <div className="pulse-heading">
          <div><p className="kicker light"><span /> Kulübün nabzı</p><h2>BUGÜN<br /><em>GALATASARAY</em></h2></div>
          <a href="#all-news">Tüm gündem <ArrowRight size={18} /></a>
        </div>
        <div className="news-grid">
          <article className="news-lead">
            <div className="news-image-wrap">
              <img src="/images/stadium-interior.jpg" alt="RAMS Park tribünleri ve saha" />
              <span className="tag"><Radio size={13} /> Aslantepe</span>
            </div>
            <div className="news-copy"><span>Maç günü rehberi · 6 dk</span><h3>90 dakika değil,<br />bütün bir gün.</h3><p>Aslantepe’ye gelişten ilk tezahürata, maç gününü baştan sona yaşa.</p></div>
          </article>
          <div className="news-stack">
            <article><span className="news-no">01</span><div><p>Futbol · Takım</p><h3>Aslanlar yeni hafta için sahada</h3><span>Bugün · 14:05</span></div><ChevronRight /></article>
            <article><span className="news-no">02</span><div><p>Basketbol · Fikstür</p><h3>Parkede yeni sezonun yol haritası</h3><span>Bugün · 11:30</span></div><ChevronRight /></article>
            <article><span className="news-no">03</span><div><p>Kulüp · Aslantepe</p><h3>Vadinin geleceği şekilleniyor</h3><span>Dün · 19:05</span></div><ChevronRight /></article>
          </div>
        </div>
      </section>

      <section className="teams" id="takimlar">
        <div className="teams-title"><span>TEK ARMA</span><strong>18</strong><span>BRANŞ</span></div>
        <p>Galatasaray yalnızca futbol değildir. Aynı arma; parkede, havuzda, pistte, suda ve her mücadelede.</p>
        <div className="sport-row" aria-label="Spor branşları">
          {['Futbol', 'Basketbol', 'Voleybol', 'Su Sporları', 'Atletizm', 'Diğer 13 branş'].map((sport, i) => (
            <a href="#" key={sport}><span>{String(i + 1).padStart(2, '0')}</span>{sport}<ArrowRight /></a>
          ))}
        </div>
      </section>

      <section className="history-tease">
        <img src="/images/founders.jpg" alt="1906 Galatasaray kurucuları" />
        <div className="history-wash" />
        <div className="history-tease-copy">
          <p className="kicker"><span /> Yaşayan hafıza</p>
          <span className="giant-year">1905</span>
          <h2>Bir sınıfta başladı.<br />Dünyaya yayıldı.</h2>
          <p>Yılı seç. O sezonun kadrosunu, kupalarını, sesini ve ardında bıraktığı izi keşfet.</p>
          <Link href="/tarih" className="primary-cta yellow">Tarihte yürü <ArrowRight size={18} /></Link>
        </div>
        <div className="year-rail"><span>1905</span><i /><span>1959</span><i /><span>2000</span><i /><span>2026</span></div>
      </section>

      <section className="visit" id="ziyaret">
        <div><p className="kicker dark"><span /> Gel ve hisset</p><h2>ASLANTEPE<br /><em>SENİ BEKLİYOR.</em></h2></div>
        <div className="visit-info">
          <p>Maç günü, müze turu ya da sadece armanın evini görmek için. Yolculuğunu buradan planla.</p>
          <a href="#"><MapPin /> Yol tarifi <ArrowRight /></a>
          <a href="#"><CalendarDays /> Müze & stadyum turu <ArrowRight /></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><img src="/images/gs-mark.png" alt="" /><strong>GALATASARAY</strong><span>1905’TEN SONSUZA</span></div>
        <div className="footer-links"><Link href="/tarih">Tarih</Link><a href="#takimlar">Takımlar</a><a href="#ziyaret">Tesisler</a><a href="#">Kulüp</a><a href="#">İletişim</a></div>
        <p>Konsept tasarım · Görsel kaynakları: Wikimedia Commons ve basın arşivi</p>
      </footer>
    </main>
  );
}
