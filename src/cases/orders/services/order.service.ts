import { api } from "@/lib/axios"
import type { OrderDTO, OrderStatus } from "../dtos/order.dto"

const ENDPOINT = '/orders'

export const OrderService = {
    async listAll(): Promise<OrderDTO[]> {
        const result = await api.get<OrderDTO[]>(ENDPOINT)
        return result.data
    },

    async listByGuestCheck(guestCheckId: string): Promise<OrderDTO[]> {
        const result = await api.get<OrderDTO[]>(ENDPOINT, {
            params: { guestCheckId }
        })
        return result.data
    },

    async updateStatus(id: string, status: OrderStatus): Promise<OrderDTO> {
        const result = await api.patch<OrderDTO>(`${ENDPOINT}/${id}/status`, { status })
        return result.data
    },
}
