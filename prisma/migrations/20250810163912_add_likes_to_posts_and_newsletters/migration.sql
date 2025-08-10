/*
  Warnings:

  - You are about to drop the column `total_likes` on the `NewsLetter` table. All the data in the column will be lost.
  - You are about to drop the column `total_likes` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NewsLetter" DROP COLUMN "total_likes";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "total_likes";

-- CreateTable
CREATE TABLE "PostLike" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterLike" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "newsletter_id" INTEGER NOT NULL,

    CONSTRAINT "NewsletterLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterLike_user_id_newsletter_id_key" ON "NewsletterLike"("user_id", "newsletter_id");

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsletterLike" ADD CONSTRAINT "NewsletterLike_newsletter_id_fkey" FOREIGN KEY ("newsletter_id") REFERENCES "NewsLetter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsletterLike" ADD CONSTRAINT "NewsletterLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
