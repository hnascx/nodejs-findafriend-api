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

describe('Get Pet By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsByCityUseCase(petsRepository)
  })

  it('should be able to find a pet by city', async () => {
    const petDataOne = {
      name: 'Rex',
      age: Age.ADULT,
      size: Size.MEDIUM,
      energy_level: EnergyLevel.HIGH,
      independence_level: IndependenceLevel.LOW,
      space_size: SpaceSize.MEDIUM,
      images_urls: ['url1'],
      adoption_requirements: ['Needs a yard'],
      org_id: 'org-1',
    }

    const petDataTwo = {
      name: 'Bella',
      age: Age.PUPPY,
      size: Size.SMALL,
      energy_level: EnergyLevel.MEDIUM,
      independence_level: IndependenceLevel.HIGH,
      space_size: SpaceSize.SMALL,
      images_urls: ['url2'],
      adoption_requirements: ['Needs a lot of attention'],
      org_id: 'org-2',
    }

    await petsRepository.create(petDataOne)
    await petsRepository.create(petDataTwo)

    const petsInSaoPaulo = await sut.execute({ city: 'São Paulo' })
    expect(petsInSaoPaulo.pets).toHaveLength(1)
    expect(petsInSaoPaulo.pets[0].name).toBe('Rex')

    const petsInRio = await sut.execute({ city: 'Rio de Janeiro' })
    expect(petsInRio.pets).toHaveLength(1)
    expect(petsInRio.pets[0].name).toBe('Bella')

    const petsInBeloHorizonte = await sut.execute({ city: 'Belo Horizonte' })
    expect(petsInBeloHorizonte.pets).toHaveLength(0)
  })
})
