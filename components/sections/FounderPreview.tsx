import Link from 'next/link';
import Image from 'next/image';
import { Quote, ArrowRight } from 'lucide-react';

export default function FounderPreview() {
  return (
    <section className="section-pad bg-navy-gradient relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl" />

      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Portrait */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto lg:mx-0 w-72 h-80 sm:w-80 sm:h-96">
              {/* Frame decorations */}
              <div className="absolute -inset-4 border border-teal-500/20 rounded-3xl" />
              <div className="absolute -inset-8 border border-gold-500/10 rounded-3xl" />

              {/* Gold accent corner */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-gold-500 rounded-tl-2xl" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-teal-400 rounded-br-2xl" />

              {/* Photo placeholder */}
              <div className="w-full h-full rounded-2xl bg-navy-700 overflow-hidden">
                <Image
                  src="/images/founder-portrait.png"
                  alt="Hon. Abdulazeez Kaka - Founder & Chairman"
                  width={400}
                  height={500}
                  priority
                  quality={85}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gold-gradient px-5 py-2.5 rounded-full shadow-gold whitespace-nowrap">
                <span className="text-navy-900 text-xs font-bold">Founder & Chairman</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full text-xs font-semibold text-gold-300 tracking-widest uppercase mb-6">
              About Our Founder
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight mb-2">
              Hon. Abdulazeez
            </h2>
            <h2 className="font-display text-4xl sm:text-5xl text-gold-400 leading-tight mb-6">
              Kaka
            </h2>

            <div className="divider-gold mb-6" />

            {/* Quote */}
            <div className="relative mb-8">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-teal-500/40" />
              <blockquote className="pl-6 border-l-2 border-teal-500/40">
                <p className="text-white/85 text-lg leading-relaxed italic font-display">
                  When we lift one, we lift all. Come with us — there is room for everyone.
                </p>
              </blockquote>
            </div>

            <p className="text-navy-300 leading-relaxed mb-8">
              Chairman of the APC Youth Stakeholders Forum and visionary founder of the Kowa Namu Ne Foundation, Hon. Kaka has dedicated his public service to transforming the lives of Nigeria's youth and underserved communities.
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                'Founded Kowa Namu Ne Foundation (2022)',
                'APC Youth Stakeholders Forum Chairman',
                'Launched National Scholarship Programme',
                '5,000+ Entrepreneurs Empowered',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
                  <span className="text-navy-300 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/founder" className="btn-outline-white">
              Full Biography <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
