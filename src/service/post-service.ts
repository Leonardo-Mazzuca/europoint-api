import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";

type CreatePostInput = {
  content: string;
  images: Prisma.PostImageCreateInput[];
  area_id: number;
  user_id: number;
};
const getAllPosts = async () => {
  return await db.post.findMany({
    orderBy: { id: 'desc' },
    include: {
      user: {
        select: {
          avatar: true,
          username: true,
          id: true,
        },
      },
      area: {
        select: {
          name: true,
          id: true,
          contact_email: true,
        },
      },
      images: true
    },
  });
};

const getPostById = async (id: number) => {
  return await db.post.findFirst({ where: { id } });
};

const createPost = async ({
  content,
  area_id,
  user_id,
  images,
}: CreatePostInput & { user_id: number; area_id: number }) => {
  return await db.post.create({
    data: {
      content,
      images: {
        create: images
      },
      area: { connect: { id: area_id } },
      user: { connect: { id: user_id } },
    },
  });
};

const updatePost = async (
  id: number,
  { content, images, total_likes, total_views }: Prisma.PostUpdateInput
) => {
  return await db.post.update({
    where: { id },
    data: { content, images, total_likes, total_views },
  });
};

const deletePost = async (id: number) => {
  return await db.post.delete({ where: { id } });
};

const deleteAllPosts = async () => {
  return await db.post.deleteMany();
};

const incrementTotalSaved = async (id: number) => {
  const item = await db.post.findUnique({ where: { id } });

  if (!item) throw new Error("Post not found");

  return await db.post.update({
    where: { id: item.id },
    data: { total_saved: { increment: 1 } },
  });
};

const decrementTotalSaved = async (id: number) => {
  const item = await db.post.findUnique({ where: { id } });

  if (!item) throw new Error("Post not found");

  if (item.total_saved && item.total_saved <= 0) {
    return await db.post.update({
      where: { id: item.id },
      data: { total_saved: { set: 0 } },
    });
  }

  return await db.post.update({
    where: { id: item.id },
    data: { total_saved: { decrement: 1 } },
  });
};

const togglePostsLike = async (postId: number, userId: number) => {
  const alreadyLiked = await db.postLike.findUnique({
    where: {
      user_id_post_id: {
        user_id: userId,
        post_id: postId,
      },
    },
  });

  if (alreadyLiked) {
    await db.postLike.delete({
      where: {
        user_id_post_id: {
          user_id: userId,
          post_id: postId,
        },
      },
    });

    return await db.post.update({
      where: { id: postId },
      data: { total_likes: { decrement: 1 } },
    });
  }

  await db.postLike.create({
    data: {
      user_id: userId,
      post_id: postId,
    },
  });

  return await db.post.update({
    where: { id: postId },
    data: { total_likes: { increment: 1 } },
  });
};


const updateViews = async (id: number) => {
  return await db.post.update({
    where: { id },
    data: { total_views: { increment: 1 } },
  });
}

export {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  incrementTotalSaved,
  decrementTotalSaved,
  deleteAllPosts,
  togglePostsLike,
  updateViews
};
