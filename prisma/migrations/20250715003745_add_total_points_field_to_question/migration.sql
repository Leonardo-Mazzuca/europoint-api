/*
  Warnings:

  - You are about to drop the column `total_points` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "total_points" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "total_points";
