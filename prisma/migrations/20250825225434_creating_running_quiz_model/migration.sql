-- CreateTable
CREATE TABLE "RunningQuiz" (
    "id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "current_points" INTEGER NOT NULL,
    "total_right_answers" INTEGER NOT NULL,

    CONSTRAINT "RunningQuiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RunningQuiz" ADD CONSTRAINT "RunningQuiz_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunningQuiz" ADD CONSTRAINT "RunningQuiz_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
