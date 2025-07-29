// api/articles/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { PostType } from '@repo/db';
import { prisma } from '@repo/db';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 100);
}

// Header CORS untuk mengizinkan permintaan dari CMS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // saat sudah produksi, ganti '*' dengan URL CMS Anda
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handler untuk permintaan OPTIONS (pre-flight request)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') as PostType | null;
  const status = searchParams.get('status');

  try {
    let whereClause: any = {};
    if (type) whereClause.type = type;
    
    // If status is explicitly requested (for CMS), use it
    // Otherwise, default to PUBLISHED only (for website)
    if (status) {
      whereClause.status = status;
    } else {
      whereClause.status = "PUBLISHED";
    }
    
    const articles = await prisma.article.findMany({
      where: whereClause,
      include: {
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(articles, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500, headers: corsHeaders });
  }
}

// FUNGSI UNTUK MEMBUAT ARTIKEL (ADMIN CREATED - AUTOMATICALLY PUBLISHED)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newArticle = await prisma.article.create({
      data: {
        title: data.title,
        slug: generateSlug(data.title),
        content: data.content,
        imageUrl: data.imageUrl,
        type: data.type || "JALADRI_NETWORK",
        status: data.status || "PUBLISHED", // Admin-created articles default to published
        authorId: data.authorId, // Include author ID for admin-created articles
        categories: data.categories ? {
          connect: data.categories.map((id: string) => ({ id }))
        } : undefined,
      },
    });
    
    return NextResponse.json(newArticle, { status: 201, headers: corsHeaders }); // 201 = Created
  } catch (error) {
    console.error("Failed to create article:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500, headers: corsHeaders });
  }
}