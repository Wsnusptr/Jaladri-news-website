// Impor fungsi dari package database kita, bukan dari mock data
import { getArticleBySlug, getRelatedArticles } from '@repo/db';
import { notFound } from 'next/navigation';
import { ArticleView } from '@/components/articles/ArticleView';

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  if (!slug) {
    notFound();
  }

  const article = await getArticleBySlug(slug);

  // Jika tidak ditemukan di database, tampilkan 404
  if (!article) {
    notFound();
  }

  // PERBAIKAN: Mengambil berita terkait dengan cara yang jauh lebih efisien
  const related = await getRelatedArticles({
    categoryIds: article.categories.map(c => c.id),
    currentArticleId: article.id,
    limit: 3,
  });

  const relatedArticles = related.map(a => ({
    ...a,
    // PERBAIKAN: Pastikan URL juga menggunakan slug
    url: `/news/${a.slug}`,
    timestamp: new Date(a.createdAt).toLocaleDateString('id-ID'),
    category: a.categories[0]?.name || 'Umum',
  }));

  return <ArticleView article={article} relatedArticles={relatedArticles as any} />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return { title: 'Berita Tidak Ditemukan' };
  }
  return {
    title: article.title,
    description: article.content.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160),
      images: article.imageUrl ? [article.imageUrl] : [],
    },
  };
}
