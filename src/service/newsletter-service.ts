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
    return await db.newsLetter.findFirst({ where: { id }, include: {images: true} });
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

const incrementTotalSaved = async (id: number) => {
    const item = await db.newsLetter.findUnique({ where: { id } });
  
    if (!item) throw new Error("Post not found");
  
    return await db.newsLetter.update({
      where: { id: item.id },
      data: { total_saved: { increment: 1 } },
    });
  };
  
  const decrementTotalSaved = async (id: number) => {
    const item = await db.newsLetter.findUnique({ where: { id } });
  
    if (!item) throw new Error("Post not found");
  
    if (item.total_saved && item.total_saved <= 0) {
      return await db.newsLetter.update({
        where: { id: item.id },
        data: { total_saved: { set: 0 } },
      });
    }
  
    return await db.newsLetter.update({
      where: { id: item.id },
      data: { total_saved: { decrement: 1 } },
    });
  };

  const toggleNewsletterLike = async (newsletterId: number, userId: number) => {
    const alreadyLiked = await db.newsletterLike.findUnique({
      where: {
        user_id_newsletter_id: {
          user_id: userId,
          newsletter_id: newsletterId,
        },
      },
    });
  
    if (alreadyLiked) {
      await db.newsletterLike.delete({
        where: {
          user_id_newsletter_id: {
            user_id: userId,
            newsletter_id: newsletterId,
          },
        },
      });
  
      return await db.newsLetter.update({
        where: { id: newsletterId },
        data: { total_likes: { decrement: 1 } },
      });
    }
  
    await db.newsletterLike.create({
      data: {
        user_id: userId,
        newsletter_id: newsletterId,
      },
    });
  
    return await db.newsLetter.update({
      where: { id: newsletterId },
      data: { total_likes: { increment: 1 } },
    });
  };
  

export {
    getSingleNewsLetter,
    createNewsletter,
    updateNewsletter,
    deleteNewsletter,
    getAllNewsLetters,
    incrementTotalSaved,
    decrementTotalSaved,
    toggleNewsletterLike
}