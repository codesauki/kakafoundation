'use client';

import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import ImpactSection from '@/components/sections/ImpactSection';
import CTASection from '@/components/sections/CTASection';
import { SettingsProvider } from '@/components/providers/SettingsProvider';

// Note: metadata will be declared in the parent layout if needed

const BOARD = [
  { name: 'Hon. Abdulazeez Kaka', role: 'Founder & Chairman of the Board', initials: 'AK' },
  { name: 'Board Secretary', role: 'Secretary, Board of Trustees', initials: 'BS' },
  { name: 'Board Treasurer', role: 'Treasurer, Board of Trustees', initials: 'BT' },
];

export default function AboutPage() {
  return (
    <SettingsProvider>
      <AboutPageContent />
    </SettingsProvider>
  );
}

function AboutPageContent() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-navy-gradient overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="container-xl relative z-10">
            <PageHeader
              tag="About Us"
              title="A Foundation Built on"
              titleHighlight="Purpose"
              subtitle="Kowa Namu Ne means 'Come With Us' in Hausa. It is an invitation — to dignity, to opportunity, to a better Nigeria for everyone."
              dark
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Mission & Vision */}
        <section className="section-pad bg-white">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-tag mb-5">Who We Are</div>
                <h2 className="section-title mb-6">
                  Transforming Lives,<br />
                  <span className="text-gradient-teal">One Community at a Time</span>
                </h2>
                <div className="divider-teal mb-6" />
                <div className="space-y-5 text-navy-600 leading-relaxed">
                  <p>The Kowa Namu Ne Foundation is a Nigerian non-governmental organisation established to address the systemic barriers that prevent millions of young Nigerians from accessing education, economic opportunity, healthcare, and dignified living.</p>
                  <p>We operate across all 36 states of Nigeria through seven integrated programme areas — each one designed to address a specific dimension of human development. We believe that true transformation is holistic: a child who cannot read cannot participate in the economy; a young person without skills cannot build a business; a community without healthcare cannot thrive.</p>
                  <p>Our approach is to go where the need is greatest, work alongside communities rather than above them, and build interventions that last beyond our presence.</p>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { label: 'Our Mission', icon: '🎯', text: 'To empower Nigerian youth and communities through integrated programmes in education, skills, healthcare, economic opportunity, and humanitarian support.' },
                  { label: 'Our Vision', icon: '👁️', text: 'A Nigeria where every young person, regardless of geography or circumstance, has access to the education, skills, and opportunities they need to build a dignified and prosperous life.' },
                  { label: 'Our Values', icon: '💎', text: 'Dignity. Equity. Accountability. Community. Excellence. We hold ourselves to the highest standards of governance and impact measurement.' },
                ].map((item) => (
                  <div key={item.label} className="card p-6 border-l-4 border-teal-500">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="font-display text-lg font-semibold text-navy-800">{item.label}</h3>
                    </div>
                    <p className="text-navy-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <ImpactSection />

        {/* Organisational Structure */}
        <section className="section-pad bg-cream-gradient">
          <div className="container-xl">
            <div className="text-center mb-14">
              <div className="section-tag mb-4">Governance</div>
              <h2 className="section-title mb-4">Organisational <span className="text-gradient-teal">Structure</span></h2>
              <div className="divider-gold mx-auto" />
            </div>

            {/* Board */}
            <div className="mb-12">
              <h3 className="font-display text-2xl text-navy-800 text-center mb-8">Board of Trustees</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {BOARD.map((m) => (
                  <div key={m.name} className="card p-6 text-center w-56">
                    <div className="w-16 h-16 rounded-2xl bg-navy-gradient flex items-center justify-center mx-auto mb-3">
                      <span className="font-display text-xl font-bold text-gold-400">{m.initials}</span>
                    </div>
                    <div className="font-semibold text-navy-800 text-sm">{m.name}</div>
                    <div className="text-navy-400 text-xs mt-1">{m.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div>
              <h3 className="font-display text-2xl text-navy-800 text-center mb-8">Key Departments</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: '🎓', name: 'Youth Empowerment & Skills', desc: 'ICT, entrepreneurship, SME support' },
                  { icon: '📚', name: 'Education Support', desc: 'Scholarships, materials, counselling' },
                  { icon: '🏥', name: 'Health & Water Access', desc: 'Outreach, hygiene, clean water' },
                  { icon: '🕊️', name: 'Peace & Unity Campaigns', desc: 'Dialogue, awareness, civic education' },
                ].map((dept) => (
                  <div key={dept.name} className="card-teal-top p-5 text-center">
                    <div className="text-3xl mb-3">{dept.icon}</div>
                    <div className="font-semibold text-navy-800 text-sm mb-1">{dept.name}</div>
                    <div className="text-navy-400 text-xs">{dept.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
