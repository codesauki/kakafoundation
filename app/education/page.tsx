import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, BookOpen, GraduationCap, FileText } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import { SettingsProvider, useSettings } from '@/components/providers/SettingsProvider';

export const metadata: Metadata = { title: 'Education Portal', description: 'Apply for JAMB, WAEC, and NECO scholarship support from Kowa Namu Ne Foundation.' };

const STEPS = [
  { icon: FileText, step: '01', title: 'Complete the Form', desc: 'Fill in your personal details, school information, and select which examinations you need support for.' },
  { icon: GraduationCap, step: '02', title: 'Submit Your Application', desc: 'Review all information and submit securely. You will receive a unique Application Reference Number.' },
  { icon: BookOpen, step: '03', title: 'Review & Decision', desc: 'Our team reviews all applications within 2 weeks. You will be contacted via the phone number provided.' },
  { icon: CheckCircle, step: '04', title: 'Receive Your Sponsorship', desc: 'Approved applicants receive examination fee sponsorship directly, with no intermediaries.' },
];

export default function EducationPage() {
  return (
    <SettingsProvider>
      <EducationPageContent />
    </SettingsProvider>
  );
}

function EducationPageContent() {
  const { scholarshipsEnabled } = useSettings();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-navy-gradient overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl" />
          <div className="container-xl relative z-10">
            <PageHeader
              tag="Education Portal"
              title="Your Education"
              titleHighlight="Matters"
              subtitle="The Kowa Namu Ne Foundation is sponsoring 10,000 Nigerian students in the 2026 examination cycle. JAMB, WAEC, and NECO — we've got you covered."
              dark
            />
            {scholarshipsEnabled && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link href="/apply" className="btn-gold text-base px-8 py-4">
                  Apply Now — It's Free <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Eligibility */}
        <section className="section-pad bg-white">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-tag mb-5">Who Can Apply</div>
                <h2 className="section-title mb-4">Eligibility <span className="text-gradient-teal">Requirements</span></h2>
                <div className="divider-teal mb-6" />
                <p className="text-navy-500 leading-relaxed mb-8">Our scholarship is designed to reach those who need it most. If you are a Nigerian student who cannot afford examination fees, we want to hear from you.</p>
                <div className="space-y-3">
                  {[
                    'Must be a Nigerian citizen from any of the 36 states + FCT',
                    'Currently enrolled in secondary school (JSS1–SSS3) or preparing for exams',
                    'Demonstrate financial need — we do not discriminate by grades',
                    'Must be preparing for JAMB, WAEC, or NECO in 2025 or 2026',
                    'Valid contact phone number required for follow-up',
                    'Applications from rural and underserved areas are prioritised',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                      <span className="text-navy-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* Exam types */}
                {[
                  { name: 'JAMB', full: 'Joint Admissions and Matriculations Board', desc: 'University entry examination for Nigerian secondary school graduates. We sponsor the UTME registration fee.' },
                  { name: 'WAEC', full: 'West African Examinations Council', desc: 'The standard secondary school certificate examination. We cover the full registration cost.' },
                  { name: 'NECO', full: 'National Examinations Council', desc: 'Nigerian alternative to WAEC. Full sponsorship for eligible applicants.' },
                ].map((exam) => (
                  <div key={exam.name} className="card p-5 flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-gradient flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">{exam.name}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-navy-800 text-sm mb-1">{exam.full}</div>
                      <div className="text-navy-400 text-xs leading-relaxed">{exam.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section-pad bg-cream-gradient">
          <div className="container-xl">
            <div className="text-center mb-14">
              <div className="section-tag mb-4">The Process</div>
              <h2 className="section-title mb-4">How It <span className="text-gradient-teal">Works</span></h2>
              <div className="divider-gold mx-auto" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="card p-6 text-center group hover:shadow-card-hover transition-all duration-300">
                    <div className="relative mx-auto w-14 h-14 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center">
                        <span className="text-navy-900 text-[10px] font-bold">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="font-display text-base font-semibold text-navy-800 mb-2">{step.title}</h3>
                    <p className="text-navy-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-12">
              {scholarshipsEnabled && (
                <Link href="/apply" className="btn-primary text-base px-8 py-4">
                  Start Your Application <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-pad bg-white">
          <div className="container-lg">
            <div className="text-center mb-12">
              <div className="section-tag mb-4">FAQs</div>
              <h2 className="section-title mb-4">Common <span className="text-gradient-teal">Questions</span></h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'Is the application really free?', a: 'Yes, 100% free. There are no registration fees, no processing charges, and no hidden costs at any stage of the application process.' },
                { q: 'How long does it take to get a decision?', a: 'We review all applications within 2 weeks of submission. You will be contacted via the phone number on your application. Please ensure your number is active.' },
                { q: 'Can I apply for more than one examination type?', a: 'Yes. You can select JAMB, WAEC, NECO, or any combination of the three on your application form. Each selection will be assessed individually.' },
                { q: 'What happens after my application is approved?', a: 'Once approved, our team will contact you with the specific steps for your examination registration. Funds are disbursed directly to cover your examination fees — you will not handle any cash.' },
                { q: 'What if I submitted wrong information?', a: 'Contact us immediately at info@kowanamunejoundation.org with your Application Reference Number. We can update information up until your application enters review.' },
                { q: 'Can I check my application status?', a: 'Yes. Use your Application Reference Number on the status check page, or contact our office directly.' },
              ].map((faq) => (
                <div key={faq.q} className="card p-5">
                  <h3 className="font-semibold text-navy-800 mb-2">Q: {faq.q}</h3>
                  <p className="text-navy-500 text-sm leading-relaxed">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
