import { useState, type SubmitEvent } from "react"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { CategoryDTO, CategoryPayload } from "../dtos/category.dto"
import { useCreateCategory } from "../hooks/use-create-category"
import { useUpdateCategory } from "../hooks/use-update-category"

interface CategoryFormProps {
    category?: CategoryDTO;
    onSaved: () => void;
}

interface CategoryFormErrors {
    name?: string;
    displayOrder?: string;
}

export function CategoryForm({ category, onSaved }: CategoryFormProps) {
    const [name, setName] = useState(category?.name ?? '')
    const [icon, setIcon] = useState(category?.icon ?? '')
    const [displayOrder, setDisplayOrder] = useState(String(category?.displayOrder ?? 0))
    const [active, setActive] = useState(category?.active ?? true)
    const [errors, setErrors] = useState<CategoryFormErrors>({})

    const createCategory = useCreateCategory()
    const updateCategory = useUpdateCategory()
    const isPending = createCategory.isPending || updateCategory.isPending

    function validate(): CategoryFormErrors {
        const newErrors: CategoryFormErrors = {}
        const order = Number(displayOrder)

        if (!name.trim()) {
            newErrors.name = 'Informe o nome da categoria.'
        } else if (name.trim().length > 60) {
            newErrors.name = 'O nome deve ter no máximo 60 caracteres.'
        }

        if (displayOrder.trim() === '' || !Number.isInteger(order) || order < 0) {
            newErrors.displayOrder = 'Informe um número inteiro igual ou maior que zero.'
        }

        return newErrors
    }

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        const newErrors = validate()
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) {
            return
        }

        const payload: CategoryPayload = {
            name: name.trim(),
            icon: icon.trim() || null,
            displayOrder: Number(displayOrder),
            active
        }

        if (category) {
            updateCategory.mutate({ id: category.id, payload }, { onSuccess: onSaved })
        } else {
            createCategory.mutate(payload, { onSuccess: onSaved })
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="category-name">Nome</Label>
                <Input
                    id="category-name"
                    value={name}
                    maxLength={60}
                    aria-invalid={Boolean(errors.name)}
                    onChange={(event) => setName(event.target.value)}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="category-icon">Ícone (emoji)</Label>
                <Input
                    id="category-icon"
                    value={icon}
                    placeholder="🍔"
                    onChange={(event) => setIcon(event.target.value)}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="category-display-order">Ordem de exibição</Label>
                <Input
                    id="category-display-order"
                    type="number"
                    min={0}
                    step={1}
                    value={displayOrder}
                    aria-invalid={Boolean(errors.displayOrder)}
                    onChange={(event) => setDisplayOrder(event.target.value)}
                />
                {errors.displayOrder && <p className="text-sm text-destructive">{errors.displayOrder}</p>}
            </div>

            <Label>
                <Switch checked={active} onCheckedChange={setActive} />
                Ativa
            </Label>

            <DialogFooter>
                <DialogClose render={<Button variant="outline" />} disabled={isPending}>
                    Cancelar
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Salvando...' : 'Salvar'}
                </Button>
            </DialogFooter>
        </form>
    )
}
