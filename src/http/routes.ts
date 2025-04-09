import type { FastifyInstance } from 'fastify'
import { registerOrg } from './controllers/register-org'
import { authenticateOrg } from './controllers/authenticate-org'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
  app.post('/sessions', authenticateOrg)
}
