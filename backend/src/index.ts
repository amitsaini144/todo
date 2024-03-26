import express, { Request, Response, Express } from 'express';
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from './config';
import jwt from "jsonwebtoken";
import zod from "zod";
import Auth from "./middleware/Auth";
import bodyParser from 'body-parser';
import cors from "cors";

const app: Express = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
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

const creatTodoSchema = zod.object({
    title: zod.string().min(1),
    description: zod.string().max(100).optional()
})

app.post('/signup', async (req, res) => {
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

app.post('/signin', async (req, res) => {
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

// app.post('/', Auth,  async (req, res) => {
//     const result = await prisma.user.findUnique({
//         where: {
//             username:req.body.username,
//         }
//     })
//     res.send(result);
// })

app.post('/create',Auth, async (req, res) => {
    const { success } = creatTodoSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "zod validation error inputs"
        })
    }
    try {
        await prisma.todo.create({
            data: {
                userId: req.body.id,
                title: req.body.title,
                description: req.body.description
            }
        })
        res.json({
            message: "todo created",
        });
    } catch (e) {
        res.json(e);
    }
})

app.get('/get', async (req, res) => {
    try {
        const result = await prisma.todo.findMany({
            where: {
                userId : req.body.userId
            }
        })

        return res.json({
            todo: result.map(todo => (
                {
                    title: todo.title,
                    description: todo.description,
                    done: todo.done,
                    id: todo.id,
                    userId:todo.userId,
                }
            ))
        })
    } catch (e) {
        res.json(e);
    }
})
// app.put('/', Auth, async ( req, res ) => {
//     try{
//     await prisma.todo.update({
//         where: {
//             id: req.body.id,
//         },
//         data: {
//             done: true,
//         }
//     })
//     res.json({
//         message: "todo updated",
//     })
// } catch(e){
//     res.json(e);
// }

// })

app.listen(PORT, () => {
    console.log("Listning at port 3000");
})