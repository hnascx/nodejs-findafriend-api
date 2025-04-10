import { Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import type { PetsRepository, CreatePetData } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

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
