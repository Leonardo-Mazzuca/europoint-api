import express from "express";
import * as ProjectController from "../controller/project-controller";
import * as ProjectValidator from "../validators/project-validator";
import { projectUploadConfig } from "../config/multer";

export const projectRouter = express.Router();

projectRouter.get("/all", ProjectController.getAllProjects);
projectRouter.get("/:id", ProjectController.getSingleProject);
projectRouter.post(
  "/",
  // ProjectValidator.projectCreateValidation,
  projectUploadConfig.single("image"),
  ProjectController.createProject
);
projectRouter.put(
  "/:id",
  ProjectValidator.projectEditValidation,
  ProjectController.updateProject
);
projectRouter.delete("/:id", ProjectController.deleteProject);


