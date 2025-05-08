import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticateOrg } from './authenticate-org'
import { profileOrg } from './profile-org'
import { refresh } from './refresh'
import { registerOrg } from './register-org'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
  app.post('/sessions', authenticateOrg)

  app.patch('/token/refresh', refresh)

  app.get('/profile', { onRequest: [verifyJWT] }, profileOrg)
}
