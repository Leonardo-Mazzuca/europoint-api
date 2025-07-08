import express from "express";
import * as AchievimentsController from "../controller/achieviment-controller";


export const achievimentRouter = express.Router();

achievimentRouter.get('/all',AchievimentsController.getAllAchieviments);
achievimentRouter.post('/',AchievimentsController.createAchieviment);
achievimentRouter.put('/:id',AchievimentsController.updateAchieviment);