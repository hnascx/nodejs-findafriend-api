import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsByCityAndCharacteristicsUseCase } from '../get-pets'

export function makeGetPetsByCityAndCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetsByCityAndCharacteristicsUseCase(petsRepository)

  return useCase
}
