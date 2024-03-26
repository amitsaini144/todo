import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get the todos 
async function getTodos(userId: number,) {
    const res = await prisma.todo.findMany({
        where: {
            userId
        }
    })
    console.log(res);
}
// getTodos(1);