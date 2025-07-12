import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server"

type CreateProjectInput = {
    area_id: number;
    team_id: number;
    content: string;
    user_id: number;
    title: string;
    members_ids: number[];
    image: string;
  };
  

const getAllProjects = async () => {
    return await db.project.findMany({
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
        }
      }
    });
}

const getSingleProject = async (id: number) => {
    return await db.project.findMany();
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
        image,
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

const updateProject = async (id: number, { title, content, image, members_ids }: Prisma.ProjectUpdateInput) => {
    return await db.project.update({ where: { id }, data: { title, content,image,members_ids } });
}

const deleteProject = async (id: number) => {
    return await db.project.delete({ where: { id } });
}

const uploadProjectImage = async (id: number, image: Express.Multer.File) => {
    return await db.project.update({
      where: { id },
      data: { image: image.filename },
    });
}

export {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage
}