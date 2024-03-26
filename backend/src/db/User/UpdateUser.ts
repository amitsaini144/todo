import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateParams {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}

async function updateUser(username: string, {
    firstName,
    lastName,
    userName,
    password
}: UpdateParams) {
    const res = await prisma.user.update({
        where: { username },
        data: {
            firstName,
            lastName,
            username: userName,
            password
        }
    })
    console.log(res);
}
updateUser("ankit@gmail.com", {
    firstName: "ankit",
    lastName: "sharma",
    userName: "ankit@gmail.com",
    password: "ankitankit"
});
