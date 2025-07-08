import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";

const getAllAchieviments = async () => {
  return await db.achieviment.findMany();
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

const updateAchieviment = async (id: number, progress: number) => {
  const currentAchieviment = await db.achieviment.findUnique({ where: { id } });

  if (progress > 100) {
    throw new Error("Progress provided cannot be more than 100!");
  }

  if (!currentAchieviment) {
    throw new Error(`Achieviment not found for id ${id}`);
  }

  if (currentAchieviment.progress === 100) {
    return await db.achieviment.update({
      where: { id },
      data: { completed: true },
    });
  }


  return await db.achieviment.update({
    where: { id },
    data: {
      progress: {
        increment: progress,
      },
    },
  });
};

export { getAllAchieviments, createAchieviment, updateAchieviment };
