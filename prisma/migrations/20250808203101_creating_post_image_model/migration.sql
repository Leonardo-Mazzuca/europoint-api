/*
  Warnings:

  - You are about to drop the column `images` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "PostImage" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
