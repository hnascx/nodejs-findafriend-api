import { PetsRepository } from '@/repositories/pets-repository'
import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Pet,
  Size,
  SpaceSize,
} from '@prisma/client'

interface GetPetsByCharacteristicsUseCaseRequest {
  age?: Age
  size?: Size
  energy_level?: EnergyLevel
  independence_level?: IndependenceLevel
  space_size?: SpaceSize
}

interface GetPetsByCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class GetPetsByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    size,
    energy_level,
    independence_level,
    space_size,
  }: GetPetsByCharacteristicsUseCaseRequest): Promise<GetPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.findByCharacteristics({
      age,
      size,
      energy_level,
      independence_level,
      space_size,
    })

    return {
      pets,
    }
  }
}
