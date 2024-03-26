import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { Request, Response, NextFunction } from "express";

export default function Auth(req: Request, res: Response, next: NextFunction) {
    
    const authHeader = req.headers.authorization;
   
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(404).json({"msg": "hello hellooo"});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (decoded) {
            req.body.id = decoded.userId;
        }
        next();

    } catch (err) {
        return res.status(411).json({});
    }

}