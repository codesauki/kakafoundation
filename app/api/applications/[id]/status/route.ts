import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const app = await prisma.application.findFirst({
    where: { OR: [{ id: params.id }, { refNumber: params.id }] },
    select: { refNumber: true, firstName: true, lastName: true, status: true, createdAt: true, reviewedAt: true, examTypes: true, examYear: true },
  });
  if (!app) return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  return NextResponse.json(app);
}
