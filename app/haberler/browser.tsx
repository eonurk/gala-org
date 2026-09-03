'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { NewsItem } from '@/lib/gs';

export function NewsBrowser({ items }: { items: NewsItem[] }) {
  const [filter, setFilter] = useState('Tümü');

  const categories = useMemo(() => ['Tümü', ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const shown = filter === 'Tümü' ? items : items.filter((i) => i.category === filter);

  return (
    <section className="sect">
      <div className="wrap">
        <div className="sect-head">
          <fieldset className="filterbar" aria-label="Haber kategorileri">
            {categories.map((cat) => (
              <button key={cat} data-on={filter === cat} onClick={() => setFilter(cat)}>
                {cat}
              </button>
            ))}
          </fieldset>
          <p className="lede" style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {shown.length} haber
          </p>
        </div>

        <div className="cardgrid">
          {shown.map((item) => (
            <Link className="card" key={item.id} href={`/haberler/${item.id}`}>
              <div className="ph ph-zoom">
                <img src={item.image} alt="" loading="lazy" />
              </div>
              <div className="card-meta">
                <em>{item.category}</em>
                <span>
                  {item.dateLabel} · {item.timeLabel}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary.slice(0, 130)}…</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
