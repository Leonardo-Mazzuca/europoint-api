import { Request, Response } from "express";
import * as ProgramService from "../service/program-service";

const getAllPrograms = async (req: Request, res: Response) => {
    try {
        const programs = await ProgramService.getAllPrograms();
        return res.status(200).json(programs);
    } catch (error) {
        return res.status(500).json({ message: "Error getting programs" });
    }
};

const createProgram = async (req: Request, res: Response) => {
    try {
        const {title,description, image} = req.body;
        const program = await ProgramService.createProgram({description,image,title});
        return res.status(201).json(program);
    } catch (error) {
        return res.status(500).json({ message: "Error creating program" });
    }
};

export {
    getAllPrograms,
    createProgram
}