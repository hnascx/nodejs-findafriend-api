import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetProfileUseCase } from './get-pet-profile'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetProfileUseCase(petsRepository)
  })

  it('should be able to get pet profile', async () => {
    const createdPet = await petsRepository.create({
      name: 'Charlie',
      about: '',
      age: 'PUPPY',
      size: 'SMALL',
      energy_level: 'MEDIUM',
      independence_level: 'MEDIUM',
      space_size: 'SMALL',
      images_urls: ['img1.png', 'img2.png', 'img3.png'],
      adoption_requirements: ['be careful', 'be friendly'],
      org_id: 'org-1',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('Charlie')
  })

  it('should not be able to get pet profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
