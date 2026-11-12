import Link from 'next/link';

import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: 'ورود و ثبت‌نام | گالری زرین',
  description:
    'ورود به حساب کاربری یا ثبت‌نام در گالری زرین؛ پیگیری سفارش‌ها و اطلاع از کالکشن‌های جدید طلا و جواهر دست‌ساز.',
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-x-hidden bg-[#08080a]">
      {/* پس‌زمینهٔ تاریک با بافت و هالهٔ طلایی */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="luxe-grid absolute inset-0 opacity-40" />
        <div className="absolute -top-48 start-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-3xl" />
        <div className="absolute -bottom-24 end-0 h-72 w-72 rounded-full bg-gold/[0.04] blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/40 to-ink" />
      </div>

      <header className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="بازگشت به گالری زرین">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/5 text-gold transition group-hover:border-gold/80">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden="true"
            >
              <path d="M12 2.8 6.4 8.2 12 21.2l5.6-13L12 2.8Z" strokeLinejoin="round" />
              <path d="M6.4 8.2h11.2" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-medium text-champagne">گالری زرین</span>
            <span className="mt-1.5 font-display text-[9px] uppercase tracking-[0.42em] text-gold/70">
              Zarin Gallery
            </span>
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] text-champagne/45 transition hover:text-gold"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          بازگشت به فروشگاه
        </Link>
      </header>

      <div className="relative flex flex-1 items-center justify-center px-5 pb-16 pt-2 sm:px-8">
        <LoginForm />
      </div>

      <p className="relative pb-6 text-center text-[10px] text-champagne/25">
        © ۱۴۰۵ گالری زرین — تمامی حقوق محفوظ است.
      </p>
    </main>
  );
}
