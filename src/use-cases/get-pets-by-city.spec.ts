import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Size,
  SpaceSize,
} from '@prisma/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetsByCityUseCase } from './get-pets-by-city'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsByCityUseCase

describe('Get Pets By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsByCityUseCase(petsRepository)

    petsRepository.create({
      name: 'Rex',
      age: Age.ADULT,
      size: Size.MEDIUM,
      energy_level: EnergyLevel.HIGH,
      independence_level: IndependenceLevel.LOW,
      space_size: SpaceSize.MEDIUM,
      images_urls: ['https://example.com/rex.jpg'],
      adoption_requirements: ['Needs a yard'],
      org_id: 'org-1',
    })

    petsRepository.create({
      name: 'Bella',
      age: Age.PUPPY,
      size: Size.SMALL,
      energy_level: EnergyLevel.MEDIUM,
      independence_level: IndependenceLevel.HIGH,
      space_size: SpaceSize.SMALL,
      images_urls: ['https://example.com/bella.jpg'],
      adoption_requirements: ['Needs a lot of attention'],
      org_id: 'org-2',
    })
  })

  it('should return pets from São Paulo', async () => {
    const { pets } = await sut.execute({ city: 'São Paulo', page: 1 })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Rex',
        org_id: 'org-1',
      }),
    )
  })

  it('should return pets from Rio de Janeiro', async () => {
    const { pets } = await sut.execute({ city: 'Rio de Janeiro', page: 1 })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Bella',
        org_id: 'org-2',
      }),
    )
  })

  it('should return no pets for Belo Horizonte', async () => {
    const { pets } = await sut.execute({ city: 'Belo Horizonte', page: 1 })

    expect(pets).toHaveLength(0)
  })

  it('should throw an error if city is not provided', async () => {
    await expect(sut.execute({ city: '', page: 1 })).rejects.toThrow(
      'City is required',
    )
  })
})
