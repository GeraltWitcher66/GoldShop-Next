'use client';

import { useState } from 'react';

import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const TABS = [
  {
    id: 'bestsellers',
    label: 'پرفروش‌ترین‌ها',
    slugs: [
      'diamond-necklace-set',
      'cartier-gold-bracelet',
      'ruby-solitaire-ring',
      'turquoise-gold-pendant',
    ],
  },
  {
    id: 'newest',
    label: 'جدیدترین‌ها',
    slugs: [
      'emerald-pendant-necklace',
      'pearl-gold-set',
      'diamond-drop-earrings',
      'plain-gold-band',
    ],
  },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const active = TABS.find((tab) => tab.id === activeTab) ?? TABS[0];
  const items = active.slugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean);

  return (
    <section
      id="collection"
      className="relative scroll-mt-32 overflow-hidden border-t border-white/5 py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="luxe-grid pointer-events-none absolute inset-0 opacity-60"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
              <span className="h-px w-10 bg-gold/50" />
              کالکشن ویژه
            </p>
            <h2 className="mt-6 text-4xl font-light leading-tight text-champagne sm:text-5xl">
              قطعه‌هایی که
              <span className="gold-text"> می‌درخشند</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-champagne/50">
            گزیده‌ای از دست‌سازهای کارگاه زرین؛ هر قطعه با شناسنامه اصالت، عیار رسمی و ارسال
            بیمه‌شده همراه است.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="دسته‌بندی محصولات ویژه"
          className="mt-10 flex items-center gap-1 border-b border-white/10"
        >
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls="featured-panel"
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 text-xs transition sm:px-6 ${
                  isActive ? 'text-gold' : 'text-champagne/45 hover:text-champagne/80'
                }`}
              >
                {tab.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-px bg-gold transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div
          key={activeTab}
          id="featured-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="mt-12 grid animate-fade-up grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
