/**
 * پیشوند مسیر برای انتشار روی GitHub Pages.
 * اگر سایت در زیرمسیر مخزن منتشر شود (NEXT_PUBLIC_BASE_PATH=/repo-name)
 * آدرس فایل‌های داخل public با این تابع ساخته می‌شود.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function asset(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return `${basePath}${path}`;
}
