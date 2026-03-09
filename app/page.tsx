import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ImpactSection from '@/components/sections/ImpactSection';
import ImpactStoriesSection from '@/components/sections/ImpactStoriesSection';
import ProgrammesSection from '@/components/sections/ProgrammesSection';
import FounderPreview from '@/components/sections/FounderPreview';
import GallerySection from '@/components/sections/GallerySection';
import NewsSection from '@/components/sections/NewsSection';
import CTASection from '@/components/sections/CTASection';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ImpactSection />
        <ImpactStoriesSection />
        <ProgrammesSection />
        <FounderPreview />
        <GallerySection />
        <NewsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
