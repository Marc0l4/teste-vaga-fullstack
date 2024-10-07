import { PrismaClient, Prisma } from '@prisma/client'
import { Doc } from '../types/Doc'
const prisma = new PrismaClient()

const getAll = async (id: number) => {
  try {
    const docs = await prisma.documents.findMany()
    if(docs) {
      const userDocs: Doc[] = docs.filter(i => i.userId === id)
      return userDocs
    }
  } catch (err) {
    return false
  }
}

const getOne = async (id: number) => {
  try {
    return await prisma.documents.findFirst({ where: { id } })
  } catch (err) {
    return false
  }
}

type DocsCreateData = Prisma.Args<typeof prisma.documents, 'create'>['data']
const create = async (data: DocsCreateData) => {
  try {
    return await prisma.documents.create({ data })
  } catch (err) {
    return false
  }
}

type DocsUpdateData = Prisma.Args<typeof prisma.documents, 'update'>['data']
const update = async (id: number, data: DocsUpdateData) => {
  try {
    return await prisma.documents.update({ where: { id }, data })
  } catch (err) {
    return false
  }
}

export const remove = async (id: number) => {
  try {
    return await prisma.documents.delete({ where: { id } })
  } catch (err) {
    return false
  }
}

export default { create, getAll, getOne, update, remove }
