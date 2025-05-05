import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { generateWhatsAppButton } from '@/utils/whatsapp-button'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetProfileUseCaseRequest {
  petId: string
}

interface GetPetProfileUseCaseResponse {
  pet: Pet
  org: {
    name: string
    address: string
    city: string
    state: string
    whatsapp: string
    whatsappButton: string
  }
}

export class GetPetProfileUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    petId,
  }: GetPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const org = await this.orgsRepository.findById(pet.org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const whatsappButton = generateWhatsAppButton(
      org.whatsapp,
      pet.name,
      org.name,
    )

    return {
      pet,
      org: {
        name: org.name,
        address: org.address,
        city: org.city,
        state: org.state,
        whatsapp: org.whatsapp,
        whatsappButton,
      },
    }
  }
}
