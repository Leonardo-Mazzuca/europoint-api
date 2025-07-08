import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";

const getAllPosts = async () => {
  return await db.post.findMany();
};

const getPostById = async (id: number) => {
  return await db.post.findFirst({ where: { id } });
};

const createPost = async ({
  title,
  content,
  area_id,
  user_id,
  images,
}: Prisma.PostCreateWithoutAreaInput & { area_id: number }) => {
  return await db.post.create({
    data: {
      title,
      content,
      images,
      user_id,
      area: { connect: { id: area_id } },
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

export { getAllPosts, createPost, getPostById, updatePost, deletePost };
