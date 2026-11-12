'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import ProductImage from '@/components/ProductImage';
import { useCart } from '@/context/CartContext';
import { formatPrice, toFaDigits } from '@/lib/format';

export default function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    count,
    total,
    removeItem,
    updateQty,
    clearCart,
    submitOrder,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeCart();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <button
        type="button"
        tabIndex={-1}
        aria-label="بستن سبد خرید"
        onClick={closeCart}
        className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
      />

      <aside className="absolute inset-y-0 end-0 flex w-full max-w-md animate-cart-in flex-col border-s border-gold/15 bg-ink-soft/95 shadow-[0_0_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 id="cart-title" className="text-base font-medium text-champagne">
              سبد خرید
            </h2>
            <p className="mt-1 text-[10px] text-champagne/40">
              {count > 0 ? `${toFaDigits(count)} قطعه در سبد شما` : 'سبد شما خالی است'}
            </p>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="بستن"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-champagne/60 transition hover:border-gold/50 hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-7 w-7" aria-hidden="true">
                <path d="M6.2 8h11.6l-1 12.2H7.2L6.2 8Z" strokeLinejoin="round" />
                <path d="M9.2 8V6.6a2.8 2.8 0 0 1 5.6 0V8" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-sm text-champagne/60">هنوز قطعه‌ای به سبد اضافه نکرده‌اید.</p>
            <Link
              href="/#collection"
              onClick={closeCart}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-xs text-champagne/70 transition hover:border-gold/50 hover:text-gold"
            >
              مشاهده کالکشن
            </Link>
          </div>
        ) : (
          <ul className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
              >
                <Link
                  href={`/products/${item.slug}`}
                  onClick={closeCart}
                  className="group w-16 shrink-0 overflow-hidden rounded-xl"
                  aria-label={item.name}
                >
                  <ProductImage src={item.image} alt={item.name} />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="line-clamp-1 text-xs text-champagne/90 transition hover:text-gold"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`حذف ${item.name} از سبد`}
                      className="shrink-0 text-champagne/30 transition hover:text-gold"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5" aria-hidden="true">
                        <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <p className="mt-1 text-[10px] text-champagne/40">عیار {toFaDigits(item.karat)}</p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 rounded-full border border-white/10">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, -1)}
                        aria-label="کاهش تعداد"
                        className="grid h-6 w-6 place-items-center rounded-full text-champagne/60 transition hover:text-gold"
                      >
                        −
                      </button>
                      <span className="min-w-4 text-center text-[11px] text-champagne">
                        {toFaDigits(item.qty)}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, 1)}
                        aria-label="افزایش تعداد"
                        className="grid h-6 w-6 place-items-center rounded-full text-champagne/60 transition hover:text-gold"
                      >
                        +
                      </button>
                    </div>

                    <span className="whitespace-nowrap text-[11px] text-gold">
                      {formatPrice(item.price * item.qty)}
                      <span className="ms-1 text-champagne/40">تومان</span>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="border-t border-white/10 bg-ink/60 px-5 py-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs text-champagne/55">جمع کل</span>
              <span className="text-base font-medium text-gold">
                {formatPrice(total)}
                <span className="ms-1 text-[10px] font-normal text-champagne/40">تومان</span>
              </span>
            </div>

            <p className="mt-2 text-[10px] leading-5 text-champagne/35">
              ارسال بیمه‌شده و بسته‌بندی هدیه، رایگان است.
            </p>

            <button type="button" onClick={submitOrder} className="btn-gold mt-4 w-full">
              ثبت سفارش
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="mt-2 w-full text-center text-[10px] text-champagne/35 transition hover:text-champagne/60"
            >
              خالی کردن سبد
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
