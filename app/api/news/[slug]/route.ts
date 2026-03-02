import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

interface Ctx { params: { slug: string } }

export async function GET(_: NextRequest, { params }: Ctx) {
  const article = await prisma.news.findUnique({ where: { slug: params.slug } });
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { title, excerpt, content, category, tags, isPublished, isFeatured, coverImage, authorName } = body;

  const current = await prisma.news.findUnique({ where: { slug: params.slug } });
  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const updated = await prisma.news.update({
    where: { slug: params.slug },
    data: {
      ...(title && { title }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content !== undefined && { content }),
      ...(category !== undefined && { category }),
      ...(tags !== undefined && { tags }),
      ...(isPublished !== undefined && {
        isPublished,
        publishedAt: isPublished && !current.publishedAt ? new Date() : current.publishedAt,
      }),
      ...(isFeatured !== undefined && { isFeatured }),
      ...(coverImage !== undefined && { coverImage }),
      ...(authorName !== undefined && { authorName }),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.news.delete({ where: { slug: params.slug } });
  return NextResponse.json({ success: true });
}
