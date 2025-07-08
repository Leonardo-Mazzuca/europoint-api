import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";


const getAllNewsLetters = async () => {
    return await db.newsLetter.findMany();
}

const getSingleNewsLetter = async (id: number) => {
    return await db.newsLetter.findFirst({ where: { id } });
}

const createNewsletter = async ({
    area_id,content,images,user_id,title
}: Prisma.NewsLetterCreateWithoutAreaInput & { area_id: number }) => {
    return await db.newsLetter.create({ 
        data: {
            content,
            images,
            user_id,
            title,
            area: { connect: { id: area_id } },
        }
     });
}

const updateNewsletter = async (id: number, { title,content, images, total_likes, total_views }: Prisma.NewsLetterUpdateInput) => {
    return await db.newsLetter.update({ where: { id }, data: { content, images, total_likes, total_views, title } });
}

const deleteNewsletter = async (id: number) => {
    return await db.newsLetter.delete({ where: { id } });
}

export {
    getSingleNewsLetter,
    createNewsletter,
    updateNewsletter,
    deleteNewsletter,
    getAllNewsLetters
}