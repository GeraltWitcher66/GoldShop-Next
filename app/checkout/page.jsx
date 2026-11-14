import Link from 'next/link';

import CheckoutForm from '@/components/CheckoutForm';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata = {
  title: 'تکمیل سفارش | گالری زرین',
  description: 'اطلاعات ارسال و پرداخت سفارش گالری زرین.',
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="relative pb-24 pt-32">
        <div
          aria-hidden="true"
          className="luxe-grid pointer-events-none absolute inset-x-0 top-0 h-[380px] opacity-40"
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
            <span className="text-champagne/70">تکمیل سفارش</span>
          </nav>

          <p className="mt-10 flex items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
            <span className="h-px w-10 bg-gold/50" />
            یک قدم تا درخشش
          </p>
          <h1 className="mt-5 text-4xl font-light leading-tight text-champagne sm:text-5xl">
            تکمیل سفارش
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-8 text-champagne/55">
            اطلاعات گیرنده و ارسال را وارد کنید. سفارش در این نسخه دمو در مرورگر شما ثبت می‌شود.
          </p>

          <CheckoutForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
