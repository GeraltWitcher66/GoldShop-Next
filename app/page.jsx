import AboutSection from '@/components/AboutSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
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
