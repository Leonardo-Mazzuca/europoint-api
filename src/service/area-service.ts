import { db } from "../utils/db.server";
import { getUserById } from "./user-service";

export const getAllAreas = async () => {
  return await db.area.findMany();
};

export const followArea = async (user_id: number, area_id: number) => {

  const current_user = await getUserById(user_id);

  if (!current_user) {
    throw new Error("User not found");
  }

  const userAlreadyFollowArea = await db.user.findFirst({
    where: {
      id: user_id,
      followed_areas: {
        some: {
          id: area_id,
        },
      },
    },
  });

  if(userAlreadyFollowArea) {
    throw new Error("User already follows this area");
  }

  await db.user.update({
    where: { id: user_id },
    data: {
      followed_areas: {
        connect: {
          id: area_id,
        },
      }
    },
  });

  return await db.area.update({
    where: { id: area_id },
    data: {
      followers: {
        connect: {
          id: user_id,
        },
      },
    },
  });

};

export const unFollowArea = async (user_id: number, area_id: number) => {

  const current_user = await getUserById(user_id);

  if (!current_user) {
    throw new Error("User not found");
  }

  const userAlreadyFollowArea = await db.user.findFirst({
    where: {
      id: user_id,
      followed_areas: {
        some: {
          id: area_id,
        },
      },
    },
  });

  if(!userAlreadyFollowArea) {
    throw new Error("User doesn't follow this area");
  }

  await db.user.update({
    where: { id: user_id },
    data: {
      followed_areas: {
        disconnect: {
          id: area_id,
        },
      }
    },
  });

  return await db.area.update({
    where: { id: area_id },
    data: {
      followers: {
        disconnect: {
          id: user_id,
        },
      },
    },
  });
}