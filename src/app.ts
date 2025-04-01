import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.org.create({
  data: {
    name: 'Henrique Xavier',
    email: 'hnascx@icloud.com',
  },
})
