'use client';

import { useRef } from 'react';

import { toFaDigits } from '@/lib/format';

function Stars({ rating }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`امتیاز ${toFaDigits(rating)} از ۵`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 fill-current ${
            index < rating ? 'text-gold' : 'text-champagne/20'
          }`}
          aria-hidden="true"
        >
          <path d="m12 3 2.6 5.7 6.2.7-4.6 4.3 1.2 6.1L12 16.9 6.6 19.8l1.2-6.1L3.2 9.4l6.2-.7L12 3Z" />
        </svg>
      ))}
    </div>
  );
}

function ArrowButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-controls="product-reviews-track"
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-champagne/60 transition hover:border-gold/50 hover:bg-gold/5 hover:text-gold"
    >
      {children}
    </button>
  );
}

/**
 * نظرات مخصوص هر محصول — اسلایدر افقی با snap-center.
 * reviews از data/products.js می‌آید.
 */
export default function ProductReviews({ reviews = [] }) {
  const trackRef = useRef(null);
  const count = reviews.length;
  const average =
    count > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / count : 0;
  const averageLabel = Number.isInteger(average)
    ? toFaDigits(average)
    : toFaDigits(average.toFixed(1)).replace('.', '٫');

  const scrollReviews = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector('figure');
    const step = card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
    const isRtl = getComputedStyle(track).direction === 'rtl';

    track.scrollBy({
      left: (isRtl ? -1 : 1) * direction * step,
      behavior: 'smooth',
    });
  };

  return (
    <section className="mt-20 border-t border-white/5 pt-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-3 text-[11px] tracking-[0.35em] text-gold/80">
            <span className="h-px w-10 bg-gold/50" />
            تجربه خریداران
          </p>
          <h2 className="mt-5 text-2xl font-light text-champagne sm:text-3xl">نظرات مشتریان</h2>
        </div>

        {count > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex w-fit items-center gap-3 rounded-full border border-gold/20 bg-gold/[0.05] px-4 py-2">
              <Stars rating={Math.round(average)} />
              <span className="text-[11px] text-champagne/60">
                میانگین {averageLabel} از ۵ · {toFaDigits(count)} نظر
              </span>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <ArrowButton label="نظرات قبلی" onClick={() => scrollReviews(-1)}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ArrowButton>
              <ArrowButton label="نظرات بعدی" onClick={() => scrollReviews(1)}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ArrowButton>
            </div>
          </div>
        )}
      </div>

      {count === 0 ? (
        <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-xs leading-6 text-champagne/50">
          هنوز نظری برای این محصول ثبت نشده است. اولین تجربه‌تان را با ما در میان بگذارید.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden">
          <div
            id="product-reviews-track"
            ref={trackRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 scroll-smooth overflow-x-auto pb-3 pt-1"
            role="region"
            aria-label="نظرات مشتریان این محصول"
            tabIndex={0}
          >
            {reviews.map((review, index) => (
              <figure
                key={`${review.name}-${index}`}
                className="relative flex w-[86%] shrink-0 snap-center flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-500 hover:border-gold/30 hover:bg-white/[0.06] sm:w-[56%] md:w-[calc((100%-2.5rem)/3)]"
              >
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              />

              <div className="flex items-start justify-between gap-4">
                <Stars rating={review.rating} />
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none text-gold/20"
                >
                  ”
                </span>
              </div>

              <blockquote className="mt-5 flex-1 text-sm leading-8 text-champagne/70">
                «{review.text}»
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 text-sm text-gold"
                >
                  {review.name.charAt(0)}
                </span>
                <div>
                  <p className="text-xs text-champagne">{review.name}</p>
                  <p className="mt-1 text-[10px] text-champagne/35">خرید تأییدشده</p>
                </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-5 py-3 text-xs text-gold transition hover:border-gold/60 hover:bg-gold/10 sm:w-auto sm:py-2.5"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
        ثبت نظر جدید
      </button>
    </section>
  );
}
