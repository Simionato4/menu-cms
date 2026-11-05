import { useQuery } from "@tanstack/react-query"
import { OrderService } from "../services/order.service"

export function useGuestCheckOrders(guestCheckId: string) {
    return useQuery({
        queryKey: ['orders', { guestCheckId }],
        queryFn: () => OrderService.listByGuestCheck(guestCheckId)
    })
}
