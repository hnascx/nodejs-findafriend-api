import { InvalidZipCodeError } from '@/use-cases/errors/invalid-zip-code-error'
import axios from 'axios'

interface ViaCepResponse {
  localidade: string // city
  uf: string // state
  erro?: boolean
}

export async function fetchCityAndStateByCep(
  cep: string,
): Promise<{ city: string; state: string }> {
  const response = await axios.get<ViaCepResponse>(
    `https://viacep.com.br/ws/${cep}/json/`,
  )

  if (response.data.erro) {
    throw new InvalidZipCodeError()
  }

  return {
    city: response.data.localidade,
    state: response.data.uf,
  }
}
