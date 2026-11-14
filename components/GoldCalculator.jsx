'use client';

import { useMemo, useState } from 'react';

import { goldPrices } from '@/data/goldPrices';
import { formatPrice, toFaDigits } from '@/lib/format';

const INPUT_CLASS =
  'mt-2 h-11 w-full rounded-xl border border-white/10 bg-ink/50 px-3.5 text-sm text-champagne outline-none transition [color-scheme:dark] focus:border-gold/60';

function toNumber(value, fallback = 0) {
  const parsed = Number(String(value).replace(/[^\d.]/g, ''));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default function GoldCalculator() {
  const [weight, setWeight] = useState('5');
  const [karat, setKarat] = useState('18');
  const [wage, setWage] = useState('12');
  const [profit, setProfit] = useState('7');
  const [tax, setTax] = useState(true);

  const result = useMemo(() => {
    const grams = Math.max(0, toNumber(weight));
    const karatValue = Number(karat);
    const wagePercent = Math.min(100, Math.max(0, toNumber(wage)));
    const profitPercent = Math.min(100, Math.max(0, toNumber(profit)));

    const gramPrice = Math.round(goldPrices.gram18 * (karatValue / 18));
    const goldValue = Math.round(grams * gramPrice);
    const wageValue = Math.round(goldValue * (wagePercent / 100));
    const profitValue = Math.round((goldValue + wageValue) * (profitPercent / 100));
    const subtotal = goldValue + wageValue + profitValue;
    const taxValue = tax ? Math.round(subtotal * 0.1) : 0;

    return {
      grams,
      karatValue,
      gramPrice,
      goldValue,
      wageValue,
      profitValue,
      subtotal,
      taxValue,
      total: subtotal + taxValue,
    };
  }, [weight, karat, wage, profit, tax]);

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-12">
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-7 lg:col-span-6">
        <h2 className="text-sm font-medium text-champagne">مشخصات قطعه</h2>
        <p className="mt-2 text-[11px] leading-6 text-champagne/40">
          نرخ پایهٔ دمو: گرم ۱۸ عیار {formatPrice(goldPrices.gram18)} تومان · به‌روزرسانی{' '}
          {goldPrices.updatedAt}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="gold-weight" className="text-[11px] text-champagne/50">
              وزن (گرم)
            </label>
            <input
              id="gold-weight"
              type="number"
              min="0"
              step="0.1"
              inputMode="decimal"
              dir="ltr"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="gold-karat" className="text-[11px] text-champagne/50">
              عیار
            </label>
            <select
              id="gold-karat"
              value={karat}
              onChange={(event) => setKarat(event.target.value)}
              className={INPUT_CLASS}
            >
              <option value="18">۱۸ عیار</option>
              <option value="21">۲۱ عیار</option>
              <option value="24">۲۴ عیار</option>
            </select>
          </div>

          <div>
            <label htmlFor="gold-wage" className="text-[11px] text-champagne/50">
              اجرت ساخت (٪)
            </label>
            <input
              id="gold-wage"
              type="number"
              min="0"
              max="100"
              inputMode="decimal"
              dir="ltr"
              value={wage}
              onChange={(event) => setWage(event.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="gold-profit" className="text-[11px] text-champagne/50">
              سود فروشنده (٪)
            </label>
            <input
              id="gold-profit"
              type="number"
              min="0"
              max="100"
              inputMode="decimal"
              dir="ltr"
              value={profit}
              onChange={(event) => setProfit(event.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 p-4 text-xs text-champagne/65">
          <input
            type="checkbox"
            checked={tax}
            onChange={(event) => setTax(event.target.checked)}
            className="h-4 w-4 accent-[#c9a227]"
          />
          احتساب مالیات بر ارزش افزوده (۱۰٪)
        </label>

        <p className="mt-4 text-[10px] leading-6 text-champagne/30">
          این محاسبه‌گر تقریبی و آموزشی است؛ قیمت نهایی پس از بررسی مدل، سنگ و اجرت دقیق اعلام
          می‌شود.
        </p>
      </div>

      <div className="rounded-2xl border border-gold/20 bg-gold/[0.035] p-5 sm:p-7 lg:col-span-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium text-champagne">برآورد قیمت</h2>
            <p className="mt-2 text-[11px] text-champagne/40">
              {toFaDigits(result.grams)} گرم · عیار {toFaDigits(result.karatValue)}
            </p>
          </div>
          <span className="rounded-full border border-gold/25 px-3 py-1 text-[10px] text-gold">
            {formatPrice(result.gramPrice)} تومان/گرم
          </span>
        </div>

        <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-champagne/45">ارزش طلا</dt>
            <dd className="text-champagne/75">{formatPrice(result.goldValue)} تومان</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-champagne/45">اجرت ساخت</dt>
            <dd className="text-champagne/75">{formatPrice(result.wageValue)} تومان</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-champagne/45">سود فروشنده</dt>
            <dd className="text-champagne/75">{formatPrice(result.profitValue)} تومان</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-champagne/45">مالیات بر ارزش افزوده</dt>
            <dd className="text-champagne/75">{formatPrice(result.taxValue)} تومان</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-gold/20 pt-4">
            <dt className="text-sm text-champagne/65">جمع تقریبی</dt>
            <dd className="text-xl font-medium text-gold">
              {formatPrice(result.total)}
              <span className="ms-1 text-[10px] font-normal text-champagne/40">تومان</span>
            </dd>
          </div>
        </dl>

        <div className="mt-6 rounded-xl border border-white/10 bg-ink/30 p-4 text-[10px] leading-6 text-champagne/40">
          قیمت طلا روزانه تغییر می‌کند. برای استعلام نهایی و انتخاب قطعه، با مشاور گالری تماس
          بگیرید.
        </div>
      </div>
    </div>
  );
}
