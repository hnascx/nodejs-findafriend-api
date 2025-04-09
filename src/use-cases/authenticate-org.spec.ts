import { describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Org Use Case', () => {
  it('should be able to authenticate', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateOrgUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'John Doe',
      email: 'VxH4d@example.com',
      zip_code: '12345678',
      address: '123 Main St',
      whatsapp: '1234567890',
      password_hash: await hash('12345678', 6),
    })

    const { org } = await sut.execute({
      email: 'VxH4d@example.com',
      password: '12345678',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateOrgUseCase(orgsRepository)

    expect(() =>
      sut.execute({
        email: 'VxH4d@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateOrgUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'John Doe',
      email: 'VxH4d@example.com',
      zip_code: '87654321',
      address: '123 Main St',
      whatsapp: '1234567890',
      password_hash: await hash('87654321', 6),
    })

    expect(() =>
      sut.execute({
        email: 'VxH4d@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
