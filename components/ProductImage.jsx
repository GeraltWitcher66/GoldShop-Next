'use client';

import { asset } from '@/lib/path';

/**
 * تصویر محصول با پلیس‌هولدر گرادیانی.
 * تا زمانی که فایل واقعی در public/images نباشد، به‌جای آیکون عکس شکسته
 * فقط پس‌زمینه طلایی ظریف دیده می‌شود.
 *
 * variant:
 *  - card   : کارت محصول (مربع)
 *  - detail : تصویر اصلی صفحه محصول (مربع، بزرگ‌تر)
 *  - hero   : قاب عمودی سمت چپ هیرو
 */
export default function ProductImage({ src, alt, variant = 'card', boxHeightClass = '' }) {
  const isDetail = variant === 'detail';
  const isHero = variant === 'hero';

  const boxClass = isHero ? 'h-[340px] sm:h-[420px] lg:h-[500px] xl:h-[540px]' : 'aspect-square';
  const markClass = isHero || isDetail ? 'text-8xl' : 'text-6xl';
  // تصویر همیشه کادر را پر می‌کند تا کارت‌ها هم‌ارتفاع بمانند.
  const objectFitClass = 'object-cover';
  const hoverZoomClass = 'group-hover:scale-[1.06]';

  // نسخهٔ ۶۰۰ پیکسلی برای کارت‌ها و موبایل؛ نسخهٔ اصلی برای نمایش بزرگ.
  const canUseResponsive = !isHero && /\.[jJ][pP][eE]?[gG]$/.test(src || '');
  const responsiveBase = canUseResponsive ? src.replace(/\.[^.]+$/, '') : '';
  const srcSet = canUseResponsive
    ? `${asset(`${responsiveBase}-600.jpg`)} 600w, ${asset(src)} 1000w`
    : undefined;
  const sizes = isDetail
    ? '(min-width: 1024px) 50vw, 100vw'
    : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw';

  return (
    <div
      className={`relative w-full overflow-hidden bg-[radial-gradient(120%_120%_at_30%_20%,#1d1a13,#0d0d10_72%)] ${boxClass} ${boxHeightClass}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 grid select-none place-items-center font-extralight text-gold/10 ${markClass}`}
      >
        زرین
      </span>
      <img
        src={asset(src)}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={isHero || isDetail ? 'eager' : 'lazy'}
        decoding="async"
        className={`absolute inset-0 h-full w-full ${objectFitClass} transition duration-700 ease-out ${hoverZoomClass}`}
        onError={(event) => {
          const image = event.currentTarget;
          // اگر نسخهٔ سبک در دسترس نبود، یک بار به تصویر اصلی برگرد.
          if (image.dataset.fallback !== '1') {
            image.dataset.fallback = '1';
            image.removeAttribute('srcset');
            image.removeAttribute('sizes');
            image.src = asset(src);
            return;
          }
          image.style.opacity = '0';
        }}
      />
    </div>
  );
}
