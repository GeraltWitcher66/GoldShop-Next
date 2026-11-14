'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import ProductImage from '@/components/ProductImage';
import { useCart } from '@/context/CartContext';
import { formatPrice, toFaDigits } from '@/lib/format';

const ORDERS_KEY = 'zarin-orders-v1';

const SHIPPING_OPTIONS = [
  { id: 'standard', label: 'ارسال بیمه‌شده', detail: '۲ تا ۴ روز کاری', price: 0 },
  { id: 'express', label: 'ارسال سریع', detail: '۱ تا ۲ روز کاری', price: 350000 },
];

const PAYMENT_OPTIONS = [
  { id: 'online', label: 'پرداخت آنلاین', detail: 'درگاه پرداخت دمو' },
  { id: 'card', label: 'کارت به کارت', detail: 'هماهنگی تلفنی پس از ثبت' },
];

const PROVINCES = [
  'تهران',
  'البرز',
  'اصفهان',
  'خراسان رضوی',
  'فارس',
  'آذربایجان شرقی',
  'خوزستان',
  'گیلان',
  'مازندران',
  'سایر استان‌ها',
];

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  province: 'تهران',
  city: '',
  address: '',
  postalCode: '',
  shipping: 'standard',
  payment: 'online',
  giftWrap: false,
  giftNote: '',
  engraving: '',
};

const INPUT_CLASS =
  'mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[0.02] px-3.5 text-sm text-champagne transition placeholder:text-champagne/25 hover:border-white/20 focus:border-gold/50 focus:bg-gold/[0.03] focus:outline-none';

function FieldError({ children }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-1.5 text-[10px] text-[#e7b9a3]">
      {children}
    </p>
  );
}

function withErrorClass(base, hasError) {
  return `${base} ${hasError ? 'border-[#e7b9a3]/50' : ''}`;
}

export default function CheckoutForm() {
  const { items, total, clearCart, isHydrated } = useCart();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const shipping = useMemo(
    () => SHIPPING_OPTIONS.find((option) => option.id === form.shipping) ?? SHIPPING_OPTIONS[0],
    [form.shipping]
  );
  const payable = total + shipping.price;

  useEffect(() => {
    if (!success) return;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth';
    window.scrollTo({ top: 0, behavior });
  }, [success]);

  function update(key, value) {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  function handlePhone(value) {
    update('phone', value.replace(/\D/g, '').slice(0, 11));
  }

  function handlePostalCode(value) {
    update('postalCode', value.replace(/\D/g, '').slice(0, 10));
  }

  function validate() {
    const next = {};

    if (form.fullName.trim().length < 3) next.fullName = 'نام و نام خانوادگی را کامل وارد کنید.';
    if (!/^09\d{9}$/.test(form.phone)) next.phone = 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.';
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      next.email = 'ایمیل واردشده معتبر نیست.';
    }
    if (!form.city.trim()) next.city = 'شهر را وارد کنید.';
    if (form.address.trim().length < 10) next.address = 'نشانی را کامل‌تر وارد کنید.';
    if (!/^\d{10}$/.test(form.postalCode)) next.postalCode = 'کد پستی باید ۱۰ رقم باشد.';

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    const code = `ZG-${Date.now().toString().slice(-8)}`;
    const order = {
      code,
      createdAt: new Date().toISOString(),
      items: items.map((item) => ({ ...item })),
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone,
        email: form.email.trim(),
        province: form.province,
        city: form.city.trim(),
        address: form.address.trim(),
        postalCode: form.postalCode,
      },
      shipping: {
        id: shipping.id,
        label: shipping.label,
        price: shipping.price,
      },
      payment: PAYMENT_OPTIONS.find((option) => option.id === form.payment)?.label ?? form.payment,
      gift: {
        wrap: form.giftWrap,
        note: form.giftNote.trim(),
        engraving: form.engraving.trim(),
      },
      totals: {
        subtotal: total,
        shipping: shipping.price,
        payable,
      },
    };

    try {
      const raw = window.localStorage.getItem(ORDERS_KEY);
      const previous = raw ? JSON.parse(raw) : [];
      const orders = Array.isArray(previous) ? previous : [];
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders].slice(0, 20)));
    } catch {
      // ذخیرهٔ محلی ممکن نیست؛ تأییدیه فقط در همین صفحه نمایش داده می‌شود.
    }

    clearCart();
    setSuccess(order);
  }

  if (!isHydrated) {
    return (
      <div className="mt-12 h-72 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />
    );
  }

  if (items.length === 0 && !success) {
    return (
      <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">
        <p className="text-sm text-champagne/60">سبد خرید شما خالی است.</p>
        <Link href="/collections/" className="mt-4 inline-flex text-xs text-gold transition hover:text-gold-light">
          مشاهدهٔ کالکشن
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mt-12 max-w-2xl">
        <div className="rounded-2xl border border-gold/25 bg-gold/[0.04] p-6 sm:p-8">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h2 className="mt-5 text-2xl font-light text-champagne">سفارش شما ثبت شد</h2>
          <p className="mt-3 text-sm leading-7 text-champagne/55">
            این نسخه دموست؛ هیچ پرداخت یا ارسال واقعی انجام نمی‌شود. اطلاعات سفارش برای
            نمایش در همین مرورگر ذخیره شد.
          </p>

          <dl className="mt-6 grid gap-4 border-t border-white/10 pt-6 text-xs sm:grid-cols-2">
            <div>
              <dt className="text-champagne/35">شمارهٔ پیگیری</dt>
              <dd className="mt-1.5 font-medium text-gold" dir="ltr">
                {success.code}
              </dd>
            </div>
            <div>
              <dt className="text-champagne/35">مبلغ قابل پرداخت</dt>
              <dd className="mt-1.5 text-champagne/85">
                {formatPrice(success.totals.payable)} تومان
              </dd>
            </div>
            <div>
              <dt className="text-champagne/35">گیرنده</dt>
              <dd className="mt-1.5 leading-6 text-champagne/70">
                {success.customer.fullName} · {toFaDigits(success.customer.phone)}
              </dd>
            </div>
            <div>
              <dt className="text-champagne/35">ارسال</dt>
              <dd className="mt-1.5 leading-6 text-champagne/70">
                {success.shipping.label} — {success.customer.province}، {success.customer.city}
              </dd>
            </div>
          </dl>

          {success.gift.wrap || success.gift.note || success.gift.engraving ? (
            <div className="mt-5 rounded-xl border border-white/10 p-4 text-[11px] leading-6 text-champagne/55">
              {success.gift.wrap ? <p>بسته‌بندی هدیه انتخاب شده است.</p> : null}
              {success.gift.note ? <p>یادداشت هدیه: {success.gift.note}</p> : null}
              {success.gift.engraving ? <p>متن حکاکی: {success.gift.engraving}</p> : null}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/collections/" className="btn-gold">
              ادامهٔ خرید
            </Link>
            <Link href="/wishlist/" className="btn-ghost">
              علاقه‌مندی‌ها
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-12">
      <form onSubmit={handleSubmit} noValidate className="lg:col-span-7">
        <section aria-labelledby="checkout-contact">
          <h2 id="checkout-contact" className="text-sm font-medium text-champagne">
            اطلاعات گیرنده
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="text-[11px] text-champagne/50">
                نام و نام خانوادگی
              </label>
              <input
                id="fullName"
                name="fullName"
                autoComplete="name"
                value={form.fullName}
                onChange={(event) => update('fullName', event.target.value)}
                placeholder="مثلاً سارا محمدی"
                className={withErrorClass(INPUT_CLASS, errors.fullName)}
              />
              <FieldError>{errors.fullName}</FieldError>
            </div>

            <div>
              <label htmlFor="phone" className="text-[11px] text-champagne/50">
                شماره موبایل
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                dir="ltr"
                value={form.phone}
                onChange={(event) => handlePhone(event.target.value)}
                placeholder="09121234567"
                className={withErrorClass(`${INPUT_CLASS} text-left`, errors.phone)}
              />
              <FieldError>{errors.phone}</FieldError>
            </div>

            <div>
              <label htmlFor="email" className="text-[11px] text-champagne/50">
                ایمیل (اختیاری)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                dir="ltr"
                value={form.email}
                onChange={(event) => update('email', event.target.value)}
                placeholder="name@example.com"
                className={withErrorClass(`${INPUT_CLASS} text-left`, errors.email)}
              />
              <FieldError>{errors.email}</FieldError>
            </div>

            <div>
              <label htmlFor="province" className="text-[11px] text-champagne/50">
                استان
              </label>
              <select
                id="province"
                name="province"
                value={form.province}
                onChange={(event) => update('province', event.target.value)}
                className={INPUT_CLASS}
              >
                {PROVINCES.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section aria-labelledby="checkout-address" className="mt-8 border-t border-white/10 pt-7">
          <h2 id="checkout-address" className="text-sm font-medium text-champagne">
            نشانی تحویل
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="text-[11px] text-champagne/50">
                شهر
              </label>
              <input
                id="city"
                name="city"
                autoComplete="address-level2"
                value={form.city}
                onChange={(event) => update('city', event.target.value)}
                placeholder="مثلاً تهران"
                className={withErrorClass(INPUT_CLASS, errors.city)}
              />
              <FieldError>{errors.city}</FieldError>
            </div>

            <div>
              <label htmlFor="postalCode" className="text-[11px] text-champagne/50">
                کد پستی
              </label>
              <input
                id="postalCode"
                name="postalCode"
                inputMode="numeric"
                autoComplete="postal-code"
                dir="ltr"
                value={form.postalCode}
                onChange={(event) => handlePostalCode(event.target.value)}
                placeholder="1234567890"
                className={withErrorClass(`${INPUT_CLASS} text-left`, errors.postalCode)}
              />
              <FieldError>{errors.postalCode}</FieldError>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="text-[11px] text-champagne/50">
                نشانی کامل
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                autoComplete="street-address"
                value={form.address}
                onChange={(event) => update('address', event.target.value)}
                placeholder="خیابان، کوچه، پلاک و واحد"
                className={withErrorClass(
                  'mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm leading-6 text-champagne transition placeholder:text-champagne/25 focus:border-gold/50 focus:outline-none',
                  errors.address
                )}
              />
              <FieldError>{errors.address}</FieldError>
            </div>
          </div>
        </section>

        <section aria-labelledby="checkout-shipping" className="mt-8 border-t border-white/10 pt-7">
          <h2 id="checkout-shipping" className="text-sm font-medium text-champagne">
            روش ارسال
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SHIPPING_OPTIONS.map((option) => {
              const active = form.shipping === option.id;
              return (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                    active ? 'border-gold/60 bg-gold/[0.06]' : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={active}
                    onChange={() => update('shipping', option.id)}
                    className="mt-1 h-3.5 w-3.5 accent-[#c9a227]"
                  />
                  <span className="flex-1">
                    <span className="flex items-center justify-between gap-2 text-xs text-champagne/85">
                      {option.label}
                      <span className="text-[10px] text-gold">
                        {option.price === 0 ? 'رایگان' : `${formatPrice(option.price)} تومان`}
                      </span>
                    </span>
                    <span className="mt-1 block text-[10px] text-champagne/40">{option.detail}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="checkout-payment" className="mt-8 border-t border-white/10 pt-7">
          <h2 id="checkout-payment" className="text-sm font-medium text-champagne">
            روش پرداخت
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PAYMENT_OPTIONS.map((option) => {
              const active = form.payment === option.id;
              return (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                    active ? 'border-gold/60 bg-gold/[0.06]' : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={active}
                    onChange={() => update('payment', option.id)}
                    className="mt-1 h-3.5 w-3.5 accent-[#c9a227]"
                  />
                  <span>
                    <span className="block text-xs text-champagne/85">{option.label}</span>
                    <span className="mt-1 block text-[10px] text-champagne/40">{option.detail}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="checkout-gift" className="mt-8 border-t border-white/10 pt-7">
          <h2 id="checkout-gift" className="text-sm font-medium text-champagne">
            هدیه و حکاکی
          </h2>
          <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 p-4 text-xs text-champagne/70">
            <input
              type="checkbox"
              checked={form.giftWrap}
              onChange={(event) => update('giftWrap', event.target.checked)}
              className="h-4 w-4 accent-[#c9a227]"
            />
            بسته‌بندی هدیه (رایگان)
          </label>

          <div className="mt-4">
            <label htmlFor="giftNote" className="text-[11px] text-champagne/50">
              یادداشت هدیه (اختیاری)
            </label>
            <textarea
              id="giftNote"
              rows={2}
              maxLength={200}
              value={form.giftNote}
              onChange={(event) => update('giftNote', event.target.value)}
              placeholder="متن کوتاهی که روی کارت هدیه نوشته می‌شود"
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm leading-6 text-champagne transition placeholder:text-champagne/25 focus:border-gold/50 focus:outline-none"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="engraving" className="text-[11px] text-champagne/50">
              متن حکاکی (اختیاری، حداکثر ۱۲ کاراکتر)
            </label>
            <input
              id="engraving"
              maxLength={12}
              value={form.engraving}
              onChange={(event) => update('engraving', event.target.value)}
              placeholder="مثلاً ۱۴۰۵"
              className={INPUT_CLASS}
            />
            <p className="mt-1.5 text-[10px] text-champagne/30">
              حکاکی فقط برای انگشتر و حلقه قابل انجام است.
            </p>
          </div>
        </section>

        <button type="submit" className="btn-gold mt-8 w-full">
          ثبت سفارش دمو
        </button>
        <p className="mt-3 text-center text-[10px] leading-5 text-champagne/25">
          این محیط دموست؛ اطلاعات فقط در همین مرورگر ذخیره می‌شود و پرداختی انجام نمی‌گیرد.
        </p>
      </form>

      <aside className="lg:col-span-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 lg:sticky lg:top-28">
          <h2 className="text-sm font-medium text-champagne">خلاصهٔ سفارش</h2>

          <ul className="mt-4 space-y-3 border-b border-white/10 pb-4">
            {items.map((item) => (
              <li key={item.key} className="flex gap-3">
                <div className="w-14 shrink-0 overflow-hidden rounded-lg border border-white/10">
                  <ProductImage src={item.image} alt={item.name} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-[11px] text-champagne/80">{item.name}</p>
                  <p className="mt-1 text-[10px] text-champagne/35">
                    {item.optionLabel && item.optionValue
                      ? `${item.optionLabel} ${item.optionValue} · `
                      : ''}
                    {toFaDigits(item.qty)} عدد
                  </p>
                </div>
                <span className="whitespace-nowrap text-[10px] text-champagne/60">
                  {formatPrice(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2.5 text-[11px]">
            <div className="flex items-center justify-between">
              <dt className="text-champagne/45">جمع اقلام</dt>
              <dd className="text-champagne/75">{formatPrice(total)} تومان</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-champagne/45">ارسال</dt>
              <dd className="text-champagne/75">
                {shipping.price === 0 ? 'رایگان' : `${formatPrice(shipping.price)} تومان`}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
              <dt className="text-xs text-champagne/60">مبلغ قابل پرداخت</dt>
              <dd className="text-base font-medium text-gold">
                {formatPrice(payable)}
                <span className="ms-1 text-[10px] font-normal text-champagne/40">تومان</span>
              </dd>
            </div>
          </dl>

          <p className="mt-4 text-[10px] leading-5 text-champagne/30">
            ارسال بیمه‌شده، شناسنامهٔ اصالت و بسته‌بندی استاندارد همراه همهٔ سفارش‌هاست.
          </p>
        </div>
      </aside>
    </div>
  );
}
