import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { deleteImage } from '@/lib/cloudinary';

interface Ctx { params: { id: string } }

// GET single application
export async function GET(_: NextRequest, { params }: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const app = await prisma.application.findUnique({ where: { id: params.id } });
  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(app);
}

// PATCH — update status, admin notes
export async function PATCH(req: NextRequest, { params }: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { status, adminNotes } = body;

  const updated = await prisma.application.update({
    where: { id: params.id },
    data: {
      ...(status && { status, reviewedAt: new Date(), reviewedBy: (session.user as any).email }),
      ...(adminNotes !== undefined && { adminNotes }),
    },
  });
  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(_: NextRequest, { params }: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const app = await prisma.application.findUnique({ where: { id: params.id } });
  if (app?.photoPublicId) {
    try { await deleteImage(app.photoPublicId); } catch { /* ignore */ }
  }

  await prisma.application.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
