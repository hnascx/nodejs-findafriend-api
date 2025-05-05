import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Pet,
  Size,
  SpaceSize,
  type Prisma,
} from '@prisma/client'

export type FilterPetsData = {
  age?: Age
  size?: Size
  energy_level?: EnergyLevel
  independence_level?: IndependenceLevel
  space_size?: SpaceSize
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findByCityAndCharacteristics(
    city: string,
    filters: FilterPetsData,
    page: number,
  ): Promise<{ name: string; imageUrl: string | null }[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
