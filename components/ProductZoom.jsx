'use client';

import { useEffect, useRef, useState } from 'react';

import ProductImage from '@/components/ProductImage';
import { asset } from '@/lib/path';

export default function ProductZoom({ src, alt }) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  function close() {
    setOpen(false);
    setZoomed(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full text-start"
        aria-label={`بزرگ‌نمایی تصویر ${alt}`}
      >
        <ProductImage src={src} alt={alt} variant="detail" />
        <span className="pointer-events-none absolute bottom-4 start-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/75 px-3 py-2 text-[10px] text-champagne/75 backdrop-blur transition group-hover:border-gold/50 group-hover:text-gold">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 4.5 4.5M10.5 7.5v6M7.5 10.5h6" strokeLinecap="round" />
          </svg>
          بزرگ‌نمایی تصویر
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-8">
          <button
            type="button"
            tabIndex={-1}
            onClick={close}
            aria-label="بستن تصویر بزرگ"
            className="absolute inset-0 h-full w-full cursor-default bg-black/90 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={`تصویر بزرگ ${alt}`}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-gold/25 bg-ink-soft shadow-[0_45px_120px_-35px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
              <p className="text-xs text-champagne/70">{alt}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="بستن"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-champagne/60 transition hover:border-gold/50 hover:text-gold"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[#0b0b0d] p-3">
              <button
                type="button"
                onClick={() => setZoomed((value) => !value)}
                aria-label={zoomed ? 'کوچک‌نمایی تصویر' : 'بزرگ‌نمایی بیشتر تصویر'}
                className={`cursor-zoom-in transition-transform duration-300 ${
                  zoomed ? 'scale-[1.7] cursor-zoom-out' : 'scale-100'
                }`}
              >
                <img
                  src={asset(src)}
                  alt={alt}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                />
              </button>
            </div>

            <p className="border-t border-white/10 px-4 py-2.5 text-center text-[10px] text-champagne/35">
              برای بزرگ‌تر دیدن روی تصویر کلیک کنید · برای بستن Esc را بزنید
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
