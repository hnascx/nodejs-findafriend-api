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
  findByCity(city: string, page: number): Promise<Pet[]>
  findByCharacteristics(data: FilterPetsData, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
