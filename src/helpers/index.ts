import jwt from "jsonwebtoken";
import { Request,Response } from "express";
import { validationResult } from "express-validator";

const decodeToken = async (req: Request) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new Error("Token not provided!");
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { user_id: number };
    return decoded.user_id
    
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const verifyErrors = (req:Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}

export {
    decodeToken,
    verifyErrors
}
