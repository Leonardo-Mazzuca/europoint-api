-- CreateTable
CREATE TABLE "_UserFollowsAreas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserFollowsAreas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserFollowsAreas_B_index" ON "_UserFollowsAreas"("B");

-- AddForeignKey
ALTER TABLE "_UserFollowsAreas" ADD CONSTRAINT "_UserFollowsAreas_A_fkey" FOREIGN KEY ("A") REFERENCES "Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowsAreas" ADD CONSTRAINT "_UserFollowsAreas_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
