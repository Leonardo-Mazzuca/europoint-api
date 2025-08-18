import express from "express"
import { userRouter } from "./user-router"
import { checkAuth } from "../middleware/check-auth"
import { postRouter } from "./post-routes";
import { areaRouter } from "./area-routes";
import { newsLetterRouter } from "./newsletter-routes";
import { projectRouter } from "./project-routes";
import { teamRouter } from "./team-routes";
import { programRouter } from "./program-routes";
import { quizRouter } from "./quiz-routes";
import { achievimentRouter } from "./achieviment-routes";
import { ideaRouter } from "./idea-routes";
import { postAchievimentMiddleware } from "../middleware/post-achieviment-middleware";
import { userAchievimentMiddleware } from "../middleware/user-achieviment-middleware";

export const router = express.Router();

router.use(checkAuth);
router.use(postAchievimentMiddleware);
router.use(userAchievimentMiddleware);

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use('/areas', areaRouter);
router.use('/newsletter',newsLetterRouter);
router.use('/projects', projectRouter);
router.use('/teams', teamRouter);
router.use('/program',programRouter);
router.use('/quiz',quizRouter);
router.use('/achieviment',achievimentRouter);
router.use('/ideas',ideaRouter)