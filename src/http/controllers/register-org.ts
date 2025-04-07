import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
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

  const password_hash = await hash(password, 6)

  const orgWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (orgWithSameEmail) {
    return reply.status(409).send()
  }

  await prisma.org.create({
    data: {
      name,
      email,
      zip_code: zipCode,
      address,
      whatsapp,
      password_hash,
    },
  })

  return reply.status(201).send()
}
