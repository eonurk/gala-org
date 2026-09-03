'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Home, Menu } from 'lucide-react';
import { useMemo, useState } from 'react';

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
  { year: 1905, label: 'Kuruluş', title: 'Bir sınıfta doğan cesur fikir.', body: 'Ali Sami Yen ve arkadaşları, Galatasaray Lisesi’nde bir futbol kulübü kurmaya karar verdi. Amaçları açıktı: Türk olmayan takımları yenmek ve birlikte mücadele etmek.', stat: '13', statLabel: 'Kurucu öğrenci', image: '/images/founders.jpg' },
  { year: 1908, label: 'İlk şampiyonluk', title: 'İlk Türk şampiyon.', body: 'İstanbul Futbol Ligi şampiyonluğu, genç kulübün ilk büyük zaferi ve Türk futbol tarihinin kurucu anlarından biri oldu.', stat: '1', statLabel: 'İstanbul Ligi' },
  { year: 1912, label: 'Tescil', title: 'Kulüp resmen kayda geçti.', body: 'Cemiyetler Kanunu sonrasında Galatasaray, resmî olarak tescil edilen ilk Türk spor kulüplerinden biri oldu.' },
  { year: 1924, label: 'Millî forma', title: 'Arma, millî takımın kalbinde.', body: 'Galatasaraylı sporcular, genç Cumhuriyet’in millî takım kültürünün oluşmasında belirleyici roller üstlendi.' },
  { year: 1930, label: 'Çok branşlı kulüp', title: 'Mücadele sahadan suya taşındı.', body: 'Atletizm, kürek, yüzme ve diğer branşlarla Galatasaray yalnızca bir futbol takımı değil, büyük bir spor kültürü olduğunu gösterdi.' },
  { year: 1949, label: 'Yeni dönem', title: 'Savaş sonrası yeniden yükseliş.', body: 'Yeni kuşak sporcular, kulübün rekabetçi kimliğini farklı branşlarda tekrar ileri taşıdı.' },
  { year: 1955, label: 'Avrupa yolu', title: 'Avrupa sahnesine ilk adımlar.', body: 'Galatasaray, uluslararası karşılaşmalarla Batı’ya açılan pencere olma idealini sahaya taşıdı.' },
  { year: 1959, label: 'Millî Lig', title: 'Türkiye ligi başlıyor.', body: 'Ulusal ligin kurulmasıyla rekabet yeni bir ölçeğe taşındı. Galatasaray kısa sürede dönemin belirleyici takımlarından biri oldu.' },
  { year: 1962, label: 'Şampiyon', title: 'İlk profesyonel lig şampiyonluğu.', body: 'Galatasaray, 1961–62 sezonunu zirvede bitirerek profesyonel lig dönemindeki ilk şampiyonluğunu kazandı.', stat: '1', statLabel: 'Lig kupası' },
  { year: 1963, label: 'Avrupa', title: 'Avrupa’da çeyrek final.', body: 'Şampiyon Kulüpler Kupası’nda son sekize kalmak, Türk futbolu için o güne dek görülmemiş bir ufuktu.' },
  { year: 1971, label: 'Üçleme başlıyor', title: 'Üç yıl, üç şampiyonluk.', body: '1970–71 ile başlayan seri, 1972–73’e kadar aralıksız sürdü ve kulübün üstünlük dönemlerinden birini yarattı.', stat: '3', statLabel: 'Üst üste lig' },
  { year: 1973, label: 'Hanedan', title: 'Üçüncü kez üst üste zirve.', body: 'Takım, üç sezonluk benzersiz seriyi tamamladı. Sarı kırmızı kuşak için yeni bir gurur standardı doğdu.' },
  { year: 1987, label: 'Geri dönüş', title: 'On dört yıllık bekleyiş bitti.', body: 'Lig şampiyonluğu, yeni ve Avrupa’ya uzanacak güçlü dönemin kapısını açtı.' },
  { year: 1989, label: 'Avrupa yarı finali', title: 'Monaco’dan Bükreş’e.', body: 'Galatasaray, Şampiyon Kulüpler Kupası’nda yarı finale yükselerek Türkiye’nin Avrupa’daki sınırlarını değiştirdi.', stat: '4', statLabel: 'Avrupa’nın son takımı' },
  { year: 1993, label: 'Old Trafford', title: 'Avrupa, Galatasaray sesini duydu.', body: 'Manchester United karşısındaki unutulmaz eşleşme, Şampiyonlar Ligi yolunu ve yeni bir Avrupa inancını açtı.' },
  { year: 1996, label: 'Dörtleme', title: 'Kesintisiz hâkimiyet başlıyor.', body: '1996–2000 arasında kazanılan dört lig şampiyonluğu, kulübü Avrupa zaferine taşıyan omurgayı kurdu.', stat: '4', statLabel: 'Üst üste lig' },
  { year: 1999, label: 'Avrupa yürüyüşü', title: 'Bir sezon, tek ihtimal.', body: 'Şampiyonlar Ligi’nden UEFA Kupası’na uzanan yol Bologna, Dortmund, Mallorca ve Leeds duraklarından geçti.' },
  { year: 2000, label: 'Avrupa Fatihi', title: 'Kupa artık bizim.', body: 'Galatasaray, Kopenhag’da Arsenal’i penaltılarla yenerek UEFA Kupası’nı kazanan ilk Türk takımı oldu. Aynı yıl Real Madrid karşısında UEFA Süper Kupa da geldi.', stat: '2', statLabel: 'Avrupa kupası' },
  { year: 2002, label: 'Dünya sahnesi', title: 'Galatasaraylıların millî izi.', body: 'Kulübün yetiştirdiği ve taşıdığı kuşak, Türkiye’nin Dünya Kupası üçüncülüğünde güçlü bir iz bıraktı.' },
  { year: 2005, label: '100. yıl', title: 'Bir asırlık arma.', body: 'Kulüp, kuruluşunun yüzüncü yılını kupalar, sergiler ve kuşakları bir araya getiren büyük bir hafızayla kutladı.', stat: '100', statLabel: 'Yıllık miras' },
  { year: 2011, label: 'Yeni ev', title: 'Aslantepe’de ilk gece.', body: 'Ali Sami Yen Spor Kompleksi açıldı. Tribün kültürü, yeni evinde daha yüksek bir ses ve yeni hedeflerle buluştu.', image: '/images/aslantepe.jpg' },
  { year: 2013, label: 'Son sekiz', title: 'Devler Ligi’nde çeyrek final.', body: 'Schalke eşleşmesiyle gelen çeyrek final, yeni stadın Avrupa gecelerini kulüp tarihine yazdı.' },
  { year: 2016, label: 'Basketbol', title: 'Parkede Avrupa kupası.', body: 'Galatasaray Erkek Basketbol Takımı EuroCup’ı kazanarak çok branşlı Avrupa mirasına yeni bir kupa ekledi.' },
  { year: 2018, label: 'Yeniden zirve', title: 'Şampiyonluk Aslantepe’de.', body: 'Yeni bir kadro ve tribünle gelen lig kupası, takip eden sezonun çifte kupalı başarısına zemin hazırladı.' },
  { year: 2019, label: 'Çifte kupa', title: 'Lig ve kupa, aynı sezonda.', body: 'Galatasaray, lig şampiyonluğu ile Türkiye Kupası’nı aynı sezonda kazanarak bir kez daha duble yaptı.' },
  { year: 2023, label: '23. şampiyonluk', title: 'Cumhuriyet’in yüzüncü yılında zirve.', body: 'Galatasaray, güçlü bir sezonun sonunda 23. lig şampiyonluğuna ulaştı.' },
  { year: 2024, label: 'Rekor sezon', title: '102 puanlık yürüyüş.', body: 'Üst üste ikinci şampiyonluk, 102 puanla geldi. Takım, lig tarihinin en yüksek puanlı sezonlarından birine imza attı.', stat: '102', statLabel: 'Sezon puanı' },
  { year: 2025, label: 'Beşinci yıldız', title: '25 şampiyonluk, beş yıldız.', body: 'Lig ve Türkiye Kupası zaferleriyle gelen çifte kupa, armanın üzerine beşinci yıldızı taşıdı.', stat: '25', statLabel: 'Lig şampiyonluğu' },
  { year: 2026, label: 'Bugün', title: 'Hikâye devam ediyor.', body: 'Aslantepe Vadisi ve yeni nesil spor yatırımlarıyla Galatasaray, geçmişinin gücünü gelecek yüzyıla taşıyor.' },
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

export default function HistoryPage() {
  const [year, setYear] = useState(1905);
  const exact = moments.find((moment) => moment.year === year);
  const era = eras.find((item) => year >= item.start && year <= item.end) ?? eras[0];
  const nearest = useMemo(() => moments.reduce((best, item) => Math.abs(item.year - year) < Math.abs(best.year - year) ? item : best), [year]);
  const display = exact ?? { year, label: era.name, title: `${year}: ${era.name}`, body: `${era.context} Bu yıla ait gazete, fotoğraf, kadro ve müsabaka kayıtları dijital arşiv katmanında birlikte keşfedilecek.` };

  return (
    <main className="archive-page">
      <header className="archive-header">
        <Link className="brand" href="/"><img src="/images/gs-mark.png" alt="Galatasaray" /><span>GALATASARAY</span></Link>
        <nav><Link href="/"><Home size={15} /> Aslantepe</Link><span>Yaşayan tarih</span></nav>
        <button aria-label="Menü"><Menu /></button>
      </header>

      <section className="archive-stage">
        <div className="archive-photo">
          <img src={display.image ?? (year < 1959 ? '/images/founders.jpg' : year >= 2011 ? '/images/aslantepe.jpg' : '/images/stadium-interior.jpg')} alt="Galatasaray tarih arşivi" />
          <div />
          <span className="vertical-label">GALATASARAY · YAŞAYAN ARŞİV</span>
        </div>
        <div className="archive-content">
          <div className="archive-topline"><span>{era.name}</span><span>{year - 1904}. yıl</span></div>
          <strong className="archive-year">{year}</strong>
          <p className="archive-label">{display.label}</p>
          <h1>{display.title}</h1>
          <p className="archive-body">{display.body}</p>
          {display.stat && <div className="archive-stat"><strong>{display.stat}</strong><span>{display.statLabel}</span></div>}
          {!exact && <button className="nearest" onClick={() => setYear(nearest.year)}>En yakın önemli ana git · {nearest.year} <ArrowRight size={14} /></button>}
        </div>
      </section>

      <section className="time-controls" aria-label="Yıl seçici">
        <div className="time-buttons"><button onClick={() => setYear((value) => Math.max(1905, value - 1))} aria-label="Önceki yıl"><ChevronLeft /></button><button onClick={() => setYear((value) => Math.min(2026, value + 1))} aria-label="Sonraki yıl"><ChevronRight /></button></div>
        <div className="slider-wrap">
          <input type="range" min="1905" max="2026" value={year} onChange={(event) => setYear(Number(event.target.value))} aria-label="1905 ile 2026 arasında yıl seç" />
          <div className="slider-labels"><span>1905</span><span>1959</span><span>2000</span><span>2026</span></div>
        </div>
        <label>Yıla git <input value={year} min="1905" max="2026" type="number" onChange={(event) => setYear(Math.max(1905, Math.min(2026, Number(event.target.value))))} /></label>
      </section>

      <section className="milestone-strip">
        <div className="milestone-heading"><span>Önemli anlar</span><p>Zaman çizgisinde sıçra</p></div>
        <div className="milestone-list">
          {moments.map((moment) => <button key={moment.year} className={moment.year === year ? 'active' : ''} onClick={() => setYear(moment.year)}><strong>{moment.year}</strong><span>{moment.label}</span></button>)}
        </div>
      </section>

      <section className="archive-next">
        <p className="kicker dark"><span /> Arşivin içinde</p>
        <h2>Her yıl bir oda.<br />Her oda bir <em>hikâye.</em></h2>
        <div className="archive-categories">
          {['Kadrolar & insanlar', 'Kupalar & maçlar', 'Formalar & objeler', 'Sesler & tanıklıklar'].map((item, index) => <a href="#" key={item}><span>0{index + 1}</span>{item}<ArrowRight /></a>)}
        </div>
        <Link href="/" className="back-home"><ArrowLeft /> Aslantepe’ye dön</Link>
      </section>
    </main>
  );
}
