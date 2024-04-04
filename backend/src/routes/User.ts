import { Router } from 'express';
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from '../config';
import jwt from "jsonwebtoken";
import zod from "zod";

const userRouter = Router();

const prisma = new PrismaClient();

const signUpSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(5),
    firstName: zod.string().min(2),
    lastName: zod.string().min(2),
})

const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(5)
})

userRouter.post('/signup', async (req, res) => {
    const { success } = signUpSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "zod validation error inputs"
        })
    }
    const existingUser = await prisma.user.findFirst({
        where: {
            username: req.body.username,
        }
    })
    if (existingUser) {
        return res.status(411).json({
            message: "Email already exist"
        })
    }
    try {
        const result = await prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }
        })
        if (result) {
            const token = jwt.sign({ userId: result.id }, JWT_SECRET);
            return res.json({
                message: "user token is created",
                token: token,
            })
        } else {
            return res.json({
                message: "jwt token not working",
            })
        }
    } catch (e) {
        return res.json(e);
    }
})

userRouter.post('/signin', async (req, res) => {
    const { success } = signInSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "zod validation error inputs"
        })
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET);
            return res.json({ token: token });
        } else {
            return res.status(411).json({
                message: "User not found"
            })
        }
    } catch (e) {
        return res.json(e);
    }
})

userRouter.get('/', async (req, res) => {
    const result = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        }
    })
    res.send(result);
})

export default userRouter;



