import { describe, expect, it } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

describe('Register Org Use Case', () => {
  it('should be able to register', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    const { org } = await registerOrgUseCase.execute({
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
    const orgsRepository = new InMemoryOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    const { org } = await registerOrgUseCase.execute({
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
    const orgsRepository = new InMemoryOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    const email = 'VxH4d@example.com'

    await registerOrgUseCase.execute({
      name: 'John Doe',
      email,
      zipCode: '12345678',
      address: '123 Main St',
      whatsapp: '1234567890',
      password: '12345678',
    })

    expect(() =>
      registerOrgUseCase.execute({
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
