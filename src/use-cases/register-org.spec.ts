import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import axios from 'axios'

vi.mock('axios')

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)

    vi.mocked(axios.get).mockResolvedValue({
      data: {
        localidade: 'São Paulo',
        uf: 'SP',
      },
    })
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'Cãonil da Seda',
      email: 'caonildaseda@gmail.com',
      zipCode: '05885600',
      address: 'Rua da Seda, 32',
      whatsapp: '11948275951',
      password: '12345678',
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.city).toEqual('São Paulo')
    expect(org.state).toEqual('SP')
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Cãonil da Seda',
      email: 'caonildaseda@gmail.com',
      zipCode: '05885600',
      address: 'Rua da Seda, 32',
      whatsapp: '11948275951',
      password: '12345678',
    })

    const isPasswordCorrectlyHashed = await compare(
      '12345678',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'caonildaseda@gmail.com'

    await sut.execute({
      name: 'Cãonil da Seda',
      email,
      zipCode: '05885600',
      address: 'Rua da Seda, 32',
      whatsapp: '11948275951',
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        name: 'Cãonil da Seda',
        email,
        zipCode: '05885600',
        address: 'Rua da Seda, 32',
        whatsapp: '11948275951',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
