import Link from 'next/link';

import Newsletter from './Newsletter';

const MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(
  'تهران خیابان ولیعصر پارک ساعی برج زرین',
).replace(/%20/g, '+')}`;

const QUICK_LINKS = [
  { label: 'خانه', href: '/#home' },
  { label: 'کالکشن', href: '/#collection' },
  { label: 'درباره ما', href: '/#about' },
  { label: 'تماس با ما', href: '/#contact' },
];

const SOCIALS = [
  {
    label: 'اینستاگرام',
    href: 'https://instagram.com',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: 'تلگرام',
    href: 'https://telegram.org',
    icon: (
      <path
        d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0Zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
  {
    label: 'واتساپ',
    href: 'https://wa.me/989121234567',
    icon: (
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
];

const CONTACT_ITEMS = [
  {
    label: 'نشانی',
    value: 'تهران، خیابان ولیعصر، بالاتر از پارک ساعی، برج زرین، طبقه ۳',
  },
  { label: 'تلفن', value: '۰۲۱ - ۸۸۷۷ ۶۶۵۵', href: 'tel:+982188776655' },
  { label: 'همراه / واتساپ', value: '۰۹۱۲ ۱۲۳ ۴۵۶۷', href: 'tel:+989121234567' },
  { label: 'ایمیل', value: 'info@zaringallery.ir', href: 'mailto:info@zaringallery.ir' },
  { label: 'ساعات کاری', value: 'شنبه تا پنجشنبه، ۱۰:۰۰ تا ۲۰:۰۰' },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative scroll-mt-32 overflow-hidden border-t border-white/10 bg-[#08080a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 start-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          {/* برند */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/5 text-gold">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
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
            </div>

            <p className="mt-6 max-w-xs text-xs leading-6 text-champagne/45">
              از سال ۱۳۸۱، ساخت دستِ طلا و جواهر با شناسنامه اصالت. همراه لحظه‌هایی که می‌خواهید
              بمانند.
            </p>

            <div className="mt-7 flex items-center gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-champagne/55 transition hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    aria-hidden="true"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>

            {/* خبرنامه — زیر شبکه‌های اجتماعی، هم‌تراز با ستون‌های فوتر */}
            <Newsletter />
          </div>

          {/* لینک‌های سریع */}
          <div className="lg:col-span-2 lg:border-s lg:border-white/10 lg:ps-4 xl:ps-8">
            <h2 className="text-[11px] tracking-[0.3em] text-gold/80">دسترسی سریع</h2>
            <ul className="mt-6 space-y-3.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-xs text-champagne/55 transition hover:text-gold"
                  >
                    <span className="h-1 w-1 rotate-45 bg-gold/50 transition group-hover:bg-gold" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* تماس */}
          <div className="lg:col-span-3 lg:border-s lg:border-white/10 lg:ps-8">
            <h2 className="text-[11px] tracking-[0.3em] text-gold/80">تماس با ما</h2>
            <dl className="mt-6 space-y-4">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <dt className="text-[10px] tracking-wide text-champagne/35">{item.label}</dt>
                  <dd className="text-xs leading-6 text-champagne/70">
                    {item.href ? (
                      <a href={item.href} className="transition hover:text-gold" dir="ltr">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* نقشه موقعیت — در دسکتاپ ستون سمت چپ و هم‌ارتفاع با ستون تماس */}
          <div className="lg:col-span-4 lg:border-s lg:border-white/10 lg:ps-8">
            <div className="flex h-full flex-col">
              <div
                role="img"
                aria-label="نقشه موقعیت دفتر گالری زرین در تهران، خیابان ولیعصر، پارک ساعی"
                className="relative h-56 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e12] lg:h-auto lg:min-h-0 lg:flex-1"
              >
                <svg
                  viewBox="0 0 640 480"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <rect width="640" height="480" fill="#0b0e12" />

                  {/* بلوک‌های شهری */}
                  <g fill="#12161c">
                    <rect x="24" y="24" width="132" height="96" rx="10" />
                    <rect x="176" y="24" width="120" height="96" rx="10" />
                    <rect x="316" y="24" width="112" height="60" rx="8" />
                    <rect x="448" y="24" width="168" height="126" rx="12" />
                    <rect x="24" y="140" width="72" height="150" rx="10" />
                    <rect x="116" y="140" width="180" height="74" rx="8" />
                    <rect x="316" y="104" width="112" height="110" rx="8" />
                    <rect x="448" y="170" width="70" height="120" rx="8" />
                    <rect x="538" y="170" width="78" height="72" rx="8" />
                    <rect x="24" y="310" width="92" height="146" rx="10" />
                    <rect x="136" y="234" width="160" height="98" rx="8" />
                    <rect x="316" y="234" width="112" height="72" rx="8" />
                    <rect x="448" y="310" width="168" height="68" rx="10" />
                    <rect x="136" y="352" width="160" height="104" rx="8" />
                    <rect x="316" y="326" width="112" height="130" rx="8" />
                    <rect x="448" y="398" width="168" height="58" rx="8" />
                  </g>

                  {/* پارک */}
                  <g fill="#0f1a14">
                    <rect x="448" y="170" width="70" height="120" rx="10" />
                    <rect x="538" y="170" width="78" height="72" rx="10" />
                  </g>

                  {/* رودخانه */}
                  <path
                    d="M-20 386C86 366 142 402 224 380s130-58 226-44 138 44 214 22"
                    stroke="#0c1a21"
                    strokeWidth="30"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* خیابان‌ها */}
                  <g stroke="#1b212a" strokeLinecap="round">
                    <path d="M0 128H640" strokeWidth="16" />
                    <path d="M0 226H640" strokeWidth="10" />
                    <path d="M0 300H640" strokeWidth="18" />
                    <path d="M0 472H640" strokeWidth="14" />
                    <path d="M108 0V480" strokeWidth="12" />
                    <path d="M304 0V480" strokeWidth="16" />
                    <path d="M436 0V480" strokeWidth="10" />
                    <path d="M528 0V480" strokeWidth="20" />
                  </g>
                  <g stroke="#242b35" strokeWidth="1.5" opacity="0.7">
                    <path d="M0 128H640" />
                    <path d="M0 300H640" />
                    <path d="M304 0V480" />
                    <path d="M528 0V480" />
                  </g>

                  {/* مسیر طلایی تا دفتر */}
                  <path
                    d="M596 444 540 402 500 344 430 320 366 276 330 246"
                    stroke="#c9a227"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.16"
                  />
                  <path
                    d="M596 444 540 402 500 344 430 320 366 276 330 246"
                    stroke="#d7b64a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="8 8"
                    fill="none"
                  />

                  {/* پین دفتر */}
                  <circle cx="330" cy="246" r="30" fill="#c9a227" opacity="0.12" />
                  <path
                    d="M330 218c-12 0-22 10-22 22 0 17 22 38 22 38s22-21 22-38c0-12-10-22-22-22Z"
                    fill="#c9a227"
                  />
                  <circle cx="330" cy="240" r="8" fill="#0b0e12" />
                </svg>

                {/* لایهٔ تاریک هماهنگ با تم سایت */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30"
                />

                <span className="absolute start-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink/70 px-3 py-1.5 text-[10px] text-champagne/70 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  دفتر مرکزی
                </span>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 px-4 py-2.5 text-[11px] tracking-wide text-gold transition hover:border-gold/60 hover:bg-gold/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="m9 20 6-4 6 4V6l-6-4-6 4-6-4v14l6 4Z" strokeLinejoin="round" />
                  <path d="M9 2v14M15 6v14" />
                </svg>
                مسیریابی در گوگل مپ
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-champagne/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© ۱۴۰۵ گالری زرین — تمامی حقوق محفوظ است.</p>
          <p>ساخته‌شده با دقت در تهران</p>
        </div>
      </div>
    </footer>
  );
}
