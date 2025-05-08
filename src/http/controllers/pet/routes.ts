import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { createPet } from './create-pet'
import { getPetProfile } from './get-pet-profile'
import { getPets } from './get-pets'

export async function petRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    { onRequest: [verifyJWT, verifyUserRole('ORG')] },
    createPet,
  )
  app.get('/pets', getPets)
  app.get('/pets/:petId', getPetProfile)
}
