import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key) {
      // Get specific setting
      const setting = await prisma.siteSettings.findUnique({
        where: { key },
      });

      if (!setting) {
        return NextResponse.json({ error: 'Setting not found' }, { status: 404 });
      }

      return NextResponse.json({
        key: setting.key,
        value: setting.value,
        description: setting.description,
      });
    } else {
      // Get all settings (admin only)
      const settings = await prisma.siteSettings.findMany({
        orderBy: { updatedAt: 'desc' },
      });

      return NextResponse.json(settings);
    }
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { key, value, description } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    const setting = await prisma.siteSettings.upsert({
      where: { key },
      update: {
        value,
        description,
        updatedBy: (session.user as any)?.id,
        updatedAt: new Date(),
      },
      create: {
        key,
        value,
        description,
        updatedBy: (session.user as any)?.id,
      },
    });

    return NextResponse.json({
      key: setting.key,
      value: setting.value,
      description: setting.description,
    });
  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}