

import express from "express";
import * as ProgramController from "../controller/program-controller";

export const programRouter = express.Router();

programRouter.use('/all',ProgramController.getAllPrograms)
programRouter.post('/',ProgramController.createProgram)