import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { CategoryDTO } from "../dtos/category.dto"
import { CategoryForm } from "./category-form"

interface CategoryFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: CategoryDTO;
}

export function CategoryFormDialog({ open, onOpenChange, category }: CategoryFormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{category ? 'Editar categoria' : 'Nova categoria'}</DialogTitle>
                    <DialogDescription>
                        Preencha os dados da categoria do cardápio.
                    </DialogDescription>
                </DialogHeader>
                <CategoryForm category={category} onSaved={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    )
}
