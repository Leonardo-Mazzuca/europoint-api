import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../helpers";
import * as UserService from '../service/user-service';
import * as AchievimentService from '../service/achieviment-service';
import { AchievimentKey } from "@prisma/client";
import { sendNotification } from "../modules/socket";


export const userAchievimentMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const user_id = await decodeToken(req);
        const user = await UserService.getUserById(user_id);

        if(!user){
          return res.status(500).json({ message: "Error getting user" });
        }

        const firstLoginAchieviment = await AchievimentService.getAchievimentByKey(user.id, AchievimentKey.FIRST_LOGIN);
        const login10TimesAchieviment = await AchievimentService.getAchievimentByKey(user.id, AchievimentKey.LOGGED_10_TIMES_IN_ROW);
        const login50TimesAchieviment = await AchievimentService.getAchievimentByKey(user.id, AchievimentKey.LOGGED_50_TIMES_IN_ROW);
    
        if(!firstLoginAchieviment || !login10TimesAchieviment || !login50TimesAchieviment){
          return res.status(500).json({ message: "Error getting achieviment" });
        }
    
        if(user.login_count === 1 && !firstLoginAchieviment.completed){
          sendNotification(String(user.id), firstLoginAchieviment.title);
          await AchievimentService.updateAchieviment(user.id, 100, AchievimentKey.FIRST_LOGIN);
        } else if (user.login_count === 10 && !login10TimesAchieviment.completed){
          sendNotification(String(user.id), login10TimesAchieviment.title);
          await AchievimentService.updateAchieviment(user.id, 100, AchievimentKey.LOGGED_10_TIMES_IN_ROW);
        } else if (user.login_count === 50 && !login50TimesAchieviment.completed){
          sendNotification(String(user.id), login50TimesAchieviment.title);
          await AchievimentService.updateAchieviment(user.id, 100, AchievimentKey.LOGGED_50_TIMES_IN_ROW);
        }
    
        const playedQuizAchieviment = await AchievimentService.getAchievimentByKey(user.id, AchievimentKey.PLAYED_QUIZ);
        const played5QuizzesAchieviment = await AchievimentService.getAchievimentByKey(user.id, AchievimentKey.PLAYED_QUIZ_5);
        const played15QuizzesAchieviment = await AchievimentService.getAchievimentByKey(user.id, AchievimentKey.PLAYED_QUIZ_15);
    
        if (!playedQuizAchieviment || !played5QuizzesAchieviment || !played15QuizzesAchieviment) {
            return res.status(500).json({ message: "Error getting achieviment" });
        }
    
        if(user.played_quiz_count === 1 && !playedQuizAchieviment.completed){
          sendNotification(String(user.id), playedQuizAchieviment.title);
          await AchievimentService.updateAchieviment(user.id, 100, AchievimentKey.PLAYED_QUIZ);
        } else if (user.played_quiz_count === 5 && !played5QuizzesAchieviment.completed){
          sendNotification(String(user.id), played5QuizzesAchieviment.title);
          await AchievimentService.updateAchieviment(user.id, 100, AchievimentKey.PLAYED_QUIZ_5);
        } else if (user.played_quiz_count === 15 && !played15QuizzesAchieviment.completed){
          sendNotification(String(user.id), played15QuizzesAchieviment.title);
          await AchievimentService.updateAchieviment(user.id, 100, AchievimentKey.PLAYED_QUIZ_15);
        }

        next();
        
    } catch (error) {
        console.log('Erro ao atualizar conquistas do usuário: ', error);
    }
}