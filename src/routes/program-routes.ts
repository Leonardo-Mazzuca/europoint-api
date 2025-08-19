

import express from "express";
import * as ProgramController from "../controller/program-controller";
import { programUploadConfig } from "../config/multer";

export const programRouter = express.Router();

programRouter.use('/all',ProgramController.getAllPrograms)
programRouter.post('/',ProgramController.createProgram)
programRouter.post('/image/:id', programUploadConfig.single("image"), ProgramController.uploadProgramImage)
programRouter.delete('/',ProgramController.destroyPrograms)