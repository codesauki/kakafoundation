import Link from 'next/link';
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram } from 'lucide-react';
import { useSiteSettings } from '@/components/providers/SettingsProvider';

const PROGRAMMES = [
  { href: '/programmes/skill-acquisition', label: 'Skill Acquisition' },
  { href: '/programmes/youth-empowerment', label: 'Youth Empowerment' },
  { href: '/programmes/education-scholarships', label: 'Education Support' },
  { href: '/programmes/healthcare-welfare', label: 'Healthcare Access' },
  { href: '/programmes/innovation-entrepreneurship', label: 'Innovation' },
  { href: '/programmes/peacebuilding', label: 'Peacebuilding' },
  { href: '/programmes/humanitarian-support', label: 'Humanitarian Aid' },
];

const QUICK_LINKS = [
  { href: '/about', label: 'About the Foundation' },
  { href: '/founder', label: 'About the Founder' },
  { href: '/news', label: 'News & Updates' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
];

const SCHOLARSHIP_LINKS = [
  { href: '/apply', label: 'Apply for Scholarship' },
  { href: '/education', label: 'Education Portal' },
];

export default function Footer() {
  const { scholarshipsEnabled } = useSiteSettings();
  return (
    <footer className="bg-navy-900 text-white">
      {/* Main Footer */}
      <div className="container-xl py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-teal-gradient rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">K</span>
              </div>
              <div>
                <div className="font-display font-bold text-base text-white leading-tight">Kowa Namu Ne</div>
                <div className="text-xs text-teal-400 font-medium">Foundation</div>
              </div>
            </div>
            <p className="text-navy-300 text-sm leading-relaxed mb-6">
              <em className="text-gold-400 not-italic font-medium">"Come With Us"</em> — a movement dedicated to transforming lives across Nigeria through education, empowerment, and hope.
            </p>

            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: 'https://twitter.com/KowaNamuNe', label: 'Twitter' },
                { icon: Facebook, href: 'https://facebook.com/KowaNamuNeFoundation', label: 'Facebook' },
                { icon: Instagram, href: 'https://instagram.com/KowaNamuNe', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-navy-800 flex items-center justify-center text-navy-300 hover:bg-teal-600 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="font-display text-sm font-semibold text-gold-400 uppercase tracking-widest mb-5">
              Our Programmes
            </h4>
            <ul className="space-y-2.5">
              {PROGRAMMES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 text-sm hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-gold-400 uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 text-sm hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {scholarshipsEnabled && SCHOLARSHIP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 text-sm hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-gold-400 uppercase tracking-widest mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span className="text-navy-300 text-sm">Abuja, Federal Capital Territory, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+234800KNFHELP" className="text-navy-300 text-sm hover:text-white transition-colors">
                  +234 800 KNF HELP
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:info@kowanamunejoundation.org" className="text-navy-300 text-sm hover:text-white transition-colors">
                  info@kowanamunejoundation.org
                </a>
              </li>
            </ul>

            {scholarshipsEnabled && (
              <div className="mt-6 p-4 bg-navy-800 rounded-2xl border border-teal-900">
                <div className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-1">Applications Open</div>
                <div className="text-sm text-white font-medium">2026 Scholarship Cycle</div>
                <div className="text-xs text-navy-400 mt-1">Deadline: June 30, 2026</div>
                <Link href="/apply" className="mt-3 btn-gold text-xs px-4 py-2 w-full justify-center">
                  Apply Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Kowa Namu Ne Foundation. All rights reserved.
            Founded by <span className="text-gold-400">Hon. Abdulazeez Kaka</span>.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-navy-400 text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-navy-700">·</span>
            <Link href="/terms" className="text-navy-400 text-xs hover:text-white transition-colors">Terms of Use</Link>
            <span className="text-navy-700">·</span>
            <Link href="/admin/login" className="text-navy-400 text-xs hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
