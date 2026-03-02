import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { uploadImage } from '@/lib/cloudinary';
import { Buffer } from 'buffer';

// POST — public: submit new application
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const get = (key: string) => (formData.get(key) as string) ?? '';
    const examTypesRaw = get('examTypes');
    const examTypes = examTypesRaw ? examTypesRaw.split(',').filter(Boolean) : [];

    // Validate required fields
    const required = ['firstName', 'lastName', 'dateOfBirth', 'gender', 'state', 'lga', 'ward', 'address', 'phone', 'schoolName', 'schoolState', 'schoolLga', 'classLevel', 'examYear', 'statement'];
    for (const field of required) {
      if (!get(field)) return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
    if (examTypes.length === 0) return NextResponse.json({ error: 'Select at least one examination type' }, { status: 400 });

    // Check applications open
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'applications_open' } });
    if (setting?.value === 'false') {
      return NextResponse.json({ error: 'Applications are currently closed. Please check back later.' }, { status: 403 });
    }

    // Handle photo upload
    let photoUrl: string | undefined;
    let photoPublicId: string | undefined;
    const photo = formData.get('photo') as File | null;
    if (photo && photo.size > 0) {
      try {
        const buffer = Buffer.from(await photo.arrayBuffer());
        const result = await uploadImage(buffer, 'applications');
        photoUrl = result.url;
        photoPublicId = result.publicId;
      } catch (err) {
        console.error('Photo upload failed:', err);
        // Don't fail the whole submission for photo
      }
    }

    const application = await prisma.application.create({
      data: {
        firstName: get('firstName').trim(),
        middleName: get('middleName').trim() || null,
        lastName: get('lastName').trim(),
        dateOfBirth: new Date(get('dateOfBirth')),
        gender: get('gender'),
        state: get('state'),
        lga: get('lga'),
        ward: get('ward'),
        address: get('address').trim(),
        phone: get('phone').trim(),
        guardianName: get('guardianName').trim() || null,
        guardianPhone: get('guardianPhone').trim() || null,
        schoolName: get('schoolName').trim(),
        schoolState: get('schoolState'),
        schoolLga: get('schoolLga'),
        classLevel: get('classLevel'),
        examTypes,
        examYear: get('examYear'),
        prevAttempts: parseInt(get('prevAttempts') || '0', 10),
        statement: get('statement').trim(),
        photoUrl,
        photoPublicId,
      },
    });

    return NextResponse.json({ success: true, refNumber: application.refNumber, id: application.id }, { status: 201 });
  } catch (err: any) {
    console.error('Application submission error:', err);
    return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 });
  }
}

// GET — admin only: list applications
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '20');
  const status = searchParams.get('status') ?? undefined;
  const state = searchParams.get('state') ?? undefined;
  const search = searchParams.get('search') ?? undefined;

  const where: any = {};
  if (status) where.status = status;
  if (state) where.state = state;
  if (search) where.OR = [
    { firstName: { contains: search, mode: 'insensitive' } },
    { lastName: { contains: search, mode: 'insensitive' } },
    { phone: { contains: search } },
    { refNumber: { contains: search, mode: 'insensitive' } },
    { schoolName: { contains: search, mode: 'insensitive' } },
  ];

  const [total, applications] = await Promise.all([
    prisma.application.count({ where }),
    prisma.application.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true, refNumber: true, firstName: true, lastName: true,
        state: true, lga: true, phone: true, classLevel: true,
        examTypes: true, examYear: true, status: true, createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({ applications, total, page, pages: Math.ceil(total / limit) });
}
