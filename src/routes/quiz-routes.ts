import express from "express";
import * as QuizController from "../controller/quiz-controller";

export const quizRouter = express.Router();

quizRouter.get('/all',QuizController.getAllQuizzes);
quizRouter.post('/',QuizController.createQuiz);
