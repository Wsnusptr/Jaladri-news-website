-- CreateTable
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" VARCHAR(36) NOT NULL,
    "checksum" VARCHAR(64) NOT NULL,
    "finished_at" TIMESTAMP WITH TIME ZONE,
    "migration_name" VARCHAR(255) NOT NULL,
    "logs" TEXT,
    "rolled_back_at" TIMESTAMP WITH TIME ZONE,
    "started_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "applied_steps_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "_prisma_migrations_name" ON "_prisma_migrations"("migration_name");