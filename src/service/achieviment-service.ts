import { AchievimentKey, Prisma } from "@prisma/client";
import { db } from "../utils/db.server";

const getAllAchieviments = async () => {
  return await db.achieviment.findMany({
    orderBy: {
      updated_at: "desc"
    }
  });
};

const createAchieviment = async ({
  description,
  points,
  title,
  user_id,
}: Prisma.AchievimentCreateWithoutUserInput & { user_id: number }) => {
  return await db.achieviment.create({
    data: { description, points, title, user_id },
  });
};

const editAchieviment = async (key: AchievimentKey, user_id: number, achieviment: Prisma.AchievimentUpdateInput) => {
  return await db.achieviment.update({ where: { user_id_key: { key, user_id } }, data: achieviment });
}

const updateAchieviment = async (user_id: number, progress: number, key: AchievimentKey) => {
  const currentAchieviment = await db.achieviment.findUnique({ where: { 
    user_id_key: { user_id, key }
   } });

  if (progress > 100) {
    throw new Error("Progress provided cannot be more than 100!");
  }

  if (!currentAchieviment) {
    throw new Error(`Achieviment not found key id ${key}`);
  }

  await db.user.update({
    where: { id: user_id },
    data: {
      total_points: {
        increment: currentAchieviment.points,
      },
    },
  });

  return await db.achieviment.update({
    where: { user_id_key: {key,user_id} },
    data: {
      progress: {
        increment: currentAchieviment.progress === 100 ? 0 : progress,
      },
      completed: progress === 100 || currentAchieviment.progress === 100 
    },
  });
};

const getAchievimentsByUserId = async (user_id: number) => {
  return await db.achieviment.findMany({where: {user_id}});
}

const getAchievimentByKey = async (user_id: number, key: AchievimentKey) => {
  return await db.achieviment.findFirst({where: {key, user_id}});
}

export { getAllAchieviments, createAchieviment, updateAchieviment, getAchievimentsByUserId, getAchievimentByKey, editAchieviment };
