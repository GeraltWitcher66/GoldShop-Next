import Link from 'next/link';

import { featuredCategories } from '@/data/categories';
import { asset } from '@/lib/path';

export default function CategoryGrid() {
  return (
    <section className="relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute start-1/2 top-0 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-gold/[0.04] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
              <span className="h-px w-10 bg-gold/50" />
              دسته‌بندی‌ها
            </p>
            <h2 className="mt-5 text-2xl font-light text-champagne sm:text-3xl">
              خرید بر اساس دسته‌بندی
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-6 text-champagne/45">
            از گردنبند تا آویز؛ با یک نگاه، مسیر خریدتان را پیدا کنید.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:gap-10">
          {featuredCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              aria-label={`مشاهده دسته‌بندی ${category.name}`}
              className="group relative block aspect-square overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(120%_120%_at_30%_20%,#1d1a13,#0d0d10_72%)] transition duration-500 hover:border-gold/40 hover:shadow-[0_0_60px_-24px_rgba(201,162,39,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
                style={{ backgroundImage: `url('${asset(category.image)}')` }}
              />

              {/* لایهٔ تیرهٔ ثابت برای خوانایی؛ در هاور کمی روشن‌تر می‌شود */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/25"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent transition-opacity duration-500 group-hover:from-ink/55"
              />

              <span className="absolute inset-0 grid place-items-center p-4">
                <span className="flex flex-col items-center gap-3 text-center">
                  <span className="text-xl font-medium tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:text-2xl">
                    {category.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-12 rounded-full bg-gold/70 transition-all duration-500 group-hover:w-16 group-hover:bg-gold"
                  />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
