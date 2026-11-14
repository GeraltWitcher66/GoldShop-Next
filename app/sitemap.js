import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/collections/', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/guides/', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/gold-calculator/', priority: 0.6, changeFrequency: 'monthly' },
  ];

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...categories.map((category) => ({
      url: absoluteUrl(`/category/${category.slug}/`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}/`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
  ];
}
