import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    const user1 = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    })
    console.log(user1);
}
// insertUser("Golcanda@gmail.com", "fortOrWot", "Golcanda", "Fort");
