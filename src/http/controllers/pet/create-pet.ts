import { makeCreatePetRegisterUseCase } from '@/use-cases/factories/make-create-pet-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string().nullable(),
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    spaceSize: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    imagesUrls: z.array(z.string()),
    adoptionRequirements: z.array(z.string()),
  })

  const {
    name,
    about,
    age,
    size,
    energyLevel,
    independenceLevel,
    spaceSize,
    imagesUrls,
    adoptionRequirements,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetRegisterUseCase()

  const { pet } = await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energyLevel,
    independenceLevel,
    spaceSize,
    imagesUrls,
    adoptionRequirements,
    orgId: request.user.sub,
  })

  return reply.status(201).send({
    pet,
  })
}
