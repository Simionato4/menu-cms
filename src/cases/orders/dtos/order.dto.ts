import type { GuestCheckDTO } from "@/cases/guest-checks/dtos/guest-check.dto"

export type OrderStatus = 'NEW' | 'PREPARING' | 'READY' | 'DELIVERED'

export interface OrderItemProductDTO {
    id: string;
    name: string;
}

export interface OrderItemDTO {
    id: string;
    product: OrderItemProductDTO;
    quantity: number;
    price: string;
    subtotal: string;
}

export interface OrderDTO {
    id: string;
    createdAt: string;
    total: string;
    status: OrderStatus;
    guestCheck: GuestCheckDTO;
    items: OrderItemDTO[];
}
