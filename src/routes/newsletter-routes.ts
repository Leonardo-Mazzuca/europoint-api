import express from "express";
import * as NewsLetterController from "../controller/newsletter-controller";
import * as PostValidator from "../validators/post-validator";
import { newsletterUploadConfig } from "../config/multer";

export const newsLetterRouter = express.Router();

newsLetterRouter.get("/all", NewsLetterController.getAllNewsLetters);
newsLetterRouter.get("/:id", NewsLetterController.getSingleNewsLetter);
newsLetterRouter.post(
  "/",
  PostValidator.postCreateValidation,
  NewsLetterController.createNewsLetter
);
newsLetterRouter.put(
  "/:id",
  PostValidator.postEditValidation,
  NewsLetterController.editNewsLetter
);
newsLetterRouter.delete("/:id", NewsLetterController.deleteNewsLetter);
newsLetterRouter.post(
  "/images/:id",
  newsletterUploadConfig.array("images"),
  NewsLetterController.updateNewsletterImages
);
