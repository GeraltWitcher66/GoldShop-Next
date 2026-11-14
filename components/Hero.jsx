import ProductImage from '@/components/ProductImage';

const TRUST_ITEMS = [
  'ضمانت اصالت و عیار رسمی',
  'ارسال بیمه‌شده به سراسر کشور',
  'ساخت دست در کارگاه زرین',
];

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* پس‌زمینه: تصویر + گرادیان‌های تیره */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        {/* یکپارچه‌کردن بالای هیرو با هدر ثابت */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/75 via-ink/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(201,162,39,0.16),transparent_58%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl flex-1 px-5 pb-24 pt-32 sm:px-8 lg:flex lg:items-center">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* متن (سمت راست) */}
          <div className="lg:col-span-7">
            <p className="flex animate-fade-up items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
              <span className="h-px w-12 bg-gradient-to-l from-gold/70 to-transparent" />
              کالکشن پاییز ۱۴۰۵
            </p>

            <h1 className="mt-8 animate-fade-up text-[2.6rem] font-light leading-[1.28] text-champagne sm:text-5xl lg:text-[3.4rem] xl:text-[4.2rem]">
              درخشش اصالت
              <span className="gold-text mt-2 block font-extralight">در هر نگاه</span>
            </h1>

            <p
              className="mt-8 max-w-xl animate-fade-up text-sm leading-8 text-champagne/60 sm:text-base"
              style={{ animationDelay: '180ms' }}
            >
              هر قطعه در گالری زرین، روایتی از دقتِ دستِ هنرمند و خلوصِ طلاست؛ طراحی‌شده برای
              لحظه‌هایی که به یاد می‌مانند.
            </p>

            <div
              className="mt-11 flex animate-fade-up flex-wrap items-center gap-4"
              style={{ animationDelay: '320ms' }}
            >
              <a href="#collection" className="btn-gold">
                مشاهده کالکشن
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#about" className="btn-ghost">
                داستان گالری
              </a>
            </div>
          </div>

          {/* عکس (پر کردن فضای خالی سمت چپ) */}
          <div
            className="mx-auto hidden w-full max-w-md animate-fade-up sm:block lg:col-span-5 lg:max-w-none"
            style={{ animationDelay: '260ms' }}
          >
            <div className="relative">
              <div className="group relative overflow-hidden rounded-[2rem] border border-gold/25 bg-ink-soft shadow-[0_45px_120px_-45px_rgba(0,0,0,0.95)]">
                <ProductImage
                  src="/images/hero-side.jpg"
                  alt="طلا و جواهر دست‌ساز گالری زرین"
                  variant="hero"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                />

                <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
                    <p className="text-[10px] tracking-[0.3em] text-gold">قطعه‌ای از کالکشن</p>
                    <p className="mt-1.5 text-sm text-white">ساخت دست، عیار ۱۸</p>
                  </div>
                  <span className="font-display text-[10px] tracking-[0.3em] text-champagne/40">
                    ZARIN
                  </span>
                </div>
              </div>

              {/* قاب تزئینی طلایی پشت تصویر */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-[2.4rem] border border-gold/15"
              />
            </div>
          </div>
        </div>
      </div>

      {/* نوار اعتماد */}
      <div className="relative border-t border-white/10 bg-ink/40 backdrop-blur-sm sm:mt-4">
        <ul className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-x-reverse sm:divide-white/10 sm:px-8">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 text-xs text-champagne/80 sm:flex-1 sm:justify-center sm:py-1"
            >
              <span className="h-2 w-2 shrink-0 rotate-45 bg-gold/80" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
