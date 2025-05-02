import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetRegisterUseCase } from '../create-pet-register'

export function makeCreatePetRegisterUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new CreatePetRegisterUseCase(petsRepository, orgsRepository)

  return useCase
}
