import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { OrderStatus } from "../dtos/order.dto"
import { useUpdateOrderStatus } from "../hooks/use-update-order-status"
import { ORDER_STATUS, ORDER_STATUS_LIST } from "./order-status"

interface OrderStatusSelectProps {
    orderId: string;
    status: OrderStatus;
}

const STATUS_ITEMS = ORDER_STATUS_LIST.map((status) => ({
    label: ORDER_STATUS[status].label,
    value: status
}))

export function OrderStatusSelect({ orderId, status }: OrderStatusSelectProps) {
    const updateOrderStatus = useUpdateOrderStatus()

    function handleChange(newStatus: OrderStatus | null) {
        if (!newStatus || newStatus === status) {
            return
        }

        updateOrderStatus.mutate({ id: orderId, status: newStatus })
    }

    return (
        <Select
            items={STATUS_ITEMS}
            value={status}
            onValueChange={handleChange}
            disabled={updateOrderStatus.isPending}
        >
            <SelectTrigger className="w-36" aria-label="Alterar status do pedido">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {STATUS_ITEMS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
