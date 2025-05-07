import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Pets by City and Characteristics (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to filter pets by city and characteristics', async () => {
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

    const findPetResponse = await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)
      .query({
        city: 'São Paulo',
        age: 'PUPPY',
        size: 'SMALL',
      })
      .expect(200)

    expect(findPetResponse.body.pets).toHaveLength(1)
    expect(findPetResponse.body.pets[0]).toMatchObject({
      name: 'Cãozinho',
      imageUrl: 'image-1',
    })
  })

  it('should return 400 if city is not provided', async () => {
    await request(app.server).post('/orgs').send({
      name: 'John Doe',
      email: '6WY5Y@example.com',
      zipCode: '05885-600',
      address: 'Rua Teste',
      whatsapp: '123456789',
      password: '12345678',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: '6WY5Y@example.com',
      password: '12345678',
    })

    const { token } = authResponse.body

    await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)
      .query({
        age: 'PUPPY',
      })
      .expect(400)
  })
})
