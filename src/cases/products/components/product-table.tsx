import { ImageOff, Pencil, Trash2 } from "lucide-react"
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
import { formatCurrency } from "@/lib/format"
import type { ProductDTO } from "../dtos/product.dto"

interface ProductTableProps {
    products: ProductDTO[];
    onEdit: (product: ProductDTO) => void;
    onDelete: (product: ProductDTO) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-20">Imagem</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Indicadores</TableHead>
                        <TableHead>Situação</TableHead>
                        <TableHead className="w-28 text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                {product.picture ? (
                                    <img
                                        src={product.picture}
                                        alt={product.name}
                                        className="size-12 rounded-md object-cover"
                                    />
                                ) : (
                                    <div className="flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                        <ImageOff className="size-5" />
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category?.name ?? 'Sem categoria'}</TableCell>
                            <TableCell>{formatCurrency(product.price)}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {product.vegetarian && <Badge variant="secondary">Vegetariano</Badge>}
                                    {product.isNew && <Badge>Novidade</Badge>}
                                    {!product.vegetarian && !product.isNew && '—'}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={product.active ? 'default' : 'outline'}>
                                    {product.active ? 'Ativo' : 'Inativo'}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label={`Editar ${product.name}`}
                                    onClick={() => onEdit(product)}
                                >
                                    <Pencil />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label={`Excluir ${product.name}`}
                                    onClick={() => onDelete(product)}
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
