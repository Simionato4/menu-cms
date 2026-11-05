import { useDroppable } from "@dnd-kit/core"
import { cn } from "cn"
import type { OrderDTO, OrderStatus } from "../dtos/order.dto"
import { KanbanCard } from "./kanban-card"
import { OrderStatusBadge } from "./order-status-badge"

interface KanbanColumnProps {
    status: OrderStatus;
    orders: OrderDTO[];
    updatingOrderId?: string;
}

export function KanbanColumn({ status, orders, updatingOrderId }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({ id: status })

    return (
        <section
            ref={setNodeRef}
            className={cn(
                'flex min-h-64 flex-col gap-3 rounded-xl border bg-muted/50 p-3 transition-colors',
                isOver && 'border-primary bg-accent'
            )}
        >
            <header className="flex items-center justify-between">
                <OrderStatusBadge status={status} />
                <span className="text-sm text-muted-foreground">{orders.length}</span>
            </header>

            {orders.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">Nenhum pedido</p>
            )}

            {orders.map((order) => (
                <KanbanCard
                    key={order.id}
                    order={order}
                    isUpdating={order.id === updatingOrderId}
                />
            ))}
        </section>
    )
}
