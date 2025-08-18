import express from "express";
import * as AchievimentsController from "../controller/achieviment-controller";


export const achievimentRouter = express.Router();

achievimentRouter.get('/all',AchievimentsController.getAllAchieviments);
achievimentRouter.post('/',AchievimentsController.createAchieviment);
achievimentRouter.put('/:key',AchievimentsController.updateAchieviment);
achievimentRouter.get('/',AchievimentsController.getCurrentUserAchieviments);
achievimentRouter.get('/:key', AchievimentsController.getAchievimentByKey);
achievimentRouter.put('/edit/:key', AchievimentsController.editAchieviment);