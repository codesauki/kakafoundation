import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Security check - require a secret key to prevent unauthorized access
    const authHeader = req.headers.get('authorization');
    const seedSecret = process.env.SEED_SECRET || 'dev-seed-key';
    
    if (authHeader !== `Bearer ${seedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🌱 Starting database seed...');

    // Create admin user
    const adminPassword = process.env.ADMIN_PASSWORD || 'change-me';
    const hash = await bcrypt.hash(adminPassword, 12);
    await prisma.adminUser.upsert({
      where: { email: 'admin@kowanamunejoundation.org' },
      update: {},
      create: { 
        name: 'Super Admin', 
        email: 'admin@kowanamunejoundation.org', 
        passwordHash: hash, 
        role: 'SUPER_ADMIN' 
      },
    });
    console.log('✅ Admin user created (password via ADMIN_PASSWORD env var)');

    // Create founder profile
    await prisma.founderProfile.upsert({
      where: { id: 'founder-main' },
      update: {},
      create: {
        id: 'founder-main',
        name: 'Hon. Abdulazeez Kaka',
        title: 'Founder & Visionary',
        subtitle: 'Chairman, APC Youth Stakeholders Forum',
        bio: 'Biography loaded from database',
        vision: 'A Nigeria where every young person has access to opportunities.',
        quote: 'When we lift one, we lift all. Come with us — there is room for everyone.',
      },
    });
    console.log('✅ Founder profile created');

    // Create site settings
    const settings = [
      { key: 'site_title', value: 'Kowa Namu Ne Foundation' },
      { key: 'site_description', value: 'Building a Nigeria where every young person thrives.' },
      { key: 'applications_open', value: 'true' },
    ];

    for (const setting of settings) {
      await prisma.siteSetting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: {
          id: `setting-${setting.key}`,
          key: setting.key,
          value: setting.value,
        },
      });
    }
    console.log('✅ Site settings created');

    // Create programmes
    const programmes = [
      { slug: 'skill-acquisition', title: 'Skill Acquisition', icon: '🎓', desc: 'Vocational and digital skills training for self-reliance' },
      { slug: 'youth-empowerment', title: 'Youth Empowerment', icon: '💼', desc: 'SME funding, mentorship and financial literacy' },
      { slug: 'education-scholarships', title: 'Education & Scholarships', icon: '📚', desc: 'JAMB, WAEC, NECO sponsorship for all students' },
      { slug: 'healthcare-welfare', title: 'Healthcare Access', icon: '🏥', desc: 'Free medical outreach and clean water projects' },
      { slug: 'innovation-entrepreneurship', title: 'Innovation Hub', icon: '💡', desc: 'Incubation, technology and startup support' },
      { slug: 'peacebuilding', title: 'Peacebuilding', icon: '🕊️', desc: 'Community dialogue and civic leadership' },
      { slug: 'humanitarian-support', title: 'Humanitarian Aid', icon: '🤝', desc: 'Emergency relief and poverty alleviation' },
    ];

    for (let i = 0; i < programmes.length; i++) {
      const prog = programmes[i];
      await prisma.programme.upsert({
        where: { slug: prog.slug },
        update: {},
        create: {
          id: `prog-${prog.slug}`,
          slug: prog.slug,
          title: prog.title,
          icon: prog.icon,
          tagline: prog.title,
          description: prog.desc,
          order: i + 1,
        },
      });
    }
    console.log('✅ Programmes created');

    return NextResponse.json({
      success: true,
      message: '🌱 Database seeded successfully!',
      data: {
        admin: 'admin@kowanamunejoundation.org (password via ADMIN_PASSWORD env var)',
        founder: 'Hon. Abdulazeez Kaka',
        programmes: programmes.length,
        settings: settings.length,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: (error as any).message || 'Seed failed' },
      { status: 500 }
    );
  }
}
