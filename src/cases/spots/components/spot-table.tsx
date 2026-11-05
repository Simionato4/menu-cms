import { Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { SpotDTO } from "../dtos/spot.dto"

interface SpotTableProps {
    spots: SpotDTO[];
    onEdit: (spot: SpotDTO) => void;
    onDelete: (spot: SpotDTO) => void;
}

export function SpotTable({ spots, onEdit, onDelete }: SpotTableProps) {
    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead className="w-28">Situação</TableHead>
                        <TableHead className="w-28 text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {spots.map((spot) => (
                        <TableRow key={spot.id}>
                            <TableCell className="font-medium">{spot.name}</TableCell>
                            <TableCell>
                                <Badge variant={spot.active ? 'default' : 'outline'}>
                                    {spot.active ? 'Ativa' : 'Inativa'}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label={`Editar ${spot.name}`}
                                    onClick={() => onEdit(spot)}
                                >
                                    <Pencil />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label={`Excluir ${spot.name}`}
                                    onClick={() => onDelete(spot)}
                                >
                                    <Trash2 />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
