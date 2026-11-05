import { Link } from "react-router-dom"
import { ReceiptText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatDateTime } from "@/lib/format"
import type { GuestCheckWithTotalDTO } from "../dtos/guest-check.dto"

interface GuestCheckTableProps {
    guestChecks: GuestCheckWithTotalDTO[];
}

export function GuestCheckTable({ guestChecks }: GuestCheckTableProps) {
    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Mesa</TableHead>
                        <TableHead>Aberta em</TableHead>
                        <TableHead>Total acumulado</TableHead>
                        <TableHead className="w-36 text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {guestChecks.map((guestCheck) => (
                        <TableRow key={guestCheck.id}>
                            <TableCell className="font-medium">{guestCheck.spot.name}</TableCell>
                            <TableCell>{formatDateTime(guestCheck.createdAt)}</TableCell>
                            <TableCell>{formatCurrency(guestCheck.total)}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    nativeButton={false}
                                    render={<Link to={`/guest-checks/${guestCheck.id}`} />}
                                >
                                    <ReceiptText />
                                    Ver pedidos
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
