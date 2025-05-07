import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an org', async () => {
    await request(app.server).post('/orgs').send({
      name: 'John Doe',
      email: '6WY5Y@example.com',
      zipCode: '05885-600',
      address: 'Rua Teste',
      whatsapp: '123456789',
      password: '12345678',
    })

    const response = await request(app.server).post('/sessions').send({
      email: '6WY5Y@example.com',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
