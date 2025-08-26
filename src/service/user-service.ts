import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";
import { hash } from "bcrypt";
import * as PostService from './post-service';
import * as NewsletterService from './newsletter-service';
import * as ProjectService from './project-service';
export type ItemType = 'post' | 'newsletter' | 'project'

export const getUserByEmail = async (email: string) => {
  return await db.user.findFirst({ where: { email } });
};

export const getUsers = async () => {
  return await db.user.findMany({
    include: {
      followed_areas: true
    }
  });
};

export const getUserById = async (id: number) => {
  return await db.user.findFirst({
    where: { id },
    include: {
      area: {
        select: {
          name: true,
          id: true,
        }
      },
      followed_areas: true,
      liked_posts: true,
      liked_newsletters: true,
      posts: true,
      newsletters: true,
      projects: true
    },
  });
};

export const createUser = async ({
  email,
  password,
  username,
  phone_number,
  area_id,
}: Prisma.UserCreateWithoutAreaInput & { area_id: number }) => {
  const hashed_password = await hash(password, 10);

  return await db.user.create({
    data: {
      email,
      password: hashed_password,
      username,
      phone_number,
      area: {
        connect: {
          id: area_id,
        },
      },
    },
  });
};

export const createManyUsers = async (users: Prisma.UserCreateManyInput[]) => {
  return await db.user.createMany({ data: users });
}

export const uploadAvatar = async (id: number, avatar: Express.Multer.File) => {
  return await db.user.update({
    where: { id },
    data: { avatar: avatar.filename },
  });
};

export const editUser = async (
  id: number,
  { email, password, phone_number, username, total_points, login_count, played_quiz_count}: Prisma.UserCreateWithoutAreaInput
) => {
  return await db.user.update({
    where: { id },
    data: { email, password, phone_number, username, total_points, login_count, played_quiz_count },
  });
};

export const deleteUser = async (id: number) => {
  return await db.user.delete({ where: { id } });
};

export const updateUserPoints = async (id: number, points: number) => {
  return await db.user.update({
    where: { id },
    data: { total_points: {increment: points} },
  });
}


export const unSaveItem = async (id: number, post_id: number, item_type: ItemType) => {
  const user = await db.user.findUnique({
    where: { id },
    select: { saved_posts_ids: true, saved_newsletter_ids: true, saved_projects_ids: true },
  });

  if (!user) throw new Error("Usuário não encontrado");

  switch (item_type) {
    case 'post':
      await PostService.decrementTotalSaved(post_id);
      return await db.user.update({
        where: { id },
        data: { saved_posts_ids: { set: user.saved_posts_ids.filter((id) => id !== post_id) } },
      });
    case 'newsletter':
      await NewsletterService.decrementTotalSaved(post_id);
      return await db.user.update({
        where: { id },
        data: { saved_newsletter_ids: { set: user.saved_newsletter_ids.filter((id) => id !== post_id) } },
      });
    case 'project':
      await ProjectService.decrementTotalSaved(post_id);
      return await db.user.update({
        where: { id },
        data: { saved_projects_ids: { set: user.saved_projects_ids.filter((id) => id !== post_id) } },
      });
  }
};


export const isItemSaved = async (id: number, item_id: number, item_type: ItemType) => {
  switch (item_type) {
    case 'post':
      return await db.user.findFirst({ where: { id, saved_posts_ids: { has: item_id } } });
    case 'newsletter':
      return await db.user.findFirst({ where: { id, saved_newsletter_ids: { has: item_id } } });
    case 'project':
      return await db.user.findFirst({ where: { id, saved_projects_ids: { has: item_id } } });
  }
}

export const saveItem = async (id: number, item_id: number, item_type: ItemType) => {
  switch (item_type) {
    case 'post':
      await PostService.incrementTotalSaved(item_id);
      return await db.user.update({
        where: { id },
        data: { saved_posts_ids: { push: item_id } },
      });
    case 'newsletter':
      await NewsletterService.incrementTotalSaved(item_id);
      return await db.user.update({
        where: { id },
        data: { saved_newsletter_ids: { push: item_id } },
      });
    case 'project':
      await ProjectService.incrementTotalSaved(item_id);
      return await db.user.update({
        where: { id },
        data: { saved_projects_ids: { push: item_id } },
      });
  }
}