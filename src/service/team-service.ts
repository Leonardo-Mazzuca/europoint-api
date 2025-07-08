import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";


const getAllTeams = async () => {
    return await db.team.findMany();
}

const createTeam = async ({name,area_id,members_ids}:Prisma.TeamCreateWithoutAreaInput & { area_id: number }) => {
    return await db.team.create({
        data: {
            name,
            area_id,
            members_ids

        }
    });
}   

export {
    getAllTeams,
    createTeam
}