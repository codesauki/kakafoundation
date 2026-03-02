import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import { prisma } from '@/lib/db';
import { formatDateShort } from '@/lib/utils';

interface NewsArticle { id: string; slug: string; isFeatured: boolean; coverImage?: string | null; title: string; excerpt: string; publishedAt?: Date | null; category?: string; }

export const metadata: Metadata = { title: 'News & Updates' };

async function getNews() {
  try {
    return await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
  } catch { return []; }
}

export default async function NewsPage() {
  const news = await getNews();
  const featured = news.filter((n: NewsArticle) => n.isFeatured).slice(0, 1)[0];
  const rest = news.filter((n: NewsArticle) => !featured || n.id !== featured.id) as NewsArticle[];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 bg-navy-gradient overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-30" />
          <div className="container-xl relative z-10">
            <PageHeader tag="News & Updates" title="Stories of" titleHighlight="Impact" subtitle="The latest news, announcements, and stories from the Kowa Namu Ne Foundation and the communities we serve." dark />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        <section className="section-pad bg-white">
          <div className="container-xl">
            {news.length === 0 ? (
              <div className="text-center py-24 text-navy-400">
                <div className="text-5xl mb-4">📰</div>
                <p className="text-lg font-medium">No news published yet.</p>
                <p className="text-sm mt-2">Check back soon for updates from the Foundation.</p>
              </div>
            ) : (
              <>
                {/* Featured */}
                {featured && (
                  <div className="mb-12">
                    <div className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-4">Featured Story</div>
                    <Link href={`/news/${featured.slug}`} className="group grid lg:grid-cols-2 gap-8 card-hover overflow-hidden block">
                      <div className="h-64 lg:h-auto bg-navy-gradient flex items-center justify-center overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
                        {featured.coverImage ? (
                          <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <span className="text-7xl text-white/20">📰</span>
                        )}
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="badge bg-gold-50 text-gold-700 border border-gold-200">{featured.category}</span>
                          {featured.publishedAt && (
                            <span className="flex items-center gap-1.5 text-xs text-navy-400">
                              <Calendar className="w-3 h-3" /> {formatDateShort(featured.publishedAt)}
                            </span>
                          )}
                        </div>
                        <h2 className="font-display text-2xl lg:text-3xl text-navy-800 font-semibold mb-4 leading-tight group-hover:text-teal-700 transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-navy-500 leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                        <div className="flex items-center gap-2 text-teal-600 font-semibold group-hover:gap-4 transition-all duration-200">
                          Read full story <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Grid */}
                {rest.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((article: NewsArticle) => (
                      <Link key={article.id} href={`/news/${article.slug}`} className="group card-hover block overflow-hidden">
                        <div className="h-44 bg-teal-gradient overflow-hidden flex items-center justify-center">
                          {article.coverImage ? (
                            <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <span className="text-5xl text-white/20">📰</span>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="badge bg-teal-50 text-teal-700 border border-teal-100 text-xs">{article.category}</span>
                            {article.publishedAt && (
                              <span className="text-xs text-navy-400">{formatDateShort(article.publishedAt)}</span>
                            )}
                          </div>
                          <h3 className="font-display text-lg font-semibold text-navy-800 mb-2 leading-tight group-hover:text-teal-700 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-navy-400 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                          <div className="flex items-center gap-1.5 text-teal-600 text-sm font-semibold group-hover:gap-3 transition-all">
                            Read more <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
