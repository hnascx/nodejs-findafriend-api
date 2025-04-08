import type { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  zipCode: string
  address: string
  whatsapp: string
  password: string
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
  }: RegisterOrgUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    await this.orgRepository.create({
      name,
      email,
      zip_code: zipCode,
      address,
      whatsapp,
      password_hash,
    })
  }
}
