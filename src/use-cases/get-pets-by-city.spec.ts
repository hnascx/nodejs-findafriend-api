import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, it } from 'vitest'
import type { GetPetsByCityUseCase } from './get-pets-by-city'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsByCityUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsByCityUseCase(petsRepository)
  })

  it('should be able to find a pet by city', async () => {})
})
