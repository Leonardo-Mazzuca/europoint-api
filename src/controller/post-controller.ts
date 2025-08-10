
import { decodeToken, verifyErrors } from '../helpers';
import * as PostService from '../service/post-service';
import { Request, Response } from "express";

const getAllPosts = async (req:Request, res: Response) => {
    try {

        const posts = await PostService.getAllPosts();
        return res.status(200).json(posts);

    } catch (error) {
        return res.status(500).json({ message: "Error getting posts" });
    }
}

const getPostById = async (req:Request, res: Response) => {
    try {

        const {id} = req.params;
        const post = await PostService.getPostById(parseInt(id));
        return res.status(200).json(post);
        
    } catch (error) {
        return res.status(500).json({ message: "Error getting post" });
    }
}

const createPost = async (req:Request, res: Response) => {

    verifyErrors(req,res);

    try {

        const user_id = await decodeToken(req);
        const reqPost = req.body;
        const reqImages = req.files as Express.Multer.File[] ?? []


        const images = reqImages.map(image => {
            return {
                path: image.filename
            }
        })


        const post = {
            ...reqPost,
            images,
            area_id: Number(reqPost.area_id),
            user_id
        }

        const newPost = await PostService.createPost(post);
        return res.status(201).json(newPost);
        
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ message: "Error creating post" });
    }

}

const updatePost = async (req:Request, res: Response) => {

    verifyErrors(req,res);
    
    try {

        const {total_likes, total_views, images, title, content} = req.body
        const {id} = req.params;
        const updatedPost = await PostService.updatePost(parseInt(id), {total_likes, total_views, images, title, content});
        return res.status(200).json(updatedPost);
        
    } catch (error) {
        return res.status(500).json({ message: "Error updating post" });
    }

}

const deletePost = async (req:Request, res: Response) => {
    try {

        const {id} = req.params;
        const deletedPost = await PostService.deletePost(parseInt(id));
        return res.status(200).json(deletedPost);
        
    } catch (error) {
        return res.status(500).json({ message: "Error deleting post" });
    }
}

const deleteAllPosts = async (req:Request, res: Response) => {
    try {

        const deletedPosts = await PostService.deleteAllPosts();
        return res.status(200).json(deletedPosts);
        
    } catch (error) {
        return res.status(500).json({ message: "Error deleting posts" });
    }
}

const likePost = async (req:Request, res: Response) => {

    try {

        const {id} = req.params;
        const user_id = await decodeToken(req);
        const post = await PostService.togglePostsLike(parseInt(id), user_id);
        return res.status(200).json(post);
        
    } catch (error) {
        return res.status(500).json({ message: "Error liking post" });
    }
}

const updateViews = async (req:Request, res: Response) => {

    try {

        const {id} = req.params;
        const post = await PostService.updateViews(parseInt(id));
        return res.status(200).json(post);
        
    } catch (error) {
        return res.status(500).json({ message: "Error updating views" });
    }
}

export {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    deleteAllPosts,
    likePost,
    updateViews
}