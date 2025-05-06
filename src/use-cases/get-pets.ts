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

    const { age, size, energy_level, independence_level, space_size } = filters

    const preparedFilters: FilterPetsData = {
      ...(age && { age }),
      ...(size && { size }),
      ...(energy_level && { energy_level }),
      ...(independence_level && { independence_level }),
      ...(space_size && { space_size }),
    }

    const pets = await this.petsRepository.findByCityAndCharacteristics(
      city,
      preparedFilters,
      page,
    )

    return { pets }
  }
}
