import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const onlyPublished = searchParams.get('admin') !== 'true';

  const news = await prisma.news.findMany({
    where: onlyPublished ? { isPublished: true } : undefined,
    orderBy: { publishedAt: 'desc' },
  });
  return NextResponse.json(news);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { title, excerpt, content, category, tags, isPublished, isFeatured, coverImage, authorName } = body;

  if (!title || !excerpt || !content) {
    return NextResponse.json({ error: 'Title, excerpt, and content are required' }, { status: 400 });
  }

  const slug = `${slugify(title)}-${Date.now()}`;
  const article = await prisma.news.create({
    data: {
      title, slug, excerpt, content,
      category: category || 'News',
      tags: tags || [],
      isPublished: isPublished ?? false,
      isFeatured: isFeatured ?? false,
      coverImage: coverImage || null,
      authorName: authorName || 'Kowa Namu Ne Foundation',
      publishedAt: isPublished ? new Date() : null,
    },
  });

  return NextResponse.json(article, { status: 201 });
}
