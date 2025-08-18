import { Request, Response } from "express";
import * as ProjectService from "../service/project-service";
import { decodeToken, verifyErrors } from "../helpers";
const getAllProjects = async (req: Request, res: Response) => {
    try {

        const projects = await ProjectService.getAllProjects();
        return res.status(200).json(projects);
        
    } catch (error) {
        console.log("Error getting projects: ", error);
        
        return res.status(500).json({ message: "Error getting projects" });
    }
}   

const getSingleProject = async (req: Request, res: Response) => {
    try {

        const {id} = req.params;
        const project = await ProjectService.getSingleProject(parseInt(id));
        return res.status(200).json(project);
        
    } catch (error) {
        return res.status(500).json({ message: "Error getting project" });
    }
}

const updateProject = async (req: Request, res: Response) => {

    verifyErrors(req, res);

    try {

        const {id} = req.params;
        const {title, content, image, members_ids, status} = req.body;
        
        const project = await ProjectService.updateProject(parseInt(id), {title, content, image, members_ids, status});
        return res.status(200).json(project);
        
    } catch (error) {
        return res.status(500).json({ message: "Error updating project" });
    }
}

const deleteProject = async (req: Request, res: Response) => {

    try {

        const {id} = req.params;
        const project = await ProjectService.deleteProject(parseInt(id));
        return res.status(200).json(project);
        
    } catch (error) {
        return res.status(500).json({ message: "Error deleting project" });
    }
}

const createProject = async (req: Request, res: Response) => {

    verifyErrors(req, res);

    try {

        const reqProject = req.body;
        const user_id = await decodeToken(req);
        const reqImage = req.file as Express.Multer.File ?? "";

        const image = {
            path: reqImage.filename
        }

        const members_ids = JSON.parse(reqProject.members_ids);

        
        const project = {
            ...reqProject,
            image,
            area_id: Number(reqProject.area_id),
            team_id: Number(reqProject.team_id),
            members_ids,
            user_id
        }

        const newProject = await ProjectService.createProject(project);
        return res.status(201).json(newProject);
        
    } catch (error) {
        console.log("Error creating project: ", error);
        
        return res.status(500).json({ message: "Error creating project" });
    }
}



export {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject,
}