"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const todoRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const creatTodoSchema = zod_1.default.object({
    title: zod_1.default.string().min(1),
    description: zod_1.default.string().max(100).optional()
});
todoRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = creatTodoSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "zod validation error inputs"
        });
    }
    try {
        yield prisma.todo.create({
            data: {
                userId: req.body.id,
                title: req.body.title,
                description: req.body.description
            }
        });
        res.json({
            message: "todo created",
        });
    }
    catch (e) {
        res.json(e);
    }
}));
todoRouter.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.todo.findMany({
            where: { userId: req.body.userId }
        });
        return res.json({
            todo: result.map(todo => ({
                title: todo.title,
                description: todo.description,
                done: todo.done,
                id: todo.id,
                userId: todo.userId,
            }))
        });
    }
    catch (e) {
        res.json(e);
    }
}));
todoRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.todo.update({
            where: { id: req.body.id },
            data: { done: true }
        });
        res.json({ message: "todo updated", });
    }
    catch (e) {
        res.json(e);
    }
}));
exports.default = todoRouter;
