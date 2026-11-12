const STATS = [
  { value: '۲۴', label: 'سال تجربه در بازار طلا' },
  { value: '۱۸ / ۲۱', label: 'عیارهای رسمی و استاندارد' },
  { value: '۱۵ هزار', label: 'مشتری در سراسر ایران' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-32 overflow-hidden border-t border-white/5 py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 end-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
            <span className="h-px w-10 bg-gold/50" />
            درباره ما
          </p>
          <h2 className="mt-6 text-3xl font-light leading-snug text-champagne sm:text-4xl">
            زرین، از دلِ سنت
            <span className="gold-text"> برای امروز</span>
          </h2>
          <p className="mt-7 text-sm leading-8 text-champagne/60 sm:text-[15px]">
            گالری زرین کار خود را از سال ۱۳۸۱ در کارگاهی کوچک در تهران آغاز کرد؛ با این باور که
            جواهر، پیش از آن‌که کالا باشد، یادگار است. هر قطعه ابتدا روی کاغذ طراحی می‌شود، سپس
            دستِ استادکار آن را شکل می‌دهد و در پایان با شناسنامه اصالت و عیار رسمی به شما سپرده
            می‌شود.
          </p>
          <p className="mt-4 text-sm leading-8 text-champagne/45">
            از سرویس‌های عروس تا تک‌قطعه‌های روزمره، تمام ساخته‌ها در کارگاه خودمان و با طلای
            بازیافتی و سنگ‌های دارای منشأ مشخص تولید می‌شوند.
          </p>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {['طراحی اختصاصی', 'سنگ‌شناسی تخصصی', 'ضمانت مادام‌العمر'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 border-b border-gold/30 pb-1.5 text-[11px] text-champagne/65"
              >
                <span className="h-1 w-1 rotate-45 bg-gold/70" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-gold/15 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(201,162,39,0.12),transparent_55%)] p-8 sm:p-10">
            <p className="font-display text-6xl leading-none text-gold/25">“</p>
            <p className="-mt-4 text-sm leading-8 text-champagne/70">
              طلای خوب، طلایی است که سال‌ها بعد هم وقتی نگاهش می‌کنی، همان حس روز اول را برگرداند.
            </p>
            <p className="mt-4 text-[11px] tracking-[0.25em] text-gold/70">— استاد کارگاه زرین</p>

            <div className="mt-9 space-y-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="hairline mb-4" />
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-2xl font-light text-champagne">{stat.value}</span>
                    <span className="text-[11px] text-champagne/45">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
