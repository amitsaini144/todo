import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// create todos for the User
async function createTodo(userId: number, title: string, description: string) {
    const res = await prisma.todo.create({
        data: {
            userId,
            title,
            description
        }
    })
    console.log(res);
}
// createTodo(15, "Forting", "visit fort");