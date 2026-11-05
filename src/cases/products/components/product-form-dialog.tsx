import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { ProductDTO } from "../dtos/product.dto"
import { ProductForm } from "./product-form"

interface ProductFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product?: ProductDTO;
}

export function ProductFormDialog({ open, onOpenChange, product }: ProductFormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{product ? 'Editar produto' : 'Novo produto'}</DialogTitle>
                    <DialogDescription>
                        Preencha os dados do produto do cardápio.
                    </DialogDescription>
                </DialogHeader>
                <ProductForm product={product} onSaved={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    )
}
