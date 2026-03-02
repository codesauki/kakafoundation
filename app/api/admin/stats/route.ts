import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(today); monthAgo.setMonth(monthAgo.getMonth() - 1);

  const [
    total, todayCount, weekCount, monthCount,
    pending, underReview, approved, rejected, sponsored,
    byState, byExam, recentApplications, dailyTrend,
  ] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({ where: { createdAt: { gte: today } } }),
    prisma.application.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.application.count({ where: { createdAt: { gte: monthAgo } } }),
    prisma.application.count({ where: { status: 'PENDING' } }),
    prisma.application.count({ where: { status: 'UNDER_REVIEW' } }),
    prisma.application.count({ where: { status: 'APPROVED' } }),
    prisma.application.count({ where: { status: 'REJECTED' } }),
    prisma.application.count({ where: { status: 'SPONSORED' } }),
    prisma.application.groupBy({ by: ['state'], _count: { id: true }, orderBy: { _count: { id: 'desc' } }, take: 10 }),
    prisma.$queryRaw`SELECT unnest("examTypes") as exam, COUNT(*) as count FROM applications GROUP BY exam ORDER BY count DESC` as any,
    prisma.application.findMany({
      orderBy: { createdAt: 'desc' }, take: 5,
      select: { id: true, refNumber: true, firstName: true, lastName: true, state: true, status: true, createdAt: true },
    }),
    prisma.$queryRaw`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM applications
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    ` as any,
  ]);

  return NextResponse.json({
    total, todayCount, weekCount, monthCount,
    statusBreakdown: { pending, underReview, approved, rejected, sponsored },
    byState: byState.map((s: any) => ({ state: s.state, count: s._count.id })),
    byExam: Array.isArray(byExam) ? byExam.map((e: any) => ({ exam: e.exam, count: Number(e.count) })) : [],
    recentApplications,
    dailyTrend: Array.isArray(dailyTrend) ? dailyTrend.map((d: any) => ({
      date: d.date?.toISOString?.()?.split('T')[0] ?? d.date,
      count: Number(d.count),
    })) : [],
  });
}
