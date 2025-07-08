-- AlterTable
ALTER TABLE "Achieviment" ALTER COLUMN "progress" SET DEFAULT 0,
ALTER COLUMN "completed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "NewsLetter" ALTER COLUMN "total_likes" SET DEFAULT 0,
ALTER COLUMN "total_views" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "total_likes" SET DEFAULT 0,
ALTER COLUMN "total_views" SET DEFAULT 0;
