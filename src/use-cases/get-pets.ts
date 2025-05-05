import { FilterPetsData, PetsRepository } from '@/repositories/pets-repository'
import { CityIsRequiredError } from './errors/city-is-required-error'

interface GetPetsByCityAndCharacteristicsUseCaseRequest {
  city: string
  filters?: FilterPetsData
  page: number
}

interface GetPetsByCityAndCharacteristicsUseCaseResponse {
  pets: {
    name: string
    imageUrl: string | null
  }[]
}

export class GetPetsByCityAndCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    filters = {},
    page,
  }: GetPetsByCityAndCharacteristicsUseCaseRequest): Promise<GetPetsByCityAndCharacteristicsUseCaseResponse> {
    if (!city) {
      throw new CityIsRequiredError()
    }

    const pets = await this.petsRepository.findByCityAndCharacteristics(
      city,
      filters,
      page,
    )

    return { pets }
  }
}
