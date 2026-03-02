import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({ where: { isPublished: true }, orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });
    return NextResponse.json(items);
  } catch { return NextResponse.json([]); }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const item = await prisma.galleryItem.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}
