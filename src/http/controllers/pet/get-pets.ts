import { CityIsRequiredError } from '@/use-cases/errors/city-is-required-error'
import { makeGetPetsByCityAndCharacteristicsUseCase } from '@/use-cases/factories/make-get-pets-by-city-and-characteristics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPets(request: FastifyRequest, reply: FastifyReply) {
  const getPetsQuerySchema = z.object({
    city: z.string(),
    page: z.number().min(1).default(1),
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    energy_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    space_size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  })

  const query = getPetsQuerySchema.parse(request.query)

  try {
    const getPetsUseCase = makeGetPetsByCityAndCharacteristicsUseCase()

    const { pets } = await getPetsUseCase.execute(query)

    return reply.status(200).send({ pets })
  } catch (error) {
    if (error instanceof CityIsRequiredError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
