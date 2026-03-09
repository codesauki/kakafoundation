import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import { impactStories } from '@/data/impactStories';
import CTASection from '@/components/sections/CTASection';
import { SettingsProvider } from '@/components/providers/SettingsProvider';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Impact Stories | Kowa Namu Ne Foundation',
  description:
    'Explore the 2025 impact stories from the Kowa Namu Ne Foundation across economic empowerment, healthcare, and education initiatives in Kaduna North.',
};

export default function ImpactPage() {
  return (
    <SettingsProvider>
      <ImpactPageContent />
    </SettingsProvider>
  );
}

function ImpactPageContent() {
  const economicImpact = impactStories[0];
  const healthImpact = impactStories[1];
  const educationImpact = impactStories[2];

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="2025 Impact Stories"
          subtitle="Documenting a year of action, inclusion, and purposeful leadership across Kaduna North"
        />

        {/* Economic Empowerment Story */}
        <section className="section-pad bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={economicImpact.image}
                    alt={economicImpact.title}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <div className="inline-block px-4 py-2 rounded-full bg-gold-100 text-gold-700 font-semibold text-sm mb-4">
                  {economicImpact.badge}
                </div>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                  {economicImpact.title}
                </h2>
                <p className="text-navy-600 text-lg leading-relaxed mb-6">
                  {economicImpact.summary}
                </p>

                {/* Highlights */}
                <div className="space-y-3 mb-8">
                  {economicImpact.highlights.map((highlight, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                      <p className="text-navy-700">{highlight}</p>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-navy-100">
                  {economicImpact.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-4xl font-bold text-gold-600 mb-2">
                        {stat.number}
                      </div>
                      <p className="text-navy-600 font-medium text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Health & Welfare Story */}
        <section className="section-pad bg-cream-light">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Image */}
              <div>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={healthImpact.image}
                    alt={healthImpact.title}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 font-semibold text-sm mb-4">
                  {healthImpact.badge}
                </div>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                  {healthImpact.title}
                </h2>
                <p className="text-navy-600 text-lg leading-relaxed mb-6">
                  {healthImpact.summary}
                </p>

                {/* Highlights */}
                <div className="space-y-3 mb-8">
                  {healthImpact.highlights.map((highlight, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                      <p className="text-navy-700">{highlight}</p>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-navy-100">
                  {healthImpact.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-4xl font-bold text-teal-600 mb-2">
                        {stat.number}
                      </div>
                      <p className="text-navy-600 font-medium text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Community Story */}
        <section className="section-pad bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={educationImpact.image}
                    alt={educationImpact.title}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <div className="inline-block px-4 py-2 rounded-full bg-gold-100 text-gold-700 font-semibold text-sm mb-4">
                  {educationImpact.badge}
                </div>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                  {educationImpact.title}
                </h2>
                <p className="text-navy-600 text-lg leading-relaxed mb-6">
                  {educationImpact.summary}
                </p>

                {/* Highlights */}
                <div className="space-y-3 mb-8">
                  {educationImpact.highlights.map((highlight, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                      <p className="text-navy-700">{highlight}</p>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-navy-100">
                  {educationImpact.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-4xl font-bold text-gold-600 mb-2">
                        {stat.number}
                      </div>
                      <p className="text-navy-600 font-medium text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-pad bg-navy-900 text-white">
          <div className="container-xl text-center">
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              Building a Better Future Together
            </h2>
            <p className="text-cream-light text-lg max-w-2xl mx-auto mb-8">
              Every initiative, every program, every act of service is driven by one guiding
              principle: service to humanity and sustainable development for all.
            </p>
            <a href="#" className="btn-primary bg-gold-600 hover:bg-gold-700 text-navy-900">
              Get Involved Today
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
