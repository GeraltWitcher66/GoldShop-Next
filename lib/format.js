const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** تبدیل ارقام لاتین به فارسی (برای نمایش یکدست در همه مرورگرها) */
export function toFaDigits(value) {
  return String(value).replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);
}

/** 45800000 → ۴۵,۸۰۰,۰۰۰ */
export function formatPrice(value) {
  return toFaDigits(new Intl.NumberFormat('en-US').format(value));
}
