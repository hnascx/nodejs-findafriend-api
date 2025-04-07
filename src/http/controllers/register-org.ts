import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '@/use-cases/register-org'
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

  try {
    const orgsRepository = new PrismaOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    await registerOrgUseCase.execute({
      name,
      email,
      zipCode,
      address,
      whatsapp,
      password,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
