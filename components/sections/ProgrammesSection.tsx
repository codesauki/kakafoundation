import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PROGRAMMES = [
  { slug: 'skill-acquisition', icon: '🎓', title: 'Skill Acquisition', tagline: 'Vocational & digital training for self-reliance', color: 'teal' },
  { slug: 'youth-empowerment', icon: '💼', title: 'Youth Empowerment', tagline: 'SME funding, mentorship & financial literacy', color: 'gold' },
  { slug: 'education-scholarships', icon: '📚', title: 'Education & Scholarships', tagline: 'JAMB, WAEC, NECO sponsorship for all students', color: 'teal' },
  { slug: 'healthcare-welfare', icon: '🏥', title: 'Healthcare Access', tagline: 'Free medical outreach & clean water projects', color: 'gold' },
  { slug: 'innovation-entrepreneurship', icon: '💡', title: 'Innovation Hub', tagline: 'Incubation, technology & startup support', color: 'teal' },
  { slug: 'peacebuilding', icon: '🕊️', title: 'Peacebuilding', tagline: 'Community dialogue & civic leadership', color: 'gold' },
  { slug: 'humanitarian-support', icon: '🤝', title: 'Humanitarian Aid', tagline: 'Emergency relief & poverty alleviation', color: 'teal' },
];

export default function ProgrammesSection() {
  return (
    <section className="section-pad bg-white relative">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="section-tag mb-5">What We Do</div>
            <h2 className="section-title mb-4">
              Seven Pillars of
              <br />
              <span className="text-gradient-teal">Transformation</span>
            </h2>
            <div className="divider-teal" />
          </div>
          <p className="section-subtitle lg:text-right max-w-md">
            Comprehensive, integrated programmes designed to uplift every dimension of community life.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PROGRAMMES.map((prog, i) => (
            <Link
              key={prog.slug}
              href={`/programmes/${prog.slug}`}
              className={`group card-hover p-6 ${i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {prog.icon}
              </div>
              <div className={`w-8 h-0.5 mb-3 rounded-full transition-all duration-300 group-hover:w-12 ${prog.color === 'gold' ? 'bg-gold-400' : 'bg-teal-400'}`} />
              <h3 className="font-display text-lg font-semibold text-navy-800 mb-2 leading-tight group-hover:text-teal-700 transition-colors">
                {prog.title}
              </h3>
              <p className="text-navy-400 text-sm leading-relaxed mb-4">{prog.tagline}</p>
              <div className={`flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2.5 ${prog.color === 'gold' ? 'text-gold-600' : 'text-teal-600'}`}>
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}

          {/* CTA card */}
          <div className="card bg-navy-gradient p-6 flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-4">✨</div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">Be Part of the Change</h3>
              <p className="text-navy-300 text-sm leading-relaxed mb-6">Join us in transforming lives across Nigeria.</p>
            </div>
            <Link href="/contact" className="btn-gold text-sm px-4 py-2.5 w-full justify-center">
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
