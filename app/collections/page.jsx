import Link from 'next/link';
import { Suspense } from 'react';

import CollectionsBrowser from '@/components/CollectionsBrowser';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { absoluteUrl } from '@/lib/site';

export const metadata = {
  title: 'کالکشن | گالری زرین',
  description: 'همه قطعه‌های گالری زرین؛ طلا و جواهر دست‌ساز با عیار ۱۸ و ۲۱ و شناسنامه اصالت.',
  alternates: { canonical: absoluteUrl('/collections/') },
};

export default function CollectionsPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="relative pb-24 pt-32">
        <div
          aria-hidden="true"
          className="luxe-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-[11px] text-champagne/40">
            <Link href="/" className="transition hover:text-gold">
              خانه
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-champagne/70">کالکشن</span>
          </nav>

          <p className="mt-10 flex items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
            <span className="h-px w-10 bg-gold/50" />
            کالکشن
          </p>
          <h1 className="mt-5 text-4xl font-light leading-tight text-champagne sm:text-5xl">
            همه قطعه‌ها
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-8 text-champagne/55">
            هر قطعه در کارگاه زرین ساخته می‌شود و با شناسنامه اصالت، عیار رسمی و ارسال بیمه‌شده
            همراه است.
          </p>

          <Suspense
            fallback={
              <div className="mt-12 h-64 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />
            }
          >
            <CollectionsBrowser />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
