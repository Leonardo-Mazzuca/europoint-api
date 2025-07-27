import { Request, Response } from "express";
import * as UserService from "../service/user-service";
import jwt from "jsonwebtoken";
import { decodeToken, verifyErrors } from "../helpers";



const editUser = async (req: Request, res: Response) => {

  verifyErrors(req,res);

  try {
    const user_id = await decodeToken(req);
    const { email, password, username, phone_number, avatar, total_points } = req.body;

    if(email){
      const emailAlreadyExists = await UserService.getUserByEmail(email);
  
      if(emailAlreadyExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    const user = await UserService.editUser(user_id, { email, password, username, phone_number, avatar, total_points });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error editing user" });
  }
};

const deleleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserService.deleteUser(parseInt(id));
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting user" });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error getting users" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in .env");
    }

    const decoded = jwt.verify(token, secret) as { user_id: string };

    const user = await UserService.getUserById(parseInt(decoded.user_id)); 

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: "Error getting current user" });
  }
};

const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const avatar_file = req.file as Express.Multer.File;

    console.log(avatar_file);
    
    const user = await UserService.uploadAvatar(parseInt(id), avatar_file);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error uploading avatar" });
  }
};

const updateUserPoints = async (req: Request, res: Response) => {
  try {

    const {points} = req.body;
    const user_id = await decodeToken(req);

    if(points < 0) {
      return res.status(400).json({ message: "Points cannot be negative" });
    }

    const user = await UserService.updateUserPoints(user_id, points);
    return res.status(200).json(user);
    
  } catch (error) {
    return res.status(500).json({ message: "Error updating user points" });
  }
}

const savePost = async (req: Request, res: Response) => {

  try {

    const {post_type, id} = req.body;
    const user_id = await decodeToken(req);

    switch (post_type) {
      case 'post':
        const isPostSaved = await UserService.isItemSaved(user_id,parseInt(id), 'post');
        if(isPostSaved) {
          return res.status(400).json({ message: "Post already saved" });
        }
        await UserService.saveItem(user_id,parseInt(id), 'post');
        return res.status(200).json({ message: "Post saved successfully" });
      case 'newsletter':
        const isNewsletterSaved = await UserService.isItemSaved(user_id,parseInt(id), 'newsletter');
        if(isNewsletterSaved) {
          return res.status(400).json({ message: "Newsletter already saved" });
        }
        await UserService.saveItem(user_id,parseInt(id), 'newsletter');
        return res.status(200).json({ message: "Newsletter saved successfully" });
      case 'prject':
        const isProjectSaved = await UserService.isItemSaved(user_id,parseInt(id), 'project');
        if(isProjectSaved) {
          return res.status(400).json({ message: "Newsletter already saved" });
        }

        await UserService.saveItem(user_id,parseInt(id), 'project');
        return res.status(200).json({ message: "Project saved successfully" });
      default: 
        return res.status(400).json({ message: "Invalid post type" });
    }
    
  
    
  } catch (error) {
    return res.status(500).json({ message: "Error saving post" });
  }

}

export const unSavePost = async (req: Request, res: Response) => {

  try {

    const {post_type, id} = req.body;
    const user_id = await decodeToken(req);

    switch (post_type) {
      case 'post':
        await UserService.unSaveItem(user_id,parseInt(id), 'post');
        return res.status(200).json({ message: "Post unsaved successfully" });
      case 'newsletter':
        await UserService.unSaveItem(user_id,parseInt(id), 'newsletter');
        return res.status(200).json({ message: "Newsletter unsaved successfully" });
      case 'prject':
        await UserService.unSaveItem(user_id,parseInt(id), 'project');
        return res.status(200).json({ message: "Project unsaved successfully" });
      default: 
        return res.status(400).json({ message: "Invalid post type" });
    }
    
  
    
  } catch (error) {
    return res.status(500).json({ message: "Error unsaving post" });
  }

}



export {
  editUser,
  deleleUser,
  getUsers,
  getCurrentUser,
  updateAvatar,
  updateUserPoints,
  savePost
}
