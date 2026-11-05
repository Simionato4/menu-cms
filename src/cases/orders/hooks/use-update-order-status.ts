import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api-error"
import { OrderService } from "../services/order.service"
import { ORDER_STATUS } from "../components/order-status"
import type { OrderStatus } from "../dtos/order.dto"

interface UpdateOrderStatusVariables {
    id: string;
    status: OrderStatus;
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, status }: UpdateOrderStatusVariables) => OrderService.updateStatus(id, status),
        onSuccess: (order) => {
            toast.success(`Pedido marcado como ${ORDER_STATUS[order.status].label}.`)
            return queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
        onError: (error) => {
            toast.error('Não foi possível alterar o status do pedido.', {
                description: getApiErrorMessage(error)
            })
        }
    })
}
