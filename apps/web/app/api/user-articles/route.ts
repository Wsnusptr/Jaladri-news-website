// apps/web/app/api/user-articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@repo/db";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, category, imageUrl, type } = body;

    if (!title || !content || !category || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    // Check if category exists (convert to lowercase for slug matching)
    const categorySlug = category.toLowerCase();
    const categoryRecord = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!categoryRecord) {
      return NextResponse.json({ error: `Category with slug '${categorySlug}' not found.` }, { status: 400 });
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        imageUrl,
        type: type || "JALADRI_NETWORK", // Default to JALADRI_NETWORK
        status: "DRAFT", // Articles start as drafts and need admin approval
        authorId: session.user.id,
        slug,
        categories: { connect: [{ id: categoryRecord.id }] },
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error creating user article:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
