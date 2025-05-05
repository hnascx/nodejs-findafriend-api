import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FilterPetsData, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    return prisma.pet.findUnique({
      where: { id },
    })
  }

  async findByCityAndCharacteristics(
    city: string,
    filters: FilterPetsData,
    page: number,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
        },
        ...filters,
      },
      take: 20,
      skip: (page - 1) * 20,
      select: {
        name: true,
        images_urls: true,
      },
    })

    return pets.map((pet) => ({
      name: pet.name,
      imageUrl: pet.images_urls.length > 0 ? pet.images_urls[0] : null,
    }))
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
