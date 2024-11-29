import { api } from "./api"

interface RideEstimateBody {
  customer_id: string
  origin: string
  destination: string
}

interface RideConfirmBody {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string

  driver: {
    id: number
    name: string
  }
  value: number
}

/**
 * Estima uma corrida com base nos detalhes fornecidos.
 * @param body - Corpo da requisição contendo os dados da corrida.
 */
export const postRideEstimate = async (body: RideEstimateBody) => {
  try {
    console.log(process.env.REACT_APP_API_ROUTE)
    const response = await api.post("/ride/estimate", body)
    return response.data
  } catch (error) {
    console.error("Erro ao estimar a corrida:", error)
    throw error
  }
}

/**
 * Confirma uma corrida com base nos detalhes fornecidos.
 * @param body - Corpo da requisição contendo os dados da corrida.
 */
export const patchRideConfirm = async (body: RideConfirmBody) => {
  try {
    const response = await api.patch("/ride/confirm", body)
    return response.data
  } catch (error) {
    console.error("Erro ao confirmar a corrida:", error)
    throw error
  }
}

/**
 * Obtém os detalhes de uma corrida específica.
 * @param customer_id - ID do cliente.
 * @param driver_id - ID do motorista.
 */
export const getRideDetails = async (
  customer_id: string,
  driver_id: number | null
) => {
  try {
    const response = await api.get(
      `/ride/${customer_id}?driver_id=${driver_id}`
    )
    return response.data
  } catch (error) {
    console.error("Erro ao obter detalhes da corrida:", error)
    throw error
  }
}

export const getDrivers = async (string_busca: string) => {
  try {
    const response = await api.get(`user/driver?stringBusca=${string_busca}`)
    return response.data
  } catch (error) {
    console.error("Erro ao obter detalhes da corrida:", error)
    throw error
  }
}
