import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategories } from "@/cases/categories/hooks/use-categories"

export const ALL_CATEGORIES = 'all'

interface ProductCategoryFilterProps {
    value: string;
    onChange: (categoryId: string) => void;
}

export function ProductCategoryFilter({ value, onChange }: ProductCategoryFilterProps) {
    const { data: categories = [], isPending } = useCategories()

    const items = [
        { label: 'Todas as categorias', value: ALL_CATEGORIES },
        ...categories.map((category) => ({ label: category.name, value: category.id }))
    ]

    return (
        <Select
            items={items}
            value={value}
            onValueChange={(newValue) => onChange(newValue ?? ALL_CATEGORIES)}
            disabled={isPending}
        >
            <SelectTrigger className="w-60" aria-label="Filtrar por categoria">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
