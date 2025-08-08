/*
  Warnings:

  - You are about to drop the column `images` on the `NewsLetter` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NewsLetter" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterImage" (
    "id" SERIAL NOT NULL,
    "newsletter_id" INTEGER NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "NewsletterImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectImage" ADD CONSTRAINT "ProjectImage_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsletterImage" ADD CONSTRAINT "NewsletterImage_newsletter_id_fkey" FOREIGN KEY ("newsletter_id") REFERENCES "NewsLetter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
