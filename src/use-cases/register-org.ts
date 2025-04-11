import type { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import type { Org } from '@prisma/client'
import { fetchCityAndStateByCep } from '@/utils/fetch-city-and-state-by-cep'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  zipCode: string
  address: string
  whatsapp: string
  password: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    zipCode,
    address,
    whatsapp,
    password,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const { city, state } = await fetchCityAndStateByCep(zipCode)

    const org = await this.orgRepository.create({
      name,
      email,
      zip_code: zipCode,
      address,
      city,
      state,
      whatsapp,
      password_hash,
    })

    return {
      org,
    }
  }
}
