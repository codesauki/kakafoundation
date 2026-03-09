import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json({ error: 'Key parameter required' }, { status: 400 });
    }

    const setting = await prisma.siteSetting.findUnique({
      where: { key },
    });

    if (!setting) {
      return NextResponse.json({ error: 'Setting not found' }, { status: 404 });
    }

    // Only return public settings
    if (!setting.isPublic) {
      return NextResponse.json({ error: 'Setting not public' }, { status: 403 });
    }

    return NextResponse.json({
      key: setting.key,
      value: setting.value,
    });
  } catch (error) {
    console.error('Public settings GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}