import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FilterPetsData, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    return prisma.pet.findUnique({
      where: { id },
    })
  }

  async findByCity(city: string) {
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

  findByCharacteristics(data: FilterPetsData) {
    const { age, size, energy_level, independence_level, space_size } = data

    return prisma.pet.findMany({
      where: {
        age,
        size,
        energy_level,
        independence_level,
        space_size,
      },
    })
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
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
