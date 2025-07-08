-- CreateTable
CREATE TABLE "Achieviment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Achieviment_pkey" PRIMARY KEY ("id")
);
