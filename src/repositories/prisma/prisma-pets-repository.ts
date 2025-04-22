import { prisma } from '@/lib/prisma'
import { Pet } from '@prisma/client'
import { CreatePetData, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    return prisma.pet.findUnique({
      where: { id },
    })
  }

  async findByCity(city: string): Promise<Pet[]> {
    return prisma.pet.findMany({
      where: {
        org: {
          city,
        },
      },
      include: {
        org: true,
      },
    })
  }

  async create(data: CreatePetData): Promise<Pet> {
    return prisma.pet.create({
      data: {
        name: data.name,
        about: data.about,
        age: data.age,
        size: data.size,
        energy_level: data.energy_level,
        independence_level: data.independence_level,
        space_size: data.space_size,
        images_urls: data.images_urls,
        adoption_requirements: data.adoption_requirements,
        org_id: data.org_id,
      },
    })
  }
}
