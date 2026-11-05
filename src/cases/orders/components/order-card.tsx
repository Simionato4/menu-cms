import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatDateTime } from "@/lib/format"
import type { OrderDTO } from "../dtos/order.dto"
import { OrderStatusBadge } from "./order-status-badge"
import { OrderStatusSelect } from "./order-status-select"

interface OrderCardProps {
    order: OrderDTO;
}

export function OrderCard({ order }: OrderCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Pedido de {formatDateTime(order.createdAt)}
                    <OrderStatusBadge status={order.status} />
                </CardTitle>
                <CardDescription>{order.items.length} item(ns)</CardDescription>
                <CardAction>
                    <OrderStatusSelect orderId={order.id} status={order.status} />
                </CardAction>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead className="text-right">Quantidade</TableHead>
                            <TableHead className="text-right">Preço unitário</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.subtotal)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            <CardFooter className="justify-end text-base font-semibold">
                Total do pedido: {formatCurrency(order.total)}
            </CardFooter>
        </Card>
    )
}
