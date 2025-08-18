import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server"

type CreateProjectInput = {
    area_id: number;
    team_id: number;
    content: string;
    user_id: number;
    title: string;
    members_ids: number[];
    image: Prisma.ProjectImageCreateInput;
  };
  

const getAllProjects = async () => {
    return await db.project.findMany({
      orderBy: {
        created_at: 'desc'      
      },
      include: {
        user: {
          select: {
            username: true,
            id: true
          }
        },
        area: {
          select: {
            name: true,
            id: true
          }
        },
        image: true,
        team: true
      },
      
    });
}

const getSingleProject = async (id: number) => {
    return await db.project.findFirst({
      where: {
        id
      },
      include: {
        image: true,
        team: true
      }
    });
}

const createProject = async ({
    area_id,
    content,
    user_id,
    title,
    team_id,
    members_ids,
    image
  }: CreateProjectInput) => {
    return await db.project.create({
      data: {
        title,
        content,
        image: {
          create: image
        },
        area: {
          connect: { id: area_id }
        },
        team: {
          connect: { id: team_id }
        },
        user: {
          connect: { id: user_id }
        },
        members_ids,
      }
    });
  };

const updateProject = async (id: number, { title, content, image, members_ids, status }: Prisma.ProjectUpdateInput) => {
    return await db.project.update({ where: { id }, data: { title, content,image,members_ids, status } });
}

const deleteProject = async (id: number) => {
    return await db.project.delete({ where: { id } });
}


const incrementTotalSaved = async (id: number) => {
  const item = await db.project.findUnique({ where: { id } });

  if (!item) throw new Error("Post not found");

  return await db.project.update({
    where: { id: item.id },
    data: { total_saved: { increment: 1 } },
  });
};

const decrementTotalSaved = async (id: number) => {
  const item = await db.project.findUnique({ where: { id } });

  if (!item) throw new Error("Post not found");

  if (item.total_saved && item.total_saved <= 0) {
    return await db.project.update({
      where: { id: item.id },
      data: { total_saved: { set: 0 } },
    });
  }

  return await db.project.update({
    where: { id: item.id },
    data: { total_saved: { decrement: 1 } },
  });
};

export {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject,
    incrementTotalSaved,
    decrementTotalSaved

}