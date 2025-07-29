// apps/web/lib/article-data.ts
// Re-export types from packages/db for backward compatibility
export type {
  LegacyArticle as Article,
  NetworkArticle,
  FeaturedStripItem,
  Video,
  ArticleWithRelations,
  CategoryInfo
} from '@repo/db';
