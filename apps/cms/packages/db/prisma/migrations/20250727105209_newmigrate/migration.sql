-- AlterTable
ALTER TABLE "_ArticleToCategory" ADD CONSTRAINT "_ArticleToCategory_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ArticleToCategory_AB_unique";
