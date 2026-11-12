'use client';

import { useCart } from '@/context/CartContext';

export default function CartToast() {
  const { toast, dismissToast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed inset-x-4 bottom-6 z-[90] flex justify-center sm:inset-x-auto sm:end-6">
      <div
        role="status"
        aria-live="polite"
        className="flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-2xl border border-gold/30 bg-ink-soft/95 p-4 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.9)] backdrop-blur-xl"
      >
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <p className="flex-1 text-xs leading-6 text-champagne/85">{toast.text}</p>

        <button
          type="button"
          onClick={dismissToast}
          aria-label="بستن پیام"
          className="text-champagne/30 transition hover:text-champagne"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
