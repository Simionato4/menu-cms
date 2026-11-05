import { api } from "@/lib/axios"
import type { SpotDTO, SpotPayload } from "../dtos/spot.dto"

const ENDPOINT = '/spots'

export const SpotService = {
    async listAll(): Promise<SpotDTO[]> {
        const result = await api.get<SpotDTO[]>(ENDPOINT)
        return result.data
    },

    async create(payload: SpotPayload): Promise<SpotDTO> {
        const result = await api.post<SpotDTO>(ENDPOINT, payload)
        return result.data
    },

    async update(id: string, payload: SpotPayload): Promise<SpotDTO> {
        const result = await api.patch<SpotDTO>(`${ENDPOINT}/${id}`, payload)
        return result.data
    },

    async remove(id: string): Promise<void> {
        await api.delete(`${ENDPOINT}/${id}`)
    },
}
