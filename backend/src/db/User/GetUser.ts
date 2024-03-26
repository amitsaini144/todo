import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Get data from User
async function getUser(firstName: string) {
    const res = await prisma.user.findMany({
        where: {
            firstName: firstName
        }
    })
    console.log(res);
}
// getUser("amit");