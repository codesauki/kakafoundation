import Link from 'next/link';
import { CheckCircle, Copy, Phone, Mail, Home } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function SuccessPage({ searchParams }: { searchParams: { ref?: string } }) {
  const ref = searchParams?.ref ?? 'APPLICATION-SUBMITTED';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600">Kowa Namu Ne Foundation</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Success Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mb-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Application Submitted!
            </h2>
            
            <p className="text-xl text-gray-600">
              Thank you for applying. Your application has been successfully received and is now under review.
            </p>
          </div>

          {/* Reference Number Box */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center mb-8">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">
              Your Reference Number
            </p>
            <p className="text-4xl sm:text-5xl font-mono font-bold text-gray-900 mb-4 break-all">
              {ref}
            </p>
            <p className="text-gray-700 text-base mb-6">
              Please save this number. You will need it to check your application status.
            </p>
            <button
              type="button"
              onClick={() => {
                if (navigator?.clipboard) {
                  navigator.clipboard.writeText(ref).catch(() => {});
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              <Copy className="w-5 h-5" />
              Copy to Clipboard
            </button>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Review Process Begins</h4>
                  <p className="text-gray-600 mt-1">
                    Your application enters our review queue. We review all applications confidentially and fairly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Initial Verification</h4>
                  <p className="text-gray-600 mt-1">
                    Our team will verify your personal details and review your submitted documents.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Get Your Decision</h4>
                  <p className="text-gray-600 mt-1">
                    We will contact you via phone or email within 2 weeks with our decision.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Next Steps</h4>
                  <p className="text-gray-600 mt-1">
                    If approved, we'll guide you through the enrollment process and exam schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white mb-8">
            <h3 className="text-xl font-bold mb-4">Need to Contact Us?</h3>
            <div className="space-y-3">
              <a
                href="tel:+234800555"
                className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              >
                <Phone className="w-5 h-5" />
                <span>+234 800 555 0000</span>
              </a>
              <a
                href="mailto:info@kowanamunejoundation.org"
                className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              >
                <Mail className="w-5 h-5" />
                <span>info@kowanamunejoundation.org</span>
              </a>
              <p className="text-blue-100 text-sm mt-4">
                When contacting us, please provide your reference number: <span className="font-mono font-bold">{ref}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              <Home className="w-5 h-5" />
              Return to Home
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-semibold transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>

        {/* Help Box */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-700 mb-4">
            If you have any questions about your application, don't hesitate to reach out to us. We're here to help!
          </p>
          <p className="text-sm text-gray-500">
            Processing time may vary. We appreciate your patience and interest in Kowa Namu Ne Foundation.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2024 Kowa Namu Ne Foundation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
