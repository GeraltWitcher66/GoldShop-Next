import Link from 'next/link';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <>
      <Header />

      <main id="main-content" className="relative flex min-h-[80vh] items-center pb-24 pt-32">
        <div
          aria-hidden="true"
          className="luxe-grid pointer-events-none absolute inset-0 opacity-40"
        />

        <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className="font-display text-7xl font-light text-gold/25">404</p>
          <h1 className="mt-6 text-3xl font-light text-champagne sm:text-4xl">
            این قطعه در ویترین نیست
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-8 text-champagne/50">
            نشانی واردشده وجود ندارد یا صفحه جابه‌جا شده است. می‌توانید از کالکشن شروع کنید یا به
            صفحهٔ اصلی برگردید.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/collections/" className="btn-gold">
              مشاهدهٔ کالکشن
            </Link>
            <Link href="/" className="btn-ghost">
              صفحهٔ اصلی
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
