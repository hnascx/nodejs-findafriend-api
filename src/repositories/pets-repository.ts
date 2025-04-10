import {
  Pet,
  Age,
  Size,
  EnergyLevel,
  IndependenceLevel,
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

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: CreatePetData): Promise<Pet>
}
