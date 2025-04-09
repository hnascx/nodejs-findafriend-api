import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'VxH4d@example.com',
      zipCode: '12345678',
      address: '123 Main St',
      whatsapp: '1234567890',
      password: '12345678',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'VxH4d@example.com',
      zipCode: '12345678',
      address: '123 Main St',
      whatsapp: '1234567890',
      password: '12345678',
    })

    const isPasswordCorrectlyHashed = await compare(
      '12345678',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'VxH4d@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      zipCode: '12345678',
      address: '123 Main St',
      whatsapp: '1234567890',
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        zipCode: '12345678',
        address: '123 Main St',
        whatsapp: '1234567890',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
