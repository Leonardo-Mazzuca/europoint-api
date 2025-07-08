
import { Request, Response } from "express";
import * as AchievimentService from '../service/achieviment-service';
import * as Helpers from '../helpers'
const getAllAchieviments = async (req: Request, res: Response) => {
    try {

        const achieviments = await AchievimentService.getAllAchieviments();
        return res.status(200).json(achieviments);
        
    } catch (error) {
        return res.status(500).json({ message: "Error getting achieviments" });
    }
}

const createAchieviment = async (req: Request, res: Response) => {
    try {

        const {title,description,points} = req.body;

        const user_id = await Helpers.decodeToken(req);

        const achieviment = await AchievimentService.createAchieviment({
            description,
            points,
            title,
            user_id
        });

        return res.status(201).json(achieviment);
    } catch (error) {
        return res.status(500).json({ message: "Error creating achieviment" });
    }
}

const updateAchieviment = async (req: Request, res: Response) => {
    try {

        const {progress} = req.body;
        const {id} = req.params;

        const achieviment = await AchievimentService.updateAchieviment(parseInt(id), progress);
        return res.status(200).json(achieviment);
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message || 'Unexpected error' });
    }
}

export {
    getAllAchieviments,
    createAchieviment,
    updateAchieviment
}