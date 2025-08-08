import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";

type CreateNewsLetterInput = {
    area_id: number;
    content: string;
    title: string;
    user_id: number;
    images: Prisma.NewsletterImageCreateInput[]
}
const getAllNewsLetters = async () => {
    return await db.newsLetter.findMany({
        orderBy: {
            created_at: 'desc',
        },
        include:{
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            area: {
                select: {
                    name: true,
                    id: true
                }
            },
            images: true
        }
    });
}

const getSingleNewsLetter = async (id: number) => {
    return await db.newsLetter.findFirst({ where: { id } });
}

const createNewsletter = async ({
    area_id,content,user_id,title, images
}: CreateNewsLetterInput) => {
    return await db.newsLetter.create({ 
        data: {
            content,
            title,
            images: {
                create: images
            },
            area: { connect: { id: area_id } },
            user: {connect: {id: user_id}}
        }
     });
}

const updateNewsletter = async (id: number, { title,content, total_likes, total_views }: Prisma.NewsLetterUpdateInput) => {
    return await db.newsLetter.update({ where: { id }, data: { content, total_likes, total_views, title } });
}

const deleteNewsletter = async (id: number) => {
    return await db.newsLetter.delete({ where: { id } });
}


export {
    getSingleNewsLetter,
    createNewsletter,
    updateNewsletter,
    deleteNewsletter,
    getAllNewsLetters,
}