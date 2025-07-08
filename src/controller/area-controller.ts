
import { Request, Response } from "express";
import * as AreaService from "../service/area-service";

const getAllAreas = async (req:Request, res: Response) => {

    try {
        const areas = await AreaService.getAllAreas();
        return res.status(200).json(areas);
    } catch (error) {
        return res.status(500).json({ message: "Error getting areas" });    
    }
}

export {
    getAllAreas
}