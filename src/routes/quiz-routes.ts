import express from "express";
import * as QuizController from "../controller/quiz-controller";
import { quizUploadConfig } from "../config/multer";

export const quizRouter = express.Router();

quizRouter.get("/all", QuizController.getAllQuizzes);
quizRouter.post("/", QuizController.createQuiz);
quizRouter.post(
  "/image/:id",
  quizUploadConfig.single("image"),
  QuizController.uploadQuizImage
);

quizRouter.put("/discard/:id", QuizController.discardQuiz);
quizRouter.put("/start/:id", QuizController.startQuiz);
quizRouter.put("/next/:id", QuizController.nextQuestion);
quizRouter.put("/prev/:id", QuizController.previousQuestion);
quizRouter.delete("/all",QuizController.deleteAllQuizzes);
quizRouter.delete("/:id", QuizController.deleteQuiz);
quizRouter.put("/end/:id", QuizController.endQuiz);

//get running quizzes
quizRouter.get("/runnings", QuizController.getRunningQuizzes)
//delete all running quizzes

quizRouter.delete("/runnings/all", QuizController.deleteAllRunningQuizzes)

//get quiz results
quizRouter.get("/results", QuizController.getQuizResults)