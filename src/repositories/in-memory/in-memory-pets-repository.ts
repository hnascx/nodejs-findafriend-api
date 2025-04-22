import { Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import type { CreatePetData, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByCity(city: string): Promise<Pet[]> {
    return this.items.filter(
      (pet) => pet.org_id && this.getOrgCity(pet.org_id) === city,
    )
  }

  private getOrgCity(org_id: string): string {
    const orgCities: Record<string, string> = {
      'org-1': 'São Paulo',
      'org-2': 'Rio de Janeiro',
      'org-3': 'Belo Horizonte',
    }

    return orgCities[org_id] || ''
  }

  async create(data: CreatePetData): Promise<Pet> {
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
