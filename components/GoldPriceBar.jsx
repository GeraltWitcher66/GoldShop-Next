import { goldPrices } from '@/data/goldPrices';
import { formatPrice } from '@/lib/format';

export default function GoldPriceBar() {
  return (
    <div className="relative border-b border-gold/15 bg-[#0b0a07]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-5 py-1.5 sm:justify-between sm:px-8">
        <span className="hidden items-center gap-2 text-[10px] text-gold/80 sm:flex">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          نرخ لحظه‌ای طلا
        </span>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] sm:gap-x-5 sm:text-[11px]">
          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="text-champagne/45">مثقال طلا</span>
            <span className="font-medium text-gold">{formatPrice(goldPrices.mesghal)}</span>
            <span className="text-[10px] text-champagne/40">تومان</span>
          </span>

          <span aria-hidden="true" className="h-3 w-px bg-gold/20" />

          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="text-champagne/45">طلای ۱۸ عیار</span>
            <span className="font-medium text-gold">{formatPrice(goldPrices.gram18)}</span>
            <span className="text-[10px] text-champagne/40">تومان</span>
          </span>
        </div>

        <span className="hidden text-[10px] text-champagne/30 lg:inline">
          به‌روزرسانی: {goldPrices.updatedAt}
        </span>
      </div>
    </div>
  );
}
