import Link from 'next/link';
import { notFound } from 'next/navigation';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductPurchase from '@/components/ProductPurchase';
import ProductReviews from '@/components/ProductReviews';
import ProductZoom from '@/components/ProductZoom';
import RecentlyViewed from '@/components/RecentlyViewed';
import WishlistButton from '@/components/WishlistButton';
import { getMadeToOrderNote } from '@/data/productOptions';
import { formatPrice, getFinalPrice, hasDiscount, products, toFaDigits } from '@/data/products';
import { absoluteUrl } from '@/lib/site';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    return { title: 'محصول یافت نشد | گالری زرین' };
  }

  const url = absoluteUrl(`/products/${product.slug}/`);
  const image = absoluteUrl(product.image);

  return {
    title: `${product.name} | گالری زرین`,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title: product.name,
      description: product.description,
      url,
      type: 'website',
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [image],
    },
  };
}

const OFFER_DEADLINE = '۳۰ آذر ۱۴۰۵';

const TRUST_POINTS = [
  'شناسنامه اصالت و عیار رسمی',
  'ارسال بیمه‌شده به سراسر کشور',
  'امکان بازگشت تا ۷ روز',
];

export default function ProductPage({ params }) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  const sameCategory = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category
  );
  const others = products.filter(
    (item) => item.slug !== product.slug && item.category !== product.category
  );
  const related = [...sameCategory, ...others].slice(0, 3);
  const discounted = hasDiscount(product);
  const finalPrice = getFinalPrice(product);
  const madeToOrderNote = getMadeToOrderNote(product);

  const specs = [
    { label: 'عیار', value: toFaDigits(product.karat) },
    { label: 'وزن', value: product.weight },
    { label: 'سنگ', value: product.stone },
  ];

  const reviewCount = product.reviews.length;
  const averageRating =
    reviewCount > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
      : 0;

  const productUrl = absoluteUrl(`/products/${product.slug}/`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: [absoluteUrl(product.image)],
        sku: product.id,
        category: product.category,
        brand: { '@type': 'Brand', name: 'گالری زرین' },
        offers: {
          '@type': 'Offer',
          url: productUrl,
          priceCurrency: 'IRR',
          price: finalPrice * 10,
          availability: madeToOrderNote
            ? 'https://schema.org/PreOrder'
            : 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: 'گالری زرین' },
        },
        ...(reviewCount > 0
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: averageRating.toFixed(1),
                reviewCount,
              },
            }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'خانه', item: absoluteUrl('/') },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'کالکشن',
            item: absoluteUrl('/collections/'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <Header />

      <main id="main-content" className="relative pb-24 pt-32">
        <div
          aria-hidden="true"
          className="luxe-grid pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-50"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-2 text-[11px] text-champagne/40">
            <Link href="/" className="transition hover:text-gold">
              خانه
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/collections/" className="transition hover:text-gold">
              کالکشن
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-champagne/70">{product.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* تصویر */}
            <div className="lg:col-span-6">
              <div className="group overflow-hidden rounded-none border border-gold/30 bg-ink-soft lg:sticky lg:top-28">
                <ProductZoom src={product.image} alt={product.name} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[10px] text-champagne/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* مشخصات و خرید */}
            <div className="lg:col-span-6 lg:pt-2">
              <p className="text-[11px] tracking-[0.3em] text-gold/80">{product.category}</p>
              <div className="mt-4 flex items-start justify-between gap-4">
                <h1 className="text-3xl font-light leading-[1.45] text-champagne sm:text-[2.6rem]">
                  {product.name}
                </h1>
                <WishlistButton productId={product.id} className="mt-1 shrink-0" />
              </div>

              {madeToOrderNote ? (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.05] px-3 py-1.5 text-[10px] text-champagne/55">
                  <span className="h-1 w-1 rotate-45 bg-gold" aria-hidden="true" />
                  سفارش ساخت · آماده‌سازی {madeToOrderNote}
                </p>
              ) : null}

              <p className="mt-5 text-sm leading-8 text-champagne/60">{product.description}</p>

              <dl className="mt-8 grid grid-cols-3 gap-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="rounded-xl border border-white/10 p-3.5">
                    <dt className="text-[10px] text-champagne/40">{spec.label}</dt>
                    <dd className="mt-1.5 text-xs text-champagne">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/[0.04] p-5 sm:p-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-champagne/40">قیمت</p>
                    <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-2xl font-medium text-gold sm:text-3xl">
                        {formatPrice(finalPrice)}
                      </span>
                      <span className="text-[11px] text-champagne/45">تومان</span>
                      {discounted && (
                        <span className="text-sm text-champagne/35 line-through decoration-champagne/30">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </p>
                    {discounted && (
                      <p className="mt-2 text-[10px] tracking-wide text-gold/70">
                        این پیشنهاد تا {OFFER_DEADLINE} معتبر است
                      </p>
                    )}
                  </div>
                  <p className="text-[10px] text-champagne/35">قیمت بر اساس نرخ روز طلا</p>
                </div>

                <ProductPurchase product={product} />
              </div>

              <ul className="mt-7 space-y-3">
                {TRUST_POINTS.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-xs text-champagne/55">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4 text-gold"
                      aria-hidden="true"
                    >
                      <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                href="/guides/"
                className="mt-4 inline-flex items-center gap-2 text-[10px] text-champagne/40 transition hover:text-gold"
              >
                راهنمای اندازه، ارسال و نگهداری
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-3 w-3 rotate-180" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          <ProductReviews reviews={product.reviews} />

          <RecentlyViewed currentSlug={product.slug} />

          {related.length > 0 && (
            <section className="mt-24">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-[11px] tracking-[0.3em] text-gold/80">پیشنهاد زرین</p>
                  <h2 className="mt-4 text-2xl font-light text-champagne sm:text-3xl">
                    قطعه‌های مرتبط
                  </h2>
                </div>
                <Link
                  href="/collections/"
                  className="hidden text-xs text-champagne/50 transition hover:text-gold sm:inline-flex"
                >
                  همه محصولات
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
