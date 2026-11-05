import { Badge } from "@/components/ui/badge"
import type { OrderStatus } from "../dtos/order.dto"
import { ORDER_STATUS } from "./order-status"

interface OrderStatusBadgeProps {
    status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    return (
        <Badge className={ORDER_STATUS[status].badgeClassName}>
            {ORDER_STATUS[status].label}
        </Badge>
    )
}
