'use client';

import Link from 'next/link';

import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';
import { toFaDigits } from '@/lib/format';

export default function WishlistGrid() {
  const { ids, isHydrated, clear } = useWishlist();

  if (!isHydrated) {
    return <div className="mt-12 h-40 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />;
  }

  const items = ids
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  if (items.length === 0) {
    return (
      <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
            <path d="M12 20.3 4.8 13a4.8 4.8 0 0 1 6.8-6.8l.4.4.4-.4a4.8 4.8 0 1 1 6.8 6.8L12 20.3Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-4 text-sm text-champagne/60">هنوز قطعه‌ای را به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
        <Link href="/collections/" className="mt-4 inline-flex text-xs text-gold transition hover:text-gold-light">
          مشاهدهٔ کالکشن
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-[11px] text-champagne/40">{toFaDigits(items.length)} قطعه ذخیره‌شده</p>
        <button
          type="button"
          onClick={clear}
          className="text-[10px] text-champagne/40 underline decoration-white/20 underline-offset-4 transition hover:text-gold"
        >
          حذف همه
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
