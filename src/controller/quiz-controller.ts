import {Request,Response} from 'express'
import * as QuizService from '../service/quiz-service'
import { decodeToken } from '../helpers';
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

const uploadQuizImage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const image = req.file as Express.Multer.File;
        const quiz = await QuizService.uploadQuizImage(parseInt(id), image);
        return res.status(200).json(quiz);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error uploading quiz image" });
    }
};

const startQuiz = async (req:Request,res:Response) => {
    try {

        const user_id = await decodeToken(req);
        const {id} = req.params;
        const quiz = await QuizService.startQuiz(parseInt(id));
        return res.status(200).json({
            quiz: quiz,
            message: `quiz: ${quiz.title} has started!`
        });
        
    } catch (error) {
        return res.status(500).json({ message: "Error starting quiz" });
    }
}

const nextQuestion = async (req:Request,res:Response) => {
    try {


        const {id} = req.params;
        const quiz = await QuizService.nextQuestion(parseInt(id));
        return res.status(200).json(quiz);
        
    } catch (error:any) {
        return res.status(500).json({ message: error.message || "Error getting next question" });
    }
}

const previousQuestion = async (req:Request,res:Response) => {
    try {

        const {id} = req.params;
        const quiz = await QuizService.previousQuestion(parseInt(id));
        return res.status(200).json(quiz);
        
    } catch (error:any) {
        return res.status(500).json({ message: error.message || "Error getting next question" });
    }
}

export {
    getAllQuizzes,
    createQuiz,
    uploadQuizImage,
    startQuiz,
    nextQuestion,
    previousQuestion
}