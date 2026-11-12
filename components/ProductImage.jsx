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
        alt={alt}
        loading={isHero || isDetail ? 'eager' : 'lazy'}
        className={`absolute inset-0 h-full w-full ${objectFitClass} transition duration-700 ease-out ${hoverZoomClass}`}
        onError={(event) => {
          event.currentTarget.style.opacity = '0';
        }}
      />
    </div>
  );
}
