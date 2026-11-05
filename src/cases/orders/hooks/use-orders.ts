import { useQuery } from "@tanstack/react-query"
import { OrderService } from "../services/order.service"

export function useOrders() {
    return useQuery({
        queryKey: ['orders'],
        queryFn: OrderService.listAll
    })
}
