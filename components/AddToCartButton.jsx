'use client';

import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className="btn-gold flex-1 shadow-[0_0_22px_rgba(212,175,55,0.45)] transition-shadow hover:shadow-[0_0_32px_rgba(212,175,55,0.55)] sm:flex-none"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M6.2 8h11.6l-1 12.2H7.2L6.2 8Z" strokeLinejoin="round" />
        <path d="M9.2 8V6.6a2.8 2.8 0 0 1 5.6 0V8" strokeLinecap="round" />
      </svg>
      افزودن به سبد خرید
    </button>
  );
}
