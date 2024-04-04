import { Router } from 'express';
import { PrismaClient } from "@prisma/client";
import zod from "zod";

const todoRouter = Router();

const prisma = new PrismaClient();

const creatTodoSchema = zod.object({
    title: zod.string().min(1),
    description: zod.string().max(100).optional()
})

todoRouter.post('/', async (req, res) => {
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

todoRouter.get('/get', async (req, res) => {
    try {
        const result = await prisma.todo.findMany({
            where: { userId: req.body.userId }
        })

        return res.json({
            todo: result.map(todo => (
                {
                    title: todo.title,
                    description: todo.description,
                    done: todo.done,
                    id: todo.id,
                    userId: todo.userId,
                }
            ))
        })
    } catch (e) {
        res.json(e);
    }
})

todoRouter.put('/', async (req, res) => {
    try {
        await prisma.todo.update({
            where: { id: req.body.id },
            data: { done: true }
        })
        res.json({ message: "todo updated", })
    } catch (e) { res.json(e); }
})


export default todoRouter;