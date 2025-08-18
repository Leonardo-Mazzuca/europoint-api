

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes";
import { authRouter } from "./routes/auth-router";
import path from "path";
import { initSocket } from "./modules/socket";

dotenv.config();

const app = express();

initSocket();

app.use(cors({
    origin: [
      'http://localhost:5173',
      'http://192.168.15.5:8081',
  ],
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api/europoint/v1/auth',authRouter);
app.use('/api/europoint/v1/images',express.static(path.join(__dirname, ".." , "uploads")))
app.use('/api/europoint/v1',router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});