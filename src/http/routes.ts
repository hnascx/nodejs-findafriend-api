import type { FastifyInstance } from 'fastify'
import { registerOrg } from './controllers/register-org'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
}
