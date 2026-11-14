'use client';

import { useWishlist } from '@/context/WishlistContext';
import { toFaDigits } from '@/lib/format';

export default function WishlistButton({ productId, className = '', showLabel = false }) {
  const { has, toggle } = useWishlist();
  const saved = has(productId);

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={saved}
      aria-label={saved ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
      className={`inline-flex items-center justify-center gap-2 transition ${
        showLabel
          ? 'rounded-full border px-4 py-2.5 text-[11px]'
          : 'h-9 w-9 rounded-full border backdrop-blur'
      } ${
        saved
          ? 'border-gold/60 bg-gold/15 text-gold'
          : 'border-white/15 bg-ink/70 text-champagne/65 hover:border-gold/50 hover:text-gold'
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path
          d="M12 20.3 4.8 13a4.8 4.8 0 0 1 6.8-6.8l.4.4.4-.4a4.8 4.8 0 1 1 6.8 6.8L12 20.3Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showLabel ? <span>{saved ? 'در علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}</span> : null}
    </button>
  );
}

export function WishlistCount({ count }) {
  return <span className="text-[10px] text-champagne/45">{toFaDigits(count)}</span>;
}
