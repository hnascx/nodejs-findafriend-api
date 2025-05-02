import type { FastifyInstance } from 'fastify'
import { authenticateOrg } from './controllers/authenticate-org'
import { profileOrg } from './controllers/profile-org'
import { registerOrg } from './controllers/register-org'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
  app.post('/sessions', authenticateOrg)

  app.get('/profile', profileOrg)
}
