import { Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import type {
  CreatePetData,
  FilterPetsData,
  PetsRepository,
} from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByCity(city: string, page: number) {
    return this.items
      .filter((pet) => pet.org_id && this.getOrgCity(pet.org_id) === city)
      .slice((page - 1) * 20, page * 20)
  }

  private getOrgCity(org_id: string) {
    const orgCities: Record<string, string> = {
      'org-1': 'São Paulo',
      'org-2': 'Rio de Janeiro',
      'org-3': 'Belo Horizonte',
    }

    return orgCities[org_id] || ''
  }

  async findByCharacteristics(data: FilterPetsData, page: number) {
    const { age, size, energy_level, independence_level, space_size } = data

    return this.items
      .filter((pet) => {
        const matchesAge = age ? pet.age === age : true
        const matchesSize = size ? pet.size === size : true
        const matchesEnergyLevel = energy_level
          ? pet.energy_level === energy_level
          : true
        const matchesIndependenceLevel = independence_level
          ? pet.independence_level === independence_level
          : true
        const matchesSpaceSize = space_size
          ? pet.space_size === space_size
          : true

        return (
          matchesAge &&
          matchesSize &&
          matchesEnergyLevel &&
          matchesIndependenceLevel &&
          matchesSpaceSize
        )
      })
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: CreatePetData) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      space_size: data.space_size,
      images_urls: data.images_urls,
      adoption_requirements: data.adoption_requirements,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
