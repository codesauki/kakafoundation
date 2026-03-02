import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { prisma } from '@/lib/db';
import { formatDateShort } from '@/lib/utils';

interface NewsItem { id: string; title: string; slug: string; excerpt: string; coverImage?: string | null; category?: string; publishedAt?: Date | null; }

async function getLatestNews() {
  try {
    return await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, category: true, publishedAt: true },
    });
  } catch { return []; }
}

export default async function NewsSection() {
  const news = await getLatestNews();

  return (
    <section className="section-pad bg-cream-gradient">
      <div className="container-xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-tag mb-4">Latest News</div>
            <h2 className="section-title">Stories of <span className="text-gradient-teal">Impact</span></h2>
          </div>
          <Link href="/news" className="btn-outline text-sm shrink-0">
            View All News <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-16 text-navy-400">News articles will appear here once published.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((article: NewsItem, i: number) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group card-hover overflow-hidden block">
                <div className={`h-48 ${i === 0 ? 'bg-navy-gradient' : 'bg-teal-gradient'} flex items-center justify-center overflow-hidden`}>
                  {article.coverImage ? (
                    <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="text-white/20 font-display text-6xl">📰</div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="badge bg-teal-50 text-teal-700 border border-teal-100">{article.category}</span>
                    {article.publishedAt && (
                      <span className="flex items-center gap-1 text-xs text-navy-400">
                        <Calendar className="w-3 h-3" />
                        {formatDateShort(article.publishedAt)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy-800 mb-2 leading-tight group-hover:text-teal-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-navy-400 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-teal-600 text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                    Read story <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
