import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const adminPassword = process.env.ADMIN_PASSWORD || 'change-me';
  const hash = await bcrypt.hash(adminPassword, 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@kowanamunejoundation.org' },
    update: {},
    create: { name: 'Super Admin', email: 'admin@kowanamunejoundation.org', passwordHash: hash, role: 'SUPER_ADMIN' },
  });
  console.log('✅ Admin: admin@kowanamunejoundation.org (password via ADMIN_PASSWORD env var)');

  await prisma.founderProfile.upsert({
    where: { id: 'founder-main' },
    update: {},
    create: {
      id: 'founder-main',
      name: 'Hon. Abdulazeez Kaka',
      title: 'Founder & Visionary',
      subtitle: 'Chairman, APC Youth Stakeholders Forum',
      photoUrl: '/images/founder-portrait.png',
      bio: `Hon. Abdulazeez Kaka is a passionate advocate for youth empowerment, community development, and humanitarian service across Nigeria. Born with an unwavering commitment to the upliftment of the underserved, he has dedicated his public life to creating systems that give every Nigerian young person a fair chance at education, economic participation, and dignified living.\n\nAs Chairman of the APC Youth Stakeholders Forum, Hon. Kaka has leveraged his political standing not for personal advancement, but as a platform to channel resources, attention, and policy advocacy toward the communities that need it most.\n\nThe Kowa Namu Ne Foundation — whose name translates as "Come With Us" — is the institutional embodiment of his life's mission: to build bridges between Nigeria's promise and its people.`,
      vision: 'A Nigeria where every young person, regardless of geography or circumstance, has access to the education, skills, and opportunities they need to build a dignified and prosperous life.',
      quote: 'When we lift one, we lift all. Come with us — there is room for everyone.',
      achievements: {
        create: [
          { title: 'Founded Kowa Namu Ne Foundation', year: '2022', order: 1 },
          { title: 'Elected Chairman, APC Youth Stakeholders Forum', year: '2021', order: 2 },
          { title: 'Launched Nationwide Scholarship Programme', year: '2023', order: 3 },
          { title: 'Established 12 Community Health Clinics', year: '2023', order: 4 },
          { title: 'Empowered 5,000+ Youth Entrepreneurs', year: '2024', order: 5 },
        ],
      },
    },
  });

  const programmes = [
    { slug: 'skill-acquisition', title: 'Skill Acquisition & Capacity Building', icon: '🎓', tagline: 'Equipping youth for self-reliance', description: 'Comprehensive vocational training, digital literacy, and ICT education programmes for Nigerian youth. We run training centres across Nigeria offering certified programmes in software development, digital marketing, tailoring, electrical installation, and more.\n\nEvery participant receives a nationally recognised qualification, opening doors to employment and entrepreneurship.', impact: '3,200+ youth trained', order: 1 },
    { slug: 'youth-empowerment', title: 'Youth Empowerment & Economic Support', icon: '💼', tagline: 'Fuelling the entrepreneurs of tomorrow', description: 'We facilitate access to startup capital, mentorship, and business development support for young entrepreneurs. Our partnerships with microfinance institutions create accessible SME funding pathways, eliminating barriers that block young Nigerians from accessing capital.\n\nFinancial literacy workshops have equipped thousands with the knowledge to manage and grow their economic resources.', impact: '5,000+ entrepreneurs supported', order: 2 },
    { slug: 'education-scholarships', title: 'Education Support & Scholarships', icon: '📚', tagline: 'Every student deserves a chance', description: 'We provide scholarships for JAMB, WAEC, and NECO examination fees, educational materials, and career counselling to underprivileged students across all 36 states.\n\nOur school enrollment drives have brought thousands of out-of-school children back into the classroom. Through this portal, students can apply directly for examination sponsorship.', impact: '8,500+ students supported', order: 3 },
    { slug: 'healthcare-welfare', title: 'Healthcare Access & Community Welfare', icon: '🏥', tagline: 'Healthy communities, thriving futures', description: 'Mobile medical outreach units, free health check-up drives, and maternal and child health support across underserved communities. Our clean water initiative has brought potable water infrastructure to 18 communities.\n\nWe believe health is not a privilege — it is the foundation upon which every other form of human development depends.', impact: '50,000+ beneficiaries reached', order: 4 },
    { slug: 'innovation-entrepreneurship', title: 'Innovation & Entrepreneurship', icon: '💡', tagline: 'Building Nigeria\'s next innovators', description: 'Our innovation hub provides business incubation, technology training, and network access for early-stage startups. Priority is given to solutions addressing community challenges in healthcare, agriculture, education, and infrastructure.\n\nOur annual Innovation Challenge has produced dozens of viable businesses providing employment in local communities.', impact: '1,200+ innovators mentored', order: 5 },
    { slug: 'peacebuilding', title: 'Peacebuilding & Social Development', icon: '🕊️', tagline: 'Unity through dialogue', description: 'Community engagement, interfaith dialogue, and youth leadership forums promoting justice, equality, and unity. Annual youth summits bring young people from different backgrounds together to discuss governance, civic responsibility, and Nigeria\'s future.\n\nOur civic education curricula have reached schools across six states, planting seeds of democratic values.', impact: '200+ dialogues facilitated', order: 6 },
    { slug: 'humanitarian-support', title: 'General Humanitarian Support', icon: '🤝', tagline: 'Standing with communities in crisis', description: 'Rapid emergency relief for communities affected by disasters. Our humanitarian response network spans 14 states, enabling rapid coordination with government agencies and international NGOs.\n\nBeyond crisis response, our poverty alleviation programmes provide sustained support to vulnerable households including widow support, disability assistance, and food security.', impact: '25,000+ people in emergencies', order: 7 },
  ];

  for (const p of programmes) {
    await prisma.programme.upsert({ where: { slug: p.slug }, update: {}, create: { ...p, id: `prog-${p.slug}`, updatedAt: new Date() } });
  }

  const settings = [
    ['applications_open', 'true'],
    ['applications_cycle', '2026 Scholarship Cycle'],
    ['applications_deadline', '2026-06-30'],
    ['site_announcement', 'Applications for the 2026 Scholarship Cycle are now open. Apply before June 30, 2026.'],
    ['contact_phone', '+234 800 KNF HELP'],
    ['contact_email', 'info@kowanamunejoundation.org'],
    ['contact_address', 'Abuja, Federal Capital Territory, Nigeria'],
    ['social_twitter', 'https://twitter.com/KowaNamuNe'],
    ['social_facebook', 'https://facebook.com/KowaNamuNeFoundation'],
    ['social_instagram', 'https://instagram.com/KowaNamuNe'],
  ];
  for (const [key, value] of settings) {
    await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value, id: `setting-${key}`, updatedAt: new Date() } });
  }

  const newsItems = [
    { slug: '2026-scholarship-cycle-launch', title: 'Foundation Launches 2026 Scholarship Cycle for 10,000 Students', excerpt: 'Kowa Namu Ne Foundation has opened applications for its 2026 Education Support Programme, targeting examination sponsorship for 10,000 students across all 36 states.', content: 'The Kowa Namu Ne Foundation has formally launched its 2026 Scholarship Cycle, opening applications for examination sponsorship support targeting 10,000 students across all 36 Nigerian states.\n\nThis year\'s programme covers JAMB, WAEC, and NECO examination fees, in addition to study materials, revision guides, and career counselling sessions for all approved applicants.\n\n"Education is not a privilege reserved for the wealthy," said Hon. Abdulazeez Kaka at the launch. "Every Nigerian student deserves the opportunity to sit their examinations and prove their potential."\n\nApplications are open through the Foundation\'s official website portal. Students are encouraged to apply early, as slots are allocated on a first-come, first-reviewed basis.', category: 'Education', tags: ['Scholarship', 'Education', '2026'], isPublished: true, isFeatured: true, publishedAt: new Date('2026-01-15') },
    { slug: 'medical-outreach-yobe-2026', title: 'Foundation Medical Outreach Reaches 12 Communities in Yobe State', excerpt: 'Our mobile health team conducted free medical check-ups, distributed medications, and referred critical cases to partner hospitals across 12 communities.', content: 'The Kowa Namu Ne Foundation\'s Healthcare team successfully completed a three-week medical outreach programme across 12 communities in Yobe State, providing free consultations, medications, and maternal health services to over 4,200 beneficiaries.\n\nThe outreach covered communities including Damaturu, Potiskum, Gashua, and surrounding rural areas, including general check-ups, malaria screening, hypertension testing, and antenatal care.\n\nCritical cases were referred to partner hospitals with transport support to ensure specialised care.\n\n"No community should be left without access to basic healthcare," said the Foundation\'s Healthcare Coordinator.', category: 'Healthcare', tags: ['Healthcare', 'Outreach', 'Yobe'], isPublished: true, isFeatured: false, publishedAt: new Date('2026-02-08') },
    { slug: 'innovation-hub-graduates', title: 'Youth Innovation Hub Graduates First Cohort of 200 Tech Entrepreneurs', excerpt: "The Foundation's flagship innovation centre celebrates its inaugural cohort of 200 tech entrepreneurs, with 68% already generating revenue.", content: 'The Kowa Namu Ne Foundation Innovation Hub celebrated a landmark milestone as 200 young entrepreneurs graduated from its inaugural six-month business incubation programme, with 68% already generating revenue from technology ventures.\n\nThe cohort, drawn from 22 states, developed solutions spanning agricultural technology, health informatics, educational platforms, and e-commerce logistics.\n\nHon. Abdulazeez Kaka addressed the graduates: "You are proof that given the right environment and tools, Nigerian youth can build world-class businesses. This is just the beginning."\n\nApplications for the second cohort are now open.', category: 'Innovation', tags: ['Innovation', 'Entrepreneurship', 'Technology'], isPublished: true, isFeatured: true, publishedAt: new Date('2026-02-20') },
  ];
  for (const item of newsItems) {
    await prisma.news.upsert({ where: { slug: item.slug }, update: {}, create: { ...item, id: `news-${item.slug}`, authorName: 'Kowa Namu Ne Foundation' } });
  }

  console.log('✅ Database seeded successfully.');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
