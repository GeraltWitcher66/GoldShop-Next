import Link from 'next/link';

import ProductImage from '@/components/ProductImage';
import WishlistButton from '@/components/WishlistButton';
import { isMadeToOrder } from '@/data/productOptions';
import { formatPrice, getFinalPrice, hasDiscount, toFaDigits } from '@/data/products';

export default function ProductCard({ product }) {
  const discounted = hasDiscount(product);
  const finalPrice = getFinalPrice(product);
  const madeToOrder = isMadeToOrder(product);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/70 transition duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-gold">
      <div className="relative">
        <Link
          href={`/products/${product.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block"
        >
          <ProductImage src={product.image} alt={product.name} boxHeightClass="h-72" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
          />
          {discounted && (
            <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-ink/80 px-2.5 py-1 text-[10px] tracking-wide text-gold backdrop-blur-sm">
              <span className="h-1 w-1 rotate-45 bg-gold" aria-hidden="true" />
              پیشنهاد ویژه
            </span>
          )}

          <span className="absolute end-4 top-4 rounded-full border border-gold/30 bg-ink/70 px-3 py-1 text-[10px] tracking-wide text-gold backdrop-blur-sm">
            عیار {toFaDigits(product.karat)}
          </span>
        </Link>

        <WishlistButton
          productId={product.id}
          className="absolute bottom-4 end-4 z-10"
        />

        {madeToOrder ? (
          <span className="absolute bottom-4 start-4 z-10 rounded-full border border-gold/25 bg-ink/75 px-2.5 py-1 text-[9px] tracking-wide text-champagne/65 backdrop-blur-sm">
            سفارش ساخت
          </span>
        ) : null}
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="flex flex-1 flex-col"
        aria-label={`مشاهده جزئیات ${product.name}`}
      >
        <div className="flex flex-1 flex-col gap-5 p-5">
          <div>
            <p className="text-[10px] tracking-[0.28em] text-champagne/40">{product.category}</p>
            <h3 className="mt-2.5 text-[15px] font-medium leading-7 text-champagne">
              {product.name}
            </h3>
          </div>

          <div className="mt-auto space-y-5">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-lg font-medium text-gold">{formatPrice(finalPrice)}</span>
              <span className="text-[11px] text-champagne/45">تومان</span>
              {discounted && (
                <span className="text-xs text-gray-400 line-through decoration-gray-400/40">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <span className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-2.5 text-xs text-champagne/80 transition duration-300 group-hover:border-gold/50 group-hover:bg-gold/10 group-hover:text-gold">
              مشاهده جزئیات
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
