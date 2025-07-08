import express from "express";
import * as PostController from "../controller/post-controller";
import * as PostValidator from "../validators/post-validator";
export const postRouter = express.Router();

postRouter.get("/all", PostController.getAllPosts);
postRouter.get("/:id", PostController.getPostById);
postRouter.post(
  "/",
  PostValidator.postCreateValidation,
  PostController.createPost
);
postRouter.put(
  "/:id",
  PostValidator.postEditValidation,
  PostController.updatePost
);
postRouter.delete("/:id", PostController.deletePost);
