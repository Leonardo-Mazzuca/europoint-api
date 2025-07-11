
import { Request, Response } from "express";
import * as AreaService from "../service/area-service";
import { decodeToken } from "../helpers";

const getAllAreas = async (req:Request, res: Response) => {

    try {
        const areas = await AreaService.getAllAreas();
        return res.status(200).json(areas);
    } catch (error) {
        return res.status(500).json({ message: "Error getting areas" });    
    }
}

const followArea = async (req:Request, res: Response) => {
    try {

        const user_id = await decodeToken(req);
        const {area_id} = req.body;
        const followedArea = await AreaService.followArea(user_id, area_id);
        return res.status(200).json(followedArea);
        
    } catch (error:any) {
        return res.status(500).json({ message: error.message || "Error following area" });
    }
}

const unFollowArea = async (req:Request, res: Response) => {
    try {

        const user_id = await decodeToken(req);
        const {area_id} = req.body;
        const followedArea = await AreaService.unFollowArea(user_id, area_id);
        return res.status(200).json(followedArea);
        
    } catch (error:any) {
        return res.status(500).json({ message: error.message || "Error unfollowing area" });
    }
}

export {
    getAllAreas,
    followArea,
    unFollowArea
}