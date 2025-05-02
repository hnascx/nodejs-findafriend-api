import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticateOrg } from './authenticate-org'
import { profileOrg } from './profile-org'
import { registerOrg } from './register-org'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
  app.post('/sessions', authenticateOrg)

  app.get('/profile', { onRequest: [verifyJWT] }, profileOrg)
}
