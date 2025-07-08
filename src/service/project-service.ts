import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server"

type CreateProjectInput = {
    area_id: number;
    team_id: number;
    content: string;
    owner_id: number;
    title: string;
    members_ids: number[];
    image: string;
  };
  

const getAllProjects = async () => {
    return await db.project.findMany();
}

const getSingleProject = async (id: number) => {
    return await db.project.findMany();
}

const createProject = async ({
    area_id,
    content,
    owner_id,
    title,
    team_id,
    members_ids,
    image
  }: CreateProjectInput) => {
    return await db.project.create({
      data: {
        title,
        content,
        image,
        owner_id,
        area: {
          connect: { id: area_id }
        },
        team: {
          connect: { id: team_id }
        },
        members_ids 
      }
    });
  };

const updateProject = async (id: number, { title, content, image, members_ids }: Prisma.ProjectUpdateInput) => {
    return await db.project.update({ where: { id }, data: { title, content,image,members_ids } });
}

const deleteProject = async (id: number) => {
    return await db.project.delete({ where: { id } });
}

export {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject
}