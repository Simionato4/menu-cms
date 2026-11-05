import { useDraggable } from "@dnd-kit/core"
import { cn } from "cn"
import { formatDateTime } from "@/lib/format"
import type { OrderDTO } from "../dtos/order.dto"

interface KanbanCardProps {
    order: OrderDTO;
    isUpdating: boolean;
}

export function KanbanCard({ order, isUpdating }: KanbanCardProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: order.id,
        disabled: isUpdating
    })

    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={cn(
                'grid cursor-grab gap-2 rounded-lg border bg-card p-3 text-sm shadow-xs',
                isDragging && 'relative z-10 cursor-grabbing shadow-lg',
                isUpdating && 'opacity-50'
            )}
        >
            <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{order.guestCheck.spot.name}</span>
                <span className="text-xs text-muted-foreground">{formatDateTime(order.createdAt)}</span>
            </div>
            <ul className="grid gap-1">
                {order.items.map((item) => (
                    <li key={item.id}>
                        {item.quantity}x {item.product.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
