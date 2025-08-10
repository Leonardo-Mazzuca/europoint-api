/*
  Warnings:

  - A unique constraint covering the columns `[user_id,post_id]` on the table `PostLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PostLike_user_id_post_id_key" ON "PostLike"("user_id", "post_id");
