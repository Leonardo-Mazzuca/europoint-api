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
        const {title, content, image, members_ids} = req.body;
        
        const project = await ProjectService.updateProject(parseInt(id), {title, content, image, members_ids});
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

        const {title, content, image, members_ids,area_id, team_id} = req.body;
        
        const user_id = await decodeToken(req);

        const project = await ProjectService.createProject({title, content, image, members_ids,area_id,team_id,user_id});
        return res.status(201).json(project);
        
    } catch (error) {
        console.log("Error creating project: ", error);
        
        return res.status(500).json({ message: "Error creating project" });
    }
}

const uploadProjectImage = async (req: Request, res: Response) => {
    try {

        const {id} = req.params;
        const project_image_file = req.file as Express.Multer.File;

        if(!project_image_file){
            return res.status(400).json({ message: "Project image not found" });
        }
        
        const project = await ProjectService.uploadProjectImage(parseInt(id), project_image_file);
        return res.status(200).json(project);
        
    } catch (error) {
        return res.status(500).json({ message: "Error uploading project image" });
    }
}

export {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage
}