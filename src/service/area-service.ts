import { db } from "../utils/db.server";


export const getAllAreas = async () => {
    return await db.area.findMany();
};