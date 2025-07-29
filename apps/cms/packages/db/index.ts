// packages/db/index.ts
import { PrismaClient, PostType, ArticleStatus, Role, Prisma } from '@prisma/client';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export { pool };

// -- FUNGSI-FUNGSI PENGAMBILAN DATA ANDA SEKARANG ADA DI SINI --

export async function getArticles(options: {
  type?: PostType,
  status?: ArticleStatus,
  includeAuthor?: boolean
} = {}) {
  const { type, status = 'PUBLISHED', includeAuthor } = options;

  // During build time, return empty array to avoid database connection issues
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    console.warn("Database not available during build, returning empty array");
    return [];
  }

  try {
    const articles = await prisma.article.findMany({
      where: {
        ...(status && { status }),
        ...(type && { type })
      },
      include: {
        author: !!includeAuthor,
        categories: true
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return articles;
  } catch (error) {
    console.error("Database Error (getArticles):", error);
    return [];
  }
}

export async function getHotNewsArticles() {
  // During build time, return empty array to avoid database connection issues
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    console.warn("Database not available during build, returning empty array");
    return [];
  }

  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        isHotNews: true
      },
      include: {
        author: true,
        categories: true
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
    return articles;
  } catch (error) {
    console.error("Database Error (getHotNewsArticles):", error);
    return [];
  }
}

export async function getSliderArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        isSlider: true
      },
      include: {
        author: true,
        categories: true
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return articles;
  } catch (error) {
    console.error("Database Error (getSliderArticles):", error);
    return [];
  }
}

export async function getRecommendationArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        isRecommendation: true
      },
      include: {
        author: true,
        categories: true
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return articles;
  } catch (error) {
    console.error("Database Error (getRecommendationArticles):", error);
    return [];
  }
}

export async function getArticleById(id: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
        categories: true
      }
    });
    return article;
  } catch (error) {
    console.error("Database Error (getArticleById):", error);
    return null;
  }
}

// Live TV Comments Functions
export async function getLiveTVComments(liveTVId: string) {
  try {
    const comments = await prisma.liveTVComment.findMany({
      where: { liveTVId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return comments;
  } catch (error) {
    console.error("Database Error (getLiveTVComments):", error);
    return [];
  }
}

export async function createLiveTVComment(data: {
  liveTVId: string;
  userId: string;
  message: string;
}) {
  try {
    const comment = await prisma.liveTVComment.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
    return comment;
  } catch (error) {
    console.error("Database Error (createLiveTVComment):", error);
    return null;
  }
}

export async function deleteLiveTVComment(id: string, userId: string) {
  try {
    // Only allow users to delete their own comments or admins to delete any comment
    const comment = await prisma.liveTVComment.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!comment) {
      return { success: false, error: 'Comment not found' };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Check if user owns the comment or is an admin
    if (comment.userId !== userId && user.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' };
    }

    await prisma.liveTVComment.delete({
      where: { id }
    });

    return { success: true };
  } catch (error) {
    console.error("Database Error (deleteLiveTVComment):", error);
    return { success: false, error: 'Database error' };
  }
}

export * from '@prisma/client';
export * from './types';