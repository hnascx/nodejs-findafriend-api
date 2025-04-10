import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { GetOrgProfileUseCase } from './get-org-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get org profile', async () => {
    const createdOrg = await orgsRepository.create({
      name: 'John Doe',
      email: 'VxH4d@example.com',
      zip_code: '12345678',
      address: '123 Main St',
      whatsapp: '1234567890',
      password_hash: await hash('12345678', 6),
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
