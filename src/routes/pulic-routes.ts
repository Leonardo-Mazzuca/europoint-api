import express from 'express'
import * as UserController from '../controller/user-controller'

export const publicRouter = express.Router();

publicRouter.get("/users/all", UserController.getUsers);