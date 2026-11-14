import Link from 'next/link';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { absoluteUrl } from '@/lib/site';

export const metadata = {
  title: 'راهنمای خرید، سایز و نگهداری | گالری زرین',
  description:
    'راهنمای انتخاب سایز انگشتر و دستبند، طول زنجیر، نگهداری طلا، ارسال بیمه‌شده و شرایط مرجوعی در گالری زرین.',
  alternates: { canonical: absoluteUrl('/guides/') },
};

const RING_SIZES = [
  { size: '۵', circumference: '۴۹', diameter: '۱۵٫۶' },
  { size: '۶', circumference: '۵۰', diameter: '۱۵٫۹' },
  { size: '۷', circumference: '۵۲', diameter: '۱۶٫۵' },
  { size: '۸', circumference: '۵۳', diameter: '۱۶٫۹' },
  { size: '۹', circumference: '۵۵', diameter: '۱۷٫۵' },
  { size: '۱۰', circumference: '۵۶', diameter: '۱۷٫۹' },
  { size: '۱۱', circumference: '۵۸', diameter: '۱۸٫۵' },
  { size: '۱۲', circumference: '۵۹', diameter: '۱۸٫۸' },
];

const NAV_ITEMS = [
  { href: '#ring-size', label: 'سایز انگشتر' },
  { href: '#bracelet-size', label: 'سایز دستبند' },
  { href: '#necklace-size', label: 'طول زنجیر' },
  { href: '#care', label: 'نگهداری' },
  { href: '#shipping', label: 'ارسال' },
  { href: '#returns', label: 'مرجوعی' },
  { href: '#faq', label: 'پرسش‌ها' },
];

const CARE_TIPS = [
  'هنگام استفاده از عطر، کرم و مواد شوینده، جواهرات را کنار بگذارید.',
  'برای ورزش، حمام و شنا قطعه‌های طلا و سنگ‌دار را جدا کنید.',
  'هر قطعه را جداگانه در جعبه یا کیسهٔ پارچه‌ای نگه دارید تا خط نیفتد.',
  'برای تمیزکردن از پارچهٔ نرم و خشک استفاده کنید؛ برس سخت و مواد شیمیایی ممنوع.',
  'سالانه برای بررسی قفل، نگین و آبکاری به گالری مراجعه کنید.',
];

const FAQS = [
  {
    question: 'آیا امکان تغییر سایز انگشتر وجود دارد؟',
    answer:
      'بله. تغییر سایز برای بیشتر انگشترهای بدون سنگ یا با سنگ کوچک امکان‌پذیر است. پیش از سفارش با ما هماهنگ کنید تا محدودیت‌های مدل بررسی شود.',
  },
  {
    question: 'سفارش ساخت چه مدت زمان می‌برد؟',
    answer:
      'قطعه‌های سفارش ساخت بین ۷ تا ۱۴ روز کاری آماده می‌شوند. زمان دقیق در صفحهٔ هر محصول ذکر شده است.',
  },
  {
    question: 'هزینهٔ ارسال چگونه محاسبه می‌شود؟',
    answer:
      'ارسال استاندارد بیمه‌شده رایگان است. ارسال سریع ۱ تا ۲ روز کاری هزینهٔ جداگانه دارد و در صفحهٔ تسویه نمایش داده می‌شود.',
  },
  {
    question: 'سنگ‌ها دارای شناسنامه هستند؟',
    answer:
      'سنگ‌های طبیعی همراه شناسنامهٔ اصالت و مشخصات عرضه می‌شوند. برای سنگ‌های خاص، گزارش آزمایشگاه نیز قابل ارائه است.',
  },
];

export default function GuidesPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="relative pb-24 pt-32">
        <div
          aria-hidden="true"
          className="luxe-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-2 text-[11px] text-champagne/40">
            <Link href="/" className="transition hover:text-gold">
              خانه
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-champagne/70">راهنمای خرید</span>
          </nav>

          <p className="mt-10 flex items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
            <span className="h-px w-10 bg-gold/50" />
            پیش از انتخاب
          </p>
          <h1 className="mt-5 text-4xl font-light leading-tight text-champagne sm:text-5xl">
            راهنمای خرید و نگهداری
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-champagne/55">
            اندازهٔ درست، انتخاب آگاهانه و نگهداری اصولی؛ سه چیزی که یک قطعه را برای سال‌ها
            همراه شما نگه می‌دارد.
          </p>

          <nav aria-label="فهرست راهنما" className="mt-8 flex flex-wrap gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 px-3.5 py-2 text-[11px] text-champagne/55 transition hover:border-gold/40 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <section
              id="ring-size"
              className="scroll-mt-32 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7"
            >
              <h2 className="text-lg font-light text-champagne">سایز انگشتر و حلقه</h2>
              <p className="mt-3 text-xs leading-7 text-champagne/50">
                دور انگشت را با نوار کاغذی یا نخ اندازه بگیرید و روی میلی‌متر علامت بزنید. اندازهٔ
                حاصل را با ستون «دور انگشت» مقایسه کنید. اگر بین دو اندازه هستید، اندازهٔ بزرگ‌تر
                را انتخاب کنید.
              </p>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[22rem] text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-start text-[10px] text-champagne/40">
                      <th className="py-2.5 text-start font-normal">سایز</th>
                      <th className="py-2.5 text-start font-normal">دور انگشت (میلی‌متر)</th>
                      <th className="py-2.5 text-start font-normal">قطر داخلی (میلی‌متر)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RING_SIZES.map((row) => (
                      <tr key={row.size} className="border-b border-white/5 last:border-0">
                        <td className="py-2.5 text-gold">{row.size}</td>
                        <td className="py-2.5 text-champagne/65">{row.circumference}</td>
                        <td className="py-2.5 text-champagne/45">{row.diameter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="space-y-6">
              <section
                id="bracelet-size"
                className="scroll-mt-32 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7"
              >
                <h2 className="text-lg font-light text-champagne">اندازهٔ دستبند</h2>
                <p className="mt-3 text-xs leading-7 text-champagne/50">
                  دور مچ را دقیقاً اندازه بگیرید. برای دستبندهای کارتیه و فرم‌ثابت، اندازهٔ مچ
                  معیار است؛ برای مدل‌های آویز، حدود ۱ تا ۲ سانتی‌متر بلندتر انتخاب کنید.
                </p>
                <ul className="mt-4 grid gap-2 text-[11px] text-champagne/60 sm:grid-cols-2">
                  <li>مچ ۱۵–۱۶ سانتی‌متر → سایز ۱۶</li>
                  <li>مچ ۱۷–۱۸ سانتی‌متر → سایز ۱۸</li>
                  <li>مچ ۱۹ سانتی‌متر → سایز ۱۹</li>
                  <li>بین دو اندازه → اندازهٔ بزرگ‌تر</li>
                </ul>
              </section>

              <section
                id="necklace-size"
                className="scroll-mt-32 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7"
              >
                <h2 className="text-lg font-light text-champagne">طول زنجیر و آویز</h2>
                <ul className="mt-3 space-y-2 text-[11px] leading-6 text-champagne/55">
                  <li>
                    <span className="text-gold">۴۰ سانتی‌متر:</span> چوکر؛ نزدیک به گلو و مناسب
                    استایل مینیمال.
                  </li>
                  <li>
                    <span className="text-gold">۴۵ سانتی‌متر:</span> استاندارد و روزمره؛ روی استخوان
                    جناغ می‌نشیند.
                  </li>
                  <li>
                    <span className="text-gold">۵۰ سانتی‌متر:</span> بلندتر؛ مناسب آویز و استفاده
                    روی لباس.
                  </li>
                </ul>
              </section>
            </div>
          </div>

          <section
            id="care"
            className="mt-6 scroll-mt-32 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7"
          >
            <h2 className="text-lg font-light text-champagne">نگهداری طلا و سنگ‌ها</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {CARE_TIPS.map((tip) => (
                <p key={tip} className="flex items-start gap-2.5 text-[11px] leading-6 text-champagne/55">
                  <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold/70" aria-hidden="true" />
                  {tip}
                </p>
              ))}
            </div>
          </section>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <section
              id="shipping"
              className="scroll-mt-32 rounded-2xl border border-gold/20 bg-gold/[0.035] p-6 sm:p-7"
            >
              <h2 className="text-lg font-light text-champagne">ارسال و بسته‌بندی</h2>
              <ul className="mt-4 space-y-3 text-[11px] leading-6 text-champagne/55">
                <li>ارسال بیمه‌شده به سراسر ایران؛ بسته‌بندی استاندارد رایگان است.</li>
                <li>ارسال استاندارد ۲ تا ۴ روز کاری و ارسال سریع ۱ تا ۲ روز کاری.</li>
                <li>بسته‌بندی هدیه و کارت دست‌نویس در صورت انتخاب، بدون هزینه اضافه است.</li>
                <li>شمارهٔ پیگیری پس از تحویل بسته به شرکت ارسال، برای شما ثبت می‌شود.</li>
              </ul>
            </section>

            <section
              id="returns"
              className="scroll-mt-32 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7"
            >
              <h2 className="text-lg font-light text-champagne">شرایط مرجوعی</h2>
              <ul className="mt-4 space-y-3 text-[11px] leading-6 text-champagne/55">
                <li>امکان بازگشت تا ۷ روز پس از تحویل، در صورت نگه‌داشتن بسته‌بندی و شناسنامه.</li>
                <li>قطعه باید استفاده نشده و بدون خط، تغییر سایز یا حکاکی باشد.</li>
                <li>سفارش‌های ساخت اختصاصی و حکاکی‌شده، مطابق قوانین قابل مرجوع نیستند.</li>
                <li>هزینهٔ بازگشت در صورت ایراد کالا با گالری است.</li>
              </ul>
            </section>
          </div>

          <section id="faq" className="mt-14 scroll-mt-32">
            <p className="flex items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
              <span className="h-px w-10 bg-gold/50" />
              پرسش‌های پرتکرار
            </p>
            <h2 className="mt-5 text-2xl font-light text-champagne sm:text-3xl">سوالی مانده؟</h2>

            <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
              {FAQS.map((item) => (
                <details key={item.question} className="group px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs text-champagne/75">
                    {item.question}
                    <span className="text-gold transition group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pe-6 text-[11px] leading-7 text-champagne/45">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 p-6">
            <p className="text-sm text-champagne/60">برای انتخاب دقیق‌تر، با مشاور خرید گفتگو کنید.</p>
            <Link href="/#contact" className="btn-gold">
              تماس با گالری
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
