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
import type { CategoryDTO } from "../dtos/category.dto"

interface CategoryTableProps {
    categories: CategoryDTO[];
    onEdit: (category: CategoryDTO) => void;
    onDelete: (category: CategoryDTO) => void;
}

export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-20">Ícone</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead className="w-24">Ordem</TableHead>
                        <TableHead className="w-28">Situação</TableHead>
                        <TableHead className="w-28 text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell className="text-2xl">{category.icon || '—'}</TableCell>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>{category.displayOrder}</TableCell>
                            <TableCell>
                                <Badge variant={category.active ? 'default' : 'outline'}>
                                    {category.active ? 'Ativa' : 'Inativa'}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label={`Editar ${category.name}`}
                                    onClick={() => onEdit(category)}
                                >
                                    <Pencil />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label={`Excluir ${category.name}`}
                                    onClick={() => onDelete(category)}
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
