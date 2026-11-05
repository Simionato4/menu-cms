import type { OrderStatus } from "../dtos/order.dto"

interface OrderStatusInfo {
    label: string;
    badgeClassName: string;
}

export const ORDER_STATUS: Record<OrderStatus, OrderStatusInfo> = {
    NEW: { label: 'Novo', badgeClassName: 'bg-sky-100 text-sky-800' },
    PREPARING: { label: 'Em preparo', badgeClassName: 'bg-amber-100 text-amber-800' },
    READY: { label: 'Pronto', badgeClassName: 'bg-emerald-100 text-emerald-800' },
    DELIVERED: { label: 'Entregue', badgeClassName: 'bg-zinc-200 text-zinc-700' },
}

export const ORDER_STATUS_LIST: OrderStatus[] = ['NEW', 'PREPARING', 'READY', 'DELIVERED']
