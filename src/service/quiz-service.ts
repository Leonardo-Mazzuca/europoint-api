import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";

const getAllQuizzes = async () => {
  return await db.quiz.findMany({
    include: {
      questions: {
        include: {
          options: true,
        },
        orderBy: {
          id: "asc",
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
  const { title, description, duration } = quiz;

  const createdQuiz = await db.quiz.create({
    data: {
      title,
      description,
      duration,
    },
  });

  for (const question of questions) {
    const createdQuestion = await db.question.create({
      data: {
        title: question.title,
        correct_answer: question.correct_answer,
        quiz: { connect: { id: createdQuiz.id } },
        total_points: question.total_points,
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

const getCurrentQuiz = async (quiz_id: number) => {
  const currentQuiz = await db.quiz.findFirst({
    where: { id: quiz_id },
    include: {
      questions: true,
    },
  });

  console.log(quiz_id);
  
  if (!currentQuiz) {
    throw new Error("Quiz not found");
  }

  return currentQuiz;
};

const getQuizIsRunning = (quiz_id: number) => {
  return db.quiz.findFirst({ where: { id: quiz_id, is_running: true } });
};

const uploadQuizImage = async (id: number, image: Express.Multer.File) => {
  return await db.quiz.update({
    where: { id },
    data: { image: image.filename },
  });
};

const startQuiz = async (user_id: number, quiz_id: number) => {
  await db.runningQuiz.create({
    data: {
      quiz_id: quiz_id,
      user_id: user_id,
      current_points: 0,
      total_right_answers: 0,
    },
  });

  return await db.quiz.update({
    where: { id: quiz_id },
    data: {
      is_running: true,
      current_question_index: 0,
    },
  });
};

const finishQuiz = async (
  user_id: number,
  quiz_id: number,
  total_points: number,
  total_right_answers: number
) => {
  await db.user.updateMany({
    where: { id: user_id },
    data: {
      played_quiz_count: { increment: 1 },
    },
  });

  await db.runningQuiz.deleteMany({where: {quiz_id, user_id}});

  //creating data on the quiz finish model
  await db.quizResult.create({
    data: {
      user_id: user_id,
      quiz_id: quiz_id,
      total_points,
      total_right_answers,
    },
  });

  return await db.quiz.update({
    where: { id: quiz_id },
    data: {
      is_running: false,
      current_question_index: 0,
    },
  });
};

const nextQuestion = async (user_id: number, quiz_id: number, points: number, right_answers: number) => {
  const currentQuiz = await getCurrentQuiz(quiz_id);

  const isQuizRunning = await getQuizIsRunning(currentQuiz.id);
  if (!isQuizRunning) {
    throw new Error("Quiz not running");
  }

  const questions = currentQuiz.questions;

  const currentIndex = currentQuiz.current_question_index ?? 0;
  const currentQuestion = questions[currentIndex];

  const currentRunningQuiz = await db.runningQuiz.findFirst({
    where: { user_id: user_id, quiz_id: quiz_id },
  });

  if(!currentRunningQuiz) {
    throw new Error("Running Quiz not found");
  }

  const nextIndex = currentIndex + 1;

  await db.runningQuiz.update({
    where: { id: currentRunningQuiz.id, quiz_id: currentQuiz.id, user_id },
    data: {
      current_points: points,
      total_right_answers: right_answers,
      current_answer: nextIndex
    },
  });

  if (currentQuestion) {
    await db.question.update({
      where: { id: currentQuestion.id },
      data: { is_answered: true },
    });
  }


  if (nextIndex >= questions.length) {
    //end of quiz
    return await db.quiz.update({
      where: { id: quiz_id },
      data: {
        is_running: false,
        total_answered: { increment: 1 },
      },
    });
  }

  return await db.quiz.update({
    where: { id: quiz_id },
    data: {
      current_question_index: nextIndex,
      total_answered: { increment: 1 },
    },
  });
};

const previousQuestion = async (quiz_id: number) => {
  const currentQuiz = await getCurrentQuiz(quiz_id);

  const isQuizRunning = await getQuizIsRunning(currentQuiz.id);
  if (!isQuizRunning) {
    throw new Error("Quiz not running");
  }

  const questions = currentQuiz.questions;
  const currentIndex = currentQuiz.current_question_index ?? 0;

  if (currentIndex <= 0) {
    throw new Error("Already at the first question");
  }

  const newIndex = currentIndex - 1;

  return await db.quiz.update({
    where: { id: quiz_id },
    data: {
      current_question_index: newIndex,
    },
  });
};

const deleteQuiz = async (quiz_id: number) => {

  await db.runningQuiz.deleteMany({where: {quiz_id}});
  return await db.quiz.delete({ where: { id: quiz_id } });

};

const deleteAllQuizzes = async () => {
  return await db.quiz.deleteMany({});
};

const discardQuiz = async (quiz_id: number) => {
  return await db.quiz.update({
    where: { id: quiz_id },
    data: { is_running: false, current_question_index: 0, total_answered: 0 },
  });
};

const getRunningQuizzes = async (user_id: number) => {
  return await db.runningQuiz.findMany(
    {
      where: {user_id},
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                options: {
                  include: {
                    question: true
                  }
                }
              }
            }
          }
        }
      }
    }
  );
};

const getQuizResults = async (user_id: number) => await db.quizResult.findMany({where: {user_id}});

const deleteAllRunningQuizzes = async () => await db.runningQuiz.deleteMany({});

export {
  getAllQuizzes,
  createQuiz,
  getRunningQuizzes,
  getQuizResults,
  uploadQuizImage,
  startQuiz,
  nextQuestion,
  previousQuestion,
  deleteQuiz,
  discardQuiz,
  finishQuiz,
  deleteAllQuizzes,
  deleteAllRunningQuizzes
};
