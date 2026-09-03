'use client';

import Link from 'next/link';
import { ChevronRight, Menu, Search, Ticket, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { nav, nextMatch } from '@/lib/gs';
import { Crest } from './crest';

/* ------------------------------------------------------------ geri sayım */

function useCountdown(iso: string) {
  const [left, setLeft] = useState<string | null>(null);

  useEffect(() => {
    const target = new Date(iso).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setLeft(null);
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setLeft(d > 0 ? `${d}g ${h}s ${m}d` : `${h}s ${m}d`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [iso]);

  return left;
}

/* --------------------------------------------------------------- üst şerit */

export function Ticker() {
  const left = useCountdown(nextMatch.kickoff);

  return (
    <div className="ticker">
      <div className="wrap ticker-in">
        <div className="ticker-left">
          <span className="pip" aria-hidden="true" />
          <span>
            Sıradaki maç · <b>{nextMatch.home} — {nextMatch.away}</b> · {nextMatch.dateLabel} {nextMatch.timeLabel}
          </span>
        </div>
        <div className="ticker-right">
          {left && (
            <span className="count">
              Kick-off’a <b>{left}</b>
            </span>
          )}
          <a href="https://www.passolig.com.tr" target="_blank" rel="noreferrer noopener">
            Passolig
          </a>
          <a href="https://www.gsstore.org" target="_blank" rel="noreferrer noopener">
            GSStore
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ header */

export function Header({ active }: { active?: string }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Yerel <dialog>: odak tuzağı ve Esc ile kapanma tarayıcıdan gelir. */
  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={solid ? 'hdr solid' : 'hdr'}>
        <div className="wrap hdr-in">
          <Link className="brand" href="/" aria-label="Galatasaray ana sayfa">
            <Crest className="brand-mark" stars={false} />
            <span>
              Galatasaray
              <small>1905</small>
            </span>
          </Link>

          <nav className="mainnav" aria-label="Ana menü">
            {nav.map((item) =>
              item.children ? (
                <div className="navgroup" key={item.label}>
                  <Link className="navlink" href={item.href} data-active={active === item.label}>
                    {item.label}
                  </Link>
                  <div className="drop">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href}>
                        {child.label}
                        <ChevronRight size={13} />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link className="navlink" key={item.label} href={item.href} data-active={active === item.label}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hdr-actions">
            <button className="iconbtn" aria-label="Ara">
              <Search size={17} />
            </button>
            <a className="btn" href="https://www.passolig.com.tr" target="_blank" rel="noreferrer noopener">
              <Ticket size={16} /> Biletler
            </a>
            <button className="iconbtn burger" aria-label="Menüyü aç" aria-expanded={open} onClick={() => setOpen(true)}>
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      <dialog className="sheet" ref={sheetRef} aria-label="Menü" onClose={() => setOpen(false)}>
          <div className="sheet-top">
            <Link className="brand" href="/" onClick={() => setOpen(false)}>
              <Crest className="brand-mark" stars={false} />
              <span>
                Galatasaray
                <small>1905</small>
              </span>
            </Link>
            <button className="iconbtn" aria-label="Menüyü kapat" onClick={() => setOpen(false)}>
              <X size={19} />
            </button>
          </div>

          <nav>
            {nav.map((item) => (
              <div className="sheet-group" key={item.label}>
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
                {item.children && (
                  <div className="sheet-sub">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href} onClick={() => setOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <a
            className="btn"
            style={{ marginTop: 30, justifyContent: 'center' }}
            href="https://www.passolig.com.tr"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Ticket size={16} /> Biletler
          </a>
      </dialog>
    </>
  );
}

/* ------------------------------------------------------------------ footer */

const FOOT = [
  {
    title: 'Kulüp',
    links: [
      ['Galatasaray SK', '/kulup'],
      ['Sportif A.Ş.', '/kulup'],
      ['Spor Okulları', '/kulup'],
      ['Üyelik', '/kulup'],
      ['İletişim', '/kulup'],
    ],
  },
  {
    title: 'Spor',
    links: [
      ['Branşlar', '/branslar'],
      ['Futbol', '/branslar'],
      ['Basketbol', '/branslar'],
      ['Voleybol', '/branslar'],
      ['Su Sporları', '/branslar'],
    ],
  },
  {
    title: 'Aslantepe',
    links: [
      ['RAMS Park', '/tesisler'],
      ['Tesisler', '/tesisler'],
      ['Maç günü', '/tesisler'],
      ['Müze & tur', '/tesisler'],
    ],
  },
  {
    title: 'Hafıza',
    links: [
      ['Yaşayan tarih', '/tarih'],
      ['Haberler', '/haberler'],
      ['Kupalar', '/tarih'],
      ['Taraftar', '/kulup'],
    ],
  },
] as const;

const SOCIALS = [
  { label: 'Facebook', mark: 'f', href: 'https://www.facebook.com/Galatasaray?fref=ts' },
  { label: 'X', mark: '𝕏', href: 'https://twitter.com/GalatasaraySK' },
  { label: 'Instagram', mark: '◎', href: 'https://instagram.com/galatasaray' },
  { label: 'YouTube', mark: '▶', href: 'https://www.youtube.com/c/galatasaray' },
  { label: 'TikTok', mark: '♪', href: 'https://www.tiktok.com/@galatasaray' },
] as const;

/* Galatasaray.org'daki güncel resmî sponsor alanından. */
const SPONSORS = [
  ['PUMA', 'https://hlkiurt3.rocketcdn.com/sponsor/0eb33dc193604198a76b99143346180b.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Ftr.puma.com%2Fspor%2Ffutbol%2Fgalatasaray.html&t=1'],
  ['Pasifik', 'https://hlkiurt3.rocketcdn.com/sponsor/f228d994c930458c8785cd29d306f480.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fpasifik.com%2F&t=1'],
  ['RAMS Global', 'https://hlkiurt3.rocketcdn.com/sponsor/0515697f197d465fbdf7de69c0afd612.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Framsturkiye.com.tr%2F&t=1'],
  ['Misli', 'https://hlkiurt3.rocketcdn.com/sponsor/860dedcb0404409e9e10db429d703625.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.misli.com%2F&t=1'],
  ['Sürat Kargo', 'https://hlkiurt3.rocketcdn.com/sponsor/b99d8245b4bf4ae5b45738219f690a63.jpeg', 'https://www.galatasaray.org/redirect?r=http%3A%2F%2Fwww.suratkargo.com.tr%2F&t=1'],
  ['Reges', 'https://hlkiurt3.rocketcdn.com/sponsor/f6c978d30b744cf39bfd8b38039a4101.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fregeselektrik.com.tr&t=1'],
  ['Port Filo', 'https://hlkiurt3.rocketcdn.com/sponsor/89c1f8a5207c4d8ea783d24cbad4fdb5.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.portfilo.com.tr%2F&t=1'],
  ['Türk Hava Yolları', 'https://hlkiurt3.rocketcdn.com/sponsor/9fe5467339e642dcb0a8e79f5f1f7f7a.jpeg', 'https://www.galatasaray.org/redirect?r=http%3A%2F%2Fwww.turkishairlines.com%2F&t=1'],
  ['Ülker', 'https://hlkiurt3.rocketcdn.com/sponsor/4fa3581a083a449b9b7069c5907dba57.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.ulker.com.tr%2Ftr&t=1'],
  ['Acıbadem', 'https://hlkiurt3.rocketcdn.com/sponsor/c44f0f3dde75434cb1ee02935eaad718.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.acibadem.com.tr&t=1'],
  ['Dreame', 'https://hlkiurt3.rocketcdn.com/sponsor/6331826eaf864230bc46f1b9162a1a0a.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fdreametech.com.tr%2F&t=1'],
  ['Çağdaş Faktoring', 'https://hlkiurt3.rocketcdn.com/sponsor/42c68d904cd940eeb579b2b32fb37efa.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.cagdasfactoring.com.tr%2Ftr%2F&t=1'],
  ['Daikin', 'https://hlkiurt3.rocketcdn.com/sponsor/4e1dfd462711419e8e41ceafd5960886.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.daikin.com.tr&t=1'],
  ['MCT Technic', 'https://hlkiurt3.rocketcdn.com/sponsor/b15cf69b22bc4b888a6a8b94e2971b1c.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fmcttechnic.com%2F&t=1'],
  ['Novo', 'https://hlkiurt3.rocketcdn.com/sponsor/4d891520317c45c6a405274a1a5d3927.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.novosirketlergrubu.com%2F&t=1'],
  ['Ceysin', 'https://hlkiurt3.rocketcdn.com/sponsor/503ed1a5aaa04386be311ecd608d8fbd.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fceysin.com%2F&t=1'],
  ['Sultan', 'https://hlkiurt3.rocketcdn.com/sponsor/2e8510be0e2a4827a929ea697ef7e7e3.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fsultanicecek.com.tr%2Ftr&t=1'],
  ['IFS', 'https://hlkiurt3.rocketcdn.com/sponsor/b01446e543764dd4889a933a75c5dc9a.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.ifs.com%2Ftr&t=1'],
  ['IGA Pass', 'https://hlkiurt3.rocketcdn.com/sponsor/fb910c92f114416c9824e76eefeb71f9.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.igapass.com%2Ftr&t=1'],
  ['Diversey', 'https://hlkiurt3.rocketcdn.com/sponsor/4c319394cbeb47d0b9be72b1c5c39f86.jpeg', 'https://www.galatasaray.org/redirect?r=http%3A%2F%2Fwww.diverseysolutions.com%2Ftr&t=1'],
  ['Bigjoy Sport', 'https://hlkiurt3.rocketcdn.com/sponsor/1476f9189a394986a36398977b9f4150.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.bigjoy.com.tr%2F&t=1'],
  ['Passolig', 'https://hlkiurt3.rocketcdn.com/sponsor/7da8920a7ebd4586b2566bc53cbf64d4.jpeg', 'https://www.galatasaray.org/redirect?r=http%3A%2F%2Fwww.passolig.com.tr%2F&t=1'],
  ['Havit', 'https://hlkiurt3.rocketcdn.com/sponsor/c5e37969d8ba423bb29916abd64bdcef.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.havitstore.com.tr&t=1'],
  ['Tacirler', 'https://hlkiurt3.rocketcdn.com/sponsor/f75486f32c904a36ba7301685a026012.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Ftacirler.com.tr%2F&t=1'],
  ['Bioderma', 'https://hlkiurt3.rocketcdn.com/sponsor/3b2e586a83c848e28cfdb552793421d6.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.bioderma.com.tr&t=1'],
  ['Orzax', 'https://hlkiurt3.rocketcdn.com/sponsor/0f511d275e2c4cd5b4844252a0dac99e.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.orzax.com.tr&t=1'],
  ['Zena', 'https://hlkiurt3.rocketcdn.com/sponsor/cc2a3f9a03514e009a9acf3eb45c4f63.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.zenaenerji.com%2F&t=1'],
  ['Kale Seyahat', 'https://hlkiurt3.rocketcdn.com/sponsor/0656b1e6c86b49218da1d4e80a20ed6c.jpeg', 'https://www.galatasaray.org/redirect?r=www.kaleseyahat.com.tr&t=1'],
  ['EA Sports FC', 'https://hlkiurt3.rocketcdn.com/sponsor/42b827a68b244860be149c30c06712fb.jpeg', 'https://www.galatasaray.org/redirect?r=https%3A%2F%2Fwww.ea.com%2Ftr-tr%2Fgames%2Fea-sports-fc&t=1'],
] as const;

/** Wikimedia Commons görselleri — CC BY / CC BY-SA atıfları. */
const C = 'https://commons.wikimedia.org/wiki/File:';
const CREDITS = [
  { what: 'Gece panoraması', by: 'LardoBalsamico, CC BY-SA 3.0', href: `${C}GS-FB_3-1_Panorama.jpg` },
  { what: 'Koreografi', by: 'Antoloji, CC BY-SA 4.0', href: `${C}Rams_Park_Koreografi_2024-2025_%C5%9Eampiyonlu%C4%9Fu.jpg` },
  { what: 'Maç günü', by: 'Antoloji, CC BY-SA 4.0', href: `${C}Galatasaray_Nef_Stadium_before_match_2022.jpg` },
  { what: 'Tribün', by: 'Ultraslansi, CC BY-SA 3.0', href: `${C}Ultraslansamsunspor.jpg` },
  { what: 'İç görünüm', by: '1886kusagi, CC BY-SA 4.0', href: `${C}Galatasaray_Arena_North-West_Corner.jpg` },
  { what: 'Hava görüntüsü', by: 'beIN SPORTS Türkiye, CC BY 3.0', href: `${C}Ali_Sami_Yen_Spor_Kompleksi_Nef_Stadyumu_%E2%80%93_D%C4%B1%C5%9F_manzara.png` },
  { what: 'Union Club Kupası', by: 'atomsaskal, CC BY-SA 3.0', href: `${C}Union_Club_Trophy.jpg` },
  { what: 'Metin Oktay forması', by: 'SAİT71, CC BY-SA 3.0', href: `${C}Metin_Oktay_formas%C4%B1.jpg` },
  { what: 'Süper Lig kupası', by: 'Sakhalinio, CC BY-SA 4.0', href: `${C}2014%E2%80%9315_S%C3%BCper_Lig_Cup.jpg` },
  { what: 'Kupa vitrini', by: 'Sakhalinio, CC BY-SA 4.0', href: `${C}2014%E2%80%9315_S%C3%BCper_Lig_Cup_%26_2014%E2%80%9315_Turkish_Cup.jpg` },
  { what: 'Voleybol', by: 'Zafer, CC BY 4.0', href: `${C}Galatasaray_MV_TMVL_20260424_(7).jpg` },
  { what: 'Basketbol', by: 'Sakhalinio, CC BY-SA 4.0', href: `${C}Fenerbah%C3%A7e_vs_Galatasaray_women%27s_basketball_20190424_(17).jpg` },
  { what: 'Galatasaray Adası', by: 'Jorge Franganillo, CC BY 2.0', href: `${C}Istanbul_Galatasaray_Adas%C4%B1_(54527445794).jpg` },
  { what: 'Florya', by: 'heineken14, CC BY 2.0', href: `${C}Florya_Metin_Oktay.jpg` },
  { what: 'Brüksel kutlaması', by: 'CC0', href: `${C}Galatasaray_S.K._celebration_at_Grand-Place_in_Brussels,_June_2026_(1).jpg` },
  { what: 'Süper Kupa 2013', by: 'Ultraslansi, CC BY-SA 3.0', href: `${C}S%C3%BCper_Kupa_2013_(1).jpeg` },
  { what: 'UEFA Kupası', by: 'александр--161, CC BY 3.0', href: `${C}%D0%9A%D1%83%D0%B1%D0%BE%D0%BA_%D0%AE%D0%95%D0%A4%D0%90_%D0%92_%D0%BC%D1%83%D0%B7%D0%B5%D0%B8_%D0%94%D0%BE%D0%BC%D0%B1%D0%B0%D1%81%D1%81_%D0%90%D1%80%D0%B5%D0%BD%D1%8B_-_panoramio.jpg` },
  { what: 'UEFA Süper Kupa', by: 'Rafael Curtinaz Severo, CC BY 2.0', href: `${C}Trof%C3%A9u_da_UEFA_Super_Cup.jpg` },
  { what: 'EuroCup', by: 'Galatasaray SK Medya, CC0', href: `${C}Captain_Sinan_G%C3%BCler_in_Eurocup_2016_Ceremony_in_Abdi_%C4%B0pek%C3%A7i_Arena.jpg` },
];

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div className="foot-brand">
              <Crest className="foot-mark" />
              <div>
                <strong>GALATASARAY</strong>
                <span>1905’ten sonsuza</span>
              </div>
            </div>
            <p className="lede" style={{ marginTop: 24, fontSize: 13.5 }}>
              Ali Sami Yen Spor Kompleksi RAMS Park · Seyrantepe, İstanbul
            </p>
            <div className="socials" aria-label="Galatasaray sosyal medya hesapları">
              {SOCIALS.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener" aria-label={`Galatasaray ${social.label}`}>
                  <span aria-hidden="true">{social.mark}</span>
                  <small>{social.label}</small>
                </a>
              ))}
            </div>
          </div>

          <div className="foot-cols">
            {FOOT.map((col) => (
              <div key={col.title}>
                <h5>{col.title}</h5>
                {col.links.map(([label, href]) => (
                  <Link key={label + href} href={href}>
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="sponsors" aria-labelledby="sponsors-title">
          <div className="sponsors-head">
            <p className="eyebrow">Birlikte daha güçlü</p>
            <h5 id="sponsors-title">Resmî sponsorlarımız</h5>
          </div>
          <div className="sponsor-grid">
            {SPONSORS.map(([name, logo, href]) => (
              <a key={name} className="sponsor" href={href} target="_blank" rel="noreferrer noopener" aria-label={`${name} — resmî sponsor`}>
                <span className="sponsor-logo" style={{ backgroundImage: `url(${logo})` }} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <div className="foot-bottom">
          {/* CC BY / CC BY-SA görselleri atıf ister; liste sayfanın altını
              doldurmasın diye tek satıra katlandı. */}
          <div className="credits">
            <p style={{ margin: 0 }}>Konsept tasarım.</p>
            <details className="credits-more">
              <summary>Görsel ve içerik kaynakları</summary>
              <p>
                Haber içerikleri galatasaray.org RSS akışından; fotoğraflar Wikimedia Commons’tan alınmıştır.
              </p>
              <p>
                {CREDITS.map((c, i) => (
                  <span key={c.href}>
                    {i > 0 && ' · '}
                    <a href={c.href} target="_blank" rel="noreferrer noopener">
                      {c.what}
                    </a>{' '}
                    {c.by}
                  </span>
                ))}
              </p>
            </details>
          </div>
          <span>© 1905–2026 Galatasaray SK</span>
        </div>
      </div>
    </footer>
  );
}
