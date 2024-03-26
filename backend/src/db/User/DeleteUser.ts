import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Delete user from User
async function deleteUser(userName: string) {
    const res = await prisma.user.deleteMany({
        where: {
            username: {
                contains: userName
            }
        }
    })
    console.log(res);
}
// deleteUser("@gg");