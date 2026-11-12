const ITEMS = [
  {
    title: 'تضمین اصالت کالا',
    description: 'هر قطعه با شناسنامه اصالت و عیار رسمی عرضه می‌شود.',
    icon: (
      <>
        <path d="M12 3 5 6v6c0 4.2 2.9 7.4 7 9 4.1-1.6 7-4.8 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: 'ارسال بیمه‌شده',
    description: 'بسته‌بندی ایمن و ارسال بیمه‌شده به سراسر کشور.',
    icon: (
      <>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="17.5" cy="18" r="1.8" />
      </>
    ),
  },
  {
    title: 'فاکتور رسمی',
    description: 'فاکتور رسمی و قابل استعلام همراه هر سفارش.',
    icon: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4" />
        <path d="M10 12h5M10 16h5" />
      </>
    ),
  },
];

export default function TrustSection() {
  return (
    <section id="trust" className="border-t border-white/5 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/25 bg-gold/5 text-gold">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </span>
              <div>
                <h3 className="text-sm font-medium text-champagne">{item.title}</h3>
                <p className="mt-1 text-[11px] leading-6 text-champagne/45">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
