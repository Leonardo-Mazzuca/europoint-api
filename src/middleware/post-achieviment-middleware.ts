import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../helpers";
import * as AchieviementService from '../service/achieviment-service';
import * as UserService from '../service/user-service';
import { AchievimentKey } from "@prisma/client";
import { sendNotification } from "../modules/socket";

export const postAchievimentMiddleware = async (req:Request, res:Response, next: NextFunction) => {

    try {

        const user_id = await decodeToken(req);

        const currentUser = await UserService.getUserById(user_id);

        if(!currentUser){
            return res.status(404).json({ message: "User not found" });
        }

        const registerPostAchieviment = await AchieviementService.getAchievimentByKey(currentUser.id, AchievimentKey.REGISTERED_POST);
        const registered10PostAchieviment = await AchieviementService.getAchievimentByKey(currentUser.id, AchievimentKey.REGISTERED_10_POST);
        const registered30PostAchieviment = await AchieviementService.getAchievimentByKey(currentUser.id, AchievimentKey.REGISTERED_30_POST);
        const postLenght = currentUser.posts.length + currentUser.projects.length + currentUser.newsletters.length;

        if(!registerPostAchieviment || !registered10PostAchieviment || !registered30PostAchieviment){
            return res.status(500).json({ message: "Error getting achieviment" });
        }

        if(postLenght === 1 && !registerPostAchieviment.completed){
            await AchieviementService.updateAchieviment(currentUser.id, 100, AchievimentKey.REGISTERED_POST);
            sendNotification(String(currentUser.id), registerPostAchieviment.title);
        } else if (postLenght === 10 && !registered10PostAchieviment.completed) {
            await AchieviementService.updateAchieviment(currentUser.id, 100, AchievimentKey.REGISTERED_10_POST);
            sendNotification(String(currentUser.id), registered10PostAchieviment.title);
        } else if (postLenght === 30 && !registered30PostAchieviment.completed) {
            await AchieviementService.updateAchieviment(currentUser.id, 100, AchievimentKey.REGISTERED_30_POST);
            sendNotification(String(currentUser.id), registered30PostAchieviment.title);
        } 
        
        next()
        
    } catch (error) {
        console.log('Erro verificando post: ', error);
        
    }

}