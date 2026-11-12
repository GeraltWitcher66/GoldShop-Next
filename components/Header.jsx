'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import GoldPriceBar from '@/components/GoldPriceBar';
import { useCart } from '@/context/CartContext';
import { toFaDigits } from '@/lib/format';

const NAV_LINKS = [
  { label: 'خانه', href: '/#home' },
  { label: 'کالکشن', href: '/#collection' },
  { label: 'درباره ما', href: '/#about' },
  { label: 'تماس با ما', href: '/#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <GoldPriceBar />

      <div
        className={`transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-gold/15 py-2.5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.95)]'
            : 'border-b border-gold/15 bg-gradient-to-b from-ink/90 via-ink/35 to-transparent py-4'
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:px-8">
          {/* لوگو: چسبیده به راست */}
          <Link
            href="/"
            className="group col-start-1 flex items-center gap-3 justify-self-start"
            onClick={() => setMenuOpen(false)}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/5 text-gold transition group-hover:border-gold/80">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <path d="M12 2.8 6.4 8.2 12 21.2l5.6-13L12 2.8Z" strokeLinejoin="round" />
                <path d="M6.4 8.2h11.2" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-medium tracking-wide text-champagne">گالری زرین</span>
              <span className="mt-1.5 font-display text-[9px] uppercase tracking-[0.42em] text-gold/70">
                Zarin Gallery
              </span>
            </span>
          </Link>

          {/* منوی دسکتاپ */}
          <nav className="col-start-2 hidden items-center gap-9 justify-self-center md:flex" aria-label="منوی اصلی">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-[13px] tracking-wide text-champagne/70 transition hover:text-champagne"
              >
                {link.label}
                <span className="absolute -bottom-1.5 start-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* سبد خرید + منوی موبایل: چسبیده به چپ */}
          <div className="col-start-3 flex items-center gap-2 justify-self-end">
            <Link
              href="/login"
              aria-label="ورود یا ثبت‌نام"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-champagne/70 transition hover:border-gold/50 hover:text-gold"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c.7-3.6 3.5-5.6 7-5.6s6.3 2 7 5.6" strokeLinecap="round" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`سبد خرید (${toFaDigits(count)} قطعه)`}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 text-champagne/70 transition hover:border-gold/50 hover:text-gold"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
                <path d="M6.2 8h11.6l-1 12.2H7.2L6.2 8Z" strokeLinejoin="round" />
                <path d="M9.2 8V6.6a2.8 2.8 0 0 1 5.6 0V8" strokeLinecap="round" />
              </svg>
              <span
                className={`absolute -end-1 -top-1 grid h-4 min-w-[1rem] place-items-center rounded-full px-1 text-[9px] font-bold leading-none ${
                  count > 0
                    ? 'bg-gold text-ink'
                    : 'border border-white/15 bg-ink-soft text-champagne/50'
                }`}
              >
                {toFaDigits(count)}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-champagne/70 transition hover:border-gold/50 hover:text-gold md:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* منوی موبایل */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-5 mb-3 mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-ink-soft/95 p-3 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm text-champagne/75 transition hover:bg-white/5 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
