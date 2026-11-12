/**
 * تنظیمات Next.js برای خروجی استاتیک (GitHub Pages)
 *
 * basePath فقط زمانی لازم است که سایت در زیرمسیر مخزن منتشر شود:
 *   https://<user>.github.io/<repo>/
 * در آن حالت مقدار NEXT_PUBLIC_BASE_PATH را برابر «/<repo>» قرار دهید
 * (فایل .github/workflows/deploy.yml این کار را خودکار انجام می‌دهد).
 * برای دامنه اختصاصی یا مخزن <user>.github.io این متغیر خالی می‌ماند.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // نکته: Next.js 14 در حالت dev همراه با output: 'export' برای مسیرهای
  // داینامیک (مثل products/[slug]) خطای گمراه‌کننده «missing generateStaticParams»
  // می‌دهد، هرچند تابع وجود دارد و بیلد هم موفق است (باگ شناخته‌شده Next).
  // به همین دلیل export فقط روی بیلد پروداکشن فعال می‌شود؛ `npm run build`
  // همان خروجی استاتیک کامل را در پوشه out/ می‌سازد.
  ...(isDev ? {} : { output: 'export' }),
  images: {
    unoptimized: true,
  },
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
