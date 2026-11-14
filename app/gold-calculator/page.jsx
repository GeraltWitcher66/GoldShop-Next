import Link from 'next/link';

import Footer from '@/components/Footer';
import GoldCalculator from '@/components/GoldCalculator';
import Header from '@/components/Header';
import { absoluteUrl } from '@/lib/site';

export const metadata = {
  title: 'محاسبه‌گر قیمت طلا | گالری زرین',
  description:
    'برآورد قیمت طلا بر اساس وزن، عیار، اجرت ساخت، سود و مالیات؛ ابزار تقریبی گالری زرین.',
  alternates: { canonical: absoluteUrl('/gold-calculator/') },
};

export default function GoldCalculatorPage() {
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
            <span className="text-champagne/70">محاسبه‌گر قیمت طلا</span>
          </nav>

          <p className="mt-10 flex items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
            <span className="h-px w-10 bg-gold/50" />
            شفافیت در قیمت
          </p>
          <h1 className="mt-5 text-4xl font-light leading-tight text-champagne sm:text-5xl">
            قیمت قطعه را برآورد کنید
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-champagne/55">
            وزن، عیار، اجرت و سود را وارد کنید تا تفکیک تقریبی قیمت را ببینید. نرخ‌های این صفحه
            برای نمایش دمو ثابت هستند.
          </p>

          <GoldCalculator />
        </div>
      </main>

      <Footer />
    </>
  );
}
