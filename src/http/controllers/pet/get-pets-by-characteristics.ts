import { makeGetPetsByCharacteristicsUseCase } from '@/use-cases/factories/make-get-pets-by-characteristics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetsByCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    spaceSize: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const { age, size, energyLevel, independenceLevel, spaceSize, page } =
    querySchema.parse(request.query)

  const getPetsByCharacteristicsUseCase = makeGetPetsByCharacteristicsUseCase()

  const { pets } = await getPetsByCharacteristicsUseCase.execute({
    age,
    size,
    energy_level: energyLevel,
    independence_level: independenceLevel,
    space_size: spaceSize,
    page,
  })

  return reply.status(200).send({ pets })
}
