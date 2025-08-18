/*
  Warnings:

  - A unique constraint covering the columns `[user_id,key]` on the table `Achieviment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Achieviment_user_id_key_key" ON "Achieviment"("user_id", "key");
