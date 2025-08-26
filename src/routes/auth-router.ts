import express from "express";

import * as AuthController from "../controller/auth-controller";
import * as AuthValidator from '../validators/auth-validator';
import { userProfileUpload } from "../config/multer";
import { body } from "express-validator";

export const authRouter = express.Router();


authRouter.post(
  "/login",
  AuthValidator.validateLogin,
  AuthController.login
);


authRouter.post(
  "/new",
  AuthValidator.validateNewUser,
  AuthController.newUser
)

authRouter.post(
  '/new/avatar/:id',
  body("avatar").isString(),
  userProfileUpload.single('avatar'),
  AuthController.uploadAvatar
)

