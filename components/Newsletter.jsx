'use client';

import { useEffect, useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [toastAt, setToastAt] = useState(0);

  useEffect(() => {
    if (!toastAt) return;
    const timer = setTimeout(() => setToastAt(0), 4000);
    return () => clearTimeout(timer);
  }, [toastAt]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setEmail('');
    setToastAt(Date.now());
  }

  return (
    <>
      <div className="mt-8 border-t border-white/10 pt-6">
        <h2 className="text-[11px] tracking-[0.3em] text-gold/80">خبرنامه</h2>
        <p className="mt-3 text-[11px] leading-5 text-champagne/40">
          عضویت در خبرنامه گالری زرین برای اطلاع از کالکشن‌های جدید
        </p>

        <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            ایمیل
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            dir="ltr"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ایمیل شما"
            className="h-9 min-w-0 flex-1 rounded-full border border-gold/30 bg-transparent px-3.5 text-left text-[11px] text-champagne transition placeholder:text-champagne/25 hover:border-gold/45 focus:border-gold/70 focus:bg-gold/[0.04]"
          />
          <button
            type="submit"
            className="h-9 shrink-0 rounded-full bg-gold px-4 text-[11px] font-semibold text-ink transition hover:bg-gold-light active:translate-y-px"
          >
            عضویت
          </button>
        </form>
      </div>

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      >
        {toastAt ? (
          <div
            role="status"
            className="animate-fade-up flex max-w-full items-center gap-2.5 rounded-full border border-gold/30 bg-[#12100b] px-4 py-2.5 text-[11px] text-champagne shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] motion-reduce:animate-none"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            عضویت شما با موفقیت ثبت شد.
          </div>
        ) : null}
      </div>
    </>
  );
}
