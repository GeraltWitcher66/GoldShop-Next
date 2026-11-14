import './globals.css';

import CartSidebar from '@/components/CartSidebar';
import CartToast from '@/components/CartToast';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { absoluteUrl } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zaringallery.ir'),
  title: 'گالری زرین | طلا و جواهر دست‌ساز',
  description:
    'گالری زرین؛ مجموعه‌ای از طلا و جواهر دست‌ساز با عیار ۱۸ و ۲۱، طراحی‌شده در تهران برای لحظه‌های ماندگار.',
  keywords: ['طلا', 'جواهر', 'گالری زرین', 'انگشتر', 'گردنبند', 'دستبند', 'آویز'],
  openGraph: {
    title: 'گالری زرین | طلا و جواهر دست‌ساز',
    description: 'درخشش اصالت، در هر نگاه.',
    type: 'website',
    locale: 'fa_IR',
    siteName: 'گالری زرین',
    images: [{ url: absoluteUrl('/images/hero-side.jpg'), alt: 'طلا و جواهر دست‌ساز گالری زرین' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'گالری زرین | طلا و جواهر دست‌ساز',
    description: 'درخشش اصالت، در هر نگاه.',
    images: [absoluteUrl('/images/hero-side.jpg')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#0a0a0b',
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'گالری زرین',
      url: absoluteUrl('/'),
      logo: absoluteUrl('/icon.svg'),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+982188776655',
        contactType: 'customer service',
        areaServed: 'IR',
        availableLanguage: 'fa',
      },
    },
    {
      '@type': 'WebSite',
      name: 'گالری زرین',
      url: absoluteUrl('/'),
      inLanguage: 'fa-IR',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${absoluteUrl('/collections/')}?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-ink font-sans text-champagne/85 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, '\\u003c') }}
        />
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          پرش به محتوای اصلی
        </a>
        <WishlistProvider>
          <CartProvider>
            {children}
            <CartSidebar />
            <CartToast />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
