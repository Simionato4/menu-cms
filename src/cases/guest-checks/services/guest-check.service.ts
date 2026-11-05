import { api } from "@/lib/axios"
import type { GuestCheckDTO, GuestCheckStatus, GuestCheckWithTotalDTO } from "../dtos/guest-check.dto"

const ENDPOINT = '/guest-checks'

export const GuestCheckService = {
    async findOne(id: string): Promise<GuestCheckDTO> {
        const result = await api.get<GuestCheckDTO>(`${ENDPOINT}/${id}`)
        return result.data
    },

    async listByStatus(status: GuestCheckStatus): Promise<GuestCheckWithTotalDTO[]> {
        const result = await api.get<GuestCheckWithTotalDTO[]>(ENDPOINT, {
            params: { status }
        })
        return result.data
    },
}
