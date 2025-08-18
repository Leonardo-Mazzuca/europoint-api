-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('RUNNING', 'FINISHED');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" "ProjectStatus" DEFAULT 'RUNNING';
