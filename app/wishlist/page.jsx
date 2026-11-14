import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WishlistGrid from '@/components/WishlistGrid';

export const metadata = {
  title: 'علاقه‌مندی‌ها | گالری زرین',
  description: 'قطعه‌های ذخیره‌شدهٔ شما در گالری زرین.',
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="relative pb-24 pt-32">
        <div
          aria-hidden="true"
          className="luxe-grid pointer-events-none absolute inset-x-0 top-0 h-[360px] opacity-40"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <p className="flex items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
            <span className="h-px w-10 bg-gold/50" />
            انتخاب‌های شما
          </p>
          <h1 className="mt-5 text-4xl font-light leading-tight text-champagne sm:text-5xl">
            علاقه‌مندی‌ها
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-8 text-champagne/55">
            فهرست قطعه‌هایی که ذخیره کرده‌اید؛ روی همین دستگاه باقی می‌ماند.
          </p>

          <WishlistGrid />
        </div>
      </main>

      <Footer />
    </>
  );
}
