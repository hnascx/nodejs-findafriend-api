import { Pet, type Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import type { FilterPetsData, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)
    return pet || null
  }

  async findByCityAndCharacteristics(
    city: string,
    filters: FilterPetsData = {},
    page: number,
  ) {
    const filteredPets = this.items
      .filter((pet) => {
        const matchesCity = this.getOrgCity(pet.org_id) === city
        const matchesAge = filters.age ? pet.age === filters.age : true
        const matchesSize = filters.size ? pet.size === filters.size : true
        const matchesEnergyLevel = filters.energy_level
          ? pet.energy_level === filters.energy_level
          : true
        const matchesIndependenceLevel = filters.independence_level
          ? pet.independence_level === filters.independence_level
          : true
        const matchesSpaceSize = filters.space_size
          ? pet.space_size === filters.space_size
          : true

        return (
          matchesCity &&
          matchesAge &&
          matchesSize &&
          matchesEnergyLevel &&
          matchesIndependenceLevel &&
          matchesSpaceSize
        )
      })
      .slice((page - 1) * 20, page * 20)

    return filteredPets.map((pet) => ({
      name: pet.name,
      imageUrl: pet.images_urls[0] || null,
    }))
  }

  private getOrgCity(org_id: string) {
    const orgCities: Record<string, string> = {
      'org-1': 'São Paulo',
      'org-2': 'Rio de Janeiro',
      'org-3': 'Belo Horizonte',
    }

    return orgCities[org_id] || ''
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const imagesUrls = Array.isArray(data.images_urls)
      ? data.images_urls
      : (data.images_urls?.set ?? [])

    const adoptionRequirements = Array.isArray(data.adoption_requirements)
      ? data.adoption_requirements
      : (data.adoption_requirements?.set ?? [])

    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      space_size: data.space_size,
      images_urls: imagesUrls,
      adoption_requirements: adoptionRequirements,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
