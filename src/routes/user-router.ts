import express from "express";
import * as UserController from "../controller/user-controller";
import * as UserValidator from "../validators/user-validator";
import * as AuthController from "../controller/auth-controller";
import { userProfileUpload } from "../config/multer";

export const userRouter = express.Router();

userRouter.get("/all", UserController.getUsers);
userRouter.get("/", UserController.getCurrentUser);

userRouter.put(
  "/",
  UserValidator.userEditValiation,
  UserController.editUser
);
userRouter.delete("/:id", UserController.deleleUser);
userRouter.post(
  "/avatar/:id",
  userProfileUpload.single("avatar"),
  AuthController.uploadAvatar
);

userRouter.post(
  "/save",
  UserController.savePost
)
userRouter.post(
  "/un-save",
  UserController.unSavePost
)