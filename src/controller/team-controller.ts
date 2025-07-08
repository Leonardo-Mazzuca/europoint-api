
import { Request, Response } from "express";
import * as TeamService from "../service/team-service";

const getAllTeams = async (req: Request, res: Response) => {
    try {
        
        const teams = await TeamService.getAllTeams();
        return res.status(200).json(teams);
    } catch (error) {
        return res.status(500).json({ message: "Error getting teams" });
    }
}

const createTeam = async (req: Request, res: Response) => {
    try {
        const {name,area_id,members_ids} = req.body;
        const team = await TeamService.createTeam({name,area_id,members_ids});
        return res.status(201).json(team);
    } catch (error) {
        return res.status(500).json({ message: "Error creating team" });
    }
}

export {
    getAllTeams,
    createTeam
}