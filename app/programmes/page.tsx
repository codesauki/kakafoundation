import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import CTASection from '@/components/sections/CTASection';
import { prisma } from '@/lib/db';

interface Programme { id: string; slug: string; icon: string; title: string; tagline: string; impact?: string | null; }

export const metadata: Metadata = { title: 'Our Programmes' };

async function getProgrammes() {
  try {
    return await prisma.programme.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
  } catch { return []; }
}

export default async function ProgrammesPage() {
  const programmes = await getProgrammes();

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 bg-navy-gradient overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-30" />
          <div className="container-xl relative z-10">
            <PageHeader tag="What We Do" title="Seven Pillars of" titleHighlight="Transformation" subtitle="Comprehensive, integrated programmes designed to uplift every dimension of community life across Nigeria." dark />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        <section className="section-pad bg-white">
          <div className="container-xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programmes.map((prog: Programme, i: number) => (
                <Link key={prog.id} href={`/programmes/${prog.slug}`} className="group card-hover p-8 block">
                  <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">{prog.icon}</div>
                  <div className={`w-10 h-1 mb-4 rounded-full transition-all duration-300 group-hover:w-16 ${i % 2 === 0 ? 'bg-teal-400' : 'bg-gold-400'}`} />
                  <h2 className="font-display text-xl font-semibold text-navy-800 mb-3 group-hover:text-teal-700 transition-colors">{prog.title}</h2>
                  <p className="text-navy-400 text-sm leading-relaxed mb-5">{prog.tagline}</p>
                  {prog.impact && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 rounded-full text-teal-700 text-xs font-semibold mb-5">
                      📊 {prog.impact}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-teal-600 text-sm font-semibold group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
