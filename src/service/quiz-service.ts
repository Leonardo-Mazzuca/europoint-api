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
  const { title, description, duration, total_points } = quiz;

  const createdQuiz = await db.quiz.create({
    data: {
      title,
      description,
      duration,
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

const getCurrentQuiz = async (quiz_id: number) => {
  const currentQuiz = await db.quiz.findFirst({ where: { id: quiz_id },include:{
    questions: true
  } });

  if(!currentQuiz){
    throw new Error("Quiz not found");
  }

  return currentQuiz;
}

const getQuizIsRunning = (quiz_id: number) => {
  return db.quiz.findFirst({ where: { id: quiz_id, is_running: true } });
}



const uploadQuizImage = async (id: number, image: Express.Multer.File) => {
    return await db.quiz.update({ where: { id }, data: { image: image.filename } });
}

const startQuiz = async (quiz_id:number) => {
    return await db.quiz.update({
        where: { id: quiz_id,  },
        data: {
            is_running: true,
        },
    });
}

const finishQuiz = async (quiz_id:number) => {
  return await db.quiz.update({
    where: { id: quiz_id },
    data: {
      is_running: false,
      current_question_id: 0,
    },
  });
}

const nextQuestion = async (quiz_id:number) => {
  const currentQuiz = await getCurrentQuiz(quiz_id);

  const isQuizRunning = await getQuizIsRunning(currentQuiz.id);
  if(!isQuizRunning){
    throw new Error("Quiz not running");
  }

  const questions = currentQuiz.questions

  if (!currentQuiz.current_question_id || currentQuiz.current_question_id === 0) {
    const firstQuestion = questions[0];
    if (!firstQuestion) throw new Error("Quiz has no questions");

    return await db.quiz.update({
      where: { id: quiz_id },
      data: { current_question_id: firstQuestion.id },
    });
  }

  const currentIndex = questions.findIndex(
    (q) => q.id === currentQuiz.current_question_id
  );

  const nextQuestion = questions[currentIndex + 1];

  //finish quiz if no next question
  if (!nextQuestion) {
    return await finishQuiz(quiz_id);
  }

  return await db.quiz.update({
    where: { id: quiz_id },
    data: { current_question_id: nextQuestion.id, total_answered: {increment: 1} },
  });

}

const previousQuestion = async (quiz_id: number) => {
  const currentQuiz = await getCurrentQuiz(quiz_id);

  const isQuizRunning = await getQuizIsRunning(currentQuiz.id);
  if (!isQuizRunning) {
    throw new Error("Quiz not running");
  }

  const questions = currentQuiz.questions;

  if (!currentQuiz.current_question_id || currentQuiz.current_question_id === 0) {
    throw new Error("No question is currently selected");
  }

  const currentIndex = questions.findIndex(
    (q) => q.id === currentQuiz.current_question_id
  );

  if (currentIndex <= 0) {
    throw new Error("Already at the first question");
  }

  const previousQuestion = questions[currentIndex - 1];

  return await db.quiz.update({
    where: { id: quiz_id },
    data: { current_question_id: previousQuestion.id },
  });
};

export { getAllQuizzes, createQuiz, uploadQuizImage, startQuiz, nextQuestion, previousQuestion };
