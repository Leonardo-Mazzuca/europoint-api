

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes";
import { authRouter } from "./routes/auth-router";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/europoint/api/v1/auth',authRouter);
app.use('/europoint/api/v1',router);
app.use('/images',express.static(path.join(__dirname, ".." , "uploads")))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});