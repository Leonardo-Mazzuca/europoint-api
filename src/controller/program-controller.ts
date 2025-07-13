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
        const {title,description} = req.body;
        const program = await ProgramService.createProgram({description,title});
        return res.status(201).json(program);
    } catch (error) {
        return res.status(500).json({ message: "Error creating program" });
    }
};

const uploadProgramImage = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const image = req.file as Express.Multer.File;
        const program = await ProgramService.uploadProgramImage(parseInt(id), image);
        return res.status(200).json(program);
    } catch (error) {
        return res.status(500).json({ message: "Error uploading program image" });
    }
};

export {
    getAllPrograms,
    createProgram,
    uploadProgramImage
}