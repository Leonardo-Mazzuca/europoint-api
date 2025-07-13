import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";

type ProgramCreateInput = {
    description: string;
    title: string;
}

const getAllPrograms = async () => {
    return await db.program.findMany();
}

const createProgram = async ({description,title}:ProgramCreateInput) => {
    return await db.program.create({data:{description,title}});
}

const uploadProgramImage = async (id: number, image: Express.Multer.File) => {
    return await db.program.update({ where: { id }, data: { image: image.filename } });
}

export {
    getAllPrograms,
    createProgram,
    uploadProgramImage
}