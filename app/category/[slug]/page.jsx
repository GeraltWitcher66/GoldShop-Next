import Link from 'next/link';
import { notFound } from 'next/navigation';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { categories, getCategory } from '@/data/categories';
import { products, toFaDigits } from '@/data/products';
import { absoluteUrl } from '@/lib/site';

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }) {
  const category = getCategory(params.slug);

  if (!category) {
    return { title: 'دسته‌بندی یافت نشد | گالری زرین' };
  }

  const url = absoluteUrl(`/category/${category.slug}/`);

  return {
    title: `${category.title} | گالری زرین`,
    description: `${category.title} گالری زرین؛ طلا و جواهر دست‌ساز با عیار ۱۸ و ۲۱، شناسنامه اصالت و ارسال بیمه‌شده.`,
    alternates: { canonical: url },
    openGraph: {
      title: category.title,
      description: `${category.title} دست‌ساز گالری زرین`,
      url,
      ...(category.image ? { images: [{ url: absoluteUrl(category.image) }] } : {}),
    },
  };
}

export default function CategoryPage({ params }) {
  const category = getCategory(params.slug);

  if (!category) {
    notFound();
  }

  const items = products.filter((product) => product.category === category.name);

  return (
    <>
      <Header />

      <main id="main-content" className="relative pb-24 pt-32">
        <div
          aria-hidden="true"
          className="luxe-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-2 text-[11px] text-champagne/40">
            <Link href="/" className="transition hover:text-gold">
              خانه
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/collections" className="transition hover:text-gold">
              کالکشن
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-champagne/70">{category.title}</span>
          </nav>

          <p className="mt-10 flex items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
            <span className="h-px w-10 bg-gold/50" />
            دسته‌بندی
          </p>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-light leading-tight text-champagne sm:text-5xl">
                {category.title}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-8 text-champagne/55">
                {items.length > 0
                  ? `${toFaDigits(items.length)} قطعه دست‌ساز در ${category.title}؛ هر کدام با شناسنامه اصالت و عیار رسمی.`
                  : `در حال حاضر قطعه‌ای در ${category.title} موجود نیست.`}
              </p>
            </div>

            <Link
              href="/collections"
              className="text-xs text-champagne/50 transition hover:text-gold"
            >
              مشاهده همه قطعه‌ها
            </Link>
          </div>

          {items.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">
              <p className="text-sm text-champagne/60">محصولی یافت نشد</p>
              <Link
                href="/collections"
                className="mt-4 inline-flex text-xs text-gold transition hover:text-gold-light"
              >
                بازگشت به کالکشن
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
