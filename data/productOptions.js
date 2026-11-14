/**
 * گزینه‌های خرید هر محصول (اندازه/طول) و وضعیت ساخت.
 * کلیدها همان id محصول در data/products.js هستند.
 */
export const PRODUCT_OPTIONS = {
  'diamond-set': {
    label: 'طول زنجیر',
    unit: 'سانتی‌متر',
    values: ['۴۰', '۴۵', '۵۰'],
    guideHref: '/guides/#necklace-size',
  },
  'cartier-bracelet': {
    label: 'اندازهٔ مچ',
    unit: 'سانتی‌متر',
    values: ['۱۶', '۱۷', '۱۸', '۱۹'],
    guideHref: '/guides/#bracelet-size',
  },
  'ruby-ring': {
    label: 'سایز انگشتر',
    unit: '',
    values: ['۵', '۶', '۷', '۸', '۹', '۱۰', '۱۱', '۱۲'],
    guideHref: '/guides/#ring-size',
  },
  'turquoise-pendant': {
    label: 'طول زنجیر',
    unit: 'سانتی‌متر',
    values: ['۴۰', '۴۵', '۵۰'],
    guideHref: '/guides/#necklace-size',
  },
  'pearl-set': {
    label: 'طول زنجیر',
    unit: 'سانتی‌متر',
    values: ['۴۰', '۴۵'],
    guideHref: '/guides/#necklace-size',
  },
  'plain-band': {
    label: 'سایز حلقه',
    unit: '',
    values: ['۵', '۶', '۷', '۸', '۹', '۱۰', '۱۱', '۱۲'],
    guideHref: '/guides/#ring-size',
  },
  'emerald-necklace': {
    label: 'طول زنجیر',
    unit: 'سانتی‌متر',
    values: ['۴۰', '۴۵', '۵۰'],
    guideHref: '/guides/#necklace-size',
  },
};

/** محصولاتی که به‌جای موجودی آماده، پس از ثبت سفارش ساخته می‌شوند. */
const MADE_TO_ORDER = {
  'diamond-set': '۷ تا ۱۰ روز کاری',
  'emerald-necklace': '۱۰ تا ۱۴ روز کاری',
};

export function getProductOption(product) {
  if (!product?.id) return null;
  return PRODUCT_OPTIONS[product.id] ?? null;
}

export function getMadeToOrderNote(product) {
  if (!product?.id) return null;
  return MADE_TO_ORDER[product.id] ?? null;
}

export function isMadeToOrder(product) {
  return Boolean(getMadeToOrderNote(product));
}
