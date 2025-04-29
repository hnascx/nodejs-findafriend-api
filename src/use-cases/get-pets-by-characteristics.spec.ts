import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetsByCharacteristicsUseCase } from './get-pets-by-characteristics'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsByCharacteristicsUseCase

describe('Get Pets By Characteristics Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsByCharacteristicsUseCase(petsRepository)

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

  it('should return pets filtered by specific characteristics', async () => {
    const { pets } = await sut.execute({
      age: 'PUPPY',
      size: 'SMALL',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Buddy',
        age: 'PUPPY',
        size: 'SMALL',
      }),
    )
  })

  it('should return pets filtered by a single characteristic', async () => {
    const { pets } = await sut.execute({
      energy_level: 'HIGH',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Buddy',
        energy_level: 'HIGH',
      }),
    )
  })

  it('should return all pets if no filters are applied with pagination', async () => {
    const { pets } = await sut.execute({ page: 1 })

    expect(pets).toHaveLength(20)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Buddy' }),
        expect.objectContaining({ name: 'Max' }),
      ]),
    )
  })

  it('should return the correct number of pets on the second page', async () => {
    const { pets } = await sut.execute({ page: 2 })

    expect(pets).toHaveLength(7) // for with 25 pets + 2 (Buddy and Max)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Pet 21' }),
        expect.objectContaining({ name: 'Pet 25' }),
      ]),
    )
  })

  it('should return an empty array if no pets match the criteria', async () => {
    const { pets } = await sut.execute({
      age: 'SENIOR',
      page: 1,
    })

    expect(pets).toHaveLength(0)
  })
})
