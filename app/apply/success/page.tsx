import Link from 'next/link';
import { CheckCircle, Copy, ArrowRight, Phone, Mail } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

export default function SuccessPage({ searchParams }: { searchParams: { ref?: string } }) {
  const ref = searchParams.ref ?? 'KNF-UNKNOWN';

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-gradient flex items-center">
        <div className="container-xl py-32">
          <div className="max-w-2xl mx-auto text-center">

            {/* Success icon */}
            <div className="relative inline-flex mb-8">
              <div className="w-24 h-24 rounded-full bg-teal-gradient flex items-center justify-center shadow-teal animate-scale-in">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center animate-bounce">
                <span className="text-lg">🎉</span>
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl text-navy-800 mb-4 animate-fade-up fill-forwards">
              Application Submitted!
            </h1>
            <p className="text-navy-500 text-lg leading-relaxed mb-8 animate-fade-up fill-forwards delay-100">
              Your scholarship application has been received by the Kowa Namu Ne Foundation. Our team will review it within <strong className="text-navy-700">2 working weeks</strong>.
            </p>

            {/* Reference number */}
            <div className="card p-6 mb-8 border-2 border-gold-200 bg-gold-50/50 animate-fade-up fill-forwards delay-200">
              <div className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-2">Your Application Reference Number</div>
              <div className="font-mono text-2xl font-bold text-navy-800 tracking-wider break-all mb-3">{ref}</div>
              <p className="text-navy-500 text-sm mb-4">
                <strong>Save this number.</strong> You will need it to check your application status or contact us about your application.
              </p>
              <button
                onClick={() => navigator.clipboard?.writeText(ref)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors"
              >
                <Copy className="w-4 h-4" /> Copy Reference Number
              </button>
            </div>

            {/* What happens next */}
            <div className="card p-6 mb-8 text-left animate-fade-up fill-forwards delay-300">
              <h2 className="font-display text-lg text-navy-800 mb-4 font-semibold">What Happens Next?</h2>
              <div className="space-y-4">
                {[
                  { step: '1', text: 'Your application enters our review queue. All applications are treated confidentially.' },
                  { step: '2', text: 'A Foundation officer will review your personal statement and verify your details.' },
                  { step: '3', text: 'You will receive a call or SMS on the phone number you provided within 2 weeks.' },
                  { step: '4', text: 'Approved applicants will receive instructions for their examination registration.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <p className="text-navy-600 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="card p-5 mb-8 bg-navy-gradient text-left animate-fade-up fill-forwards delay-400">
              <p className="text-white font-semibold text-sm mb-3">Need to reach us?</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+234800KNFHELP" className="flex items-center gap-2 text-navy-300 hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4 text-teal-400" /> +234 800 KNF HELP
                </a>
                <a href="mailto:info@kowanamunejoundation.org" className="flex items-center gap-2 text-navy-300 hover:text-white text-sm transition-colors">
                  <Mail className="w-4 h-4 text-teal-400" /> info@kowanamunejoundation.org
                </a>
              </div>
              <p className="text-navy-400 text-xs mt-2">Always quote your reference number: <span className="text-gold-400 font-mono">{ref}</span></p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up fill-forwards delay-500">
              <Link href="/" className="btn-primary">
                Return to Homepage <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/news" className="btn-outline">
                Read Our News
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
