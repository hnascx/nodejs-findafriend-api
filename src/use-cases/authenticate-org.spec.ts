import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
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
    expect(() =>
      sut.execute({
        email: 'VxH4d@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
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
