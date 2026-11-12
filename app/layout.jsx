import './globals.css';

import CartSidebar from '@/components/CartSidebar';
import CartToast from '@/components/CartToast';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'گالری زرین | طلا و جواهر دست‌ساز',
  description:
    'گالری زرین؛ مجموعه‌ای از طلا و جواهر دست‌ساز با عیار ۱۸ و ۲۱، طراحی‌شده در تهران برای لحظه‌های ماندگار.',
  keywords: ['طلا', 'جواهر', 'گالری زرین', 'انگشتر', 'گردنبند', 'دستبند', 'آویز'],
  openGraph: {
    title: 'گالری زرین | طلا و جواهر دست‌ساز',
    description: 'درخشش اصالت، در هر نگاه.',
    type: 'website',
    locale: 'fa_IR',
  },
};

export const viewport = {
  themeColor: '#0a0a0b',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-ink font-sans text-champagne/85 antialiased">
        <CartProvider>
          {children}
          <CartSidebar />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
