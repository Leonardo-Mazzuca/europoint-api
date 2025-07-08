import {Request,Response} from 'express'
import * as QuizService from '../service/quiz-service'
const getAllQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await QuizService.getAllQuizzes();
        return res.status(200).json(quizzes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error getting quizzes" });
    }
};

const createQuiz = async (req: Request, res: Response) => {
    try {
        const { title, description, duration, image, total_points, questions } = req.body;

        const newQuiz = await QuizService.createQuiz(
            { title, description, duration, image, total_points }, 
            questions 
          );
          
        return res.status(201).json(newQuiz);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating quiz" });
    }
};

export {
    getAllQuizzes,
    createQuiz
}