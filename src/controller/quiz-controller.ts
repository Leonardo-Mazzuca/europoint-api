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
        const { title, description, duration, image, questions } = req.body;

        const newQuiz = await QuizService.createQuiz(
            { title, description, duration, image }, 
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
        const quiz = await QuizService.startQuiz(user_id,parseInt(id));
        return res.status(200).json({
            quiz: quiz,
            message: `quiz: ${quiz.title} has started!`
        });
        
    } catch (error) {
        console.log("Erro começando quiz: ", error);
        
        return res.status(500).json({ message: "Error starting quiz" });
    }
}

const nextQuestion = async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const user_id = await decodeToken(req);
        const {points, total_rights} = req.body

        const quiz = await QuizService.nextQuestion(user_id,parseInt(id), points, total_rights);
        return res.status(200).json(quiz);
        
    } catch (error:any) {
        console.log('Erro passando para proxima pergunta', error);
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

const deleteQuiz = async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const quiz = await QuizService.deleteQuiz(parseInt(id));
        return res.status(200).json(quiz);
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Error deleting quiz" });
    }
}

const discardQuiz = async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const quiz = await QuizService.discardQuiz(parseInt(id));
        return res.status(200).json(quiz);
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Error discarding quiz" });
    }
}

const endQuiz = async (req:Request,res:Response) => {
    
    try {
        const {id} = req.params;
        const {total_points, total_right_answers} = req.body
        const user_id = await decodeToken(req);
        const quiz = await QuizService.finishQuiz(user_id, parseInt(id), total_points, total_right_answers);

        return res.status(200).json(quiz);
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Error ending quiz" });
    }
}

const deleteAllQuizzes = async (req:Request,res:Response) => {
    try {
        const quizzes = await QuizService.deleteAllQuizzes();
        return res.status(200).json(quizzes);
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Error deleting all quizzes" });
    }
}

const getRunningQuizzes = async (req:Request,res:Response) => {
    try {
        const user_id = await decodeToken(req);
        const quizzes = await QuizService.getRunningQuizzes(user_id);
        return res.status(200).json(quizzes);
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Error getting running quizzes" });
    }
}

const getQuizResults = async (req:Request,res:Response) => {
    try {

        const user_id = await decodeToken(req);
        const results = await QuizService.getQuizResults(user_id);
        return res.status(200).json(results);
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Error getting quiz results" });
    }
}

const deleteAllRunningQuizzes = async (req:Request,res:Response) => {
    try {
        const quizzes = await QuizService.deleteAllRunningQuizzes();
        return res.status(200).json(quizzes);
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Error deleting all running quizzes" });
    }
}

export {
    getAllQuizzes,
    createQuiz,
    uploadQuizImage,
    startQuiz,
    nextQuestion,
    previousQuestion,
    deleteQuiz,
    discardQuiz,
    endQuiz,
    deleteAllQuizzes,
    getRunningQuizzes,
    getQuizResults,
    deleteAllRunningQuizzes
}