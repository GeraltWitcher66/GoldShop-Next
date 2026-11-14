import AboutSection from '@/components/AboutSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import { absoluteUrl } from '@/lib/site';

export const metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <Header />

      <main id="main-content">
        <Hero />

        <CategoryGrid />

        <FeaturedProducts />

        <AboutSection />

        <TrustSection />
      </main>

      <Footer />
    </>
  );
}
