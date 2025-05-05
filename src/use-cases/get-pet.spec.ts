import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetsByCityAndCharacteristicsUseCase } from './get-pets'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsByCityAndCharacteristicsUseCase

describe('Get Pets By City and Characteristics Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsByCityAndCharacteristicsUseCase(petsRepository)

    petsRepository.create({
      name: 'Buddy',
      about: 'Friendly dog',
      age: 'PUPPY',
      size: 'SMALL',
      energy_level: 'HIGH',
      independence_level: 'LOW',
      space_size: 'SMALL',
      images_urls: ['https://example.com/buddy.jpg'],
      adoption_requirements: ['Has a yard'],
      org_id: 'org-1',
    })

    petsRepository.create({
      name: 'Max',
      about: 'Calm and loyal',
      age: 'ADULT',
      size: 'LARGE',
      energy_level: 'MEDIUM',
      independence_level: 'HIGH',
      space_size: 'LARGE',
      images_urls: ['https://example.com/max.jpg'],
      adoption_requirements: ['Experienced owner'],
      org_id: 'org-2',
    })

    for (let i = 0; i < 25; i++) {
      petsRepository.create({
        name: `Pet ${i + 1}`,
        about: `Pet number ${i + 1}`,
        age: 'ADULT',
        size: 'MEDIUM',
        energy_level: 'LOW',
        independence_level: 'MEDIUM',
        space_size: 'MEDIUM',
        images_urls: [`https://example.com/pet-${i + 1}.jpg`],
        adoption_requirements: [],
        org_id: 'org-1',
      })
    }
  })

  it('should return pets filtered by city only', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
    })

    expect(pets).toHaveLength(20)
    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Buddy' })]),
    )
  })

  it('should return pets filtered by city and specific characteristics', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
      filters: { age: 'PUPPY', size: 'SMALL' },
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Buddy',
        imageUrl: 'https://example.com/buddy.jpg',
      }),
    )
  })

  it('should return pets filtered by city and a single characteristic', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
      filters: { energy_level: 'HIGH' },
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Buddy',
        imageUrl: 'https://example.com/buddy.jpg',
      }),
    )
  })

  it('should return the correct number of pets on the second page', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 2,
    })

    expect(pets).toHaveLength(6)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Pet 20' }),
        expect.objectContaining({ name: 'Pet 25' }),
      ]),
    )
  })

  it('should return no pets if city does not match', async () => {
    const { pets } = await sut.execute({
      city: 'Belo Horizonte',
      page: 1,
    })

    expect(pets).toHaveLength(0)
  })

  it('should return no pets if filters do not match', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
      filters: { age: 'SENIOR' },
      page: 1,
    })

    expect(pets).toHaveLength(0)
  })

  it('should throw an error if city is not provided', async () => {
    await expect(sut.execute({ city: '', page: 1 })).rejects.toThrow(
      'City is required',
    )
  })
})
