import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    zipCode: z.string(),
    address: z.string(),
    whatsapp: z.string().min(8),
    password: z.string().min(8),
  })

  const { name, email, zipCode, address, whatsapp, password } =
    registerBodySchema.parse(request.body)

  await prisma.org.create({
    data: {
      name,
      email,
      zip_code: zipCode,
      address,
      whatsapp,
      password_hash: password,
    },
  })

  return reply.status(201).send()
}
