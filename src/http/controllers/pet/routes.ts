import { verifyJWT } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { createPet } from './create-pet'
import { getPetProfile } from './get-pet-profile'
import { getPets } from './get-pets'

export async function petRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', createPet)
  app.get('/pets', getPets)
  app.get('/pets/:petId', getPetProfile)
}
