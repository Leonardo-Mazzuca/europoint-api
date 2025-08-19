import jwt from "jsonwebtoken";
import * as UserService from "../service/user-service";
import { Request, Response } from "express";
import { createAchieviments, createQuizzes, verifyErrors } from "../helpers";
import { compare } from "bcrypt";
import { db } from "../utils/db.server";

const login = async (req: Request, res: Response) => {
  verifyErrors(req, res);

  try {
    const { email, password } = req.body;

    const secret = process.env.JWT_SECRET;

    const user = await UserService.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await compare(password, user.password);


    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    if (!secret) {
      throw new Error("JWT_SECRET is not defined!");
    }

    const token = jwt.sign({ user_id: user.id }, secret);

    const userDontHasAchievimentsAssigned = await db.user.findFirst({
      where: {
        id: user.id,
        achieviments: {
          none: {},
        },
      },
    })

    if(userDontHasAchievimentsAssigned) {
      await createAchieviments(user.id);
    }

    await createQuizzes();

    const updated = await db.user.update({where: {id: user.id}, data: {login_count: {increment: 1}}});

    return res.status(200).json({
      user: updated,
      message: "Login realizado com sucesso",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const newUser = async (req: Request, res: Response) => {
  verifyErrors(req, res);

  try {
    const { email, password, username, phone_number, area_id } = req.body;

    const userAlreadyExists = await UserService.getUserByEmail(email);

    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await UserService.createUser({
      email,
      password,
      username,
      phone_number,
      area_id,
    });

    await createAchieviments(user.id);

    return res.status(201).json(user);
  } catch (error: any) {
    console.log("Error creating user: ", error);

    return res
      .status(500)
      .json({ message: error.message || "Error creating user" });
  }
};

const uploadAvatar = async (req: Request, res: Response) => {
  try {

    const {id} = req.params;
    const avatar_file = req.file as Express.Multer.File;

    if(!avatar_file){
      return res.status(400).json({ message: "Avatar not found" });
    }
    
    const user = await UserService.uploadAvatar(parseInt(id), avatar_file);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error uploading avatar" });
  }
};


export { login, newUser, uploadAvatar };
