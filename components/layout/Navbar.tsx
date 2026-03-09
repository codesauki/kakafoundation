'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSiteSettings } from '@/components/providers/SettingsProvider';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/founder', label: 'Our Founder' },
  {
    label: 'Programmes',
    href: '/programmes',
    children: [
      { href: '/programmes/skill-acquisition', label: 'Skill Acquisition' },
      { href: '/programmes/youth-empowerment', label: 'Youth Empowerment' },
      { href: '/programmes/education-scholarships', label: 'Education' },
      { href: '/programmes/healthcare-welfare', label: 'Healthcare' },
      { href: '/programmes/innovation-entrepreneurship', label: 'Innovation' },
      { href: '/programmes/peacebuilding', label: 'Peacebuilding' },
      { href: '/programmes/humanitarian-support', label: 'Humanitarian' },
    ],
  },
  { href: '/news', label: 'News' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { scholarshipsEnabled } = useSiteSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setActiveDropdown(null); }, [pathname]);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-navy border-b border-navy-100/50'
          : 'bg-transparent'
      )}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-teal-gradient rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                {/* logo image needs to be pre-generated as /images/logo-sm.png */}
                <Image
                  src="/images/logo-sm.png"
                  alt="Kowa Namu Ne Foundation logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className={cn('font-display font-bold text-base leading-tight transition-colors duration-300', scrolled ? 'text-navy-800' : 'text-white')}>
                Kowa Namu Ne
              </div>
              <div className={cn('text-xs font-medium transition-colors duration-300', scrolled ? 'text-teal-600' : 'text-teal-300')}>
                Foundation
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      scrolled
                        ? isActive(link.href) ? 'text-teal-600' : 'text-navy-700 hover:text-navy-900 hover:bg-navy-50'
                        : isActive(link.href) ? 'text-gold-300' : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', activeDropdown === link.label && 'rotate-180')} />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-2xl shadow-navy-lg border border-navy-50 py-2 mt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-navy-700 hover:bg-teal-50 hover:text-teal-700 transition-colors duration-150"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    scrolled
                      ? isActive(link.href) ? 'text-teal-600 bg-teal-50' : 'text-navy-700 hover:text-navy-900 hover:bg-navy-50'
                      : isActive(link.href) ? 'text-gold-300' : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {scholarshipsEnabled && (
              <Link href="/apply" className="btn-gold text-sm px-5 py-2.5">
                Apply for Scholarship
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'lg:hidden p-2 rounded-xl transition-colors duration-200',
              scrolled ? 'text-navy-800 hover:bg-navy-50' : 'text-white hover:bg-white/10'
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-navy-100 shadow-navy-lg">
          <div className="container-xl py-4 space-y-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div className="px-4 py-2 text-xs font-bold text-navy-400 uppercase tracking-widest mt-2">
                    {link.label}
                  </div>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-6 py-2.5 text-sm text-navy-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'text-teal-600 bg-teal-50 font-semibold'
                      : 'text-navy-700 hover:text-navy-900 hover:bg-navy-50'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 pb-1">
              {scholarshipsEnabled && (
                <Link href="/apply" className="btn-gold w-full justify-center">
                  Apply for Scholarship
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
