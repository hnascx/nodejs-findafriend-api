import type { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '@prisma/client'
import { CityIsRequiredError } from './errors/city-is-required-error'

interface GetPetsByCityUseCaseRequest {
  city: string
}

interface GetPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class GetPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: GetPetsByCityUseCaseRequest): Promise<GetPetsByCityUseCaseResponse> {
    if (!city) {
      throw new CityIsRequiredError()
    }

    const pets = await this.petsRepository.findByCity(city)

    return { pets }
  }
}
