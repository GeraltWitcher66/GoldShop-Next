/**
 * دسته‌بندی‌های فروشگاه — منبع مشترک برای CategoryGrid و صفحات /category/[slug].
 * `slug` مسیر صفحه است و `name` باید دقیقاً با فیلد category محصولات یکی باشد.
 */
export const categories = [
  {
    slug: 'necklace',
    name: 'گردنبند',
    title: 'گردنبندها',
    image: '/images/cat-necklace.jpg',
  },
  {
    slug: 'ring',
    name: 'انگشتر',
    title: 'انگشترها',
    image: '/images/cat-ring.jpg',
  },
  {
    slug: 'bracelet',
    name: 'دستبند',
    title: 'دستبندها',
    image: '/images/cat-bracelet.jpg',
  },
  {
    slug: 'pendant',
    name: 'آویز',
    title: 'آویزها',
    image: '/images/cat-pendant.jpg',
  },
  { slug: 'earrings', name: 'گوشواره', title: 'گوشواره‌ها' },
  { slug: 'sets', name: 'سرویس', title: 'سرویس‌ها' },
  { slug: 'half-sets', name: 'نیم‌ست', title: 'نیم‌ست‌ها' },
  { slug: 'bands', name: 'حلقه', title: 'حلقه‌ها' },
];

/** دسته‌هایی که در صفحهٔ اصلی دایره‌های تصویری دارند. */
export const featuredCategories = categories.filter((category) => category.image);

export function getCategory(slug) {
  return categories.find((category) => category.slug === slug);
}
