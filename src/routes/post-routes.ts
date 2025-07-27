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
postRouter.delete("/all", PostController.deleteAllPosts);
postRouter.delete("/:id", PostController.deletePost);
postRouter.put('/like/:id', PostController.likePost);
postRouter.put('/views/:id', PostController.updateViews);
