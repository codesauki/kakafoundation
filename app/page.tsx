import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ImpactSection from '@/components/sections/ImpactSection';
import ProgrammesSection from '@/components/sections/ProgrammesSection';
import FounderPreview from '@/components/sections/FounderPreview';
import NewsSection from '@/components/sections/NewsSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ImpactSection />
        <ProgrammesSection />
        <FounderPreview />
        <NewsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
