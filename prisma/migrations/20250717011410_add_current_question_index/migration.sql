/*
  Warnings:

  - You are about to drop the column `current_question_id` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "current_question_id",
ADD COLUMN     "current_question_index" INTEGER DEFAULT 0;
