
import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";

type CreatePostInput = {
  title: string;
  content: string;
  images: string[];
  area_id: number;
  user_id: number;
};
const getAllPosts = async () => {
  return await db.post.findMany({
    include: {
      user: {
        select: {
          avatar: true,
          username: true,
          id: true
        }
      },
      area: {
        select: {
          name: true,
          id: true,
          contact_email: true
        }
      },
    }
  });
};

const getPostById = async (id: number) => {
  return await db.post.findFirst({ where: { id } });
};

const createPost = async ({
  title,
  content,
  area_id,
  user_id,
  images
}: CreatePostInput & {user_id: number, area_id: number}) => {
  return await db.post.create({
    data: {
      title,
      content,
      images,
      area: { connect: { id: area_id } },
      user: { connect: { id: user_id } },
    },
  });
};

const updatePost = async (
  id: number,
  { content, title, images, total_likes, total_views }: Prisma.PostUpdateInput
) => {
  return await db.post.update({
    where: { id },
    data: { content, title, images, total_likes, total_views },
  });
};

const deletePost = async (id: number) => {
  return await db.post.delete({ where: { id } });
};

const uploadPostImage = async () => {};

export { getAllPosts, createPost, getPostById, updatePost, deletePost };
