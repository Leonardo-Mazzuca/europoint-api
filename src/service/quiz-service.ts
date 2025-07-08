import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";

const getAllQuizzes = async () => {
    return await db.quiz.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  };
  

type CreateQuestionInput = Array<
  Prisma.QuestionCreateWithoutOptionsInput & {
    options: Prisma.QuestionOptionCreateWithoutQuestionInput[];
  }
>;
const createQuiz = async (
  quiz: Prisma.QuizCreateInput,
  questions: CreateQuestionInput
) => {
  const { title, description, duration, image, total_points } = quiz;

  const createdQuiz = await db.quiz.create({
    data: {
      title,
      description,
      duration,
      image,
      total_points,
    },
  });

  for (const question of questions) {
    const createdQuestion = await db.question.create({
      data: {
        title: question.title,
        correct_answer: question.correct_answer,
        quiz: { connect: { id: createdQuiz.id } },
      },
    });

    for (const option of question.options) {
      await db.questionOption.create({
        data: {
          title: option.title,
          answer: option.answer,
          question: { connect: { id: createdQuestion.id } },
        },
      });
    }
  }

  return createdQuiz;
};

export { getAllQuizzes, createQuiz };
