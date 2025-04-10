import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Size,
  SpaceSize,
  Pet,
} from '@prisma/client'
import type { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetRegisterUseCaseRequest {
  name: string
  about?: string
  age: Age
  size: Size
  energyLevel: EnergyLevel
  independenceLevel: IndependenceLevel
  spaceSize: SpaceSize
  imagesUrls: string[]
  adoptionRequirements: string[]
  orgId: string
}

interface CreatePetRegisterUseCaseResponse {
  pet: Pet
}

export class CreatePetRegisterUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    independenceLevel,
    spaceSize,
    imagesUrls,
    adoptionRequirements,
    orgId,
  }: CreatePetRegisterUseCaseRequest): Promise<CreatePetRegisterUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      space_size: spaceSize,
      images_urls: imagesUrls,
      adoption_requirements: adoptionRequirements,
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}
