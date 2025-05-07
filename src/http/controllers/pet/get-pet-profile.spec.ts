import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get pet profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet profile by id', async () => {
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

    const petResponse = await request(app.server)
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

    expect(petResponse.statusCode).toEqual(201)

    const petId = petResponse.body.pet.id

    const profileResponse = await request(app.server)
      .get(`/pets/${petId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body).toEqual({
      pet: {
        id: petId,
        name: 'Cãozinho',
        about: 'Cachorro muito carinhoso',
        age: 'PUPPY',
        size: 'SMALL',
        energy_level: 'HIGH',
        independence_level: 'HIGH',
        space_size: 'SMALL',
        images_urls: ['image-1', 'image-2', 'image-3'],
        adoption_requirements: ['requirement-1', 'requirement-2'],
        created_at: expect.any(String),
        org_id: expect.any(String),
      },
      org: {
        name: 'John Doe',
        address: 'Rua Teste',
        city: expect.any(String),
        state: expect.any(String),
        whatsapp: '123456789',
        whatsappButton: expect.any(String),
      },
    })
  })
})
