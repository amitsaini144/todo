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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a User
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const user1 = yield prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName
            }
        });
        console.log(user1);
    });
}
function updateUser(username, { firstName, lastName, userName, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.update({
            where: { username },
            data: {
                firstName,
                lastName,
                username: userName,
                password
            }
        });
        console.log(res);
    });
}
// updateUser("ankit@gmail.com", {
//     firstName: "ankit",
//     lastName: "sharma",
//     userName: "ankit@gmail.com",
//     password: "shAnkit"
// });
// Get data from User
function getUser(firstName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findMany({
            where: {
                firstName: firstName
            }
        });
        console.log(res);
    });
}
// getUser("amit");
// Delete user from User
function deleteUser(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.deleteMany({
            where: {
                username: {
                    contains: userName
                }
            }
        });
        console.log(res);
    });
}
// deleteUser("@gg");
// create todos for the User
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todo.create({
            data: {
                userId,
                title,
                description
            }
        });
        console.log(res);
    });
}
// createTodo(1, "eat healthy", "Salad for breakfast");
// get the todos 
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todo.findMany({
            where: {
                userId
            }
        });
        console.log(res);
    });
}
// getTodos(1);
// get todos and user details
function getTodosAndUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield prisma.todo.findMany({
            where: {
                userId: userId,
            },
            select: {
                user: true,
                title: true,
                description: true
            }
        });
        console.log(todos);
    });
}
// getTodosAndUserDetails(1);
function updatetodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todo.update({
            where: {
                id
            },
            data: {
                done: true
            }
        });
    });
}
updatetodo(1);
