import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import NewArrivals from '@/components/NewArrivals';
import Categories from '@/components/Categories';
import LogoCarousel from '@/components/LogoCarousel';
import HotSales from '@/components/HotSales';
import CTABanner from '@/components/CTABanner';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Assemble Distribution | USA Wholesale Distributor & B2B Supply',
  description:
    'Your trusted USA wholesale distributor for Art, Craft & Sewing, Toys & Games, Home & Kitchen, Garden & Outdoor products — delivered fast across the US with wholesale tier pricing.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Assemble Distribution — Direct Wholesale Products in USA',
    description:
      'Buy wholesale in bulk directly from top manufacturers. Sourcing Art, Craft, Toys, Games, Garden, Tools & Home products for US retailers.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <NewArrivals />
        <LogoCarousel />
        <HotSales />
        <CTABanner />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
