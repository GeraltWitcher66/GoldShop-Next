'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import AddToCartButton from '@/components/AddToCartButton';
import { getMadeToOrderNote, getProductOption } from '@/data/productOptions';

export default function ProductPurchase({ product }) {
  const option = getProductOption(product);
  const madeToOrderNote = getMadeToOrderNote(product);
  const [selected, setSelected] = useState(option?.values[0] ?? '');

  useEffect(() => {
    setSelected(option?.values[0] ?? '');
  }, [product.id, option]);

  return (
    <div className="mt-5">
      {option ? (
        <div role="group" aria-labelledby="product-option-label" className="mb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p id="product-option-label" className="text-[11px] text-champagne/55">
              {option.label}
              {option.unit ? <span className="text-champagne/30"> ({option.unit})</span> : null}
            </p>
            <Link href={option.guideHref} className="text-[10px] text-gold/80 hover:text-gold">
              راهنمای اندازه
            </Link>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {option.values.map((value) => {
              const active = selected === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(value)}
                  className={`min-w-10 rounded-full border px-3 py-2 text-xs transition ${
                    active
                      ? 'border-gold bg-gold text-ink'
                      : 'border-white/15 text-champagne/65 hover:border-gold/50 hover:text-gold'
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {madeToOrderNote ? (
        <p className="mb-5 flex items-start gap-2 rounded-xl border border-gold/20 bg-gold/[0.04] px-3.5 py-2.5 text-[10px] leading-5 text-champagne/55">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
          این قطعه پس از ثبت سفارش ساخته می‌شود؛ زمان آماده‌سازی {madeToOrderNote}.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <AddToCartButton
          product={product}
          optionLabel={option?.label}
          optionValue={option ? selected : undefined}
        />
        <Link href="/#contact" className="btn-ghost flex-1 sm:flex-none">
          درخواست مشاوره خرید
        </Link>
      </div>
    </div>
  );
}
