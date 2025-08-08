
import { decodeToken, verifyErrors } from "../helpers";
import * as NewsLetterService from "../service/newsletter-service";
import { Request, Response } from "express";

const getAllNewsLetters = async (req:Request, res: Response) => {
    try {
        const newsletters = await NewsLetterService.getAllNewsLetters();
        return res.status(200).json(newsletters);
    } catch (error) {
        return res.status(500).json({ message: "Error getting newsletters" });    
    }
}

const getSingleNewsLetter = async (req:Request, res: Response) => {
    try {
        const {id} = req.params;
        const newsletter = await NewsLetterService.getSingleNewsLetter(parseInt(id));
        return res.status(200).json(newsletter);
    } catch (error) {
        return res.status(500).json({ message: "Error getting newsletter" });    
    }
}

const createNewsLetter = async (req:Request, res: Response) => {

    verifyErrors(req,res);

    try {

        const user_id = await decodeToken(req);

        const reqNewsletter = req.body;
        const reqImages = req.files as Express.Multer.File[] ?? [];

        const images = reqImages.map(image => {
            return {
                path: image.filename
            }
        })

        const newsletter = {
            ...reqNewsletter,
            images: images,
            area_id: Number(reqNewsletter.area_id),
            user_id
        }
        const newNewsLetter = await NewsLetterService.createNewsletter(newsletter);
        return res.status(201).json(newNewsLetter);
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Error creating newsletter" });
    }
}

const editNewsLetter = async (req:Request, res: Response) => {

    verifyErrors(req,res);
    
    try {

        const {id} = req.params;
        const {total_likes, total_views, content, title} = req.body;
        const newNewsLetter = await NewsLetterService.updateNewsletter(parseInt(id), {total_likes,total_views, content, title});
        return res.status(200).json(newNewsLetter);
        
    } catch (error) {
        return res.status(500).json({ message: "Error editing newsletter" });
    }

}

const deleteNewsLetter = async (req:Request, res: Response) => {
    try {

        const {id} = req.params;
        const deletedNewsLetter = await NewsLetterService.deleteNewsletter(parseInt(id));
        return res.status(200).json(deletedNewsLetter);
        
    } catch (error) {
        return res.status(500).json({ message: "Error deleting newsletter" });
    }
}



export {
    getAllNewsLetters,
    createNewsLetter,
    editNewsLetter,
    deleteNewsLetter,
    getSingleNewsLetter,
}