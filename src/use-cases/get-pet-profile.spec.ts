import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPetProfileUseCase } from './get-pet-profile'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPetProfileUseCase(petsRepository, orgsRepository)

    orgsRepository.create({
      id: 'org-1',
      name: 'Friendly Org',
      email: 'contact@friendlyorg.com',
      zip_code: '12345-678',
      address: '123 Friendly St.',
      city: 'Friendly City',
      state: 'Friendly State',
      whatsapp: '+5511999999999',
      password_hash: 'hashedpassword',
      created_at: new Date(),
    })
  })

  it('should be able to get pet profile with organization details', async () => {
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

    const { pet, org } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('Charlie')
    expect(org.name).toEqual('Friendly Org')
    expect(org.whatsappButton).toContain('https://wa.me/')
  })

  it('should not be able to get pet profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
