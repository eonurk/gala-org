/**
 * Kulüp içeriği. Haberler galatasaray.org RSS akışından alınmıştır;
 * geri kalan veriler kulübün kendi sayfalarındaki bilgi mimarisini izler.
 */

export { news } from './gs-news';
export type { NewsItem } from './gs-news';

/* ---------------------------------------------------------------- gezinme */

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    label: 'Kulüp',
    href: '/kulup',
    children: [
      { label: 'Galatasaray SK', href: '/kulup' },
      { label: 'Sportif A.Ş.', href: '/kulup' },
      { label: 'Spor Okulları', href: '/kulup' },
      { label: 'Üyelik', href: '/kulup' },
    ],
  },
  {
    label: 'Branşlar',
    href: '/branslar',
    children: [
      { label: 'Futbol', href: '/branslar' },
      { label: 'Basketbol', href: '/branslar' },
      { label: 'Voleybol', href: '/branslar' },
      { label: 'Su Sporları', href: '/branslar' },
      { label: 'Amatör Şubeler', href: '/branslar' },
    ],
  },
  { label: 'Haberler', href: '/haberler' },
  { label: 'Tesisler', href: '/tesisler' },
  { label: 'Tarih', href: '/tarih' },
];

/* ------------------------------------------------------------- sıradaki maç */

export const nextMatch = {
  competition: 'Şampiyonlar Ligi · 1. Hafta',
  home: 'Galatasaray',
  away: 'Ajax',
  venue: 'Ali Sami Yen Spor Kompleksi RAMS Park',
  city: 'İstanbul',
  kickoff: '2026-09-16T22:00:00+03:00',
  dateLabel: '16 Eylül Çarşamba',
  timeLabel: '22:00',
};

/* ------------------------------------------------------------------ fikstür
   Konsept veri: 2026-27 sezonunun eylül-ekim penceresi. `nextMatch` ile
   ilk sıradaki maç bilinçli olarak aynı (16 Eylül · Ajax). */

export type Fixture = {
  date: string;
  day: string;
  comp: 'SL' | 'ŞL' | 'TK';
  compFull: string;
  opponent: string;
  short: string;
  home: boolean;
  time: string;
};

export const fixtures: Fixture[] = [
  { date: '16 Eyl', day: 'Çar', comp: 'ŞL', compFull: 'Şampiyonlar Ligi', opponent: 'Ajax', short: 'AJX', home: true, time: '22:00' },
  { date: '20 Eyl', day: 'Paz', comp: 'SL', compFull: 'Süper Lig', opponent: 'Kasımpaşa', short: 'KSM', home: false, time: '20:00' },
  { date: '24 Eyl', day: 'Per', comp: 'SL', compFull: 'Süper Lig', opponent: 'Konyaspor', short: 'KON', home: true, time: '20:00' },
  { date: '28 Eyl', day: 'Paz', comp: 'SL', compFull: 'Süper Lig', opponent: 'Beşiktaş', short: 'BJK', home: false, time: '19:00' },
  { date: '1 Eki', day: 'Per', comp: 'ŞL', compFull: 'Şampiyonlar Ligi', opponent: 'Inter', short: 'INT', home: false, time: '22:00' },
  { date: '5 Eki', day: 'Paz', comp: 'SL', compFull: 'Süper Lig', opponent: 'Trabzonspor', short: 'TS', home: true, time: '20:00' },
];

/* -------------------------------------------------------------- kupa dolabı */

/* Vitrinin tamamı: kulübün kazandığı altı kupa da fotoğrafıyla duruyor.
   Süper Lig, Türkiye Kupası, Süper Kupa ve EuroCup kareleri doğrudan
   Galatasaray’dan; UEFA Kupası ile UEFA Süper Kupa kareleri ise kupaların
   kendisinden (müze fotoğrafları, Commons). Futbol ve basketbol birlikte —
   tek arma, çok branş. */
export type Trophy = {
  image: string;
  alt: string;
  name: string;
  count: string;
  note: string;
  branch: string;
};

export const trophies: Trophy[] = [
  {
    image: '/images/kupa-super-lig.webp',
    alt: 'Süper Lig şampiyonluk kupası, Galatasaray vitrininde',
    name: 'Süper Lig',
    count: '25',
    note: 'Son: 2024-25',
    branch: 'Futbol',
  },
  {
    image: '/images/kupa-turkiye.webp',
    alt: 'Türkiye Kupası — 2015-16 finalinin kurdeleleri hâlâ üzerinde',
    name: 'Türkiye Kupası',
    count: '19',
    note: 'Son: 2024-25',
    branch: 'Futbol',
  },
  {
    image: '/images/kupa-super-kupa.webp',
    alt: '2013 Süper Kupa finali öncesi sahaya serilen dev sarı-kırmızı bayrak',
    name: 'Süper Kupa',
    count: '17',
    note: 'Son: 2023',
    branch: 'Futbol',
  },
  {
    image: '/images/kupa-uefa.webp',
    alt: 'UEFA Kupası — Galatasaray’ın 2000’de kaldırdığı Avrupa kupası',
    name: 'UEFA Kupası',
    count: '1',
    note: '2000 · Avrupa',
    branch: 'Futbol',
  },
  {
    image: '/images/kupa-uefa-super.webp',
    alt: 'UEFA Süper Kupa — 2000’de Real Madrid’i deviren takımın kaldırdığı kupa',
    name: 'UEFA Süper Kupa',
    count: '1',
    note: '2000 · Avrupa',
    branch: 'Futbol',
  },
  {
    image: '/images/kupa-eurocup.webp',
    alt: 'Sinan Güler, 2016 EuroCup kupasını Abdi İpekçi Arena’da kaldırıyor',
    name: 'EuroCup',
    count: '1',
    note: '2016 · Avrupa',
    branch: 'Basketbol',
  },
];

export const honours = [
  { count: 25, label: 'Süper Lig', note: '2024-25' },
  { count: 19, label: 'Türkiye Kupası', note: '2024-25' },
  { count: 17, label: 'Süper Kupa', note: '2023' },
  { count: 1, label: 'UEFA Kupası', note: '2000' },
  { count: 1, label: 'UEFA Süper Kupa', note: '2000' },
];

/* --------------------------------------------------- müzeden gerçek nesneler */

export type Artifact = {
  image: string;
  alt: string;
  meta: string;
  title: string;
  body: string;
};

export const artifacts: Artifact[] = [
  {
    image: '/images/kupa-union-1909.webp',
    alt: 'Galatasaray Müzesi’nde cam vitrinde duran Union Club Kupası',
    meta: '31 Ocak 1909',
    title: 'Union Club Kupası',
    body:
      'Kulübün kazandığı ilk kupa. Kadıköy’ü 4-0 yenen takım, 24 santimlik bu gümüş kadehi aldı ve Galatasaray’ın vitrini o gün açıldı.',
  },
  {
    image: '/images/metin-oktay-forma.webp',
    alt: 'Metin Oktay’ın müzede sergilenen 9 numaralı sarı-kırmızı forması',
    meta: '1955 – 1969',
    title: 'Taçsız Kral’ın 9’u',
    body:
      'Metin Oktay’ın forması. Yünlü kumaş, dikilmiş numara, solmuş çizgiler; kulübün en sevilen golcüsünden kalan tek parça.',
  },
  {
    image: '/images/kupa-vitrin.webp',
    alt: 'Lig ve kupa zaferlerinin birlikte sergilendiği vitrin',
    meta: '2014-15 sezonu',
    title: 'Aynı sezonun ikisi',
    body:
      'Lig kupası ve Türkiye Kupası yan yana. Duble, kulüp tarihinde defalarca tekrarlanan ama hiç sıradanlaşmayan cümledir.',
  },
];

export const marqueeItems = [
  '25 × SÜPER LİG',
  '19 × TÜRKİYE KUPASI',
  '17 × SÜPER KUPA',
  'UEFA KUPASI 2000',
  'UEFA SÜPER KUPA 2000',
  'AVRUPA FATİHİ',
  '5 YILDIZ',
  '1905’TEN BERİ',
];

/* ------------------------------------------------------------ RAMS Park bilgi */

export const stadiumFacts = [
  { value: '52.223', label: 'Kapasite', note: 'Türkiye’nin en büyük kulüp stadı' },
  { value: '2011', label: 'Açılış', note: '15 Ocak · Ajax ile açılış maçı' },
  { value: '131', label: 'Loca', note: '+ 4.500 VIP koltuk' },
  { value: '4', label: 'UEFA yıldızı', note: 'Elit stat kategorisi' },
];

export const matchdaySteps = [
  {
    no: '01',
    title: 'Seyrantepe’ye in',
    body: 'M3 metro hattı seni doğrudan stadın altına bırakır. Maç günü ek seferler açılır.',
  },
  {
    no: '02',
    title: 'Aslanlı Yol’dan yürü',
    body: 'Mağaza, müze ve tribün girişleri aynı akstadır. Kapılar maçtan iki saat önce açılır.',
  },
  {
    no: '03',
    title: 'Yerini al',
    body: 'Passolig kartın ve biletin cebinde. Tribün numaran kapını, kapın koridorunu söyler.',
  },
  {
    no: '04',
    title: 'Sesini ver',
    body: 'İlk düdükle birlikte 52 bin kişi tek ses olur. Buranın adı boşuna Cehennem değil.',
  },
];

/* ------------------------------------------------------------------ branşlar */

export const branchGroups = [
  {
    name: 'Futbol',
    image: '/images/rams-park-matchday.webp',
    alt: 'RAMS Park tribününde atkı sallayan taraftarlar',
    note: 'Kulübün en görünür yüzü; 25 lig, 19 kupa ve 2000’de Avrupa.',
  },
  {
    name: 'Basketbol',
    image: '/images/brans-basketbol.webp',
    alt: 'Galatasaray kadın basketbol takımı maçta',
    note: 'Parkede iki Avrupa kupası: EuroCup ve EuroLeague Women.',
  },
  {
    name: 'Voleybol',
    image: '/images/brans-voleybol.webp',
    alt: 'Galatasaray erkek voleybol takımı sahada',
    note: 'Sarı-kırmızı file; erkek ve kadın takımlarıyla iki ligde.',
  },
  {
    name: 'Su Sporları',
    image: '/images/tesis-ada.webp',
    alt: 'Galatasaray Adası’nda dalgalanan kulüp bayrağı',
    note: 'Yelken, kürek, yüzme ve sutopu — Boğaz’dan olimpik havuza.',
  },
  {
    name: 'Amatör Şubeler',
    image: '/images/founders.webp',
    alt: 'Galatasaray’ın kurucu kuşağı',
    note: 'Atletizm, judo, briç, satranç, tenis. Kökleri kuruluş yıllarına uzanır.',
  },
] as const;

export type Branch = {
  name: string;
  team?: string;
  group: 'Futbol' | 'Basketbol' | 'Voleybol' | 'Su Sporları' | 'Amatör Şubeler';
  note: string;
};

export const branches: Branch[] = [
  { name: 'Erkek Futbol Takımı', group: 'Futbol', note: '25 Süper Lig · UEFA Kupası 2000' },
  { name: 'Kadın Futbol Takımı', group: 'Futbol', note: 'Süper Lig' },
  { name: 'Futbol Akademisi', group: 'Futbol', note: 'Florya & Kemerburgaz' },
  { name: 'Erkek Basketbol', team: 'Galatasaray MCT Technic', group: 'Basketbol', note: 'EuroCup 2016' },
  { name: 'Kadın Basketbol', team: 'Galatasaray Çağdaş Faktoring', group: 'Basketbol', note: 'EuroLeague Women 2014' },
  { name: 'Basketbol Akademi', group: 'Basketbol', note: 'Altyapı' },
  { name: 'Erkek Voleybol', group: 'Voleybol', note: 'Efeler Ligi' },
  { name: 'Kadın Voleybol', team: 'Galatasaray Daikin', group: 'Voleybol', note: 'CEV Kupası 2018' },
  { name: 'Yüzme', group: 'Su Sporları', note: 'Ergun Gürsoy Olimpik Havuzu' },
  { name: 'Otizm Yüzme', group: 'Su Sporları', note: 'Sosyal sorumluluk programı' },
  { name: 'Sutopu', group: 'Su Sporları', note: 'Türkiye’nin en köklü şubesi' },
  { name: 'Kürek', group: 'Su Sporları', note: 'Küçükçekmece Tesisleri' },
  { name: 'Yelken', group: 'Su Sporları', note: 'Galatasaray Adası' },
  { name: 'Atletizm', group: 'Amatör Şubeler', note: 'Akdeniz Oyunları madalyaları' },
  { name: 'Judo', group: 'Amatör Şubeler', note: 'Milli takım sporcuları' },
  { name: 'Binicilik', group: 'Amatör Şubeler', note: 'Nevzat Özgörkey Tesisleri' },
  { name: 'Tekerlekli Sandalye Basketbol', group: 'Amatör Şubeler', note: 'Avrupa kupaları' },
  { name: 'Briç', group: 'Amatör Şubeler', note: 'Türkiye şampiyonlukları' },
  { name: 'Tenis', group: 'Amatör Şubeler', note: 'Taç Spor Tesisleri' },
  { name: 'Satranç', group: 'Amatör Şubeler', note: 'Süper Lig' },
  { name: 'Espor', group: 'Amatör Şubeler', note: 'EA Sports FC' },
];

/* ------------------------------------------------------------------ tesisler */

export type Facility = {
  name: string;
  kind: string;
  location: string;
  body: string;
  image?: string;
  stats?: { value: string; label: string }[];
};

export const facilities: Facility[] = [
  {
    name: 'Ali Sami Yen Spor Kompleksi RAMS Park',
    kind: 'Stadyum',
    location: 'Seyrantepe, İstanbul',
    body:
      'Kulübün evi. 2011’de açılan, 52.223 kişilik, UEFA elit kategorisindeki stat; futbol takımının tüm iç saha maçlarını burada oynar. Çatısındaki güneş paneli tarlasıyla kendi enerjisinin bir bölümünü üretir.',
    image: '/images/aslantepe-aerial.webp',
    stats: [
      { value: '52.223', label: 'Kapasite' },
      { value: '2011', label: 'Açılış' },
    ],
  },
  {
    name: 'Florya Metin Oktay Tesisleri',
    kind: 'Antrenman',
    location: 'Florya, İstanbul',
    body:
      'A takımın kalbi. Sahil şeridindeki tesis, yarım asırdır Galatasaray futbolunun günlük hafızasını taşır.',
    image: '/images/tesis-florya.webp',
  },
  {
    name: 'Kemerburgaz Metin Oktay Tesisleri',
    kind: 'Akademi',
    location: 'Kemerburgaz, İstanbul',
    body:
      'Futbol akademisinin evi. Altyapı takımlarının sahaları, yatakhaneleri ve eğitim birimleri tek bir kampüste toplanır.',
  },
  {
    name: 'Galatasaray Kalamış Tesisleri',
    kind: 'Su sporları',
    location: 'Kalamış, İstanbul',
    body: 'Yelken ve kürek şubelerinin Anadolu yakasındaki üssü; Marmara’ya açılan antrenman hattı.',
  },
  {
    name: 'Galatasaray Adası',
    kind: 'Ada',
    location: 'Suadiye açıkları',
    body: 'Kulübün kendi adası. Boğaz’ın ortasında, direğinde sarı-kırmızı bayrak.',
    image: '/images/tesis-ada.webp',
  },
  {
    name: 'Ergun Gürsoy Olimpik Yüzme Havuzu',
    kind: 'Havuz',
    location: 'Florya, İstanbul',
    body: 'Yüzme, sutopu ve otizm yüzme programlarının olimpik ölçülerdeki havuzu.',
  },
  {
    name: 'Nevzat Özgörkey Binicilik Tesisleri',
    kind: 'Binicilik',
    location: 'İstanbul',
    body: 'Binicilik şubesinin manejleri, ahırları ve engel parkuru.',
  },
  {
    name: 'Küçükçekmece Kürek Tesisleri',
    kind: 'Kürek',
    location: 'Küçükçekmece Gölü',
    body: 'Kürek şubesinin göl üzerindeki antrenman merkezi.',
  },
  {
    name: 'Beyoğlu Hasnun Galip Binası',
    kind: 'Kulüp binası',
    location: 'Beyoğlu, İstanbul',
    body: 'Kulübün tarihî merkez binası; yönetim ve arşiv burada.',
  },
  {
    name: 'Galatasaray Taç Spor Tesisleri',
    kind: 'Çok amaçlı',
    location: 'İstanbul',
    body: 'Tenis kortları ve amatör şubelerin salonları.',
  },
];

/* -------------------------------------------------------------- kulüp künyesi */

export const clubFacts = [
  { value: '1905', label: 'Kuruluş', note: '30 Ekim · Galatasaray Lisesi' },
  { value: '13', label: 'Kurucu', note: 'Ali Sami Yen ve arkadaşları' },
  { value: '21', label: 'Aktif branş', note: 'Tek arma altında' },
  { value: '5', label: 'Yıldız', note: '2025’te beşinci' },
];

/* --------------------------------------------------------- tarih: bölümler */

const GS = 'https://www.galatasaray.org';

export const historyChapters = [
  { title: 'Galatasaray Nasıl Kuruldu', body: '1905 sonbaharında, bir lise sınıfında alınan karar.', href: `${GS}/s/galatasaray-nasil-kuruldu/13` },
  { title: 'Renklerin Öyküsü', body: 'Sarı-kırmızıdan önce sarı-siyah vardı. Renk, bir yenilginin ardından değişti.', href: `${GS}/s/renklerin-oykusu/15` },
  { title: 'Logonun Doğuşu', body: 'İç içe geçmiş G ve S; Türk futbolunun en tanınan armasının çizgileri.', href: `${GS}/s/galatasaray-logosunun-dogusu/17` },
  { title: 'İlk Yıllar', body: 'Kuruluşun ardından gelen ilk saha mücadeleleri ve ilk kupalar.', href: `${GS}/s/ilk-yillar/16` },
  { title: 'Galatasaray Şehitleri', body: 'Sahayı bırakıp cepheye giden kuşağın adları.', href: `${GS}/s/galatasaray-sehitleri/18` },
  { title: 'Atatürk ve Galatasaray', body: 'Cumhuriyet’in kurucusuyla kulüp arasındaki bağ.', href: `${GS}/s/ataturk-ve-galatasaray/20` },
  { title: 'İlk Mabet: Ali Sami Yen Stadı', body: 'Mecidiyeköy’deki ev; 1964’ten 2011’e kadar.', href: `${GS}/s/ali-sami-yen-stadi/21` },
  { title: 'Batıya Açılan Pencere', body: 'Galatasaray Lisesi ve kulübün kuruluş fikri.', href: `${GS}/s/galatasaray-lisesi-tarihi/22` },
];
