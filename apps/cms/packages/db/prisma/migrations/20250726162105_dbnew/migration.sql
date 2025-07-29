/*
  Warnings:

  - You are about to drop the column `category` on the `articles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `articles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "category",
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToCategory_AB_unique" ON "_ArticleToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToCategory_B_index" ON "_ArticleToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- AddForeignKey
ALTER TABLE "_ArticleToCategory" ADD CONSTRAINT "_ArticleToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToCategory" ADD CONSTRAINT "_ArticleToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
