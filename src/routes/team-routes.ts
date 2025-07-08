
import express from "express";
import * as TeamController from "../controller/team-controller";
export const teamRouter = express.Router();

teamRouter.get('/all',TeamController.getAllTeams);
teamRouter.post('/',TeamController.createTeam);