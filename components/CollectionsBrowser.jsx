'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/categories';
import { getFinalPrice, hasDiscount, products, toFaDigits } from '@/data/products';

const PRICE_FILTERS = [
  { id: 'all', label: 'همهٔ قیمت‌ها' },
  { id: 'under-15', label: 'زیر ۱۵ میلیون' },
  { id: '15-30', label: '۱۵ تا ۳۰ میلیون' },
  { id: 'over-30', label: 'بالای ۳۰ میلیون' },
];

const SORTS = [
  { id: 'featured', label: 'پیشنهاد زرین' },
  { id: 'price-asc', label: 'ارزان‌ترین' },
  { id: 'price-desc', label: 'گران‌ترین' },
  { id: 'discount', label: 'بیشترین تخفیف' },
];

const SELECT_CLASS =
  'h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs text-champagne outline-none transition focus:border-gold/60';

export default function CollectionsBrowser() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('');
  const [karat, setKarat] = useState('all');
  const [price, setPrice] = useState('all');
  const [sort, setSort] = useState('featured');
  const [offersOnly, setOffersOnly] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const availableCategories = useMemo(
    () => categories.filter((item) => products.some((product) => product.category === item.name)),
    []
  );

  const karats = useMemo(
    () => [...new Set(products.map((product) => product.karat))].sort((a, b) => a - b),
    []
  );

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('fa');

    const filtered = products.filter((product) => {
      const finalPrice = getFinalPrice(product);

      if (category && product.category !== category) return false;
      if (karat !== 'all' && String(product.karat) !== karat) return false;
      if (offersOnly && !hasDiscount(product)) return false;

      if (price === 'under-15' && finalPrice >= 15_000_000) return false;
      if (price === '15-30' && (finalPrice < 15_000_000 || finalPrice > 30_000_000)) return false;
      if (price === 'over-30' && finalPrice <= 30_000_000) return false;

      if (!normalized) return true;

      const haystack = [
        product.name,
        product.category,
        product.stone,
        product.description,
        ...(product.tags || []),
      ]
        .join(' ')
        .toLocaleLowerCase('fa');

      return haystack.includes(normalized);
    });

    const sorted = [...filtered];
    if (sort === 'price-asc') sorted.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    if (sort === 'price-desc') sorted.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
    if (sort === 'discount') {
      sorted.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    }

    return sorted;
  }, [query, category, karat, price, sort, offersOnly]);

  const hasFilters =
    query.trim() || category || karat !== 'all' || price !== 'all' || offersOnly || sort !== 'featured';

  function resetFilters() {
    setQuery('');
    setCategory('');
    setKarat('all');
    setPrice('all');
    setSort('featured');
    setOffersOnly(false);
  }

  return (
    <section id="browse" className="mt-10" aria-label="جستجو و فیلتر محصولات">
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <label htmlFor="collection-search" className="sr-only">
              جستجو در کالکشن
            </label>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-champagne/30"
              aria-hidden="true"
            >
              <circle cx="10.8" cy="10.8" r="6.3" />
              <path d="m15.6 15.6 4.2 4.2" strokeLinecap="round" />
            </svg>
            <input
              id="collection-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="نام قطعه، سنگ یا دسته‌بندی را جستجو کنید…"
              className="h-10 w-full rounded-xl border border-white/10 bg-ink/40 ps-10 pe-10 text-xs text-champagne outline-none transition placeholder:text-champagne/25 focus:border-gold/60"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="پاک‌کردن جستجو"
                className="absolute end-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-champagne/40 transition hover:text-gold"
              >
                ×
              </button>
            ) : null}
          </div>

          <div className="sm:w-48">
            <label htmlFor="collection-sort" className="sr-only">
              مرتب‌سازی
            </label>
            <select
              id="collection-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className={SELECT_CLASS}
            >
              {SORTS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label="فیلتر دسته‌بندی">
          <button
            type="button"
            aria-pressed={category === ''}
            onClick={() => setCategory('')}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-[11px] transition ${
              category === ''
                ? 'border-gold bg-gold/15 text-gold'
                : 'border-white/10 text-champagne/55 hover:border-gold/40 hover:text-gold'
            }`}
          >
            همه
          </button>
          {availableCategories.map((item) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={category === item.name}
              onClick={() => setCategory(category === item.name ? '' : item.name)}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-[11px] transition ${
                category === item.name
                  ? 'border-gold bg-gold/15 text-gold'
                  : 'border-white/10 text-champagne/55 hover:border-gold/40 hover:text-gold'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="filter-karat" className="mb-1.5 block text-[10px] text-champagne/40">
              عیار
            </label>
            <select
              id="filter-karat"
              value={karat}
              onChange={(event) => setKarat(event.target.value)}
              className={SELECT_CLASS}
            >
              <option value="all">همهٔ عیارها</option>
              {karats.map((item) => (
                <option key={item} value={String(item)}>
                  عیار {toFaDigits(item)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-price" className="mb-1.5 block text-[10px] text-champagne/40">
              بازهٔ قیمت
            </label>
            <select
              id="filter-price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className={SELECT_CLASS}
            >
              {PRICE_FILTERS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex cursor-pointer items-center gap-2 self-end rounded-xl border border-white/10 px-3.5 py-2.5 text-[11px] text-champagne/60 transition hover:border-gold/40 sm:h-10 sm:py-0">
            <input
              type="checkbox"
              checked={offersOnly}
              onChange={(event) => setOffersOnly(event.target.checked)}
              className="h-3.5 w-3.5 accent-[#c9a227]"
            />
            فقط پیشنهادهای ویژه
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] text-champagne/40" aria-live="polite">
          {toFaDigits(results.length)} قطعه
          {query.trim() ? ` برای «${query.trim()}»` : ''}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="text-[10px] text-champagne/45 underline decoration-white/20 underline-offset-4 transition hover:text-gold"
          >
            حذف فیلترها
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
          <p className="text-sm text-champagne/60">با این فیلترها قطعه‌ای پیدا نشد.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex text-xs text-gold transition hover:text-gold-light"
          >
            نمایش همهٔ قطعه‌ها
          </button>
        </div>
      )}
    </section>
  );
}
