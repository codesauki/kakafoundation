import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const founder = await prisma.founderProfile.findFirst({ include: { achievements: { orderBy: { order: 'asc' } } } });
  return NextResponse.json(founder);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { name, title, subtitle, bio, vision, quote, photoUrl, photoPublicId, email, phone, twitter, linkedin, facebook, achievements } = body;

  const existing = await prisma.founderProfile.findFirst();

  if (existing) {
    if (achievements) {
      await prisma.achievement.deleteMany({ where: { founderId: existing.id } });
    }
    const updated = await prisma.founderProfile.update({
      where: { id: existing.id },
      data: {
        ...(name !== undefined && { name }),
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(bio !== undefined && { bio }),
        ...(vision !== undefined && { vision }),
        ...(quote !== undefined && { quote }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(photoPublicId !== undefined && { photoPublicId }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(twitter !== undefined && { twitter }),
        ...(linkedin !== undefined && { linkedin }),
        ...(facebook !== undefined && { facebook }),
        ...(achievements && {
          achievements: {
            create: achievements.map((a: any, i: number) => ({ title: a.title, year: a.year, order: i })),
          },
        }),
      },
      include: { achievements: { orderBy: { order: 'asc' } } },
    });
    return NextResponse.json(updated);
  } else {
    const created = await prisma.founderProfile.create({
      data: {
        id: 'founder-profile-main',
        name: name ?? 'Hon. Abdulazeez Kaka',
        title: title ?? 'Founder & Visionary',
        subtitle: subtitle ?? 'Chairman, APC Youth Stakeholders Forum',
        bio: bio ?? '',
        vision, quote, photoUrl, photoPublicId, email, phone, twitter, linkedin, facebook,
        ...(achievements && {
          achievements: { create: achievements.map((a: any, i: number) => ({ title: a.title, year: a.year, order: i })) },
        }),
      },
      include: { achievements: true },
    });
    return NextResponse.json(created, { status: 201 });
  }
}
