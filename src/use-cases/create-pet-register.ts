import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Size,
  SpaceSize,
  Pet,
} from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetRegisterUseCaseRequest {
  name: string
  about: string | null
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
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

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
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

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
