'use client';

import { useEffect, useState } from 'react';

const initialForm = { name: '', phone: '', password: '' };

const INPUT_CLASS =
  'mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[0.02] px-3.5 text-sm text-champagne transition placeholder:text-champagne/25 hover:border-white/20 focus:border-gold/50 focus:bg-gold/[0.03] focus:outline-none';

export default function LoginForm() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const isRegister = mode === 'register';

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  function switchMode(nextMode) {
    setMode(nextMode);
    setError('');
  }

  function handleChange(key) {
    return (event) => {
      const value =
        key === 'phone'
          ? event.target.value.replace(/\D/g, '').slice(0, 10)
          : event.target.value;
      setForm((previous) => ({ ...previous, [key]: value }));
    };
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isRegister && form.name.trim().length < 3) {
      setError('نام و نام خانوادگی را کامل وارد کنید.');
      return;
    }

    if (!/^9\d{9}$/.test(form.phone)) {
      setError('شماره موبایل باید ۱۰ رقم و با ۹ شروع شود.');
      return;
    }

    if (form.password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد.');
      return;
    }

    setError('');
    setToast(isRegister ? 'ثبت‌نام شما انجام شد؛ به گالری زرین خوش آمدید' : 'به گالری زرین خوش آمدید');
  }

  return (
    <>
      <div className="relative w-full max-w-md">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-[0_45px_120px_-45px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 start-1/2 h-48 w-64 -translate-x-1/2 rounded-full bg-gold/[0.08] blur-3xl"
          />

          <div className="relative text-center">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-gold/35 bg-gold/[0.06] text-gold">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                aria-hidden="true"
              >
                <path d="M12 2.8 6.4 8.2 12 21.2l5.6-13L12 2.8Z" strokeLinejoin="round" />
                <path d="M6.4 8.2h11.2" />
              </svg>
            </span>
            <h1 className="mt-4 text-xl font-light text-champagne">حساب کاربری</h1>
            <p className="mt-2 text-[11px] leading-5 text-champagne/40">
              برای پیگیری سفارش‌ها و دریافت پیشنهادهای ویژه وارد شوید.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="ورود یا ثبت‌نام"
            className="relative mt-6 grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-black/30 p-1"
          >
            {[
              { id: 'login', label: 'ورود' },
              { id: 'register', label: 'ثبت‌نام' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={mode === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => switchMode(tab.id)}
                className={`rounded-full py-2 text-xs transition duration-300 ${
                  mode === tab.id
                    ? 'bg-gold font-semibold text-ink shadow-[0_8px_24px_-12px_rgba(201,162,39,0.9)]'
                    : 'text-champagne/55 hover:text-champagne'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            role="tabpanel"
            id={`panel-${mode}`}
            aria-labelledby={`tab-${mode}`}
            className="relative mt-6"
          >
            <div className="space-y-4">
              {isRegister && (
                <div>
                  <label htmlFor="name" className="text-[11px] text-champagne/50">
                    نام و نام خانوادگی
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="مثلاً سارا محمدی"
                    className={INPUT_CLASS}
                  />
                </div>
              )}

              <div>
                <label htmlFor="phone" className="text-[11px] text-champagne/50">
                  شماره موبایل
                </label>
                <div className="mt-2 flex h-11 items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition focus-within:border-gold/50 focus-within:bg-gold/[0.03]">
                  <span
                    dir="ltr"
                    className="border-e border-white/10 px-3 text-xs tracking-wide text-champagne/45"
                  >
                    +98
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    dir="ltr"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    placeholder="9121234567"
                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-left text-sm tracking-wide text-champagne transition placeholder:text-champagne/25 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-[11px] text-champagne/50">
                  رمز عبور
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  value={form.password}
                  onChange={handleChange('password')}
                  placeholder="حداقل ۶ کاراکتر"
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-3 flex items-center gap-2 text-[11px] text-[#e7b9a3]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7.5v5M12 16.2v.3" strokeLinecap="round" />
                </svg>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-gold-light active:translate-y-px"
            >
              {isRegister ? 'ثبت‌نام' : 'ورود'}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-champagne/25">
              اطلاعات شما فقط برای همین دمو نگهداری می‌شود و به سرور ارسال نمی‌شود.
            </p>
          </form>
        </div>
      </div>

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      >
        {toast ? (
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
            {toast}
          </div>
        ) : null}
      </div>
    </>
  );
}
