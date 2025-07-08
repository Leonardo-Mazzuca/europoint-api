import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";



const getAllPrograms = async () => {
    return await db.program.findMany();
}

const createProgram = async ({description,image,title}:Prisma.ProgramCreateInput) => {
    return await db.program.create({data:{description,image,title}});
}

export {
    getAllPrograms,
    createProgram
}