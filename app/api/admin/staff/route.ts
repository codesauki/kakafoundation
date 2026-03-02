import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const staff = await prisma.adminUser.findMany({ select: { id: true, name: true, email: true, role: true, isActive: true, lastLogin: true, createdAt: true }, orderBy: { createdAt: 'asc' } });
  return NextResponse.json(staff);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { name, email, password, role } = await req.json();
  if (!name || !email || !password) return NextResponse.json({ error: 'name, email, password required' }, { status: 400 });
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.adminUser.create({ data: { name, email, passwordHash, role: role ?? 'EDITOR' } });
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { id, ...data } = await req.json();
  if (data.password) { data.passwordHash = await bcrypt.hash(data.password, 12); delete data.password; }
  const user = await prisma.adminUser.update({ where: { id }, data, select: { id: true, name: true, email: true, role: true, isActive: true } });
  return NextResponse.json(user);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { id } = await req.json();
  await prisma.adminUser.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
