import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Footer, Header, Ticker } from '@/components/site/chrome';
import { RevealRoot } from '@/components/site/reveal';
import { stagger } from '@/lib/stagger';
import { branchGroups, branches } from '@/lib/gs';
import { asset } from '@/lib/asset';

export const metadata: Metadata = {
  title: 'Branşlar',
  description: 'Futboldan sutopuna, satrançtan atletizme: tek armanın altındaki tüm Galatasaray takımları.',
};

export default function Branches() {
  return (
    <>
      <RevealRoot />
      <Ticker />
      <Header active="Branşlar" />

      <section className="pagehero">
        <div className="ph">
          <img src={asset('/images/rams-park-bowl.webp')} alt="RAMS Park’ın iç görünümü" fetchPriority="high" />
        </div>
        <div className="wrap pagehero-in">
          <p className="crumb">
            <Link href="/">Ana sayfa</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--gold)' }}>Branşlar</span>
          </p>
          <h1 className="h1">
            Tek arma,
            <br />
            <span className="gold">{branches.length} takım.</span>
          </h1>
          <p className="deck">
            Galatasaray yalnızca futbol değildir. Aynı arma; parkede, havuzda, pistte, tatamide ve satranç tahtasında.
          </p>
        </div>
      </section>

      <section className="light sect">
        <div className="wrap">
          {branchGroups.map((group, gi) => {
            const list = branches.filter((b) => b.group === group.name);
            return (
              <div className="branchgroup" key={group.name} data-reveal style={stagger(gi % 2, 0.08)}>
                <div className="branchgroup-media">
                  <div className="ph ph-zoom">
                    <img src={asset(group.image)} alt={group.alt} loading="lazy" />
                  </div>
                  <h3>
                    {group.name} <em>{String(list.length).padStart(2, '0')} takım</em>
                  </h3>
                  <p className="branchgroup-note">{group.note}</p>
                </div>

                <div className="branch-list">
                  {list.map((b, i) => (
                    <Link className="branch" href="/haberler" key={b.name}>
                      <em>{String(i + 1).padStart(2, '0')}</em>
                      <h4>
                        {b.name}
                        {b.team && <small>{b.team}</small>}
                      </h4>
                      <p>{b.note}</p>
                      <ArrowRight size={18} />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="roar">
        <div className="ph">
          <img src={asset('/images/rams-park-koreografi.webp')} alt="Şampiyonluk koreografisi" loading="lazy" />
        </div>
        <div className="wrap roar-copy" data-reveal>
          <p className="eyebrow">Aynı arma</p>
          <h2 className="h2">
            Nerede oynarsak
            <br />
            <span className="gold">orası Galatasaray.</span>
          </h2>
          <p className="roar-quote">
            Bir kulübün büyüklüğü kaç kupa kazandığıyla değil, kaç sahada aynı sesle mücadele ettiğiyle ölçülür.
          </p>
          <div style={{ marginTop: 30 }}>
            <Link className="btn" href="/tarih">
              Kupaların hikâyesi <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
