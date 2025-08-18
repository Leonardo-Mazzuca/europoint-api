
import { Request, Response } from "express";
import * as AchievimentService from '../service/achieviment-service';
import * as Helpers from '../helpers'
import { AchievimentKey } from "@prisma/client";
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
        const {key} = req.params;
        const user_id = await Helpers.decodeToken(req);

        const achieviment = await AchievimentService.updateAchieviment(user_id, progress, key as AchievimentKey);
        return res.status(200).json(achieviment);
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message || 'Unexpected error' });
    }
}

const getCurrentUserAchieviments = async (req: Request, res: Response) => {
    try {

        const user_id = await Helpers.decodeToken(req);

        const achieviments = await AchievimentService.getAchievimentsByUserId(user_id);
        return res.status(200).json(achieviments);
    } catch (error) {
        return res.status(500).json({ message: "Error getting achieviments" });
    }
}

const getAchievimentByKey = async (req: Request, res: Response) => {
    try {

        const {key} = req.params;
        const user_id = await Helpers.decodeToken(req);
        const achieviment = await AchievimentService.getAchievimentByKey(user_id,key as AchievimentKey);
        return res.status(200).json(achieviment);
        
    } catch (error) {
        return res.status(500).json({ message: "Error getting achieviment" });
    }
}

const editAchieviment = async (req: Request, res: Response) => {
    try {

        const {key} = req.params;
        const user_id = await Helpers.decodeToken(req);
        const achieviment = await AchievimentService.editAchieviment(key as AchievimentKey, user_id, req.body);
        return res.status(200).json(achieviment);
        
    } catch (error) {
        return res.status(500).json({ message: "Error editing achieviment" });
    }
}

export {
    getAllAchieviments,
    createAchieviment,
    updateAchieviment,
    getCurrentUserAchieviments,
    getAchievimentByKey,
    editAchieviment
}