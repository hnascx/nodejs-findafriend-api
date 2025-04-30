import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsByCityUseCase } from '../get-pets-by-city'

export function makeGetPetByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetsByCityUseCase(petsRepository)

  return useCase
}
