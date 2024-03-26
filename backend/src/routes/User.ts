import express from "express";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = express.Router();

const prisma = new PrismaClient();

const user = Router();

user.get("/", async (req:any, res:any) => {
    console.log("earthing is working");
    res.send("heloo worlg");
    // const result = await prisma.todo.findMany({
    //     where: {

    //     }
    // })
    // res.send(result);

}
)

export default user;
