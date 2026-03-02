import AnimatedCounter from '@/components/ui/AnimatedCounter';

const STATS = [
  { end: 50000, suffix: '+', label: 'Lives Impacted', description: 'Individuals reached across all 36 states', icon: '🌍', color: 'teal' },
  { end: 8500,  suffix: '+', label: 'Students Supported', description: 'JAMB, WAEC & NECO scholarships awarded', icon: '🎓', color: 'gold' },
  { end: 5000,  suffix: '+', label: 'Youth Entrepreneurs', description: 'Mentored, funded, and supported', icon: '💼', color: 'teal' },
  { end: 200,   suffix: '+', label: 'Community Dialogues', description: 'Peace and civic engagement forums held', icon: '🕊️', color: 'gold' },
  { end: 18,    suffix: '',  label: 'Clean Water Projects', description: 'Communities with new water infrastructure', icon: '💧', color: 'teal' },
  { end: 3200,  suffix: '+', label: 'Skills Trained', description: 'Vocational and digital literacy graduates', icon: '⚡', color: 'gold' },
];

export default function ImpactSection() {
  return (
    <section className="section-pad bg-cream-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mb-5">Our Impact</div>
          <h2 className="section-title mb-4">
            Numbers That Tell
            <br />
            <span className="text-gradient-teal">the Real Story</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Every number is a life changed, a door opened, a future made possible.
          </p>
          <div className="divider-gold mx-auto mt-6" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="card-hover p-6 lg:p-8 text-center group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className={`font-display text-4xl lg:text-5xl font-bold mb-2 ${stat.color === 'gold' ? 'text-gold-600' : 'text-teal-600'}`}>
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-navy-800 text-sm mb-1">{stat.label}</div>
              <div className="text-navy-400 text-xs leading-relaxed">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
