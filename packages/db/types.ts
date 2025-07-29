// packages/db/types.ts
import type { Article, User, Category, LiveTV, LiveTVComment, PostType, ArticleStatus, Role, NotificationType } from '@prisma/client';

// Extended types with relations
export type ArticleWithRelations = Article & {
  author?: Pick<User, 'id' | 'name' | 'email'> | null;
  categories: Pick<Category, 'id' | 'name' | 'slug'>[];
};

export type UserWithRelations = User & {
  articles?: Article[];
};

export type LiveTVWithRelations = LiveTV & {
  createdBy?: Pick<User, 'id' | 'name'> | null;
  comments?: LiveTVCommentWithUser[];
};

export type LiveTVCommentWithUser = LiveTVComment & {
  user: Pick<User, 'id' | 'name'>;
};

// Component types for UI
export type ArticleCardProps = {
  article: ArticleWithRelations;
};

export type CategoryInfo = {
  title: string;
  description: string;
  type?: string;
};

// Legacy types for existing components
export interface LegacyArticle {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  category?: string;
  categoryColor?: string;
  timestamp?: string;
  url?: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
  createdAt?: Date | string;
  viewCount?: number;
  trendingScore?: number;
  author?: {
    name?: string;
    avatar?: string;
  };
}

export interface NetworkArticle {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  url: string;
  network: {
    name: string;
    logoUrl: string;
  };
}

export interface FeaturedStripItem {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  url: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  timestamp: string;
  url: string;
}

// Export Prisma types
export type {
  Article,
  User,
  Category,
  LiveTV,
  LiveTVComment,
  PostType,
  ArticleStatus,
  Role,
  NotificationType
};
