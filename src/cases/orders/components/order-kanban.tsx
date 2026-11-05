import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import type { OrderDTO } from "../dtos/order.dto"
import { useUpdateOrderStatus } from "../hooks/use-update-order-status"
import { KanbanColumn } from "./kanban-column"
import { ORDER_STATUS_LIST } from "./order-status"

interface OrderKanbanProps {
    orders: OrderDTO[];
}

export function OrderKanban({ orders }: OrderKanbanProps) {
    const updateOrderStatus = useUpdateOrderStatus()
    const updatingOrderId = updateOrderStatus.isPending ? updateOrderStatus.variables?.id : undefined

    function handleDragEnd(event: DragEndEvent) {
        const order = orders.find((item) => item.id === event.active.id)
        const newStatus = ORDER_STATUS_LIST.find((status) => status === event.over?.id)

        if (!order || !newStatus || newStatus === order.status) {
            return
        }

        updateOrderStatus.mutate({ id: order.id, status: newStatus })
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {ORDER_STATUS_LIST.map((status) => (
                    <KanbanColumn
                        key={status}
                        status={status}
                        orders={orders.filter((order) => order.status === status)}
                        updatingOrderId={updatingOrderId}
                    />
                ))}
            </div>
        </DndContext>
    )
}
