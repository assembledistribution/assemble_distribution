import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import LogoCarousel from '@/components/LogoCarousel';
import CTABanner from '@/components/CTABanner';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Assemble Distribution — Wholesale Products',
  description:
    'Your trusted wholesale distributor for Art, Craft and Sewing, Toys and Games, Garden and Outdoor products — delivered fast, priced right.',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <LogoCarousel />
        <CTABanner />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
// Trigger HMR update
