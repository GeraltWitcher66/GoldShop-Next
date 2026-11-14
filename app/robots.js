import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout/', '/wishlist/', '/login/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
