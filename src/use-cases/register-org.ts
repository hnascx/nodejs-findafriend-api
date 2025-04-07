import { prisma } from '@/lib/prisma'
import { PrismaOrgsRepository } from '@/repositories/prisma-orgs-repository'
import { hash } from 'bcryptjs'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  zipCode: string
  address: string
  whatsapp: string
  password: string
}

export async function registerOrgUseCase({
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

  const prismaOrgsRepository = new PrismaOrgsRepository()

  await prismaOrgsRepository.create({
    name,
    email,
    zip_code: zipCode,
    address,
    whatsapp,
    password_hash,
  })
}
