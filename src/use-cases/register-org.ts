import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  zipCode: string
  address: string
  whatsapp: string
  password: string
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: any) {}

  async execute({
    name,
    email,
    zipCode,
    address,
    whatsapp,
    password,
  }: RegisterOrgUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    if (orgWithSameEmail) {
      throw new Error('E-mail already exists.')
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
