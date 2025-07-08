import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";
import { hash } from "bcrypt";

export const getUserByEmail = async (email: string) => {
  return await db.user.findFirst({ where: { email } });
};

export const getUsers = async () => {
  return await db.user.findMany();
};

export const getUserById = async (id: number) => {
  return await db.user.findFirst({ where: { id } });
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

export const uploadAvatar = async (id:number,avatar:Express.Multer.File) => {

  return await db.user.update({
    where: { id },
    data: { avatar: avatar.path },
  });
  
}

export const editUser = async (
  id: number,
  { email, password, phone_number, username }: Prisma.UserCreateWithoutAreaInput
) => {
  return await db.user.update({
    where: { id },
    data: { email, password, phone_number, username },
  });
};

export const deleteUser = async (id: number) => {
  return await db.user.delete({ where: { id } });
};
