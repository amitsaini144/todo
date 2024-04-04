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
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const signUpSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(5),
    firstName: zod_1.default.string().min(2),
    lastName: zod_1.default.string().min(2),
});
const signInSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(5)
});
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signUpSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "zod validation error inputs"
        });
    }
    const existingUser = yield prisma.user.findFirst({
        where: {
            username: req.body.username,
        }
    });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already exist"
        });
    }
    try {
        const result = yield prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }
        });
        if (result) {
            const token = jsonwebtoken_1.default.sign({ userId: result.id }, config_1.JWT_SECRET);
            return res.json({
                message: "user token is created",
                token: token,
            });
        }
        else {
            return res.json({
                message: "jwt token not working",
            });
        }
    }
    catch (e) {
        return res.json(e);
    }
}));
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signInSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "zod validation error inputs"
        });
    }
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        });
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({ userId: existingUser.id }, config_1.JWT_SECRET);
            return res.json({ token: token });
        }
        else {
            return res.status(411).json({
                message: "User not found"
            });
        }
    }
    catch (e) {
        return res.json(e);
    }
}));
userRouter.get('/find', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUnique({
        where: {
            username: req.body.username,
        }
    });
    res.send(result);
}));
exports.default = userRouter;
