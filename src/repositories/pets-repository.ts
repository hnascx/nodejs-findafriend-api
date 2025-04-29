import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Pet,
  Size,
  SpaceSize,
} from '@prisma/client'

export type CreatePetData = {
  name: string
  about?: string | null
  age: Age
  size: Size
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  space_size: SpaceSize
  images_urls: string[]
  adoption_requirements: string[]
  org_id: string
}

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
  create(data: CreatePetData): Promise<Pet>
}
