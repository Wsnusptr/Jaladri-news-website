-- CreateTable
CREATE TABLE "live_tv_comments" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "liveTVId" TEXT NOT NULL,

    CONSTRAINT "live_tv_comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "live_tv_comments" ADD CONSTRAINT "live_tv_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "live_tv_comments" ADD CONSTRAINT "live_tv_comments_liveTVId_fkey" FOREIGN KEY ("liveTVId") REFERENCES "live_tv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
