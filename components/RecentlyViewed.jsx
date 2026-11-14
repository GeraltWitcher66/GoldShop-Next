'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const STORAGE_KEY = 'zarin-recent-v1';

export default function RecentlyViewed({ currentSlug }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const previous = Array.isArray(parsed)
        ? parsed.filter((slug) => typeof slug === 'string' && slug !== currentSlug)
        : [];

      setItems(
        previous
          .map((slug) => products.find((product) => product.slug === slug))
          .filter(Boolean)
          .slice(0, 3)
      );

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([currentSlug, ...previous].slice(0, 8))
      );
    } catch {
      // دسترسی به حافظه ممکن نیست؛ بخش بازدیدهای اخیر نمایش داده نمی‌شود.
    }
  }, [currentSlug]);

  if (items.length === 0) return null;

  return (
    <section className="mt-24" aria-labelledby="recently-viewed-title">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] tracking-[0.3em] text-gold/80">نگاه دوباره</p>
          <h2 id="recently-viewed-title" className="mt-4 text-2xl font-light text-champagne sm:text-3xl">
            اخیراً دیده بودید
          </h2>
        </div>
        <Link href="/wishlist/" className="hidden text-xs text-champagne/50 transition hover:text-gold sm:inline-flex">
          علاقه‌مندی‌های من
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
