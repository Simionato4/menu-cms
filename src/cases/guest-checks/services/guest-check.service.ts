import { api } from "@/lib/axios"
import type { GuestCheckStatus, GuestCheckWithTotalDTO } from "../dtos/guest-check.dto"

const ENDPOINT = '/guest-checks'

export const GuestCheckService = {
    async listByStatus(status: GuestCheckStatus): Promise<GuestCheckWithTotalDTO[]> {
        const result = await api.get<GuestCheckWithTotalDTO[]>(ENDPOINT, {
            params: { status }
        })
        return result.data
    },
}
