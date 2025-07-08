/*
  Warnings:

  - Added the required column `completed` to the `Achieviment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achieviment" ADD COLUMN     "completed" BOOLEAN NOT NULL,
ALTER COLUMN "progress" DROP NOT NULL;
