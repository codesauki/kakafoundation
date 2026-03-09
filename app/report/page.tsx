import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import { report2025 } from '@/data/reports';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: '2025 Annual Report | Kowa Namu Ne Foundation',
  description:
    'The Kowa Namu Ne Foundation 2025 Annual Report - A comprehensive overview of leadership, service, empowerment, and community impact across Kaduna North.',
};

export default function AnnualReportPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title={report2025.title}
          subtitle={report2025.tagline}
        />

        {/* Report Overview */}
        <section className="section-pad bg-cream-light">
          <div className="container-xl">
            {/* Leader Quote Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <blockquote className="border-l-4 border-gold-600 pl-8 py-4">
                <p className="text-2xl lg:text-3xl font-display font-bold text-navy-900 mb-4 italic">
                  "{report2025.leaderQuote}"
                </p>
                <footer className="text-navy-600 font-semibold">
                  — {report2025.leaderName}
                </footer>
              </blockquote>
            </div>

            {/* Overview Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-6">
                  {report2025.overviewTitle}
                </h2>
                <div className="prose prose-lg prose-navy max-w-none space-y-4">
                  {report2025.overviewContent.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-navy-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Side Info */}
              <div className="bg-white rounded-2xl p-8 shadow-sm h-fit sticky top-24">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-navy-500 font-semibold uppercase mb-2">Reporting Period</p>
                    <p className="text-navy-900 font-bold text-lg">{report2025.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-navy-500 font-semibold uppercase mb-2">Foundation Motto</p>
                    <p className="text-navy-900 font-bold text-lg">{report2025.motto}</p>
                  </div>
                  <div className="pt-4 border-t border-navy-100">
                    <p className="text-sm text-navy-500 font-semibold uppercase mb-2">Leadership</p>
                    <p className="text-navy-900 font-bold text-lg">{report2025.leaderName}</p>
                    <p className="text-navy-600 text-sm">
                      Chairman APC Youth Stakeholders Forum, Founder Kowa Namu Ne Foundation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kowa Namu Ne Philosophy */}
        <section className="section-pad bg-white">
          <div className="container-xl">
            <div className="max-w-4xl mx-auto mb-12">
              <div className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 font-semibold text-sm mb-4">
                Foundation Philosophy
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                {report2025.philosophyTitle}
              </h2>
              <p className="text-navy-600 text-lg leading-relaxed mb-8">
                {report2025.philosophyDescription}
              </p>

              {/* Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {report2025.philosophyPillars.map((pillar, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-3 h-3 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                    <p className="text-navy-700 font-medium">{pillar}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Foundation Focus Areas */}
        <section className="section-pad bg-cream-light">
          <div className="container-xl">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 rounded-full bg-gold-100 text-gold-700 font-semibold text-sm mb-4">
                Our Foundation
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                The Kowa Namu Ne Foundation
              </h2>
              <p className="text-navy-600 text-lg max-w-2xl mx-auto">
                Serving as the humanitarian and development arm of Hon. Abdulazeez Kaka's vision,
                structured programs address education, healthcare, empowerment, and social welfare.
              </p>
            </div>

            {/* Focus Areas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {report2025.foundationAreas.map((area, i) => (
                <div key={i} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">
                    {i === 0 && '📚'}
                    {i === 1 && '💼'}
                    {i === 2 && '🏥'}
                    {i === 3 && '👩‍👧‍👦'}
                    {i === 4 && '🏗️'}
                  </div>
                  <p className="text-navy-900 font-semibold text-lg">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Achievements Stats */}
        <section className="section-pad bg-navy-900 text-white">
          <div className="container-xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
                2025 By The Numbers
              </h2>
              <p className="text-cream-light text-lg max-w-2xl mx-auto">
                Across all impact areas, these numbers represent tangible change and real lives improved.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-gold-400 mb-2">4,000+</div>
                <p className="text-cream-light">Businesses Empowered</p>
              </div>
              <div className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-teal-400 mb-2">800+</div>
                <p className="text-cream-light">Received Healthcare</p>
              </div>
              <div className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-gold-400 mb-2">10,000+</div>
                <p className="text-cream-light">School Materials</p>
              </div>
              <div className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-teal-400 mb-2">300+</div>
                <p className="text-cream-light">Skills Graduates</p>
              </div>
              <div className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-gold-400 mb-2">40+</div>
                <p className="text-cream-light">Solar Installations</p>
              </div>
              <div className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-teal-400 mb-2">20M+</div>
                <p className="text-cream-light">Naira Donated</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-pad bg-cream-light">
          <div className="container-xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-6">
                Explore the Impact Stories
              </h2>
              <p className="text-navy-600 text-lg mb-8">
                Dive deeper into the three pillars of our 2025 impact: economic empowerment,
                healthcare access, and educational transformation.
              </p>
              <a href="/impact" className="btn-primary">
                View All Impact Stories
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
