'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Footer, Header, Ticker } from '@/components/site/chrome';
import { Crest } from '@/components/site/crest';
import { RevealRoot } from '@/components/site/reveal';
import { stagger } from '@/lib/stagger';
import { historyChapters } from '@/lib/gs';

type Moment = {
  year: number;
  label: string;
  title: string;
  body: string;
  stat?: string;
  statLabel?: string;
  image?: string;
};

const moments: Moment[] = [
  { year: 1905, label: 'Kuruluş', title: 'Bir sınıfta doğan cesur fikir.', body: 'Ali Sami Yen ve arkadaşları, Galatasaray Lisesi’nde bir futbol kulübü kurmaya karar verdi. Amaçları açıktı: birlikte oynamak, bir isim altında toplanmak ve İstanbul’un yabancı takımlarını yenmek.', stat: '13', statLabel: 'Kurucu öğrenci', image: '/images/founders.webp' },
  { year: 1908, label: 'İlk şampiyonluk', title: 'İlk Türk şampiyon.', image: '/images/history-1908.png', body: 'İstanbul Futbol Ligi şampiyonluğu, genç kulübün ilk büyük zaferi ve Türk futbol tarihinin kurucu anlarından biri oldu.', stat: '1', statLabel: 'İstanbul Ligi' },
  { year: 1912, label: 'Tescil', title: 'Kulüp resmen kayda geçti.', image: '/images/history-1912.png', body: 'Cemiyetler Kanunu sonrasında Galatasaray, resmî olarak tescil edilen ilk Türk spor kulüplerinden biri oldu.' },
  { year: 1924, label: 'Millî forma', title: 'Arma, millî takımın kalbinde.', image: '/images/history-1924.png', body: 'Galatasaraylı sporcular, genç Cumhuriyet’in millî takım kültürünün oluşmasında belirleyici roller üstlendi.' },
  { year: 1930, label: 'Çok branşlı kulüp', title: 'Mücadele sahadan suya taşındı.', image: '/images/history-1930.png', body: 'Atletizm, kürek, yüzme ve diğer branşlarla Galatasaray yalnızca bir futbol takımı değil, büyük bir spor kültürü olduğunu gösterdi.' },
  { year: 1949, label: 'Yeni dönem', title: 'Savaş sonrası yeniden yükseliş.', image: '/images/history-1949.png', body: 'Yeni kuşak sporcular, kulübün rekabetçi kimliğini farklı branşlarda tekrar ileri taşıdı.' },
  { year: 1955, label: 'Avrupa yolu', title: 'Avrupa sahnesine ilk adımlar.', image: '/images/metin-oktay-forma.webp', body: 'Galatasaray, uluslararası karşılaşmalarla Batı’ya açılan pencere olma idealini sahaya taşıdı.' },
  { year: 1959, label: 'Millî Lig', title: 'Türkiye ligi başlıyor.', body: 'Ulusal ligin kurulmasıyla rekabet yeni bir ölçeğe taşındı. Galatasaray kısa sürede dönemin belirleyici takımlarından biri oldu.' },
  { year: 1962, label: 'Şampiyon', title: 'İlk profesyonel lig şampiyonluğu.', body: 'Galatasaray, 1961–62 sezonunu zirvede bitirerek profesyonel lig dönemindeki ilk şampiyonluğunu kazandı.', stat: '1', statLabel: 'Lig kupası' },
  { year: 1963, label: 'Avrupa', title: 'Avrupa’da çeyrek final.', body: 'Şampiyon Kulüpler Kupası’nda son sekize kalmak, Türk futbolu için o güne dek görülmemiş bir ufuktu.' },
  { year: 1964, label: 'İlk mabet', title: 'Ali Sami Yen Stadı açıldı.', body: 'Mecidiyeköy’deki stat, 2011’e kadar kulübün evi oldu. “Cehennem” lakabı burada doğdu.' },
  { year: 1971, label: 'Üçleme başlıyor', title: 'Üç yıl, üç şampiyonluk.', body: '1970–71 ile başlayan seri, 1972–73’e kadar aralıksız sürdü ve kulübün üstünlük dönemlerinden birini yarattı.', stat: '3', statLabel: 'Üst üste lig' },
  { year: 1973, label: 'Hanedan', title: 'Üçüncü kez üst üste zirve.', body: 'Takım, üç sezonluk benzersiz seriyi tamamladı. Sarı kırmızı kuşak için yeni bir gurur standardı doğdu.' },
  { year: 1987, label: 'Geri dönüş', title: 'On dört yıllık bekleyiş bitti.', body: 'Lig şampiyonluğu, yeni ve Avrupa’ya uzanacak güçlü dönemin kapısını açtı.' },
  { year: 1989, label: 'Avrupa yarı finali', title: 'Monaco’dan Bükreş’e.', body: 'Galatasaray, Şampiyon Kulüpler Kupası’nda yarı finale yükselerek Türkiye’nin Avrupa’daki sınırlarını değiştirdi.', stat: '4', statLabel: 'Avrupa’da son dört' },
  { year: 1993, label: 'Old Trafford', title: 'Avrupa, Galatasaray sesini duydu.', body: 'Manchester United karşısındaki unutulmaz eşleşme, Şampiyonlar Ligi yolunu ve yeni bir Avrupa inancını açtı.' },
  { year: 1996, label: 'Dörtleme', title: 'Kesintisiz hâkimiyet başlıyor.', body: '1996–2000 arasında kazanılan dört lig şampiyonluğu, kulübü Avrupa zaferine taşıyan omurgayı kurdu.', stat: '4', statLabel: 'Üst üste lig' },
  { year: 1999, label: 'Avrupa yürüyüşü', title: 'Bir sezon, tek ihtimal.', body: 'Şampiyonlar Ligi’nden UEFA Kupası’na uzanan yol Bologna, Dortmund, Mallorca ve Leeds duraklarından geçti.' },
  { year: 2000, label: 'Avrupa Fatihi', title: 'Kupa artık bizim.', body: 'Galatasaray, Kopenhag’da Arsenal’i penaltılarla yenerek UEFA Kupası’nı kazanan ilk Türk takımı oldu. Aynı yıl Real Madrid karşısında UEFA Süper Kupa da geldi.', stat: '2', statLabel: 'Avrupa kupası' },
  { year: 2002, label: 'Dünya sahnesi', title: 'Galatasaraylıların millî izi.', body: 'Kulübün yetiştirdiği ve taşıdığı kuşak, Türkiye’nin Dünya Kupası üçüncülüğünde güçlü bir iz bıraktı.' },
  { year: 2005, label: '100. yıl', title: 'Bir asırlık arma.', body: 'Kulüp, kuruluşunun yüzüncü yılını kupalar, sergiler ve kuşakları bir araya getiren büyük bir hafızayla kutladı.', stat: '100', statLabel: 'Yıllık miras' },
  { year: 2011, label: 'Yeni ev', title: 'Aslantepe’de ilk gece.', body: 'Ali Sami Yen Spor Kompleksi açıldı. Tribün kültürü, yeni evinde daha yüksek bir ses ve yeni hedeflerle buluştu.', stat: '52.223', statLabel: 'Kapasite', image: '/images/rams-park-night.webp' },
  { year: 2013, label: 'Son sekiz', title: 'Devler Ligi’nde çeyrek final.', body: 'Schalke eşleşmesiyle gelen çeyrek final, yeni stadın Avrupa gecelerini kulüp tarihine yazdı.' },
  { year: 2016, label: 'Basketbol', title: 'Parkede Avrupa kupası.', image: '/images/kupa-eurocup.webp', body: 'Galatasaray Erkek Basketbol Takımı EuroCup’ı kazanarak çok branşlı Avrupa mirasına yeni bir kupa ekledi.' },
  { year: 2018, label: 'Yeniden zirve', title: 'Şampiyonluk Aslantepe’de.', body: 'Yeni bir kadro ve tribünle gelen lig kupası, takip eden sezonun çifte kupalı başarısına zemin hazırladı.', image: '/images/rams-park-bowl.webp' },
  { year: 2019, label: 'Çifte kupa', title: 'Lig ve kupa, aynı sezonda.', image: '/images/kupa-turkiye.webp', body: 'Galatasaray, lig şampiyonluğu ile Türkiye Kupası’nı aynı sezonda kazanarak bir kez daha duble yaptı.' },
  { year: 2023, label: '23. şampiyonluk', title: 'Cumhuriyet’in yüzüncü yılında zirve.', image: '/images/kupa-super-lig.webp', body: 'Galatasaray, güçlü bir sezonun sonunda 23. lig şampiyonluğuna ulaştı.' },
  { year: 2024, label: 'Rekor sezon', title: '102 puanlık yürüyüş.', body: 'Üst üste ikinci şampiyonluk, 102 puanla geldi. Takım, lig tarihinin en yüksek puanlı sezonlarından birine imza attı.', stat: '102', statLabel: 'Sezon puanı' },
  { year: 2025, label: 'Beşinci yıldız', title: '25 şampiyonluk, beş yıldız.', body: 'Lig ve Türkiye Kupası zaferleriyle gelen çifte kupa, armanın üzerine beşinci yıldızı taşıdı.', stat: '25', statLabel: 'Lig şampiyonluğu', image: '/images/rams-park-koreografi.webp' },
  { year: 2026, label: 'Bugün', title: 'Hikâye devam ediyor.', body: 'Aslantepe Vadisi ve yeni nesil spor yatırımlarıyla Galatasaray, geçmişinin gücünü gelecek yüzyıla taşıyor.', image: '/images/kutlama-bruksel.webp' },
];

const eras = [
  { start: 1905, end: 1922, name: 'Kuruluş yılları', context: 'Galatasaray’ın kimliği, kurucu öğrencilerin cesareti ve İstanbul liglerindeki ilk mücadelelerle şekilleniyor.' },
  { start: 1923, end: 1958, name: 'Cumhuriyetle büyümek', context: 'Kulüp farklı branşlarda kök salıyor; sarı kırmızı spor kültürü yeni Cumhuriyet’le birlikte büyüyor.' },
  { start: 1959, end: 1986, name: 'Millî lig dönemi', context: 'Ulusal rekabet, lig ve kupa zaferleriyle Galatasaray’ın Türkiye çapındaki etkisini kalıcılaştırıyor.' },
  { start: 1987, end: 1995, name: 'Avrupa’ya dönüş', context: 'Şampiyonluk hasreti sona eriyor, Avrupa geceleri kulübün yeni ufkunu belirliyor.' },
  { start: 1996, end: 2005, name: 'Avrupa Fatihi', context: 'Dört lig şampiyonluğu, UEFA Kupası ve Süper Kupa ile Galatasaray dünya sahnesine çıkıyor.' },
  { start: 2006, end: 2017, name: 'Yeni ev, yeni çağ', context: 'Ali Sami Yen’den Aslantepe’ye taşınan tribün kültürü, Avrupa’da ve farklı branşlarda yeni zaferler yaşıyor.' },
  { start: 2018, end: 2026, name: 'Beş yıldızlı gelecek', context: 'Yeni şampiyonluklar, rekor sezonlar ve Aslantepe Vadisi vizyonu kulübün gelecek yüzyılını kuruyor.' },
];

function imageFor(year: number, explicit?: string) {
  if (explicit) return explicit;
  if (year <= 1905) return '/images/founders.webp';
  if (year < 1955) return '/images/kupa-union-1909.webp';
  if (year < 1987) return '/images/metin-oktay-forma.webp';
  if (year < 1996) return '/images/kupa-uefa.webp';
  if (year <= 2005) return '/images/kupa-uefa-super.webp';
  if (year < 2011) return '/images/rams-park-matchday.webp';
  if (year < 2018) return '/images/rams-park-night.webp';
  if (year < 2023) return '/images/rams-park-bowl.webp';
  return '/images/kutlama-bruksel.webp';
}

/* Armanın dört hâli. İlk üçü arşiv görseli, sonuncusu sitenin kendi çizimi —
   böylece bugünkü arma, tarihin devamı olarak aynı sırada duruyor. */
const crestEras: {
  period: string;
  note: string;
  image?: string;
  alt?: string;
  node?: React.ReactNode;
}[] = [
  {
    period: '1905',
    note: 'İlk arma — kuruluş yılı',
    image: '/images/gs-logo-eski.svg',
    alt: 'Galatasaray’ın ilk dönem arması',
  },
  {
    period: '1923–61',
    note: 'Oval çerçeve yerleşiyor',
    image: '/images/arma-1923.webp',
    alt: '1923–1961 arası kullanılan Galatasaray arması',
  },
  {
    period: '1961–87',
    note: 'Beyaz zemin, kalın kontur',
    image: '/images/arma-1961.webp',
    alt: '1961–1987 arası kullanılan Galatasaray arması',
  },
  {
    period: 'Bugün',
    note: 'Beş yıldız · 25 şampiyonluk',
    node: <Crest className="crestrail-now" title="Galatasaray’ın bugünkü arması" />,
  },
];

export default function HistoryPage() {
  const [year, setYear] = useState(1905);

  const exact = moments.find((m) => m.year === year);
  const era = eras.find((e) => year >= e.start && year <= e.end) ?? eras[0];
  const nearest = moments.reduce((best, m) => (Math.abs(m.year - year) < Math.abs(best.year - year) ? m : best));

  const display: Moment =
    exact ?? {
      year,
      label: era.name,
      title: `${era.name}`,
      body: `${era.context} Bu yıla ait gazete, fotoğraf, kadro ve müsabaka kayıtları dijital arşiv katmanında birlikte keşfedilecek.`,
    };

  return (
    <>
      <RevealRoot />
      <Ticker />
      <Header active="Tarih" />

      <main className="arch">
        {/* ------------------------------------------------------- sahne */}
        <section className="arch-stage">
          <div className="arch-photo">
            <img key={imageFor(year, display.image)} src={imageFor(year, display.image)} alt="Galatasaray tarih arşivi" />
          </div>

          <div className="arch-copy">
            <div className="arch-top">
              <span>{era.name}</span>
              <span className="num">{year - 1904}. yıl</span>
            </div>

            <strong className="arch-year gold num">{year}</strong>
            <p className="arch-label">{display.label}</p>
            <h2>{display.title}</h2>
            <p className="arch-body">{display.body}</p>

            {display.stat && (
              <div className="arch-stat">
                <strong className="num">{display.stat}</strong>
                <span>{display.statLabel}</span>
              </div>
            )}

            {!exact && (
              <button className="tlink arch-near" onClick={() => setYear(nearest.year)}>
                En yakın önemli ana git · {nearest.year} <ArrowRight size={14} />
              </button>
            )}
          </div>
        </section>

        {/* --------------------------------------------------- kilometre taşları */}
        <section className="milestones">
          <div className="wrap">
            <div className="sect-head" style={{ marginBottom: 26 }}>
              <h2 className="h2" style={{ fontSize: 'clamp(24px, 2.6vw, 38px)' }}>
                Önemli <span className="gold">anlar</span>
              </h2>
              <p className="lede" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Zaman çizgisinde sıçra
              </p>
            </div>

            <div className="ms-list">
              {moments.map((m) => (
                <button
                  key={m.year}
                  data-on={m.year === year}
                  onClick={() => setYear(m.year)}
                  aria-label={`${m.year}: ${m.label}`}
                >
                  <span className="ms-shot" aria-hidden="true">
                    <img src={imageFor(m.year, m.image)} alt="" loading="lazy" />
                  </span>
                  <span className="ms-copy">
                    <strong className="num">{m.year}</strong>
                    <span>{m.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- armanın evrimi */}
        <section className="sect-tight crestline">
          <div className="wrap">
            <div className="sect-head" data-reveal>
              <div>
                <p className="eyebrow">Armanın evrimi</p>
                <h2 className="h2">
                  Aynı harfler,
                  <br />
                  <span className="gold">121 yıl.</span>
                </h2>
              </div>
              <p className="lede" style={{ maxWidth: '32ch' }}>
                S ile G hiç değişmedi. Değişen; oval, gölge ve armanın üstündeki yıldızlar oldu.
              </p>
            </div>

            <ol className="crestrail">
              {crestEras.map((c, i) => (
                <li key={c.period} data-reveal style={stagger(i, 0.08)}>
                  <div className="crestrail-shot">
                    {c.node ?? <img src={c.image} alt={c.alt} loading="lazy" />}
                  </div>
                  <strong className="num">{c.period}</strong>
                  <span>{c.note}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- bölümler */}
        <section className="light sect">
          <div className="wrap">
            <div className="sect-head" data-reveal>
              <div>
                <p className="eyebrow on-light">Arşivin içinde</p>
                <h2 className="h2">
                  Her yıl bir oda.
                  <br />
                  Her oda bir <span className="claret">hikâye.</span>
                </h2>
              </div>
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

            <div style={{ marginTop: 56 }}>
              <Link className="btn btn-ghost on-light" href="/">
                <ArrowLeft size={16} /> Aslantepe’ye dön
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
