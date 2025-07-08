
import express from "express";
import * as AreaController from "../controller/area-controller";

export const areaRouter = express.Router();

areaRouter.get('/all',AreaController.getAllAreas);