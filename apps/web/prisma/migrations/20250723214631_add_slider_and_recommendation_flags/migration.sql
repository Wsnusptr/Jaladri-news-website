-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "isRecommendation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSlider" BOOLEAN NOT NULL DEFAULT false;
