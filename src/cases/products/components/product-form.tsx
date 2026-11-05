import { useState, type SubmitEvent } from "react"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useCategories } from "@/cases/categories/hooks/use-categories"
import type { ProductDTO, ProductPayload } from "../dtos/product.dto"
import { useCreateProduct } from "../hooks/use-create-product"
import { useUpdateProduct } from "../hooks/use-update-product"
import { validateProduct, type ProductFormErrors } from "./product-form-validation"

const NO_CATEGORY = 'none'

interface ProductFormProps {
    product?: ProductDTO;
    onSaved: () => void;
}

export function ProductForm({ product, onSaved }: ProductFormProps) {
    const [name, setName] = useState(product?.name ?? '')
    const [description, setDescription] = useState(product?.description ?? '')
    const [price, setPrice] = useState(product?.price ?? '')
    const [picture, setPicture] = useState(product?.picture ?? '')
    const [categoryId, setCategoryId] = useState(product?.category?.id ?? NO_CATEGORY)
    const [active, setActive] = useState(product?.active ?? true)
    const [vegetarian, setVegetarian] = useState(product?.vegetarian ?? false)
    const [isNew, setIsNew] = useState(product?.isNew ?? false)
    const [errors, setErrors] = useState<ProductFormErrors>({})

    const { data: categories = [], isPending: categoriesPending } = useCategories()
    const createProduct = useCreateProduct()
    const updateProduct = useUpdateProduct()
    const isPending = createProduct.isPending || updateProduct.isPending

    const categoryItems = [
        { label: 'Sem categoria', value: NO_CATEGORY },
        ...categories
            .filter((category) => category.active || category.id === product?.category?.id)
            .map((category) => ({
                label: category.active ? category.name : `${category.name} (inativa)`,
                value: category.id
            }))
    ]

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        const newErrors = validateProduct({ name, price, picture })
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) {
            return
        }

        const payload: ProductPayload = {
            name: name.trim(),
            description: description.trim() || null,
            price: Number(price),
            picture: picture.trim() || null,
            active,
            vegetarian,
            isNew
        }

        if (categoryId !== (product?.category?.id ?? NO_CATEGORY)) {
            payload.categoryId = categoryId === NO_CATEGORY ? null : categoryId
        }

        if (product) {
            updateProduct.mutate({ id: product.id, payload }, { onSuccess: onSaved })
        } else {
            createProduct.mutate(payload, { onSuccess: onSaved })
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="product-name">Nome</Label>
                <Input
                    id="product-name"
                    value={name}
                    maxLength={60}
                    aria-invalid={Boolean(errors.name)}
                    onChange={(event) => setName(event.target.value)}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="product-description">Descrição</Label>
                <Textarea
                    id="product-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="product-price">Preço (R$)</Label>
                    <Input
                        id="product-price"
                        type="number"
                        min={0.01}
                        step={0.01}
                        value={price}
                        aria-invalid={Boolean(errors.price)}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                    {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="product-category">Categoria</Label>
                    <Select
                        items={categoryItems}
                        value={categoryId}
                        onValueChange={(value) => setCategoryId(value ?? NO_CATEGORY)}
                        disabled={categoriesPending}
                    >
                        <SelectTrigger id="product-category" className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {categoryItems.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="product-picture">URL da imagem</Label>
                <Input
                    id="product-picture"
                    type="url"
                    value={picture}
                    placeholder="https://..."
                    aria-invalid={Boolean(errors.picture)}
                    onChange={(event) => setPicture(event.target.value)}
                />
                {errors.picture && <p className="text-sm text-destructive">{errors.picture}</p>}
            </div>

            <div className="flex flex-wrap gap-6">
                <Label>
                    <Switch checked={active} onCheckedChange={setActive} />
                    Ativo
                </Label>
                <Label>
                    <Switch checked={vegetarian} onCheckedChange={setVegetarian} />
                    Vegetariano
                </Label>
                <Label>
                    <Switch checked={isNew} onCheckedChange={setIsNew} />
                    Novidade
                </Label>
            </div>

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
