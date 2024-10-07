import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async () => {
  try {
    return await prisma.user.findMany()
  } catch(err) { return false }
}

const getOne = async (id?: number, email?: string) => {
  try {
      if (id) return await prisma.user.findFirst({ where: { id } });
      if (email) return await prisma.user.findFirst({ where: { email } });
  } catch (err) { return false; }
}

type UserCreateData = Prisma.Args<typeof prisma.user, 'create'>['data']
const create = async (data: UserCreateData) => {
  try {
    return await prisma.user.create({ data })
} catch (err) { return false; }
}

type UserUpdateData = Prisma.Args<typeof prisma.user, 'update'>['data']
const update = async (id: number, data: UserUpdateData) => {
  try {
    return await prisma.user.update({ where: {id}, data })
} catch (err) { return false; }
}

export const remove = async (id: number) => {
  try {
      return await prisma.user.delete({ where: { id } });
  } catch (err) { return false; }
}

export default { create, getAll, getOne, update, remove }