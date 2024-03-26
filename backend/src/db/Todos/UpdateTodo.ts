import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updatetodo(id: number){
    const result = await prisma.todo.update({
        where: {
            id,
        },
        data:{
            title: "amit"
        }
    })
}
updatetodo(13);