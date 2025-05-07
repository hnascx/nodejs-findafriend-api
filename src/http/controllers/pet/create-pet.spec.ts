import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
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

    const { token } = response.body

    const createPetResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cãozinho',
        about: 'Cachorro muito carinhoso',
        age: 'PUPPY',
        size: 'SMALL',
        energyLevel: 'HIGH',
        independenceLevel: 'HIGH',
        spaceSize: 'SMALL',
        imagesUrls: ['image-1', 'image-2', 'image-3'],
        adoptionRequirements: ['requirement-1', 'requirement-2'],
      })

    expect(createPetResponse.statusCode).toEqual(201)
  })
})
